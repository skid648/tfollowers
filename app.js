var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  http = require('http'),
  cookieParser = require('cookie-parser'),
  session = require('express-session');
 const passport = require('passport');



mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.model.js');
models.forEach(function (model) {
  require(model);
});

require('./config/passport')();

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(){});
server.listen(8888);

app.use(cookieParser());
app.use(session({
  secret: 'hg>?+JDFLhgskddf008gjhg',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true,
            user :{
                id: ''
            }
          }
}));
app.use(passport.initialize());
app.use(passport.session());



app.io = io;

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
