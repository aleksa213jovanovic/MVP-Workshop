const joi = require('joi');

const payloadUserAddSchema = joi.object({
  name: joi.string().pattern(new RegExp('^[a-z]+[\_]?[a-z]*$')).required(),
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: joi.string().pattern(new RegExp('[a-zA-Z0-1]+')).required()
})

module.exports.userAddSchema = joi.object({
  userId: joi.string().alphanum().required(),
  payload: payloadUserAddSchema
})

module.exports.UserAddSsnSchema = joi.object({
  ssn: joi.string().pattern(new RegExp('^[0-9]{9}$'))
})