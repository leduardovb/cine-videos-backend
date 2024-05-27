import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProfileEntity } from 'src/common/entities/profile.entity'
import { ProfileRepository } from 'src/common/repositories/profile.repository'
import { UserEntity } from 'src/common/entities/user.entity'
import { UserRepository } from 'src/common/repositories/user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, UserEntity])],
  providers: [UsersService, ProfileRepository, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
