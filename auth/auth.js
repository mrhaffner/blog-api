const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user'); //point of failure?

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use( //get rid of this
    'signup',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await User.create({ username, password });
    
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
    
                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }
    
                const validate = await user.isValidPassword(password);
    
                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }
    
                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT') //probably don't want it in the URL
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);