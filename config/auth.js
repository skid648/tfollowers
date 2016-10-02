/**
 * User authentication
 */

 'use strict'

 const passport = require('passport'),
  logger = require('./logger')





 module.exports = {
     login: function (req, res, next) {
       if(!req.session.cookie.user.id){
         var auth = passport.authenticate('facebook', function (err, user) {
            if (err) {
                logger.error('error')
                return next(err)
            }

            if (!user) {
                logger.info('not authorized')
                req.session.error = 'Authentication with Facebook failed.'
                res.redirect('/')
            }

            req.logIn(user, function (err) {
                if (err) return next(err)
                req.session.cookie.user.id = user._id;
                res.redirect('/input')
            })
         })

         auth(req, res, next)
       }else{
         res.redirect('/input')
       }
     },
     logout: function (req, res, next) {
         req.logout()
         res.redirect('/')
     },
     isAuthenticated: function (req, res, next) {
         if (!req.isAuthenticated()) return false
         else return true
     }
 };
