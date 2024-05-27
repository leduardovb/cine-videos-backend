import { HttpStatus, Logger } from '@nestjs/common'
import { ExceptionReasonDTO } from './exception-reason.dto'
import { ExceptionDTO } from './exception.dto'

export class ErrorDTO {
  public statusCode: HttpStatus
  private message: string
  private reason?: ExceptionReasonDTO
  private reasons?: Array<ExceptionReasonDTO>

  constructor(statusCode: HttpStatus, exceptionDTO: ExceptionDTO) {
    if (statusCode < HttpStatus.AMBIGUOUS) {
      Logger.error('Error must belong to an unsuccesfull request')
      process.exit(1)
    }

    this.statusCode = statusCode
    this.message = exceptionDTO.message
    if (exceptionDTO.reason) this.reason = exceptionDTO.reason
    if (exceptionDTO.reasons) this.reasons = exceptionDTO.reasons
  }

  getMessage(): string {
    return this.message
  }

  getReason(): ExceptionReasonDTO | undefined {
    return this.reason
  }

  getReasons(): ExceptionReasonDTO[] | undefined {
    return this.reasons
  }
}
