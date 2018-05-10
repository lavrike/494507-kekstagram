'use strict';

(function () {

  var uploadInput = document.querySelector('#upload-file');
  var overlaySelector = document.querySelector('.img-upload__overlay');
  var formSelector = document.querySelector('.img-upload__form');
  var smallPhoto = document.querySelector('.picture__img');
  var smallOverlay = document.querySelector('.big-picture.overlay');

  var imageEscPress = function (e) {
    window.util.isEscEvent(e, imageClose);
  };

  var imageOpen = function () {
    overlaySelector.classList.remove('hidden');
    document.addEventListener('keydown', imageEscPress);
  };

  var imageClose = function () {
    overlaySelector.classList.add('hidden');
    formSelector.reset();
    document.removeEventListener('keydown', imageEscPress);
  };

  var previewOpen = function () {
    smallOverlay.classList.remove('hidden');
    document.addEventListener('keydown', imageEscPress);
  };

  smallPhoto.addEventListener('keydown', function () {
    previewOpen();
    smallPhoto.addEventListener('keydown', imageEscPress);
  });

  uploadInput.addEventListener('change', function () {
    imageOpen();
    uploadCancel.addEventListener('keydown', imageEscPress);
  });

  var uploadCancel = document.querySelector('.img-upload__cancel.cancel');
  uploadCancel.addEventListener('click', function () {
    imageClose();
  });

  uploadCancel.addEventListener('keydown', function (e) {
    window.util.isEnterEvent(e, imageClose);
  });

  uploadCancel.addEventListener('keydown', function (e) {
    window.util.isEscEvent(e, imageClose);
  });


  var cancelButton = document.querySelector('.big-picture__cancel.cancel');
  cancelButton.addEventListener('click', function () {
    var bigPhotoSelector = document.querySelector('.big-picture.overlay');
    bigPhotoSelector.classList.add('hidden');
  });
})();
