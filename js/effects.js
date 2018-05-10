'use strict';
(function () {
  var MIN_X = 0;
  var MAX_X = 455;

  var photoPreview = document.querySelector('.img-upload__preview img');
  var effectsList = document.querySelector('.effects__list');
  var scale = document.querySelector('.img-upload__scale.scale');
  var uploadEffectLevelVal = document.querySelector('.scale__level');
  var line = document.querySelector('.scale__line');
  var scalePin = line.children[0];

  var getEffectStyle = function (effect, value) {
    switch (effect) {
      case 'chrome': return 'grayscale(' + value + ')';
      case 'sepia': return 'sepia(' + value + ')';
      case 'marvin': return 'invert(' + (value * 100) + '%)';
      case 'phobos': return 'blur(' + Math.round(value * 3) + 'px)';
      case 'heat': return 'brightness(' + (value * 3) + ')';
    }
    return '';
  };

  scalePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var selectedEffectRadio = document.querySelector('input[name="effect"]:checked');
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var coord = {
        x: scalePin.offsetLeft + moveEvt.movementX,
      };
      if (coord.x < MIN_X) {
        coord.x = MIN_X;
      }
      if (coord.x > MAX_X) {
        coord.x = MAX_X;
      }
      scalePin.style.left = coord.x + 'px';
      var effectValue = coord.x / MAX_X;

      uploadEffectLevelVal.style.width = (effectValue * 100) + '%';
      photoPreview.style.filter = getEffectStyle(selectedEffectRadio.value, effectValue);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  effectsList.addEventListener('click', function (evt) {
    if (evt.target.hasChildNodes()) {
      photoPreview.className = 'img-upload__preview';
      photoPreview.className = 'img-upload__preview' + evt.target.className;
      if (photoPreview.classList.contains('effects__preview--none')) {
        scale.classList.add('hidden');
      } else {
        scale.classList.remove('hidden');
      }
    }
    var selectedEffectRadio = document.querySelector('input[name="effect"]:checked');
    scalePin.style.left = MAX_X + 'px';
    uploadEffectLevelVal.style.width = '100%';
    photoPreview.style.filter = getEffectStyle(selectedEffectRadio.value, 1);
  });

})();
