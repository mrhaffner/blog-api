const bcrypt = require('bcrypt')
// const mongoose = require('mongoose'); ///???and
require('dotenv').config()

const BCRYPT_SALT_ROUNDS = 12;

// const Op = Sequelize.Op; //???

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user'); ///right?

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    (req, username, password, done) => {
      console.log(username);


      try {
        // User.findOne({
        //   where: {
        //     [Op.or]: [ // here
        //       { username}],
        //   },
        // }).then(user => {
        //   if (user != null) {
        //     console.log('username');
        //     return done(null, false, {
        //       message: 'username',
        //     });
        //   }
          bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
            User.create({
              username,
              password: hashedPassword,
            }).then(user => {
              console.log('user created');
              return done(null, user);
            });
          });
        ;
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({username}, //changed
        ).then(user => {
          if (user === null) {
            return done(null, false, { message: 'bad username' });
          }
          bcrypt.compare(password, user.password).then(response => {
            if (response !== true) {
              console.log('passwords do not match');
              return done(null, false, { message: 'passwords do not match' });
            }
            console.log('user found & authenticated');
            return done(null, user);
          });
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.secret, //point of failure
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: { //?
          id: jwt_payload.id,
        },
      }).then(user => {
        if (user) {
          console.log('user found in db in passport');
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);