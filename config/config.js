var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'socital'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/yourdatabase',
    facebook: {
        appId: "#######"  || process.env.FACEBOOK_APP_ID,
        appSecret: "########" || process.env.FACEBOOK_APP_SECRET
    },
    twitter: {
        consumer_key:         "########" || process.env.TWITTER_CONSUMER_KEY,
        consumer_secret:      "########" || process.env.TWITTER_CONSUMER_SECRET,
        access_token_key:         "#######" || process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret:  "########" || process.env.TWITTER_ACCESS_TOKEN_SECRET
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'socital'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/socital-test',
    facebook: {
        appId: "1588555561447103"  || process.env.FACEBOOK_APP_ID,
        appSecret: "7be01cdcf2dda0d5b787b996840b348a" || process.env.FACEBOOK_APP_SECRET
    }
  },

  production: {
    root: rootPath,
    app: {
      name: 'socital'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/socital-production',
    facebook: {
        appId: "1588555561447103"  || process.env.FACEBOOK_APP_ID,
        appSecret: "7be01cdcf2dda0d5b787b996840b348a" || process.env.FACEBOOK_APP_SECRET
    }
  }
};

module.exports = config[env];
