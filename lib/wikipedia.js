var Wiki = require('wikijs');
var Promise = require('bluebird');

var Wikipedia = {
  name : 'wikipedia',

  getRandom : function() {
    var wiki = new Wiki();
    var page = wiki.random(1)
    .then(function(pages) {
      return wiki.page(pages[0]);
    });
    var links = page.then(function(page) {
      return page.links();
    });
    var info = page.then(function(page) {
      return page.info();
    });
    return Promise.all([page, links, info])
    .spread(function(page, links, info) {
      return {
        name : page.title,
        links : links,
        info : info
      };
    });
  }
};


module.exports = Wikipedia;