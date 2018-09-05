'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var wkn = exports.wkn = function wkn(func, arg) {
    var worker = new Worker(window.URL.createObjectURL(new Blob(['onmessage = ' + func], {
        type: 'text/javascript'
    })));
    worker.postMessage(arg);
    return new Promise(function (resolve, reject) {
        worker.onerror = function (e) {
            reject(e.message);
        };
        worker.onmessage = function (e) {
            resolve(e.data);
        };
    });
};