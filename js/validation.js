'use strict';

(function () {
  var submitForm = document.querySelector('.img-upload__form');

  var inputForTags = document.querySelector('.text__hashtags');
  submitForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (submitForm.checkValidity()) {
      submitForm.submit();
      submitForm.reset();
    }
  });
  // предотвращение закрытия
  inputForTags.addEventListener('input', function (evt) {
    evt.target.setCustomValidity('');
  });

  var inputDoNotClose = function () {
    document.removeEventListener('keydown', imageEscPress);
  };
  inputForTags.addEventListener('focus', inputDoNotClose);

  var textArea = document.querySelector('.text__description');
  textArea.addEventListener('focus', inputDoNotClose);

  inputForTags.addEventListener('change', function (evt) {
    var input = evt.target;
    var inputValue = input.value.trim();
    var tags = inputValue.split(' ');
    if (tags.length > 5) {
      input.setCustomValidity('Не больше 5 тегов');
    }

    var nonrepeatableTags = [];
    for (var i = 0; i < tags.length; i++) {
      if (tags[i][0] !== '#') {
        input.setCustomValidity('Теги должны начинаться с #');
      }
      if (nonrepeatableTags.indexOf(tags[i].toLowerCase()) > -1) {
        input.setCustomValidity('Теги не должны повторяться');
      } else {
        nonrepeatableTags.push(tags[i].toLowerCase());
      }
      if (tags[i].length > 20) {
        input.setCustomValidity('Длина тега должна быть меньше 20 символов');
      }
      if (tags[i].length < 2) {
        input.setCustomValidity('Длина тега должна быть более 1 символа');
      }
    }
  });
})();
