const { ipcRenderer } = window;

function sendMessage(messageType, ...args) {
    const responsePromise = new Promise((resolve, reject) => {
        const listener = (event, data) => {
            ipcRenderer.removeListener(messageType, listener);
            if (data.error) {
                const error = Object.assign(Error(data.error.message), {
                    name: data.error.name || "Error",
                    stack: data.error.stack
                });
                reject(error);
            } else if (data.result) {
                resolve(data.result);
            } else {
                resolve()
            }
        };
        ipcRenderer.on(messageType, listener);
    });

    ipcRenderer.send(messageType, {args});
    return responsePromise;
}

async function sendIPCMessage(messageType, message) {
    const {args} = message;
    return sendMessage(messageType, ...args);
}

function subscribeToIPCMessages(messageType, subscribeCallback) {
    ipcRenderer.on(messageType, subscribeCallback);
    const unsubscribe = () => ipcRenderer.removeListener(messageType, subscribeCallback);
    return unsubscribe;
}

function Call(messageType, ...args) {
    sendIPCMessage(messageType, args).then(r => r);

    return new Promise((resolve, reject) => {
        const unsubscribe = subscribeToIPCMessages(messageType, (event, message) => {
            if (!message || typeof message !== 'object') {
                return;
            }

            unsubscribe();

            if (message.error) {
                reject(Error(message.error.message))
            } else {
                resolve(message.result)
            }
        })
    })
}

export {Call}
