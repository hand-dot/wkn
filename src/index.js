export const wkn = (func, ...arg) => {
    const data = `onmessage = (e) => {
  new Promise((resolve, reject) => {
    try{
      resolve(${Function(`return${' '}${func}`)}().apply(this, e.data));
    }catch(e){
      reject(e);
    }
  }).then(res =>{
    postMessage(res);
  },err =>{
    postMessage('wknERROR: ' + err.message);
  });
}`;
    const blob = new Blob([data], { type: 'text/javascript' });
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
  };