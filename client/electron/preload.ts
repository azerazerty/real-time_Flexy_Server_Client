import { ipcRenderer, contextBridge } from "electron";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args)
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },

  // You can expose other APTs you need here.
  // ...
});
// contextBridge.exposeInMainWorld("electronAPI", {
//   getNetworkInfo: async () => {
//     const localInfo = await ipcRenderer.invoke("get-network-info");

//     // Fetch public IP using an external API
//     const publicIpResponse = await fetch("https://api.ipify.org?format=json");
//     const publicIpData = await publicIpResponse.json();

//     return { localInfo, publicIp: publicIpData.ip };
//   },
// });
