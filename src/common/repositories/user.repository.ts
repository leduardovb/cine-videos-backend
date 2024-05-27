import { Injectable } from '@nestjs/common'
import { UserEntity } from '../entities/user.entity'
import { BaseRepository } from './base.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(@InjectRepository(UserEntity) private readonly repository: Repository<UserEntity>) {
    super(repository.target, repository.manager)
    this.resourceName = 'User'
    this.resourceLabel = 'Usuário'
  }
}
