/**
 *  User model
 */

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      logger = require('../../config/logger')

var UserSchema = new Schema({
    name: {
        type: String,
        required: 'New user has to have a name'
    },
    facebookId: {
        type: String,
        required: 'New user has to have a Facebook ID'
    },
    accessToken: {
        type: String,
        required: 'New user has to have an access token'
    }
})

UserSchema.virtual('date')
    .get(function(){
        return this._id.getTimestamp()
    })

UserSchema.statics.findOrCreate = function findOrCreate (profile, accessToken, callback) {
    var user = new this()

    this.findOne({ facebookId : profile.id }, function (err, result) {
        if (!result) {
            logger.info(profile)

            user.name = profile.displayName
            user.facebookId = profile.id
            user.accessToken = accessToken

            logger.info(profile)

            user.save(callback)
        } else {
            callback(err, result)
        }
    })
}

mongoose.model('User', UserSchema)
