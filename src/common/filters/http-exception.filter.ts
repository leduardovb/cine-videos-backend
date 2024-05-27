import { HttpException } from '@nestjs/common'
import { ErrorDTO } from '../classes/dtos/error.dto'
import { IReplyStrategy } from './strategies/reply.strategy.interface'
import { ExceptionReasonDTO } from '../classes/dtos/exception-reason.dto'
import { ExceptionDTO } from '../classes/dtos/exception.dto'
import { NotFoundWarning, ForbiddenWarning, UnauthorizedWarning, InternalServerError } from '../helpers/errors.helper'
import { Logger } from '../configurations/logger.configuration'

export class HttpExceptionFilter {
  constructor(private responseStrategy: IReplyStrategy) {}

  handle(exception: HttpException): void {
    const exceptionDTO = this.buildExceptionDTO(exception)
    Logger.infer('Http exception', exceptionDTO)
    this.responseStrategy.status(exception.getStatus()).notify(new ErrorDTO(exception.getStatus(), exceptionDTO))
  }

  shouldHandle(exception: HttpException): exception is HttpException {
    const httpExceptionMethods = ['initCause', 'initMessage', 'initName', 'getResponse', 'getStatus']
    return httpExceptionMethods.every((key) => key in exception)
  }

  private buildExceptionDTO(exception: HttpException): ExceptionDTO {
    if (exception.name === 'NotFoundException') return NotFoundWarning
    if (exception.name === 'ForbiddenException') return ForbiddenWarning
    if (exception.name === 'UnauthorizedException') return UnauthorizedWarning
    if (exception.name === 'InternalServerErrorException') return InternalServerError
    return ExceptionDTO.withWarning(exception.name, new ExceptionReasonDTO(exception.name, exception.message, exception.message, undefined, exception.getStatus()), exception.getStatus())
  }
}
