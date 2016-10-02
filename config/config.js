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
    db: 'mongodb://localhost/socital-development',
    facebook: {
        appId: "1588555561447103"  || process.env.FACEBOOK_APP_ID,
        appSecret: "7be01cdcf2dda0d5b787b996840b348a" || process.env.FACEBOOK_APP_SECRET
    },
    twitter: {
        consumer_key:         "raCr6vpkMGirsUzXALRnZQ" || process.env.TWITTER_CONSUMER_KEY,
        consumer_secret:      "JPEf3tBkZ3onm3M3yoEBAgKM6qLLAyccTBaND3e5rY" || process.env.TWITTER_CONSUMER_SECRET,
        access_token_key:         "1969109599-sHJULyhjMfpTW2ppBMVbD8Me6GdaV3gBWocAaLZ" || process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret:  "8qt5TrPyQMnr6ghgrJlaO7Yrt2n42Ug3VolCfcZdc" || process.env.TWITTER_ACCESS_TOKEN_SECRET
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
