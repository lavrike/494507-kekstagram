'use strict';

(function () {

  var renderComments = function (comments) {
    var socialComments = document.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();

    for (var k = 0; k < comments.length; k++) {
      var li = document.createElement('li');
      li.className = 'social__comment social__comment--text';
      var img = document.createElement('img');
      img.className = 'social__picture';
      var randomAvatar = window.getRandom(1, 7);
      img.src = 'img/avatar-' + randomAvatar + '.svg';
      li.appendChild(img);
      li.innerHTML += comments[k];
      fragment.appendChild(li);
    }
    socialComments.appendChild(fragment);
  };

  var renderBigPhoto = function (photo) {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    renderComments(photo.comments);
  };

  var picturesContainer = document.querySelector('.pictures');
  picturesContainer.addEventListener('click', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      renderBigPhoto(window.photos[evt.target.dataIndex]);
    }
  });

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
})();
