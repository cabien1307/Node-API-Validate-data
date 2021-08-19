const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const { JWT_KEY, auth } = require('../config')
const LocalStrategy = require('passport-local').Strategy
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const FacebookTokenStrategy = require('passport-facebook-token')

const User = require('../models/User')

// Passport JWT
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_KEY
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub)

        if (!user) return done(null, false)
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

// passport local
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email })

        if (!user) return done(null, false)

        const isCorrectPassword = await user.isValidPassword(password)
        if (!isCorrectPassword) return done(null, false)

        return done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

// Passport Goggle
passport.use(new GooglePlusTokenStrategy({
    clientID: auth.google.CLIENT_ID,
    clientSecret: auth.google.CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // check whether this current user exist in db
        const user = await User.findOne({
            authGoogleId: profile.id,
            authType: 'google'
        })

        if (user) return done(null, user)

        // If is a new account
        const newUser = new User({
            authType: 'google',
            email: profile.emails[0].value,
            authGoogleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
        })

        const result = await newUser.save();
        done(null, newUser)

    } catch (error) {
        done(error, false)
    }
}))


// Passport Facebook
passport.use(new FacebookTokenStrategy({
    clientID: auth.facebook.FACEBOOK_CLIENT_ID,
    clientSecret: auth.facebook.FACEBOOK_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
    try {

        // check whether this current user exist in db
        const user = await User.findOne({
            authFacebookId: profile.id,
            authType: 'facebook'
        })

        if (user) return done(null, user)

        // If is a new account
        const newUser = new User({
            authType: 'facebook',
            email: profile.emails[0].value,
            authFacebookId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
        })

        const result = await newUser.save();
        done(null, newUser)

    } catch (error) {
        done(error, false)
    }
}))