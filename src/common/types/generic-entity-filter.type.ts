import * as Joi from 'joi'

export type GenericEntityFilterType<Entity> = { [x in keyof Entity]?: any }

export type GenericEntityDateFilterType<Entity> = { [x in keyof Entity]?: { from: Date; to: Date } }

export type GenericEntitySchemaFilterType<Entity> = { [K in keyof Entity]?: Joi.SchemaLike | undefined }
