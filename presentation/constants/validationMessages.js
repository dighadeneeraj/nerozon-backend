// /constants/validationMessages.js
module.exports = {
  STRING : "must be a string.",
  //NAME VALIDATORS
  NAME_REQUIRED: "Name is required",
  NAME_MIN: "Name should have at least 3 characters",
  NAME_MAX: "Name should not exceed 50 characters",
  //PHONE VALIDATORS
  PHONE_REQUIRED: "phone is required",
  PHONE_INVALID: "phone number is not valid.",

  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Invalid email format",

  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN: "Password must be at least 8 characters",
  PASSWORD_BASE: "Password must contain uppercase, lowercase, number, and special character",
  ROLE_INVALID: "Role must be either 'customer' or 'admin'"
};
