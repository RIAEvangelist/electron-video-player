var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var player = null;

app.on(
    'window-all-closed',
    function() {
        if (process.platform != 'darwin') {
            app.quit();
        }
    }
);

app.on(
    'ready',
    function() {
        player = new BrowserWindow(
            {
                width: 640,
                height: 480
            }
        );

        player.loadUrl('file://' + __dirname + '/player.html');

        player.openDevTools();

        player.on(
            'closed',
            function() {
                player = null;
            }
        );
    }
);
