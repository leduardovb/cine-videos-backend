import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { ErrorDTO } from '../classes/dtos/error.dto'
import { ExceptionReasonDTO } from '../classes/dtos/exception-reason.dto'
import { ExceptionDTO } from '../classes/dtos/exception.dto'
import { Logger } from '../configurations/logger.configuration'
import { HttpExceptionFilter } from './http-exception.filter'
import { JoiExceptionFilter } from './joi-exception.filter'
import { FastifyResponseStrategy } from './strategies/fastify-reply.strategy'

@Catch()
export class GenericExceptionFilter extends BaseExceptionFilter {
  override async catch(exception: any, host: ArgumentsHost): Promise<void> {
    const responseStrategy = new FastifyResponseStrategy(host)

    const joiExceptionFilter = new JoiExceptionFilter(responseStrategy)
    if (joiExceptionFilter.shouldHandle(exception)) return joiExceptionFilter.handle(exception)

    const httpExceptionFIlter = new HttpExceptionFilter(responseStrategy)
    if (httpExceptionFIlter.shouldHandle(exception)) return httpExceptionFIlter.handle(exception)

    Logger.error('Unknown error', exception)
    responseStrategy.status(HttpStatus.INTERNAL_SERVER_ERROR).notify(new ErrorDTO(HttpStatus.INTERNAL_SERVER_ERROR, ExceptionDTO.withError('Internal Server Error', new ExceptionReasonDTO('Internal Server Error', 'Unknown error', 'Algo deu errado, tente novamente mais tarde'))))
  }
}
