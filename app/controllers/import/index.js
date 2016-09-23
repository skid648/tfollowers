'use strict'

const _ = require('lodash')
const logger = require('../../../config/logger')

var Twitter = require('twitter')
var Client = require('mongoose').model('Client')
var Followers = require('mongoose').model('Followers')
var config = require('../../../config/config')

var client = new Twitter({
  consumer_key:         config.twitter.consumer_key,
  consumer_secret:      config.twitter.consumer_secret,
  access_token_key:     config.twitter.access_token_key,
  access_token_secret:  config.twitter.access_token_secret
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
