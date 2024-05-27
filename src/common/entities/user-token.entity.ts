import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { SoftDeletableResourceEntity } from './abstract'
import { UserEntity } from './user.entity'

@Entity('user_tokens')
export class UserTokenEntity extends SoftDeletableResourceEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'user_id', type: 'integer' })
  userId: number

  @Column({ name: 'access_token', type: 'character varying', length: 255 })
  accessToken: string

  @Column({ name: 'refresh_token', type: 'character varying', length: 255 })
  refreshToken: string

  @Column({ name: 'expiration_access_token', type: 'integer' })
  expirationAccessToken: number

  @Column({ name: 'expiration_refresh_token', type: 'integer' })
  expirationRefreshToken: number

  @ManyToOne(() => UserEntity, (user) => user.tokens)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}
