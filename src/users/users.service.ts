import { HttpStatus, Injectable } from '@nestjs/common'
import { ProfileRepository } from 'src/common/repositories/profile.repository'
import { UserRepository } from 'src/common/repositories/user.repository'
import { CreateProfileDTO } from './dtos/create-profile.dto'
import { ExceptionReasonDTO } from 'src/common/classes/dtos/exception-reason.dto'

const MAX_PROFILES = 4

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async getProfiles(userId: number) {
    return (await this.profileRepository.findBy({ userId })).map((profile) => profile.toModel())
  }

  async createProfile(userId: number, dto: CreateProfileDTO) {
    const count = await this.profileRepository.count({ where: { userId } })
    if (count >= MAX_PROFILES) throw new ExceptionReasonDTO('Users', 'You have reached the maximum number of profiles', 'Você atingiu o número máximo de perfis', undefined, HttpStatus.BAD_REQUEST)
    const profile = this.profileRepository.create({ ...dto, userId })
    const entity = await this.profileRepository.save(profile)
    return entity.toModel()
  }
}
