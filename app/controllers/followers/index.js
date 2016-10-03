'use strict'


var Followers = require('mongoose').model('Followers')

exports.getFollowers = function(req,res){
    var client_id = req.query.id;
    var client_name = req.query.client_name;
    var followers;
    // Followers.findOrCreate({client:client_id},function(err, client) {
    //   console.log(client);
    //     if (err) return res.status(500).send(err)
    // })

    Followers.find({ 'client': client_id }, 'screen_name', function (err, follower) {
      if (err) return handleError(err);
      followers = follower;
      res.render('showFollowers',{
          title: 'Get twitter followers',
          follower: followers,
          client: client_name
      })
    })


}
