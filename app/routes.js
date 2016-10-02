/**
* Main application routes
*/

'use strict'

var twitterImporter = require("./controllers/import/index").get;
var input = require("./controllers/input/index").get;

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  auth = require('../config/auth')



module.exports = function (app) {

  app.use('/', router)
     .use('/input',function(req,res){
       if(!req.session.cookie.user.id){
         //res.redirect('/')
         req.io = app.io;
         input(req,res)
       }else{
         req.io = app.io;
         input(req,res)
       }
     })
     .get('/auth/facebook/callback',auth.login,require('./controllers/facebook/index').facebookCallback)
     .post('/import',function(req,res){
       req.io = app.io;
        twitterImporter(req,res);
     })
     .get('/followers',require('./controllers/followers/index').getFollowers);
}

router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Thanasis G. - Socital Assignment'
    })
})
