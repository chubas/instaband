var Article = require('./lib/wikipedia');
var Quote = require('./lib/wikiquote');
var Photo = require('./lib/flickr');

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var respondWithRandom = function(resource, res) {
  resource.getRandom()
  .then(function(result) {
    res.json(result);
  })
  .catch(function() {
    res.status(500).send("Error fetching " + resource.name);
  });
};

app.get('/photo', function(req, res) {
  respondWithRandom(Photo, res);
});

app.get('/quote', function(req, res) {
  respondWithRandom(Quote, res);
});

app.get('/article', function(req, res) {
  respondWithRandom(Article, res);
});

exports.startServer = function(cb) {
  app.listen(process.env.PORT || 3333);
  cb();
};