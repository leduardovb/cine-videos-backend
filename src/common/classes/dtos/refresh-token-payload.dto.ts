import { UserTokenEntity } from 'src/common/entities/user-token.entity'

export class RefreshTokenPayloadDTO {
  id: number
  accessToken: string

  constructor(userTokenEntity: UserTokenEntity) {
    this.id = userTokenEntity.userId
    this.accessToken = userTokenEntity.accessToken
  }

  static matchesObject(data: object): boolean {
    if (!data) return false
    const payloadRequiredKeys = ['id', 'accessToken']
    const keys = Object.keys(data)

    if (payloadRequiredKeys.some((key) => !keys.includes(key))) return false
    if (keys.some((key) => !payloadRequiredKeys.includes(key))) return false
    return true
  }
}
