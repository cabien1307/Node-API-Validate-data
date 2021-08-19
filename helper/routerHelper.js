const Joi = require('@hapi/joi')

const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validatorResult = schema.validate({ param: req.params[name] })

        if (validatorResult.error) {
            return res.status(400).json(validatorResult.error)
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}

            req.value.params[name] = req.params[name]
            next()
        }
    }
}

const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body)

        if (validatorResult.error) {
            return res.status(400).json(validatorResult.error)
        } else {
            if (!req.value) req.value = {} //neu chua co req.value thi khoi tao req.value = {}
            
            req.value.body = validatorResult.value
            next()
        }
    }
}



const schemas = {
    // check params id
    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

    // POST PUT user
    userSchema: Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required()
    }),

    // PATCH
    userOptionalSchema: Joi.object({
        firstName: Joi.string().min(2),
        lastName: Joi.string().min(2),
        email: Joi.string().email()
    }),

    // POST desk
    deckSchema: Joi.object({
        name: Joi.string().min(6).required(),
        desc: Joi.string().min(10).required(),
    }),

    // Post
    newDeckSchema: Joi.object({
        name: Joi.string().min(6).required(),
        desc: Joi.string().min(10).required(),
        owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

    // PATCH
    deckOptionalSchema: Joi.object({
        name: Joi.string().min(6),
        desc: Joi.string().min(10),
        owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }),

    // POST
    authSignUpSchema: Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),

    // POST
    authSignInSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),

}

module.exports = {
    validateParam,
    validateBody,
    schemas,
    
}