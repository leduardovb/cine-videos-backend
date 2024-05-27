import { Controller, Get, UseFilters } from '@nestjs/common'
import { ExceptionDTOFilter } from '../filters/exception-dto.filter'
import { BaseService } from '../services/base.service'
import { JWT } from '../decorators/jwt.decorator'

@UseFilters(ExceptionDTOFilter)
@Controller()
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @JWT(false)
  @Get('health-check')
  async healthCheck(): Promise<string> {
    return this.baseService.healthCheck()
  }
}
