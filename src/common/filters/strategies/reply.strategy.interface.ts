export interface IReplyStrategy {
  notify(data: any): void
  status(code: number): IReplyStrategy
}
