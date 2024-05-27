import { ExpressRequestType } from '../../helpers/types.helper'

export class ProcessedHeaderDTO {
  url?: string
  originalUrl: string
  agent?: string
  httpVersion: string
  expirationTime: number
  origin?: string

  constructor(request: ExpressRequestType) {
    this.agent = request.headers['user-agent']
    this.httpVersion = request.httpVersion
    this.url = request.url === '' ? '/' : request.url
    this.origin = request.headers['origin']
  }
}
