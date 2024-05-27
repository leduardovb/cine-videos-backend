import { Body, Controller, Get, HttpStatus, Post, Req } from '@nestjs/common'
import { UsersService } from './users.service'
import { ExpressRequestType } from 'src/common/helpers/types.helper'
import { ResponseDTO } from 'src/common/classes/dtos/response.dto'
import { JoiPipe } from 'nestjs-joi'
import { CreateProfileDTO } from './dtos/create-profile.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profiles/all')
  async getProfiles(@Req() req: ExpressRequestType) {
    const profiles = await this.usersService.getProfiles(req.payloadDTO.id)
    return new ResponseDTO(HttpStatus.OK, 'Profiles retrieved successfully', profiles)
  }

  @Post('profiles')
  async createProfile(@Body(JoiPipe) dto: CreateProfileDTO, @Req() req: ExpressRequestType) {
    const profile = await this.usersService.createProfile(req.payloadDTO.id, dto)
    return new ResponseDTO(HttpStatus.CREATED, 'Profile created successfully', profile)
  }
}
