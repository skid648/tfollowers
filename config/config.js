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
    db: 'mongodb://localhost/your-db',
    facebook: {
        appId: "xxxxxxxxxxxxx"  || process.env.FACEBOOK_APP_ID,
        appSecret: "xxxxxxxxxxxxx" || process.env.FACEBOOK_APP_SECRET
    },
    twitter: {
        consumer_key:         "xxxxxxxxxxxxx" || process.env.TWITTER_CONSUMER_KEY,
        consumer_secret:      "xxxxxxxxxxxxx" || process.env.TWITTER_CONSUMER_SECRET,
        access_token_key:         "xxxxxxxxxxxxx" || process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret:  "xxxxxxxxxxxxx" || process.env.TWITTER_ACCESS_TOKEN_SECRET
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
        appId: "xxxxxxxxxxxxx"  || process.env.FACEBOOK_APP_ID,
        appSecret: "xxxxxxxxxxxxx" || process.env.FACEBOOK_APP_SECRET
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
        appId: "xxxxxxxxxxxxx"  || process.env.FACEBOOK_APP_ID,
        appSecret: "xxxxxxxxxxxxx" || process.env.FACEBOOK_APP_SECRET
    }
  }
};

module.exports = config[env];
