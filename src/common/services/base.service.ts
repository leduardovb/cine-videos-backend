import { Injectable } from '@nestjs/common'

@Injectable()
export class BaseService {
  healthCheck() {
    return 'Healthy !'
  }
}
