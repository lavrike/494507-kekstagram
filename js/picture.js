'use strict';
(function () {
  window.getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  var getComments = function () {
    var number = window.getRandom(1, 3);
    var commentArr = [];

    for (var j = 0; j < number; j++) {
      var randomComment = window.photoComments[window.getRandom(0, window.photoComments.length)];
      commentArr.push(randomComment);
    }
    return commentArr;
  };
  var getPhotos = function () {
    window.photos = [];
    for (var i = 0; i < 25; i++) {
      var linkForPhoto = 'photos/' + (i + 1) + '.jpg';
      var like = window.getRandom(15, 200);
      var description = window.photoDescriptions[window.getRandom(0, window.photoDescriptions.length)];
      var photoObject = {
        url: linkForPhoto,
        likes: like,
        comments: getComments(),
        description: description,
        index: i
      };
      window.photos.push(photoObject);
    }
    return window.photos;
  };

  window.photos = getPhotos();

  var getPhotoElement = function (photo) {
    var photoTemplate = document.querySelector('#picture')
        .content
        .querySelector('.picture__link');
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__img').dataIndex = photo.index;
    return photoElement;
  };

  var renderPhotos = function () {
    var photoList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.photos.length; i++) {
      fragment.appendChild(getPhotoElement(window.photos[i]));
    }
    photoList.appendChild(fragment);
  };

  renderPhotos();
})();
