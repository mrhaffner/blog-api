const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const passport = require('passport');
require('dotenv').config()

//login
//move this to authController
router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, users, info) => {
      if (err) {
        console.error(`error ${err}`);
      }
      if (info !== undefined) {
        console.error(info.message);
        if (info.message === 'bad username') {
          res.status(401).send(info.message);
        } else {
          res.status(403).send(info.message);
        }
      } else {
        req.logIn(users, () => {
            const token = jwt.sign({ id: users.id }, process.env.secret, {
              expiresIn: 60 * 60,
            });
            res.status(200).send({
              auth: true,
              token,
              message: 'user found & logged in',
            });

        });
      }
    })(req, res, next);
  });

//logout
//need to implement this
router.post('/logout', authController.logout_auth)


// router.post(
//     '/signup',
//     passport.authenticate('signup', { session: false }),
//     async (req, res, next) => {
//       res.json({
//         message: 'Signup successful',
//         user: req.user
//       });
//     }
//   );

router.post('/register', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send(info.message);
      } else {
        req.logIn(user, error => {
          console.log(user);
          const data = {
            username: user.username,
          };
          console.log(data);
          User.findOne({
            where: { //this okay?
              username: data.username,
            },
          }).then(() => { //deleted code
                console.log('user created in db');
                res.status(200).send({ message: 'user created' });
              });

        });
      }
    })(req, res, next);
  });

module.exports = router;