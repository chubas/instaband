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
    return <div className="container">

      <div className="cover">
        Album
        <Canvas ref="canvas" />
      </div>
      <div className="info">
        <div className="wiki">
          Wiki page:
          {this.state.article}
        </div>

        <div className="quote">
          Quote:
          {this.state.quote}
        </div>

        <div className="photo">
          Photo:
          {this.state.photoUrl}
        </div>

        <div className="generate">
          <button type="button"
                  className="btn btn-primary pull-right spacing-top"
                  onClick={this.generate}>
            Generate
          </button>
        </div>
      </div>
      {
      // <div className="row">
      //     <div className="col-md-8">
      //         <h2>Todo List</h2>
      //     </div>
      //     <div className="col-md-4">
      //         <button type="button" className="btn btn-primary pull-right spacing-top" onClick={this.create}>New Task</button>
      //     </div>
      // </div>

      // <div className="row">
      //     <div className="col-md-6">
      //         <h3 className="spacing-bottom">Incomplete</h3>
      //         {this.renderList(false)}
      //     </div>
      //     <div className="col-md-6">
      //         <h3 className="spacing-bottom">Complete</h3>
      //         {this.renderList(true)}
      //     </div>
      // </div>
      // <Modal ref="create" />
      }

    </div>;
  }
});

module.exports = Instaband;