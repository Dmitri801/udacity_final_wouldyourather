const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({ _id: jwt_payload.id }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        return done(null, false);
      });
    })
  );
};
