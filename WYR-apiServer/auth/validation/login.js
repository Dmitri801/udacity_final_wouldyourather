const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validateLoginInputs(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is Required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email you entered is not valid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is Required";
  }

  if (!Validator.isLength(data.password, { min: 4, max: 60 })) {
    errors.password = "Password must be between 4 to 60 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
