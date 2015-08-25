var request = require('request');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var _ = require('underscore');

var Flickr = require('flickrapi');
var flickrOptions = require('../config/flickr.json');
var flickr;

var strftime = require('strftime');
var randomDate = function () {
  var d = new Date(
    (new Date()) -
    (Math.floor(Math.random() * 365) * 1000 * 60 * 60 * 24)
  );
  return strftime('%Y-%m-%d', d);
};
var pick = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};


var _authenticatedInstance = null;
var authenticate = function() {
  return new Promise(function(resolve, reject) {
    if(_authenticatedInstance) {
      resolve(_authenticatedInstance);
    } else {
      Flickr.authenticate(flickrOptions, function(error, auth) {
        if(error) {
          reject('Error authenticating flickr');
        } else {
          resolve(auth);
        }
      });
    }
  });
};

var extractLargeImage = function(photo, sizes) {
  var image = _.chain(sizes.sizes.size)
    .sortBy(function(obj) { return parseInt(obj.width, 10); })
    .find(function(obj) {
      return obj.width >= 800 || obj.height >= 600;
    })
    .value();

  image = image || sizes.sizes.size[0];

  return image && image.source;
};

var WikiQuote = {
  name : 'wikipedia',

  getRandom : function() {
    return new Promise(function(resolve, reject) {
      return authenticate()
      .then(function(flickr) {
        flickr.interestingness.getList({
          date: randomDate(),
          per_page: 10
        }, function(err, photoResult) {
          if(err) { reject(err); }
          var photo = pick(photoResult.photos.photo);
          flickr.photos.getSizes({
            photo_id : photo.id
          }, function(err, sizes) {
            if(err) { reject(err); }
            var result = {
              link : 'http://www.flickr.com/photos/' + photo.owner + '/' + photo.id,
              title : photo.title,
              imageUrl : extractLargeImage(photo, sizes)
            };
            resolve(result);
          });
        });
      });
    });
  }
};


module.exports = WikiQuote;