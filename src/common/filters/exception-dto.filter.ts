import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { ErrorDTO } from '../classes/dtos/error.dto'
import { ExceptionReasonDTO } from '../classes/dtos/exception-reason.dto'
import { ExceptionDTO } from '../classes/dtos/exception.dto'
import { Logger } from '../configurations/logger.configuration'
import { FastifyResponseStrategy } from './strategies/fastify-reply.strategy'

@Catch(Array<ExceptionReasonDTO>, ExceptionReasonDTO, ExceptionDTO)
export class ExceptionDTOFilter extends BaseExceptionFilter {
  override catch(exception: Array<ExceptionReasonDTO> | ExceptionReasonDTO | ExceptionDTO, host: ArgumentsHost): void {
    const responseStrategy = new FastifyResponseStrategy(host)

    if (exception instanceof ExceptionDTO) {
      Logger.infer('Exception DTO', exception)
      responseStrategy.status(exception.statusCode).notify(new ErrorDTO(exception.statusCode, exception))
    } else {
      Logger.warn('Exception Reason DTO', exception)
      if (Array.isArray(exception)) responseStrategy.status(HttpStatus.BAD_REQUEST).notify(new ErrorDTO(HttpStatus.BAD_REQUEST, ExceptionDTO.withWarnings('Warning', exception)))
      else responseStrategy.status(exception.code).notify(new ErrorDTO(exception.code, ExceptionDTO.withWarning('Warning', exception)))
    }
  }
}
