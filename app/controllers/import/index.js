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
    getProfile(req.body.userid,req, res);
}

var getProfile = function (userId,req, res) {

    var params = { screen_name: userId }
    // params for twitter user lookup
    client.get('users/lookup', params, function (error, profile, response) {
        //twitter api library get a user from a screen name
        if (!error) {
          //if everything is ok, profile has user stored
            Client.findOrCreate(userId,profile[0].followers_count,0,function(err, client) {
              //store client in database
                if (err) return res.status(500).send(err)
            })
            res.render('progress',{
                title: 'Importing followers',
                instructions: '',
                instruction_type: '',
                count: 0,
                client_name: profile[0].screen_name,
                client_id: profile[0].id_str,
                img_url : profile[0].profile_image_url,
                profile_background_image_url : profile[0].profile_background_image_url_https,
                totalFollowers : profile[0].followers_count

            });
            req.io.sockets.on('connection', function (socket) {
              getFollowers(profile[0],-1,0,req)
            });
            // get followers of user with id profile[0].id_str

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


var getFollowers = function (profile,cursor,counter,req) {
  // function to get followers from twitter api
  console.log("get followers started current cursor is: "+cursor );
  if(cursor != 0){
    // while there are still pages do this
      var params = { user_id: profile.id_str,
                    cursor: cursor,
                    count: 200
                  }
      // params for twitter api followers list
      //req.io.sockets.on('connection', function (socket) {
      client.get('followers/list', params, function (error, followers, response) {
        //rate limited!! should be followers/ids but something doesnt fit that well
          if (!error) {
              var foreachIndex = 0;
              console.log(followers.next_cursor);
              _.forEach(followers.users, function (value, key) {
                  Followers.findOrCreate(value.screen_name, profile.id_str, function (err, follower) {
                      if (err) return res.status(500).send(err)
                      counter++
                      //real time progress;
                      req.io.emit('messages', {'counter': counter , 'totalFollowers': (counter*100)/profile.followers_count});
                      Client.update({screen_name:profile.screen_name}, {imported_followers:counter}, function(err, doc){
                      //if (err) return res.send(500, { error: err });
                    });
                  })
                foreachIndex++
                if(foreachIndex == followers.users.length){
                  console.log('foreach terminated in: '+ foreachIndex+' recurse started with cursor at: '+followers.next_cursor)
                  getFollowers(profile,followers.next_cursor,foreachIndex+counter,req);
                }

              })
          } else {
              logger.error(error)
              return;
          }
      })
    //});
  }else{
    console.log("cursor reached end");
    return;
  }
}
