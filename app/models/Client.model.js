/**
 *  User model
 */

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      logger = require('../../config/logger')

var ClientSchema = new Schema({
    screen_name: {
        type: String,
        required: 'Client has to have a screen name'
    },
    total_followers: {
        type: String
    },
    imported_followers: {
        type: String
    }
})

ClientSchema.statics.findOrCreate = function findOrCreate (screen_name,total_followers,imported_followers, callback) {
    var client = new this()
    logger.info('schema', screen_name)
    this.findOne({ screen_name : screen_name }, function (err, result) {
        if (!result) {

            client.screen_name = screen_name
            client.total_followers = total_followers
            client.imported_followers = imported_followers
            client.save(callback)

        } else {
            callback(err, result)
        }
    })
}

ClientSchema.statics.findByIdAndUpdate = function findByIdAndUpdate (screen_name,total_followers,imported_followers, callback) {
    var client = new this()
    this.findByIdAndUpdate(screen_name, { imported_followers: imported_followers }, function(err, user) {
      if (err) throw err;
    });
}



mongoose.model('Client', ClientSchema)
