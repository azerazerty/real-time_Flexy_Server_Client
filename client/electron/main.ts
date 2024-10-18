import { app, BrowserWindow, Menu, ipcMain, screen } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";

const DEFAULT_WIDTH = 450; // Set your default width
const DEFAULT_HEIGHT = 558; // Set your default height

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

/////functions

function resizeToFullScreen() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  win.setResizable(false); // Ensure resizing is disabled
  win.setFullScreen(false); // If in full screen mode, disable it first

  win.setBounds({
    x: 0,
    y: 0,
    width: width, // Set to screen width
    height: height, // Set to screen height
  });

  win.setFullScreen(true); // Switch to fullscreen mode
}
function resizeToLoginScreen() {
  win.setResizable(false); // Ensure resizing is disabled
  win.setFullScreen(false); // Ensure it's not in full screen mode

  win.setBounds({
    x: (screen.getPrimaryDisplay().workAreaSize.width - DEFAULT_WIDTH) / 2, // Center horizontally
    y: (screen.getPrimaryDisplay().workAreaSize.height - DEFAULT_HEIGHT) / 2, // Center vertically
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  });
}

function createWindow() {
  win = new BrowserWindow({
    darkTheme: true,
    transparent: true,
    // fullscreen: true,
    // fullscreenable: true,
    // resizable: true,
    width: DEFAULT_WIDTH, // Small size for the login page
    height: DEFAULT_HEIGHT,
    resizable: false, // Disable resizing
    icon: path.join(process.env.VITE_PUBLIC, "logo.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true, // Secure environment
      nodeIntegration: false, // Disable Node integration in the renderer
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
Menu.setApplicationMenu(null);

// Register the IPC handler for 'get-network-info'
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
  // return results;

  // Fetch public IP using an external API
  const publicIpResponse = await fetch("https://api.ipify.org?format=json");
  const publicIpData = await publicIpResponse.json();
  return { localInfo: results, publicIp: publicIpData.ip };
});

// Listener for login success event from the renderer process
ipcMain.handle("user-logged-in", () => {
  console.log("login");
  resizeToFullScreen(); // Resize window after login
});
ipcMain.handle("user-logged-out", () => {
  console.log("login out");
  resizeToLoginScreen(); // Resize window after login
});

app.whenReady().then(createWindow);
