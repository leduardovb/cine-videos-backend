import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import { GenericValidationSchema } from 'src/common/schemas/generic-validation.schema'

@JoiSchemaOptions({ allowUnknown: false })
export class LoginDTO {
  @JoiSchema(GenericValidationSchema.email.required())
  email: string

  @JoiSchema(GenericValidationSchema.password.required())
  password: string
}
