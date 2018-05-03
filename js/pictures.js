'use strict';

var ENTER_KEY = 13;
var ESC_KEY = 27;

var photoDescriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];
var photoComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.', 'Как можно было поймать такой неудачный момент?!'
];
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getComments = function () {
  var number = getRandom(1, 3);
  var commentArr = [];

  for (var j = 0; j < number; j++) {
    var randomComment = photoComments[getRandom(0, photoComments.length)];
    commentArr.push(randomComment);
  }
  return commentArr;
};

var getPhotos = function () {
  var photos = [];
  for (var i = 0; i < 25; i++) {
    var linkForPhoto = 'photos/' + (i + 1) + '.jpg';
    var like = getRandom(15, 200);
    var description = photoDescriptions[getRandom(0, photoDescriptions.length)];
    var photoObject = {
      url: linkForPhoto,
      likes: like,
      comments: getComments(),
      description: description,
      index: i
    };
    photos.push(photoObject);
  }
  return photos;
};

var photos = getPhotos();

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

var renderComments = function (comments) {
  var socialComments = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();

  for (var k = 0; k < comments.length; k++) {
    var li = document.createElement('li');
    li.className = 'social__comment social__comment--text';
    var img = document.createElement('img');
    img.className = 'social__picture';
    var randomAvatar = getRandom(1, 7);
    img.src = 'img/avatar-' + randomAvatar + '.svg';
    li.appendChild(img);
    li.innerHTML += comments[k];
    fragment.appendChild(li);
  }
  socialComments.appendChild(fragment);
};


var renderPhotos = function () {
  var photoList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(getPhotoElement(photos[i]));
  }
  photoList.appendChild(fragment);
};

renderPhotos();

var renderBigPhoto = function (photo) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  renderComments(photo.comments);
};

var uploadInput = document.querySelector('#upload-file');
var overlaySelector = document.querySelector('.img-upload__overlay');
var formSelector = document.querySelector('img-upload__form');

var imageOpen = function () {
  overlaySelector.classList.remove('hidden');
  document.addEventListener('keydown', imageEscPress);
};

var imageClose = function () {
  overlaySelector.classList.add('hidden');
  formSelector.reset();
  document.removeEventListener('keydown', imageEscPress);
};

var imageEscPress = function (e) {
  if (e.keyCode === ESC_KEY) {
    imageClose();
  }
};

uploadInput.addEventListener('change', function () {
  imageOpen();
  uploadCancel.addEventListener('keydown', imageEscPress);
});

var uploadCancel = document.querySelector('.img-upload__cancel.cancel');
uploadCancel.addEventListener('click', function () {
  imageClose();
});

uploadCancel.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEY) {
    imageClose();
  }
});

uploadCancel.addEventListener('keydown', function (e) {
  if (e.keyCode === ESC_KEY) {
    imageClose();
  }
});

var picturesContainer = document.querySelector('.pictures');
picturesContainer.addEventListener('click', function (evt) {
  if (evt.target.tagName.toLowerCase() === 'img') {
    renderBigPhoto(photos[evt.target.dataIndex]);
  }
});

var cancelButton = document.querySelector('.big-picture__cancel.cancel');
cancelButton.addEventListener('click', function () {
  var bigPhotoSelector = document.querySelector('.big-picture.overlay');
  bigPhotoSelector.classList.add('hidden');
});

var MIN_X = 0;
var MAX_X = 455;
var photoPreview = document.querySelector('.img-upload__preview img');
var effectsList = document.querySelector('.effects__list');
var scale = document.querySelector('.img-upload__scale.scale');
var uploadEffectLevelVal = document.querySelector('.scale__level');

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
  scalePin.style.left = MAX_X + 'px';
  uploadEffectLevelVal.style.width = '100%';
});

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

var line = document.querySelector('.scale__line');
var scalePin = line.children[0];

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

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
