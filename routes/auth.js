const express = require('express');
const passport = require('passport');//might go with the signup
const jwt = require('jsonwebtoken');
const router = express.Router();
const authController = require('../controllers/authController')

//login
//move this to authController
router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occurred.');
    
                        return next(error);
                    }
    
                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error);
        
                            const body = { _id: user._id, username: user.username };
                            const token = jwt.sign({ user: body }, 'TOP_SECRET', {expiresIn: '1d'}); //change expire?
        
                            return res.json({ token });
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

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

module.exports = router;