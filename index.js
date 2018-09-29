'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Takes function and arguments, moves the processing to another thread, 
 * and receives the processing result on Promise.
 * @param {Function} function to have retunrn value. 
 * @param {...*} [arguments] arguments
 * @returns {Promise} Returns Processing result as Promise
 */
var wkn = function wkn(func) {
  for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    arg[_key - 1] = arguments[_key];
  }

  var data = 'onmessage = (e) => {\n  new Promise((resolve, reject) => {\n    try{\n      resolve(' + Function('return' + ' ' + func) + '().apply(this, e.data));\n    }catch(e){\n      reject(e);\n    }\n  }).then(res =>{\n    postMessage(res);\n  },err =>{\n    postMessage(\'wknERROR: \' + err.message);\n  });\n}';
  var blob = new Blob([data], {
    type: 'text/javascript'
  });
  var url = window.URL.createObjectURL(blob);
  var worker = new Worker(url);
  worker.postMessage(arg);
  return new Promise(function (resolve, reject) {
    worker.onmessage = function (e) {
      if (e.data.toString().startsWith('wknERROR: ')) {
        reject(e.data.replace('wknERROR: ', ''));
      } else {
        resolve(e.data);
      }
      worker.terminate();
    };
  });
};

exports.default = wkn;