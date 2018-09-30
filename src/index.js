/**
 * Takes function and arguments, moves the processing to another thread, 
 * and receives the processing result on Promise.
 * @param {Function} function to have retunrn value. (Be processed in Web Worker context)
 * @param {...*} [arguments] arguments
 * @returns {Promise} Returns Processing result as Promise
 */
const wkn = (func, ...arg) => {
  const data = `onmessage = (e) => {
  new Promise((resolve, reject) => {
    try{
      resolve(${Function(`return${' '}${func}`)}().apply(this, e.data));
    }catch(e){
      reject(e);
    }
  }).then(res =>{
    postMessage(JSON.parse(JSON.stringify(res)));
  },err =>{
    postMessage('wknERROR: ' + err.message);
  });
}`;
  const blob = new Blob([data], {
    type: 'text/javascript'
  });
  const url = window.URL.createObjectURL(blob);
  const worker = new Worker(url);
  worker.postMessage(arg);
  return new Promise((resolve, reject) => {
    worker.onmessage = (e) => {
      if ((e.data).toString().startsWith('wknERROR: ')) {
        reject(e.data.replace('wknERROR: ', ''));
      } else {
        resolve(e.data);
      }
      worker.terminate();
    };
  });
}

module.exports = wkn;