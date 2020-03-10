'use strict';

(function () {
  var code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
  };

  var download = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/keksobooking/data';
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/keksobooking';

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case code.SUCCESS:
          onSuccess(xhr.response);
          break;
        case code.BAD_REQUEST:
          onError('В запросе клиента синтаксическая ошибка');
          break;
        case code.NOT_FOUND:
          onError('Страница не найдена');
          break;
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };

})();
