import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { SoftDeletableResourceEntity } from './abstract'
import { UserTokenEntity } from './user-token.entity'

@Entity('users')
export class UserEntity extends SoftDeletableResourceEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'email', type: 'character varying', length: 255, unique: true })
  email: string

  @Column({ name: 'password', type: 'character varying', length: 255 })
  password: string

  @OneToMany(() => UserTokenEntity, (token) => token.user)
  @JoinColumn({ name: 'id' })
  tokens: Array<UserTokenEntity>
}
