import { UserEntity } from 'src/common/entities/user.entity'

export class TokenPayloadDTO {
  id: number
  email: string

  constructor(user: UserEntity) {
    this.id = user.id
    this.email = user.email
  }

  static matchesObject(data: object): boolean {
    if (!data) return false
    const payloadRequiredKeys = ['id', 'email']
    const keys = Object.keys(data)

    if (payloadRequiredKeys.some((key) => !keys.includes(key))) return false
    return true
  }
}
