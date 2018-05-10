'use strict';

window.util = (function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEY) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEY) {
        action();
      }
    }
  };
})();
