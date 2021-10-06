const Joi = require('joi')

const loginSchema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        })
})
const registerSchema = Joi.object({
    nama: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        })
})




module.exports = {loginSchema, registerSchema}