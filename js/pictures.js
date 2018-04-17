'use strict';

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
var photos = [];

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var renderPhoto = function (photo) {
  var photoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture__link');
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__img').src = photo.url;

  return photoElement;
};

var renderFragments = function () {
  var photoList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 25; i++) {

    var linkForPhoto = 'photos/' + (i + 1) + '.jpg';
    var like = getRandom(15, 200);
    var description = photoDescriptions[getRandom(0, photoDescriptions.length)];

    var comments = function () {
      var number = getRandom(1, 3);
      var commentArr = [];
      for (var j = 0; j < number; j++) {
        var randomComment = photoComments[getRandom(0, photoComments.length)];
        commentArr.push(randomComment);
      }
      return commentArr;
    };

    var photoObject = {
      url: linkForPhoto,
      likes: like,
      comments: comments(),
      description: description
    };
    photos.push(photoObject);
    fragment.appendChild(renderPhoto(photoObject));
  }

  return photoList.appendChild(fragment);
};

renderFragments();

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var renderBigPhoto = function () {
  bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
  bigPicture.querySelector('.comments-count').textContent = photos[0].comments;
  bigPicture.querySelector('.big-picture__img').src = photos[0].url;
  bigPicture.querySelector('.social__caption').textContent = photos[0].description;

  return bigPicture;
};

renderBigPhoto();

var renderComments = function () {
  var socialComments = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 2; i++) {
    var newLi = document.createElement('li');
    newLi.className = 'social__comment social__comment--text';

    var newAvatar = document.createElement('img');
    newAvatar.className = 'social__picture';
    var randomAvatar = getRandom(1, 7);
    newAvatar.src = 'img/avatar-' + randomAvatar + '.svg';
    newLi.appendChild(newAvatar);
    newLi.innerHTML += photoComments[getRandom(0, photoComments.length)];
    fragment.appendChild(newLi);
  }

  return socialComments.appendChild(fragment);
};

renderComments();

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

