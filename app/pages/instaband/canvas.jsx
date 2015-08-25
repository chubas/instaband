var React = require('react');

var ALBUM_SIZE = 520;

module.exports = React.createClass({

  getInitialState: function() {
    return {
      imageSrc : null,
      contextLoaded : null
    }
  },

  componentDidMount: function() {
    this._imageResolver = Promise.defer();
  },

  _getTextWidth : function(text, height, family, context) {
    context.save();
    context.font = '' + height + 'px "' + family + '"';
    var lines = text.split(/\n\r?/);
    var widths = $.map(lines, function(line){
      return context.measureText(line).width;
    });
    context.restore();
    return Math.max.apply(Math, widths);
  },

  reset : function() {
    this.setState(this.getInitialState());
    if(this._context) {
      this._context.clearRect(0, 0, ALBUM_SIZE, ALBUM_SIZE);
    }
    this._context = null;
    this._imageResolver = Promise.defer();
  },

  drawBandName : function(bandName) {
    this.whenImageLoaded()
    .then(function(context) {

      var bandNameColor = "#000";
      var bandFontFamily = 'Arial';
      var bandX = 0, bandY = 0;
      var lines = bandName.split(/\n\r?\s*/);
      // var bandNameWidth = this._getTextWidth()
      var bandNameHeight = 30;

      // context.save();
      context.textBaseline = "top";
      context.fillStyle = bandNameColor;
      context.font = '' + bandNameHeight + "px '" + bandFontFamily + "'";
      $.each(lines, function(index, line){
        context.fillText(line, bandX, bandY + (bandNameHeight * 1.2 * index));
      });
      // context.restore();
    }.bind(this));
  },

  drawAlbumName: function(albumName) {
    this.whenImageLoaded()
    .then(function(context) {
      var albumNameHeight = 20;
      var albumNameColor = "#000";
      var albumFontFamily = 'Arial';
      var albumNameWidth = this._getTextWidth(albumName, albumNameHeight, albumFontFamily, context);
      var albumX = ALBUM_SIZE - albumNameWidth;
      var albumY = ALBUM_SIZE - albumNameHeight;
      var lines = albumName.split(/\n\r?\s*/);
      // context.save();
      context.textBaseline = "top";
      context.fillStyle = albumNameColor;
      context.font = '' + albumNameHeight + "px '" + albumFontFamily + "'";
      $.each(lines, function(index, line){
        context.fillText(line, albumX, albumY + (albumNameHeight * 1.2 * index));
      });
      // context.restore();
    }.bind(this));
  },

  whenImageLoaded : function() {
    return new Promise(function(resolve, reject) {
      if(this._context) {
        resolve(this._context);
      } else {
        resolve(this._imageResolver.promise);
      }
    }.bind(this));
  },

  loadImage : function(imgSrc) {
    var component = this;
    var image = new Image();
    var _canvas = $(this.getDOMNode()).find('canvas').get(0)
    var context = _canvas.getContext('2d');

    image.addEventListener('load', function() {
      var $img = this;
      var w = this.width;
      var h = this.height;
      var size = Math.min(w, h);

      var imgX = 0, imgY = 0;

      if(w > h) {
        imgX = (w - size) / 2;
      } else {
        imgY = (h - size) / 2;
      }

      $(_canvas).attr({
        width : ALBUM_SIZE,
        height : ALBUM_SIZE
      });

      var drawImage = function() {
        // context.save();
        context.drawImage($img, imgX, imgY, size, size, 0, 0, ALBUM_SIZE, ALBUM_SIZE);
        // context.restore();
      };

      drawImage();
      component._imageResolver.resolve(context);
      // resolve(context);
    }, false);

    image.src = '/proxy?url=' + imgSrc;
    this.setState({
      imageSrc : image.src
    });
  },

  render : function() {
    return <div className="canvas">
      <canvas className="cover" />
      <img src={this.state.imageSrc} className="thumb" />
    </div>
  }

});