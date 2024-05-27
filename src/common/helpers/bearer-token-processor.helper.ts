import { Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenPayloadDTO } from '../classes/dtos/token-payload.dto'

export class BearerTokenProcessor {
  private jwtService: JwtService
  token: string
  payload: TokenPayloadDTO
  expirationTime?: number
  creationTime?: string

  constructor(jwtService: JwtService, token?: string) {
    this.jwtService = jwtService
    if (token) this.token = token
  }

  isBearerToken(): boolean {
    return this.jwtService.decode(this.token) ? true : false
  }

  isSignatureValid(): boolean {
    try {
      const bearerTokenProcessor = this.jwtService.verify(this.token)
      this.payload = bearerTokenProcessor.payload as TokenPayloadDTO
      this.expirationTime = bearerTokenProcessor.exp
      this.creationTime = bearerTokenProcessor.jti
      return this.matchesPayload()
    } catch (error) {
      Logger.debug(`Invalid bearer token due to ${error}`)
      return false
    }
  }

  matchesPayload(): boolean {
    return this.payload && TokenPayloadDTO.matchesObject(this.payload)
  }

  create(payload: TokenPayloadDTO, expirationTime = '1d'): string {
    const options = expirationTime ? { expiresIn: expirationTime } : undefined
    return this.jwtService.sign({ payload }, options)
  }
}
