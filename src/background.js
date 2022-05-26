"use strict";
import { app, protocol, Menu, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
import "dotenv/config";
import log4js from "log4js";

const childProcess = require("child_process");
const psTree = require("ps-tree");

const isDevelopment = process.env.NODE_ENV !== "production";
const corePath = process.env.CORE_PATH;

const logger = log4js.getLogger();
logger.level = "all";

log4js.configure({
  appenders: {
    out: { type: "stdout" },
    app: { type: "file", filename: "log/application.log" },
  },
  categories: {
    default: { appenders: ["out", "app"], level: "debug" },
  },
});

const pids = [];
const cp = childProcess.exec(corePath);

const cleanup = () => {
  console.log(pids);
  pids.forEach((pid) => {
    try {
      process.kill(pid);
      logger.info("Killed process: " + pid);
    } catch (e) {
      // nice catch
    }
  });
};

const menutemplate = Menu.buildFromTemplate([
  {
    label: "ファイル",
    submenu: [{ role: "close", label: "アプリを終了する" }],
  },
]);

Menu.setApplicationMenu(menutemplate);

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Start log
  logger.info("Start window");

  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Required for Spectron testing
      enableRemoteModule: !!process.env.IS_TEST,

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  cleanup();
  if (process.platform !== "darwin") {
    app.quit();
  }
  logger.info("All window are closed");
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  psTree(cp.pid, (err, children) => {
    logger.info(children);
    children.forEach((child) => {
      pids.push(child.PID);
    });

    if (err) {
      logger.error(err);
    }
  });

  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString()); // eslint-disable-line no-console
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
