export const wkn = (func, arg) => {
  const worker = new Worker(window.URL.createObjectURL(new Blob([
    `onmessage = (e) => {
new Promise((resolve, reject) => {
  try{
    resolve(${Function(`return${' '}${func}`)}()(e.data));
  }catch(e){
    reject(e);
  }
}).then(res=>{
  postMessage(res);
},err=>{
  postMessage(JSON.parse(JSON.stringify({wknError: err.message})));
})
}`,
  ], { type: 'text/javascript' })));
  worker.postMessage(arg);
  return new Promise((resolve, reject) => {
    worker.onerror = (e) => {
      reject(e.message);
      worker.terminate();
    };
    worker.onmessage = (e) => {
      if (e.data.wknError) {
        reject(e.data.wknError.toString());
      } else {
        resolve(e.data);
      }
      worker.terminate();
    };
  });
}