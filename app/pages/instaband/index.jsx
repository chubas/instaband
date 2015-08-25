/* jshint node: true */
"use strict";

var React = require("react"),
  _ = require("underscore"),
  Promise = require('bluebird'),
  // List = require("./list"),
  // Modal = require("./modal"),

  dispatcher = require("dispatcher"),
  emitter = require("emitter"),
  constants = require("constants").instaband;
var Canvas = require('./canvas');

var Instaband = React.createClass({
  getInitialState: function() {
    console.log('INITIAL STATE');
    return {
      wiki: null,
      quote: null,
      photo: null
    }
  },

//     componentWillMount: function() {
//         emitter.on(constants.changed, function(todos) {
//             this.setState({ todos: todos });
//         }.bind(this));
//     },

    componentDidMount: function() {
      emitter.on('photo', function(photo) {
        this.setState({
          photoUrl : photo
        })
        console.log('PHOTO loaded>>>', photo);
        this.refs.canvas.loadImage(photo);
      }.bind(this));
      emitter.on('quote', function(quote) {
        this.setState({
          quote : quote
        });
        this.refs.canvas.drawAlbumName(quote);
      }.bind(this));
      emitter.on('article', function(article) {
        this.setState({
          article : article
        });
        this.refs.canvas.drawBandName(article);
      }.bind(this));
    },

//     componentsWillUnmount: function() {
//         emitter.off(constants.all);
//     },

  generate: function() {
    this.refs.canvas.reset();
    $.get('/photo', function(photo) {
      console.log('Dispatching photo');

      dispatcher.dispatch({
        type : 'photo',
        content : photo.imageUrl
      });
    }.bind(this));
    $.get('/quote', function(response) {
      var albumName = _.last(response.quote.split(' '), 5).join(' ');
      console.log('Album name', albumName);
      dispatcher.dispatch({
        type : 'quote',
        content : albumName
      })
    });
    $.get('/article', function(article) {
      var bandName = article.name;
      dispatcher.dispatch({
        type: 'article',
        content: bandName
      })
    });
  },


  render: function() {
    return <div className="editor">
      <div className="container">
        <div className="title">
          INSTABAND
        </div>
      </div>
      <div className="container">
          <Canvas ref="canvas" />
      </div>
      <div className="container">
        <p className="text-center">
          <button type="button"
                  className="generate btn btn-primary btn-large pull-right spacing-top col-md-2 col-md-offset-7"
                  onClick={this.generate}>
            Generate
          </button>
        </p>
      </div>
      <div className="container">
        <div className="info">
          <div className="wiki">
            Wiki page: <span> {this.state.article} </span>
          </div>

          <div className="quote">
            Quote: <span> {this.state.quote} </span>
          </div>

          <div className="photo">
            Photo: <span>{this.state.photoUrl}</span>
          </div>
        </div>
      </div>
    </div>;
  }
});

module.exports = Instaband;