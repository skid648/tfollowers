'use strict'


var Followers = require('mongoose').model('Followers')

exports.getFollowers = function(req,res){
    var client_id = req.query.id;
    Followers.findOrCreate({client:client_id},function(err, client) {
      console.log(client);
        if (err) return res.status(500).send(err)
    })
    res.render('showFollowers',{
        title: 'Get twitter followers',
        instructions: 'input a valid twitter screen name'
  })
}
