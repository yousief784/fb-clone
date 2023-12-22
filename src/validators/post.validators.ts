import Joi from "joi";

export const CreatePostValidator: {description: Joi.StringSchema} = {
    description: Joi.string().trim().required(),
}