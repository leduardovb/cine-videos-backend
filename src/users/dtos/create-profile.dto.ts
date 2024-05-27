import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import { GenericValidationSchema } from 'src/common/schemas/generic-validation.schema'

@JoiSchemaOptions({ allowUnknown: false })
export class CreateProfileDTO {
  @JoiSchema(GenericValidationSchema.text.required())
  name: string
}
