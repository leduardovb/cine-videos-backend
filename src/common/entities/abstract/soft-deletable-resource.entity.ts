import { DeleteDateColumn } from 'typeorm'
import { ResourceEntity } from './resource.entity'

export abstract class SoftDeletableResourceEntity extends ResourceEntity {
  @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at' })
  deletedAt: string
}
