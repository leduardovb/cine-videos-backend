import { CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

export abstract class ResourceEntity extends BaseEntity {
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', update: true })
  updatedAt: string
}
