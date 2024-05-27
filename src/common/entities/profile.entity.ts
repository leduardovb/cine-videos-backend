import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity, SoftDeletableResourceEntity } from './abstract'
import { UserEntity } from './user.entity'

@Entity('profiles')
export class ProfileEntity extends SoftDeletableResourceEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'name', type: 'character varying', length: 255 })
  name: string

  @Column({ name: 'user_id', type: 'integer' })
  userId: number

  @ManyToOne(() => UserEntity, (user) => user.profiles)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  toModel<T extends Partial<BaseEntity>>(...args: any[]): T {
    return Object.assign({} as T, {
      ...this,
    })
  }
}
