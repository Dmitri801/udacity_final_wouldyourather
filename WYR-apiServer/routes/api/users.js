const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

// Load input validation
const validateRegisterInputs = require("../../auth/validation/register");
const validateLoginInputs = require("../../auth/validation/login");
//@route GET api/users/test
//@desc Tests users route
//@access Public
router.get("/test", (req, res, next) => {
  res.json({
    message: "User Route UP"
  });
});

//@route POST api/users/register
//@desc Registers a new user
//@access Public
router.post("/register", (req, res, next) => {
  const { errors, isValid } = validateRegisterInputs(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    const userName = req.body.userName.replace(/\s/g, "");
    const newUser = {
      userName,
      email: req.body.email,
      password: req.body.password,
      avatar: `https://api.adorable.io/avatars/285/${userName}.png`,
      admin: req.body.admin
    };

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = "That email already exists";
        res.status(400).json(errors);
      } else {
        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (cbErr, hash) => {
            if (cbErr) {
              console.log(cbErr);
            } else {
              newUser.password = hash;
              User.create(newUser)
                .then(registeredUser => {
                  res.json({
                    success: "User Registered!",
                    registeredUser
                  });
                })
                .catch(err => {
                  console.log(err);
                });
            }
          });
        });
      }
    });
  }
});

//@route POST api/users/login
//@desc Lets user login
//@access Public
router.post("/login", (req, res, next) => {
  const { errors, isValid } = validateLoginInputs(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    // Try to find the email of the attempted login
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        // User doesn't exist
        errors.email = "A user with this email doesn't exist";
        res.status(404).json(errors);
      } else {
        bcrypt.compare(req.body.password, user.password, (err, match) => {
          if (match) {
            // User matched
            const jwtPayload = {
              id: user.id,
              email: user.email,
              userName: user.userName,
              admin: user.admin,
              avatar: user.avatar
            };
            // Sign Token
            jwt.sign(
              jwtPayload,
              process.env.secretOrKey,
              {
                expiresIn: "24hr"
              },
              (err, token) => {
                res.json({ success: true, token: `Bearer ${token}` });
              }
            );
          } else {
            errors.password = "Incorrect Email or Password";
            return res.status(400).json(errors);
          }
        });
      }
    });
  }
});

//@route GET api/users/current
//@desc return currently logged in user
//@access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      message: "success",
      user: {
        id: req.user.id,
        userName: req.user.userName,
        email: req.user.email,
        avatar: req.user.avatar
      }
    });
  }
);

module.exports = router;
