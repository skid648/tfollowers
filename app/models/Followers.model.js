/**
 *  User model
 */

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      logger = require('../../config/logger')

var FollowersSchema = new Schema({

    screen_name: {
        type: String,
        required: 'New user has to have a screen name'
    },
    client: {
        type: String,
        required: 'A client must be set'
    }
})

FollowersSchema.statics.findOrCreate = function findOrCreate (screen_name, client, callback) {
    var follower = new this()

    this.findOne({ screen_name : screen_name, client: client }, function (err, result) {
        if (!result) {

            follower.screen_name = screen_name
            follower.client = client

            follower.save(callback)
        } else {
            callback(err, result)
        }
    })
}

FollowersSchema.statics.deleteOrError = function deleteOrError (screen_name, callback) {
    var follower = new this()

    this.remove({screen_name : screen_name}, function (err, done) {
        if (err) callback(err, null)

        callback(null, done)
    })
}

mongoose.model('Followers', FollowersSchema)
