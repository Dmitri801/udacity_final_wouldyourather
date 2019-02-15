const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validateRegisterInputs(data) {
  let errors = {};

  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "Username is Required";
  }

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
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password is Required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
