import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { JoiPipe } from 'nestjs-joi'
import { LoginDTO } from './dtos/login.dto'
import { JWT } from 'src/common/decorators/jwt.decorator'
import { ResponseDTO } from 'src/common/classes/dtos/response.dto'
import { RegisterDTO } from './dtos/register.dto'
import { ExpressRequestType } from 'src/common/helpers/types.helper'
import { ExceptionReasonDTO } from 'src/common/classes/dtos/exception-reason.dto'

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @JWT(false)
  @Post('login')
  async login(@Body(JoiPipe) dto: LoginDTO) {
    const payload = await this.authenticationService.login(dto)
    return new ResponseDTO(HttpStatus.OK, 'Login successful', payload)
  }

  @JWT(false)
  @Post('register')
  async register(@Body(JoiPipe) dto: RegisterDTO) {
    const payload = await this.authenticationService.register(dto)
    return new ResponseDTO(HttpStatus.OK, 'Register successful', payload)
  }

  @Post('logout')
  async logout(@Req() req: ExpressRequestType) {
    const jwtToken = req.headers.authorization?.replace('Bearer ', '')
    if (!jwtToken) throw new ExceptionReasonDTO('Logout', 'Token not found', 'Token não encontrado', undefined, HttpStatus.UNAUTHORIZED)
    await this.authenticationService.logout(jwtToken)
    return new ResponseDTO(HttpStatus.OK, 'Logout successful', undefined)
  }
}
