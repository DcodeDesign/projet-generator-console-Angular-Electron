var electronInstaller = require('electron-winstaller');
// In this case, we can use relative paths
var settings = {
// Specify the folder where the built app is located
    appDirectory: './app-win',
// Specify the existing folder where
    outputDirectory: './app-installer',
// The name of the Author of the app (the name of your company)
    authors: 'Test',
// The name of the executable of your built
    exe: './app.exe',
    description: 'My App',
    noMsi: false
};
resultPromise = electronInstaller.createWindowsInstaller(settings);
resultPromise.then((resp) => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});
