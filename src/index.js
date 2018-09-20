export const wkn = (func, arg) => {
    const funcStr = Function(`return${' '}${func}`);
    const worker = new Worker(window.URL.createObjectURL(new Blob([
        `onmessage = async (e) => {
            postMessage(await ${funcStr}()(e.data));
        }`,
    ], { type: 'text/javascript' })));
    worker.postMessage(arg);
    return new Promise((resolve, reject) => {
      worker.onerror = (e) => {
        reject(e.message);
        worker.terminate();
      };
      worker.onmessage = (e) => {
        resolve(e.data);
        worker.terminate();
      };
    });
}