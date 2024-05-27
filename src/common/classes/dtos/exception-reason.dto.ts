import { ExceptionMetadataDTO } from './exception-metadata.dto'

export class ExceptionReasonDTO {
  identifier: string
  private description: string
  code: number
  metadata: ExceptionMetadataDTO

  constructor(identifier?: string, description?: string, message?: string, field?: string, code?: number) {
    if (identifier) this.identifier = identifier
    if (description) this.description = description
    if (code) this.code = code
    if (message || field) this.metadata = new ExceptionMetadataDTO(message, field)
  }
}
