var express = require('express');
var mongoose = require('mongoose');
var passport  = require('passport');
var config = require('./config/database');
var bodyParser = require('body-parser');
var cors = require('cors');

mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


var app = express();

app.use(cors({origin: '*'}));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use(require('./routes/routes'));

var ApiServer = app.listen(8081, function(){
    var address = ApiServer.address().address;
    var port = ApiServer.address().port;
    console.log('Server Listening Here:'+ address + ':' + port);
});
