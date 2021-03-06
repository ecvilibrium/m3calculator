const {
  app,
  BrowserWindow,
  Menu
} = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let win;

function createWindow() {
  //Create browser window
  win = new BrowserWindow({
    width: 470,
    height: 600,
  });
  //and load the index.html of the app
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  //Build Main menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  //Emmited when the window is closed.
  win.on('closed', () => {
    win = null;
  });
}
//Create Main Menu template
const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        click() {
          app.quit();
        }
      },
    ]
  }
];
// Open the Devtools & add menu item. if app not in production
if(process.defaultApp === true){
  template.push({
    label: 'Developer Tools',
    submenu: [
      {
      label: 'Toggle DevTools',
      click(item, focusedWindow){
        focusedWindow.toggleDevTools();
      }
    },
    {
      role: 'reload'
    }
    ]
  });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('active', () => {
  if (win === null) {
    createWindow();
  }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
