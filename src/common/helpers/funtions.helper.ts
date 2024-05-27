import { HttpException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import moment from 'moment'
import { FindOptionsWhere, ObjectLiteral, SelectQueryBuilder } from 'typeorm'
import { ExceptionReasonDTO } from '../classes/dtos/exception-reason.dto'
import { IgnoreObjectKeys, whereConditionEnum } from './enums.helper'

export function parseBodyObject(element: any) {
  if (typeof element === 'object' && element !== null && element !== undefined) {
    const newObject: { [key: string]: any } = {}
    for (const [key, value] of Object.entries(element)) {
      if (IgnoreObjectKeys.includes(key)) continue
      if (typeof value === 'object') newObject[key] = parseBodyObject(value)
      else newObject[key] = value
    }
    return newObject
  }

  return element
}

export function isEmpty(value: any) {
  return value == null || (value.hasOwnProperty('length') && value.length === 0) || (value.constructor === Object && Object.keys(value).length === 0)
}

export function isInstanceOfExceptionReasonDTO(data: any): boolean {
  if (data && data instanceof Array && new Set(data.map((x) => x instanceof ExceptionReasonDTO)).size <= 1) return true
  else if (data && data instanceof ExceptionReasonDTO) return true

  return false
}

export function encryptPassword(password: string, length = 10): string {
  return bcrypt.hashSync(password, length)
}

export function parserJoiErrors(exception: HttpException): Array<ExceptionReasonDTO> {
  const parsedJoiErrors = Array<ExceptionReasonDTO>()
  const errors = exception.message
    ? exception.message
        .match(/\".*\"/g)
        ?.toString()
        .replace(/\"/g, '')
        .split(',')
    : exception.message.split(',')
  if (errors)
    for (const error of errors) {
      const parsedError = error.split(';')
      parsedJoiErrors.push(new ExceptionReasonDTO('Joi', `Failed validation${parsedError[1] ? `: ${parsedError[1]}` : ''}`, parsedError[2], parsedError[0] ? parsedError[0].trim() : parsedError[0]))
    }
  return parsedJoiErrors
}

export function handleFilter<Entity extends ObjectLiteral>(filters: FindOptionsWhere<Entity>, alias: string, query: SelectQueryBuilder<Entity>) {
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined) handleWhereFilter(alias, key, value, query)
  }
}

function handleWhereFilter<Entity extends ObjectLiteral>(alias: string, key: string, value: unknown, query: SelectQueryBuilder<Entity>) {
  if (typeof value === 'string') {
    const isDateFormat = value.match(/(\d{2})\/(\d{2})\/(\d{4})/)
    if (isDateFormat) {
      const maybeDate = moment(value, 'DD/MM/YYYY')
      if (maybeDate.isValid()) query.andWhere(`DATE(${alias}.${key}) = :${key}`, { [key]: maybeDate.format('YYYY-MM-DD') })
    } else query.andWhere(`${alias}.${key} = :${key}`, { [key]: value })
  } else query.andWhere(`${alias}.${key} = :${key}`, { [key]: value })
}

export function handleSearch<Entity extends ObjectLiteral>(search: FindOptionsWhere<Entity>, alias: string, query: SelectQueryBuilder<Entity>, includes?: Array<string>, globalKeys?: FindOptionsWhere<Entity>, condition: whereConditionEnum = whereConditionEnum.AND) {
  delete search?.global
  const searchString = searchStringByObject(alias, search, condition, includes)
  if (searchString !== undefined) query.andWhere(searchString[0], searchString[1])

  if (globalKeys) {
    const globalString = searchStringByObject(alias, globalKeys, condition, includes, 'Global')
    if (globalString) query.andWhere(globalString[0], globalString[1])
  }
}

export function searchStringByObject<Entity extends ObjectLiteral>(alias: string, search: FindOptionsWhere<Entity>, condition: whereConditionEnum = whereConditionEnum.AND, includes?: Array<string>, context = ''): [string, { [key: string]: string }] | undefined {
  const allSearchs: Array<string> = []
  const parsedObject: { [key: string]: string } = {}
  for (const [key, value] of Object.entries(search)) {
    const parsedKey = key + context
    if (value !== undefined) {
      if (!includes?.includes(alias)) throw new ExceptionReasonDTO('Search', `Add ${alias} include for search`)
      allSearchs.push(`UPPER(CAST(${alias}.${key} AS varchar)) LIKE UPPER(:${parsedKey})`)

      parsedObject[parsedKey] = `%${value}%`
    }
  }

  if (allSearchs.length === 0) return undefined
  return [`(${allSearchs.join(` ${condition === whereConditionEnum.AND ? 'AND' : 'OR'} `)})`, parsedObject]
}

export function handleIncludes<Entity extends ObjectLiteral>(includes: Array<string>, alias: string, query: SelectQueryBuilder<Entity>) {
  const sortedIncludes = includes.sort((a: string, b: string) => {
    return a.length - b.length
  })

  for (const include of sortedIncludes) {
    const split = include.split('.')
    if (split.length < 2) query.leftJoinAndSelect(`${alias}.${include}`, `${include}`)
    else {
      let verify = split[0]
      for (let i = 0; i < split.length - 2; i++) {
        if (!includes.includes(verify)) throw new ExceptionReasonDTO('Includes', `This includes is lacking: ${verify}`)
        verify = `${verify}.${split[i + 1]}`
      }
      query.leftJoinAndSelect(`${split[split.length - 2]}.${split[split.length - 1]}`, `${split[split.length - 1]}`)
    }
  }
}
