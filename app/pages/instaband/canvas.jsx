var React = require('react');

module.exports = React.createClass({

  // componentDidMount: function() {
  //   console.log('DID MOUNT');
  //   console.log('Context is:', this.context);
  // },
  getInitialState: function() {
    return {
      src : null
    }
  },

  componentWillMount: function() {
      // this.setState({ todos: todos });
  },

  loadImage : function(imgUrl) {
    console.log('LOADING IMAGE::::');
    var component = this;
    var image = new Image();
    var _canvas = $(this.getDOMNode()).find('canvas').get(0)
    var context = _canvas.getContext('2d');

    image.addEventListener('load', function() {
      console.log('IMAGE LOADED!!!');
      // debugger;
      var $img = this;
      var w = this.width;
      var h = this.height;
      var size = Math.min(w, h);
      var discSize = 520; //OUTPUT_SCALE * size;

      // var bandNameHeight = 30;
      // var bandNameColor = "#000";
      // var bandName = $('#bandname').text();

      // var discNameHeight = 20;
      // var discNameColor = "#000";
      // var discName = $('#discname').text();

      var imgX = 0,
          imgY = 0;

      $(_canvas).attr({width:discSize, height:discSize});

      // var getBandNameWidth = function(text) {
      //   context.save();
      //   context.font = '' + bandNameHeight + 'px "' + bandFontFamily + '"';
      //   var lines = text.split(/\n\r?/);
      //   var widths = $.map(lines, function(line){
      //     return context.measureText(line).width;
      //   });
      //   context.restore();
      //   return Math.max.apply(Math, widths);
      // };

      // var getDiscNameWidth = function(text) {
      //   context.save();
      //   context.font = '' + discNameHeight + 'px "' + discFontFamily + '"';
      //   var lines = text.split(/\n\r?/);
      //   var widths = $.map(lines, function(line){
      //     return context.measureText(line).width;
      //   });
      //   context.restore();
      //   return Math.max.apply(Math, widths);
      // };

      // var bandNameWidth = getBandNameWidth($('#bandname').text());
      // var discNameWidth = getDiscNameWidth($('#discname').text());

      var drawImage = function() {
        // context.save();
        context.drawImage($img, imgX, imgY, size, size, 0, 0, discSize, discSize);
        // context.restore();
      };

      var drawBandName = function() {
        var lines = bandName.split(/\n\r?\s*/);
        context.save();
        context.textBaseline = "top";
        context.fillStyle = bandNameColor;
        context.font = '' + bandNameHeight + "px '" + bandFontFamily + "'";
        $.each(lines, function(index, line){
          context.fillText(line, bandX, bandY + (bandNameHeight * 1.2 * index));
        });
        context.restore();
      };

      var drawDiscName = function() {
        var lines = discName.split(/\n\r?\s*/);
        context.save();
        context.textBaseline = "top";
        context.fillStyle = discNameColor;
        context.font = '' + discNameHeight + "px '" + discFontFamily + "'";
        $.each(lines, function(index, line){
          context.fillText(line, discX, discY + (discNameHeight * 1.2 * index));
        });
        context.restore();
      };

      var drawAll = function() {
        drawImage();
        // drawBandName();
        // drawDiscName();
      };

      // imgX = 0;
      // imgY = 0;
      // bandX = 0;
      // bandY = 0;
      // discX = discSize - discNameWidth;
      // discY = discSize - discNameHeight;

      drawImage();

      // var shouldBeWhite = function(context, x, y, width, height) {
      //   var imageData = context.getImageData(x, y, width, height).data;
      //   var sum = 0;
      //   for(var i = 0; i < imageData.length; i+=4) {
      //     sum += ((imageData[i] + imageData[i+1] + imageData[i+2]) / 3);
      //   }
      //   var avg = sum / (imageData.length / 4);
      //   return avg <= 127.5;
      // };

      // if(shouldBeWhite(context, bandX, bandY, bandNameWidth, bandNameHeight)) {
      //   bandNameColor = "#FFF";
      // }
      // if(shouldBeWhite(context, discX, discY, discNameWidth, discNameHeight)) {
      //   discNameColor = "#FFF";
      // }

      // drawBandName();
      // drawDiscName();

    }, false);

    image.src = '/proxy?url=' + imgUrl;
    // image.src = '/proxy';
    // this.state.src = image.src;
    this.setState({
      src : image.src
    });

  },

  render : function() {
    return <div className="canvas">
      <canvas className="cover" />
      <img src={this.state.src} className="thumb" />
    </div>
  }

});