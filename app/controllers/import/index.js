'use strict'

const _ = require('lodash')
const logger = require('../../../config/logger')

var Twitter = require('twitter')
var Client = require('mongoose').model('Client')
var Followers = require('mongoose').model('Followers')

var client = new Twitter({
  consumer_key:         'raCr6vpkMGirsUzXALRnZQ',
  consumer_secret:      'JPEf3tBkZ3onm3M3yoEBAgKM6qLLAyccTBaND3e5rY',
  access_token_key:         '1969109599-sHJULyhjMfpTW2ppBMVbD8Me6GdaV3gBWocAaLZ',
  access_token_secret:  '8qt5TrPyQMnr6ghgrJlaO7Yrt2n42Ug3VolCfcZdc',
})


exports.get = function (req, res) {
    console.log("User is given: "+req.body.userid);
    getProfile(req.body.userid, res);
}

var getProfile = function (userId, res) {

    var params = { screen_name: userId }

    client.get('users/lookup', params, function (error, profile, response) {
        if (!error) {
          var zero = 0;
            Client.findOrCreate(userId,profile[0].followers_count,zero,function(err, client) {
                if (err) return res.status(500).send(err)
                // TODO: Print client screen_name
            })

            getFollowers(profile[0].id_str, res)
        } else {
            console.log(error);
            res.render('twitterRequest',{
                title: 'Get twitter followers',
                instructions: error[0].message,
                instruction_type: 'error'
          });
          return;
        }
    })
}


var getFollowers = function (userId, res) {
    var params = { user_id: userId }

    client.get('followers/list', params, function (error, followers, response) {
        if (!error) {
            var counter = 0

            _.forEach(followers.users, function (value, key) {


                Followers.findOrCreate(value.screen_name, userId, function (err, follower) {
                    if (err) return res.status(500).send(err)
                    counter++
                })
            })

            console.log("counter: "+counter);
            res.render('progress',{
                title: 'Importing followers',
                instructions: '',
                instruction_type: '',
                count: counter
            });
        } else {
            logger.error(error)

            return res.status(500).send(error)
        }
    })
}
