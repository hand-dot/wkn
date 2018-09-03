export const wkn = (func, arg) => {
    const worker = new Worker(window.URL.createObjectURL(new Blob([`onmessage = ${func}`], {
        type: 'text/javascript'
    })));
    worker.postMessage(arg);
    return new Promise((resolve, reject) => {
        worker.onerror = (e) => {
            reject(e.message);
        };
        worker.onmessage = (e) => {
            resolve(e.data);
        };
    });
}