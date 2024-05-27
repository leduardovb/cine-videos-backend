import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthenticationService } from '../services'
import { ExpressRequestType } from '../helpers/types.helper'
import { ExceptionReasonDTO } from '../classes/dtos/exception-reason.dto'
import { ExceptionDTO } from '../classes/dtos/exception.dto'
import { TokenPayloadDTO } from '../classes/dtos/token-payload.dto'

@Injectable()
export class AuthGuard {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const reflector = new Reflector()
    const checkJWT = reflector.get<boolean>('jwt', context.getHandler()) ?? true
    const request = context.switchToHttp().getRequest<ExpressRequestType>()

    if (checkJWT === false) return true

    const authorization = request.headers['authorization']

    const payload = await this.verifyAuthorization(authorization)

    request.payloadDTO = payload
    return true
  }

  async verifyAuthorization(authorization: string | undefined): Promise<TokenPayloadDTO> {
    if (!authorization) throw ExceptionDTO.withError('Guard', new ExceptionReasonDTO('Authorization header', 'Authorization header is required', 'Necessário um cabeço de autenticação'), HttpStatus.UNAUTHORIZED)
    if (!authorization.includes(' ')) throw ExceptionDTO.withError('Guard', new ExceptionReasonDTO('Token malformed', 'Invalid authorization format', 'Formato da autorização inválido'), HttpStatus.UNAUTHORIZED)
    const [type, token] = authorization.split(' ')

    const allowedAuthorizationTypes = ['Bearer']
    if (!allowedAuthorizationTypes.includes(type))
      throw ExceptionDTO.withError('Guard', new ExceptionReasonDTO('Invalid Token type', `Invalid type for authorization, allowed types are ${allowedAuthorizationTypes}`, `Tipo de autorização é inválido, os tipos validos são: ${allowedAuthorizationTypes}`), HttpStatus.UNAUTHORIZED)

    switch (type) {
      case 'Bearer': {
        return this.authenticationService.bearer(token)
      }
      default:
        throw ExceptionDTO.withError('Guard', new ExceptionReasonDTO('Invalid Token type', `Invalid type for authorization, allowed types are ${allowedAuthorizationTypes}`, `Tipo de autorização é inválido, os tipos validos são: ${allowedAuthorizationTypes}`), HttpStatus.UNAUTHORIZED)
    }
  }
}
