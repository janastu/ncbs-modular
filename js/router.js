// Filename: router.js
//Routes is the entry point of the App's business logic
//Params :theme -> Theme name
// : section -> subtheme
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/footer/FooterView',
  'views/aboutView',
  'views/themeMenu',
  'views/themeSingleton',
  'models/theme/ThemeModel'
], function($, _, Backbone, HomeView, FooterView, AboutView, 
            ThemeMenu, ThemesView, ThemeModel) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define  URL routes and params
      "theme/:name": "themeHandler",
      "theme/:name/": "themeHandler",
      "theme/:name/:section": "themeHandler",
      "theme/:name/:section/": "themeHandler",
      'about': 'about',
     
      // Default
      '*actions': 'defaultAction'
    },
    before: function () {

   
      console.log("Before working");
    },
    after: function () {
      $("#page").addClass("animated fadeIn");
      //send page view to google analytics
      var path = Backbone.history.getFragment();
      ga('send', 'pageview', {page: "/" + path});
      console.log("After working");
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
    //ThemesViewInstance is the Global singleton view which handles the 
    //Themes and sub themes
     window.ThemesViewInstance = new ThemesView({
                            el: "#page", 
                            model: new ThemeModel({
                                      "theme": "string", 
                                      "section": "string"
                                    })
                          });

    // Initialize the general Menu and footer view 
    var menu = new ThemeMenu();
    var footerView = new FooterView();

    app_router.on('route:defaultAction', function (actions) {
     
       // We have no matching route, lets display the home page 
        var homeView = new HomeView();
        //homeView.render();
    });
    app_router.on('route:about', function (actions) {
      var aboutPage = new AboutView();
      aboutPage.render();
    });

    app_router.on('route:themeHandler', function (theme, section) {
      //Handle empty section param
      this.now = section;
      if(!this.now){
        this.now = "curatorial-note";
      }
    //Check if the route action is to Change the Tabs in Themes
      if(ThemesViewInstance.model.get("theme") === theme){
        ThemesViewInstance.model.set({"section": section});
      }
    //Check for navigation trigger by State
      if( ThemesViewInstance.model.get("menuModal")){
         console.log(ThemesViewInstance.model.get("menuModal"));
         $("#menuModal").modal('toggle');
         ThemesViewInstance.model.set({"menuModal": false});
      }
      //Set the model of the ThemeViewInstance which will trigger changes
      //in the view component themeSingleton.js
      ThemesViewInstance.model.set({"theme": theme, "section": section});
    
     // console.log(theme, section, this.Themes, this.now);
    });

    
    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
