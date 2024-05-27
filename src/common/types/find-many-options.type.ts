import { FindOptionsWhere } from 'typeorm'
import { PagedRequestDTO } from '../classes/dtos/paged-request.dto'

export type FindManyOptionsType<T> = PagedRequestDTO<T> & {
  businessRulesFilter?: FindOptionsWhere<T>
  permissionsFilter?: FindOptionsWhere<T>
}
