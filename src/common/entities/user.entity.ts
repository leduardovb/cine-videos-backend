import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity, SoftDeletableResourceEntity } from './abstract'
import { UserTokenEntity } from './user-token.entity'
import { ProfileEntity } from './profile.entity'

@Entity('users')
export class UserEntity extends SoftDeletableResourceEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'email', type: 'character varying', length: 255, unique: true })
  email: string

  @Column({ name: 'password', type: 'character varying', length: 255 })
  password: string

  @Column({ name: 'owner_name', type: 'varchar', length: 255 })
  ownerName: string

  @Column({ name: 'owner_last_name', type: 'varchar', length: 255 })
  ownerLastName: string

  @Column({ name: 'owner_birth_date', type: 'timestamptz' })
  ownerBirthDate: Date

  @OneToMany(() => UserTokenEntity, (token) => token.user)
  @JoinColumn({ name: 'id' })
  tokens: Array<UserTokenEntity>

  @OneToMany(() => ProfileEntity, (profile) => profile.user, { cascade: ['insert'] })
  @JoinColumn({ name: 'id' })
  profiles?: Array<ProfileEntity>

  createDefaultProfile() {
    const profile = new ProfileEntity()
    profile.name = `${this.ownerName}`
    profile.user = this
    if (!this.profiles) this.profiles = []
    this.profiles.push(profile)
  }

  registerModel() {
    return {
      id: this.id,
      email: this.email,
      ownerName: this.ownerName,
      ownerLastName: this.ownerLastName,
      ownerBirthDate: this.ownerBirthDate,
      profiles: this.profiles?.map((profile) => ({
        id: profile.id,
        name: profile.name,
      })),
    }
  }
}
