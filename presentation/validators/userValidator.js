const Joi = require("joi");
const { parsePhoneNumberFromString } = require("libphonenumber-js");
const MSG = require('../constants/validationMessages');

const phoneValidation = (value, helpers) => {
  const phoneNumber = parsePhoneNumberFromString(value, 'IN'); // For India
  if (!phoneNumber || !phoneNumber.isValid()) {
    return helpers.error("any.invalid");
  }
  return value; // valid
};

const createUserSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": MSG.STRING,
    "string.min": MSG.NAME_MIN,
    "any.required": MSG.NAME_REQUIRED,
  }),
  email: Joi.string().email().required().messages({
    "string.email": MSG.EMAIL_INVALID,
    "any.required": MSG.EMAIL_REQUIRED,
  }),
  phone: Joi.string().custom(phoneValidation, "Phone Number Validation").required().messages({
    "any.required": MSG.PHONE_REQUIRED,
    "any.invalid": MSG.PHONE_INVALID,
  }),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        MSG.PASSWORD_BASE,
      "any.required": MSG.PASSWORD_REQUIRED,
    }),
  role: Joi.string().valid("customer", "seller", "admin", "support", "delivery", "guest").default("customer")
});


// Export the schema itself, not an object
module.exports = createUserSchema;