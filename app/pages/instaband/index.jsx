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
      wiki: {
        article : 'random'
      },
      quote : {
        full : 'quote...'
      },
      photo : {
        page : 'some flickr'
      }
    }
  },

//     componentWillMount: function() {
//         emitter.on(constants.changed, function(todos) {
//             this.setState({ todos: todos });
//         }.bind(this));
//     },

    componentDidMount: function() {
      console.log('BINDING ON PHOTO');
      // var dom = $(this.getDOMNode());
      emitter.on('photo', function(photo) {
        console.log('CHANGING STATE', photo);
        this.setState({
          photoUrl : photo
        })
      }.bind(this));
        // dispatcher.dispatch({ type: constants.all });
    },

//     componentsWillUnmount: function() {
//         emitter.off(constants.all);
//     },

  // create: function() {
  //   console.log('CEATING');
  //   this.wiki = {
  //     article: 'skdjlskdj'
  //   }
  //   this.setState({
  //     wiki: {
  //       article : 'wat'
  //     }
  //   });
  //   // this.refs.create.show();
  // },


  generate: function() {
    $.get('/quote', function(response) {

    });
    $.get('/photo', function(photo) {
      console.log('Dispatching photo');

      dispatcher.dispatch({
        type : 'photo',
        content : photo.imageUrl
      });
      this.refs.canvas.loadImage(photo.imageUrl);
    }.bind(this));
    $.get('/article', function(article) {

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
          {this.state.wiki && this.state.wiki.article}
        </div>

        <div className="quote">
          Quote:
          {this.state.quote && this.state.quote.full}
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