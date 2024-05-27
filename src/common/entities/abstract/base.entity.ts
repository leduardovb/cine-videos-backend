export abstract class BaseEntity {
  toModel<T extends Partial<BaseEntity>>(...args: any[]): T {
    return Object.assign(this, {} as T)
  }
}
