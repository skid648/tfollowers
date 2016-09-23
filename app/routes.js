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
     .use('/input',input)
     .get('/login', auth.login)
     .get('/auth/facebook/callback', auth.login, require('./controllers/facebook/index').facebookCallback)
     .post('/import',function(req,res){
        twitterImporter(req,res);
     });
}

router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Thanasis G. - Socital Assignment'
    })
})
