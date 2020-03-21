'use strict';

(function () {
  var TIMEOUT = 10000;
  var DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';

  var Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
  };

  var showErrorMessage = function (xhr, onError) {
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания');
    });

    xhr.timeout = TIMEOUT;
  };


  var download = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Code.SUCCESS:
          onSuccess(xhr.response);
          break;
        case Code.BAD_REQUEST:
          onError('В запросе клиента синтаксическая ошибка');
          break;
        case Code.NOT_FOUND:
          onError('Страница не найдена');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    showErrorMessage(xhr, onError);

    xhr.open('GET', DOWNLOAD_URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Code.SUCCESS:
          onSuccess(xhr.response);
          break;
        case Code.BAD_REQUEST:
          onError('В запросе клиента синтаксическая ошибка');
          break;
        case Code.NOT_FOUND:
          onError('Страница не найдена');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    showErrorMessage(xhr, onError);

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };

})();
