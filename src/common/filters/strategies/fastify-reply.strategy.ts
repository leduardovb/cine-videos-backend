import { ArgumentsHost } from '@nestjs/common'
import { IReplyStrategy } from './reply.strategy.interface'
import { ErrorDTO } from 'src/common/classes/dtos/error.dto'

export class FastifyResponseStrategy implements IReplyStrategy {
  private response: any
  constructor(private readonly host: ArgumentsHost) {
    this.response = this.host.switchToHttp().getResponse()
  }

  notify(data: ErrorDTO): void {
    this.response.send(data)
  }

  status(code: number) {
    this.response.status(code)
    return this
  }
}
