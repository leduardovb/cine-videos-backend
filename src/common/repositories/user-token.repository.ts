import { Injectable } from '@nestjs/common'
import { UserTokenEntity } from '../entities/user-token.entity'
import { BaseRepository } from './base.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserTokenRepository extends BaseRepository<UserTokenEntity> {
  constructor(@InjectRepository(UserTokenEntity) repository: Repository<UserTokenEntity>) {
    super(repository.target, repository.manager, repository.queryRunner)
    this.resourceName = 'UserToken'
    this.resourceLabel = 'Token de Usuário'
  }
}
