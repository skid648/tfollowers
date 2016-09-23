'use strict'

const passport = require('passport'),
  FacebookStrategy = require('passport-facebook'),
  User = require('mongoose').model('User'),
  config = require('./config'),
  logger = require('./logger')

module.exports = function() {

    passport.use('facebook', new FacebookStrategy({
        clientID: config.facebook.appId,
        clientSecret: config.facebook.appSecret,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
        logger.info(profile)

        User.findOrCreate(profile, accessToken, function (err, user) {
            return cb(err, user)
        })
    }))

    passport.serializeUser(function(user, done) {
        if (user) {
            return done(null, user._id)
        }
    })

    passport.deserializeUser(function(id, done) {
        User.findOne({_id: id}).exec(function(err, user) {
            if (err) {
                console.log('Error loading user: ' + err)
                return
            }

            if (user) {
                return done(null, user)
            }
            else {
                return done(null, false)
            }
        })
    })
}
