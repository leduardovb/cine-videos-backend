import { HttpStatus, Injectable } from '@nestjs/common'
import { LoginDTO } from './dtos/login.dto'
import { UserRepository } from 'src/common/repositories/user.repository'
import * as bcrypt from 'bcrypt'
import { ExceptionReasonDTO } from 'src/common/classes/dtos/exception-reason.dto'
import { JwtService } from '@nestjs/jwt'
import { UserTokenRepository } from 'src/common/repositories/user-token.repository'
import { TokenPayloadDTO } from 'src/common/classes/dtos/token-payload.dto'
import { RegisterDTO } from './dtos/register.dto'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userTokenRepository: UserTokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDTO) {
    const user = await this.userRepository.findOneOrFail({ where: { email: dto.email } })
    const compare = bcrypt.compareSync(dto.password, user.password)
    if (!compare) throw new ExceptionReasonDTO('Login', 'Invalid email or password', 'Email ou senha inválidos', undefined, HttpStatus.UNAUTHORIZED)
    const accessToken = this.jwtService.sign({ payload: new TokenPayloadDTO(user) }, { expiresIn: '7d' })
    const refreshToken = this.jwtService.sign({ payload: new TokenPayloadDTO(user) }, { expiresIn: '14d' })

    const newToken = this.userTokenRepository.create({ user, accessToken, refreshToken })
    await this.userTokenRepository.save(newToken)

    return { accessToken, refreshToken }
  }

  async register(dto: RegisterDTO) {
    const emailExists = await this.userRepository.findOne({ where: { email: dto.email } })
    if (emailExists) throw new ExceptionReasonDTO('Register', 'Email already exists', 'Email já cadastrado', undefined, HttpStatus.BAD_REQUEST)

    const user = this.userRepository.create({ ...dto, password: bcrypt.hashSync(dto.password, 10) })
    user.createDefaultProfile()
    const entity = await this.userRepository.save(user)

    return entity.registerModel()
  }

  async logout(token: string) {
    const userToken = await this.userTokenRepository.findOneOrFail({ where: { accessToken: token } })
    await this.userTokenRepository.softRemove(userToken)
  }
}
