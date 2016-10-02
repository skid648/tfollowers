'use strict'

exports.get = function(req,res){

    res.render('twitterRequest',{
        title: 'Get twitter followers',
        instructions: 'input a valid twitter screen name'
  })
}
