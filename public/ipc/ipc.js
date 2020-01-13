const {ipcMain} = require('electron');

export function expose(
    messageType,
    handler
) {
    ipcMain.on(messageType, async (event, payload) => {
        const {args} = payload;
        try {
            const result = await handler(...args);
            event.sender.send(messageType, {result});
        } catch (error) {
            event.sender.send(messageType, {
                error: {name: error.name || "Error", message: error.message, stack: error.stack},
            })
        }
    })
}