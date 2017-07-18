// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    templates: '../templates',
    bootstrap: 'libs/bootstrap.min',
    imageviewer: 'libs/ImageViewer-master/imageviewer',
    lightbox: 'libs/lightbox2-master/dist/js/lightbox',
    youTubeIFrame: 'https://www.youtube.com/iframe_api?noext'
  },
  shim: {
 
    youTubeIFrame: {
        // Now requirejs expects a YT global variable to be initialized
        // http://requirejs.org/docs/api.html#config-shim
        exports: 'YT'
    },
    underscore: {
                exports: '_'
            },
    backbone : {
        deps: ['underscore', 'jquery']
    },
    bootstrap : {
        deps: ["jquery"]

    },
    imageviewer: {
      deps: ["jquery"],
      exports: 'ImageViewer'
    },
    lightbox: {
      exports: 'Lightbox'
    }
    }

});

require([

  // Load our app module and pass it to our definition function
  'app',

], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});
