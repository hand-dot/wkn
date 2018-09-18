export const wkn = (func, arg) => {
    const funcStr = Function('return' + (func).toString());
    const worker = new Worker(window.URL.createObjectURL(new Blob([
        `onmessage = (e) => {
            postMessage(${funcStr}()(e.data));
        }`
    ], { type: 'text/javascript' })));
    worker.postMessage(JSON.parse(JSON.stringify(arg)));
    return new Promise((resolve, reject) => {
        worker.onerror = (e) => {
            reject(e.message);
        };
        worker.onmessage = (e) => {
            resolve(e.data);
        };
    });
}