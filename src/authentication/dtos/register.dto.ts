import moment from 'moment'
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import { GenericValidationSchema } from 'src/common/schemas/generic-validation.schema'

const MAX_AGE = 100
const MIN_AGE = 18
const MIN_DATE = moment().subtract(MAX_AGE, 'years').toDate()
const MAX_DATE = moment().subtract(MIN_AGE, 'years').toDate()

@JoiSchemaOptions({ allowUnknown: false })
export class RegisterDTO {
  @JoiSchema(GenericValidationSchema.email.required())
  email: string

  @JoiSchema(GenericValidationSchema.password.required())
  password: string

  @JoiSchema(GenericValidationSchema.text.required())
  ownerName: string

  @JoiSchema(GenericValidationSchema.text.required())
  ownerLastName: string

  @JoiSchema(GenericValidationSchema.date.required().min(MIN_DATE).max(MAX_DATE))
  ownerBirthDate: Date
}
