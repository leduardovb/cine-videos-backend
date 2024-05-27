import Joi from 'joi'

export class GenericValidationSchema {
  static email = Joi.string().email()
  static password = Joi.string().trim().min(6).max(20)
  static text = Joi.string().trim().min(1).max(255)
  static date = Joi.date().iso().min('1900-01-01')
  static number = Joi.number()
}
