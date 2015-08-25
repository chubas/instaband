var request = require('request');
var cheerio = require('cheerio');
var Promise = require('bluebird');

var WikiQuote = {
  name : 'wikipedia',

  getRandom : function() {
    var base = 'http://www.quotationspage.com';
    var url = base + '/random.php3';
    var promise = new Promise(function(resolve, reject) {
      request(url, function (error, response, body) {
        if (error) {
          reject('Error requesting quote');
        } else {
          var $ = cheerio.load(body);
          var result = {
            link : base + $('dt.quote').last().find('a').attr('href'),
            quote : $('dt.quote').last().find('a').text(),
            author: $('dd.author').last().find('b').text()
          };
          resolve(result);
        }
      });
    });
    return promise;
  }
};


module.exports = WikiQuote;