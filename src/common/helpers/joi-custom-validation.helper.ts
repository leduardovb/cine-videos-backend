import Joi from 'joi'

export class JoiCustomValidation {
  static objectValidation(value: string | Array<string>, validationSchema: Joi.ObjectSchema) {
    const object = this.keyValueToObject(typeof value === 'string' ? value.split(',') : value)
    if (!object) return { filters: undefined, result: undefined, errorMessage: 'of overlaping properties' }

    return { object, result: validationSchema.validate(object) }
  }

  static includesValidation(value: string | Array<string>, validationSchema: Joi.ArraySchema) {
    const array = typeof value === 'string' ? value.replace(' ', '').split(',') : value

    if ([...new Set(array)].length != array.length) return { filters: undefined, result: undefined, errorMessage: 'of overlaping properties' }
    return { includes: array, result: validationSchema.validate(array) }
  }

  private static keyValueToObject(data?: Array<string>): any {
    return data?.reduce((previousElement: any, currentElement: any) => {
      const key = currentElement.split(':')[0]
      const keysValue = currentElement.split(':').slice(1).join(':')
      if (previousElement[key] === undefined) previousElement[key] = []
      else return undefined

      if (/^true$|^false$/.test(keysValue.toString())) previousElement[key] = keysValue.toString() === 'true' ? true : false
      else if (/^[0-9]+$/.test(keysValue.toString())) previousElement[key] = Number(keysValue.toString())
      else previousElement[key] = keysValue

      return previousElement
    }, {})
  }
}
