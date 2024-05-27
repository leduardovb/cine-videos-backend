import { Injectable } from '@nestjs/common'
import { BaseRepository } from './base.repository'
import { ProfileEntity } from '../entities/profile.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ProfileRepository extends BaseRepository<ProfileEntity> {
  constructor(@InjectRepository(ProfileEntity) private readonly repository: Repository<ProfileEntity>) {
    super(repository.target, repository.manager)
    this.resourceName = 'Profile'
    this.resourceLabel = 'Perfil'
  }
}
