/* jshint node:true */
/* global $ */
"use strict";

var _ = require("underscore"),
  emitter = require("emitter"),
  dispatcher = require("dispatcher");

var InstabandStore = function(constants) {

  this._article = null;
  this._quote = null;
  this._image = null;

  dispatcher.register(function(payload) {
    this.set(payload.type, payload.content);
    this._notify(payload.type);
    // switch (payload.type) {
    //   case constants.set:
    //     this._all();
    //     break;

    //   case constants.update:
    //     this._update(payload.content);
    //     break;

    //   case constants.create:
    //     this._create(payload.content);
    //     break;
    // }
  }.bind(this));

  // this._all = function() {
  //   _notify.call(this);
  // }.bind(this);

  // this._update = function(content) {
  //   var found = _.find(this._collection, function(x) { return x.id === content.id; });
  //   for (var name in found)
  //     found[name] = content[name];
  //   _notify.call(this);
  // };

  // this._create = function(content) {
  //   content.id = _.max(this._collection, function(x) { return x.id; }).id + 1;
  //   this._collection.push(content);
  //   _notify.call(this);
  // };


  this._notify = function(key) {
    console.log('NOTIFYING:', key, this.get(key));
    emitter.emit(key, this.get(key));
  };

  this.set = function(key, value) {
    console.log('Setting: ', key, value);
    this[key] = value;
  };

  this.get = function(key) {
    console.log('Getting:', key);
    return this[key];
  };

};

var constants = require('constants').instaband;

module.exports = new InstabandStore(constants);