var Article = require('./lib/wikipedia');
var Quote = require('./lib/wikiquote');
var Photo = require('./lib/flickr');

var express = require('express');
var app = express();

var http = require('http');
var url = require('url');

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

app.get('/proxy', function(req, res) {
  var proxied = req.query.url;
  var urlParts = url.parse(proxied, true);

  var options = {
    host: urlParts.host,
    path: urlParts.path
  };

  var callback = function(response) {
    if (response.statusCode === 200) {
      res.writeHead(200, {
        'Content-Type': response.headers['content-type']
      });
      response.pipe(res);
    } else {
      res.writeHead(response.statusCode);
      res.end();
    }
  };

  http.request(options, callback).end();
});