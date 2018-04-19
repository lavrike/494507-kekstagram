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
      description: description
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

renderBigPhoto(photos[3]);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

