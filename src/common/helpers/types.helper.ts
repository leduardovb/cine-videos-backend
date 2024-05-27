import { Request } from 'express'
import { TokenPayloadDTO } from '../classes/dtos/token-payload.dto'

export type ExceptionType = 'ERROR' | 'WARN'

export type ExpressRequestType = Request & {
  payloadDTO: TokenPayloadDTO
}

export type CheckScopeType = { institutionId?: number; roleId?: number; userId?: number }
