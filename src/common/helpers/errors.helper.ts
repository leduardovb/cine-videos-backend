import { HttpStatus } from '@nestjs/common'
import { ExceptionReasonDTO } from '../classes/dtos/exception-reason.dto'
import { ExceptionDTO } from '../classes/dtos/exception.dto'

export const UnauthorizedWarning = ExceptionDTO.withWarning('Unauthorized', new ExceptionReasonDTO('Permissions', 'User lacks the required permissions', 'Usuário não tem permissão para acessar o recurso'), HttpStatus.UNAUTHORIZED)
export const ForbiddenWarning = ExceptionDTO.withWarning('Forbidden', new ExceptionReasonDTO('Forbidden', 'Forbidden access', 'Usuário não permissão para acessar este recurso', undefined, HttpStatus.FORBIDDEN), HttpStatus.FORBIDDEN)
export const NotFoundWarning = ExceptionDTO.withWarning('Not Found', new ExceptionReasonDTO('Not found', 'Resource not found', 'Recurso não encontrado', undefined, HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND)
export const InternalServerError = ExceptionDTO.withError('Internal server error', new ExceptionReasonDTO('Unexpected error', 'internal server error', 'Erro inesperado', undefined, HttpStatus.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR)
