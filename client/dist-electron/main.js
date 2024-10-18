import { app, BrowserWindow, Menu, ipcMain, screen } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";
const DEFAULT_WIDTH = 450;
const DEFAULT_HEIGHT = 558;
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function resizeToFullScreen() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  win.setResizable(false);
  win.setFullScreen(false);
  win.setBounds({
    x: 0,
    y: 0,
    width,
    // Set to screen width
    height
    // Set to screen height
  });
  win.setFullScreen(true);
}
function resizeToLoginScreen() {
  win.setResizable(false);
  win.setFullScreen(false);
  win.setBounds({
    x: (screen.getPrimaryDisplay().workAreaSize.width - DEFAULT_WIDTH) / 2,
    // Center horizontally
    y: (screen.getPrimaryDisplay().workAreaSize.height - DEFAULT_HEIGHT) / 2,
    // Center vertically
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  });
}
function createWindow() {
  win = new BrowserWindow({
    darkTheme: true,
    transparent: true,
    // fullscreen: true,
    // fullscreenable: true,
    // resizable: true,
    width: DEFAULT_WIDTH,
    // Small size for the login page
    height: DEFAULT_HEIGHT,
    resizable: false,
    // Disable resizing
    icon: path.join(process.env.VITE_PUBLIC, "logo.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      // Secure environment
      nodeIntegration: false
      // Disable Node integration in the renderer
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
Menu.setApplicationMenu(null);
ipcMain.handle("get-network-info", async () => {
  const networkInterfaces = os.networkInterfaces();
  const results = [];
  for (const name of Object.keys(networkInterfaces)) {
    for (const net of networkInterfaces[name]) {
      if (net.family === "IPv4" && !net.internal) {
        results.push({ mac: net.mac, ip: net.address });
      }
    }
  }
  const publicIpResponse = await fetch("https://api.ipify.org?format=json");
  const publicIpData = await publicIpResponse.json();
  return { localInfo: results, publicIp: publicIpData.ip };
});
ipcMain.handle("user-logged-in", () => {
  console.log("login");
  resizeToFullScreen();
});
ipcMain.handle("user-logged-out", () => {
  console.log("login out");
  resizeToLoginScreen();
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
