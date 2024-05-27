import { HttpException, HttpStatus } from '@nestjs/common'
import { ErrorDTO } from '../classes/dtos/error.dto'
import { ExceptionReasonDTO } from '../classes/dtos/exception-reason.dto'
import { ExceptionDTO } from '../classes/dtos/exception.dto'
import { Logger } from '../configurations/logger.configuration'
import { IReplyStrategy } from './strategies/reply.strategy.interface'

function parserJoiErrors(exception: HttpException): Array<ExceptionReasonDTO> {
  const parsedJoiErrors = Array<ExceptionReasonDTO>()
  const errors = exception.message
    ? exception.message
        .match(/\".*\"/g)
        ?.toString()
        .replace(/\"/g, '')
        .split(',')
    : exception.message.split(',')
  if (errors)
    for (const error of errors) {
      const parsedError = error.split(';')
      parsedJoiErrors.push(new ExceptionReasonDTO('Joi', `Failed validation${parsedError[1] ? `: ${parsedError[1]}` : ''}`, parsedError[2], parsedError[0] ? parsedError[0].trim() : parsedError[0]))
    }
  return parsedJoiErrors
}

export class JoiExceptionFilter {
  constructor(private responseStrategy: IReplyStrategy) {}

  handle(exception: HttpException): void {
    const reasons = parserJoiErrors(exception as HttpException)
    const exceptionDTO = ExceptionDTO.withWarnings('Failed joi schema validation', reasons)
    Logger.infer('Request rejected by Joi', exceptionDTO)
    this.responseStrategy.status(HttpStatus.BAD_REQUEST).notify(new ErrorDTO('getStatus' in exception ? exception.getStatus() : HttpStatus.BAD_REQUEST, exceptionDTO))
  }

  shouldHandle(exception: HttpException): exception is HttpException {
    return exception.message.includes('Request validation of param') || exception.message.includes('Request validation of body') || exception.message.includes('Request validation of query') || exception.message.includes('Validation failed')
  }
}
