import { FindManyOptions, FindOneOptions, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm'
import { HttpStatus } from '@nestjs/common'
import { ExceptionReasonDTO } from '../classes/dtos/exception-reason.dto'

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  protected resourceName = 'Resource'
  protected resourceLabel = 'Recurso'

  protected NotFound(ptMessage?: string) {
    return new ExceptionReasonDTO(`Find ${this.resourceName}`, `Could not to find ${this.resourceName.toLowerCase()}.`, ptMessage ?? `${this.resourceLabel} não encontrado(a).`, undefined, HttpStatus.NOT_FOUND)
  }

  override async findOneOrFail(options: FindOneOptions<T>): Promise<T> {
    const entity = await super.findOne(options)
    if (!entity) throw this.NotFound()
    return entity
  }
}
