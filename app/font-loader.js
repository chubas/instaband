var AVAILABLE_FONTS = [
  'Bangers', 'Righteous', 'Comfortaa', 'Special Elite', 'Limelight',
  'Overlock', 'Pirata One', 'Love Ya Like A Sister', 'Crushed', 'Nova Mono', 'Covered By Your Grace'
];

$(function() {
  var root = $('.font-loader-hack');
  AVAILABLE_FONTS.forEach(function(font) {
    console.log('HEAT', font);
    root.append($('<div>TEST</div>').css({
      position: 'absolute',
      fontFamily : font,
      visibility: 'hidden',
      opacity: 0
    }));
  });
});
