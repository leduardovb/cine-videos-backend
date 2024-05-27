import { Module } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { AuthenticationController } from './authentication.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'src/common/entities/user.entity'
import { UserTokenEntity } from 'src/common/entities/user-token.entity'
import { UserRepository } from 'src/common/repositories/user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserTokenEntity])],
  providers: [AuthenticationService, UserRepository],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
