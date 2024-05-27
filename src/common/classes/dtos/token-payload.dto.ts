import { UserTokenEntity } from 'src/common/entities/user-token.entity'

export class TokenPayloadDTO {
  id: number
  refreshToken: string
  accessToken: string

  constructor(userToken: UserTokenEntity) {
    this.id = userToken.userId
    this.accessToken = userToken.accessToken
    this.refreshToken = userToken.refreshToken
  }

  static matchesObject(data: object): boolean {
    if (!data) return false
    const payloadRequiredKeys = ['id', 'refreshToken', 'accessToken']
    const keys = Object.keys(data)

    if (payloadRequiredKeys.some((key) => !keys.includes(key))) return false
    return true
  }
}
