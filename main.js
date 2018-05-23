'use strict';

const {
    app, BrowserWindow
} = require('electron');

const url = require('url');
const path = require('path');
const electronConfig = require('electron-config');
const config = new electronConfig();

if (config.size == 0) {
    config.set('width', 1023);
    config.set('height', 700);
}

let win;

//Create the new application window
function createWindow() {

    win = new BrowserWindow({

        width: config.get('width'),
        height: config.get('height'),
        minWidth: 1023,
        minHeight: 700,
        icon: `file://${__dirname}/dist/favicon.ico`,
        show: false
    });

    if (process.argv[2] == 'live') {

        //Enables hot reload of angular app being served
        win.loadURL('http://localhost:4200/index.html');

    } else {

        //Load the index page of angular build
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));

    }
    
    //Show page content when ready
    win.once('ready-to-show', () => {
        win.show()
    })

    //Opens browser developing tools
    win.webContents.openDevTools();

    //Save window bounds when resizing
    win.on('resize', () => {

        let {
            width, height
        } = win.getBounds();

        config.set('width', width);
        config.set('height', height);

    });

    //Destroy win object when window is closed
    win.on('closed', () => {
        win = null;
    });

    //Hide the electronJS default menu
    win.setMenu(null);

};

//Create window when app is ready
app.on('ready', createWindow);

//Destroy window on Darwin platform
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

//Create new windows on Darwin platform
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});