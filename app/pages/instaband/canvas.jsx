var React = require('react');
var Please = require('./util/please');

var pick = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var titleize = function(str) {
  return str.toLowerCase().replace(/(?:^|\s|-)\S/g, function (m) {
    return m.toUpperCase();
  });
};

var ALBUM_SIZE = 520;
var AVAILABLE_FONTS = [
  'Bangers', 'Righteous', 'Comfortaa', 'Special Elite', 'Limelight',
  'Overlock', 'Pirata One', 'Love Ya Like A Sister', 'Crushed', 'Nova Mono', 'Covered By Your Grace'
];

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

      var base = Please.make_color()[0];
      var scheme = pick([
        'mono', 'complement', 'split', 'double', 'analogous', 'triad'
      ]);
      var colors = Please.make_scheme(Please.HEX_to_HSV(base), {
        scheme_type : scheme
      });

      var bandNameColor = colors[0];
      var bandFontFamily = pick(AVAILABLE_FONTS);
      var bandX = Math.random() * 40;
      var bandY = Math.random() * 40;
      var lines = bandName.split(/\n\r?\s*/);
      // var bandNameWidth = this._getTextWidth()
      // Min size based on number of characters in name
      var minSize;
      if(bandName.length < 10) {
        minSize = 60;
      } else if(bandName.length < 20) {
        minSize = 50;
      } else if(bandName.length < 30) {
        minSize = 40;
      } else {
        minSize = 30;
      }
      // Delta proportionally
      var delta = Math.floor(Math.random() * minSize * 0.3)
      var bandNameHeight = Math.floor(Math.random() * delta) + minSize; // Btwn 25 and 40

      console.log('BAND NAME HEIGHT WAS::', bandNameHeight);
      context.save();

      context.shadowColor = colors[1];
      context.shadowOffsetX = Math.floor(Math.random() * 10) - 5; // integer
      context.shadowOffsetY = Math.floor(Math.random() * 10) - 5; // integer
      context.shadowBlur = Math.floor(Math.random() * 5) + 3; // integer
      context.textBaseline = "top";
      context.fillStyle = bandNameColor;
      context.font = '' + bandNameHeight + "px '" + bandFontFamily + "'";
      $.each(lines, function(index, line) {
        context.fillText(line, bandX, bandY + (bandNameHeight * 1.2 * index));
      });
      context.restore();
    }.bind(this));
  },

  drawAlbumName: function(albumName) {
    this.whenImageLoaded()
    .then(function(context) {

      var base = Please.make_color()[0];
      var scheme = pick([
        'mono', 'complement', 'split', 'double', 'analogous', 'triad'
      ]);
      var colors = Please.make_scheme(Please.HEX_to_HSV(base), {
        scheme_type : scheme
      });

      var albumNameColor = colors[0];
      var albumNameHeight = Math.floor(Math.random() * 10) + 20; // btwn 20 and 30
      var albumFontFamily = pick(AVAILABLE_FONTS);
      var albumNameWidth = this._getTextWidth(albumName, albumNameHeight, albumFontFamily, context);
      var albumX = ALBUM_SIZE - albumNameWidth - (Math.random() * 100);
      var albumY = ALBUM_SIZE - albumNameHeight - (Math.random() * 100);
      var lines = titleize(albumName).split(/\n\r?\s*/);

      context.save();

      context.shadowColor = colors[1];
      context.shadowOffsetX = Math.floor(Math.random() * 10) - 5; // integer
      context.shadowOffsetY = Math.floor(Math.random() * 10) - 5; // integer
      context.shadowBlur = Math.floor(Math.random() * 5) + 3; // integer
      context.textBaseline = "top";
      context.fillStyle = albumNameColor;
      context.font = '' + albumNameHeight + "px '" + albumFontFamily + "'";

      $.each(lines, function(index, line){
        context.fillText(line, albumX, albumY + (albumNameHeight * 1.2 * index));
      });
      context.restore();
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
      <canvas className="cover col-centered" />
    </div>
  }

});