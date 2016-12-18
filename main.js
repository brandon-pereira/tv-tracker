var menubar = require('menubar');

var mb = menubar({
	dir: 'app',
	width: 280
});

mb.on('ready', function() {
  console.log('App up and running!');
});
mb.on('after-create-window', function() {
	mb.window.openDevTools();
});