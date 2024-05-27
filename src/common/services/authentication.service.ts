import { Injectable } from '@nestjs/common'
import { HttpStatus } from '@nestjs/common/enums'
import { JwtService } from '@nestjs/jwt'
import { BearerTokenProcessor } from '../helpers/bearer-token-processor.helper'
import { ExceptionReasonDTO } from '../classes/dtos/exception-reason.dto'
import { ExceptionDTO } from '../classes/dtos/exception.dto'
import { TokenPayloadDTO } from '../classes/dtos/token-payload.dto'
import { UnauthorizedWarning } from '../helpers/errors.helper'
import { Logger } from '../configurations/logger.configuration'
import { UserTokenRepository } from '../repositories/user-token.repository'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userTokenRepository: UserTokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  async bearer(token: string): Promise<TokenPayloadDTO> {
    const bearerTokenProcessor = new BearerTokenProcessor(this.jwtService, token)
    if (!bearerTokenProcessor.isBearerToken()) throw ExceptionDTO.withError('Guard', new ExceptionReasonDTO('JWT', 'JWT decode error', 'Formato do JWT é inválido'), HttpStatus.UNAUTHORIZED)
    if (!bearerTokenProcessor.isSignatureValid()) throw ExceptionDTO.withError('Guard', new ExceptionReasonDTO('JWT', 'Signature is invalid or token already expired', 'Assinatura inválida ou token já expirado'), HttpStatus.UNAUTHORIZED)

    const userTokenEntity = await this.userTokenRepository.findOne({
      where: { accessToken: token },
      relations: ['user'],
    })
    if (!userTokenEntity) throw UnauthorizedWarning
    if (userTokenEntity.userId !== bearerTokenProcessor.payload.id || userTokenEntity.user.email !== bearerTokenProcessor.payload.email) throw new ExceptionReasonDTO('JWT', `Invalid validation token. New login required.`, 'Algo deu errado, informe o suporte', undefined, HttpStatus.UNAUTHORIZED)

    Logger.info(`Request by user ${bearerTokenProcessor?.payload?.id}`)
    return new TokenPayloadDTO(userTokenEntity.user)
  }
}
