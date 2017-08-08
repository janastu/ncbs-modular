// Filename: router.js
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
      // Define some URL routes
      //'projects': 'showProjects',
      //'users': 'showContributors',
      "theme/:name": "themeHandler",
      "theme/:name/": "themeHandler",
      "theme/:name/:section": "themeHandler",
      "theme/:name/:section/": "themeHandler",
      'about': 'about',
     
      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
    //this.currentView = [];
     window.ThemesViewInstance = new ThemesView({
                            el: "#page", 
                            model: new ThemeModel({
                                      "theme": "string", 
                                      "section": "string"
                                    })
                          });

    /*app_router.on('route:showProjects', function(){
   
        // Call render on the module we loaded in via the dependency array
        var projectsView = new ProjectsView();
        projectsView.render();

    });

    app_router.on('route:showContributors', function () {
    
        // Like above, call render but know that this view has nested sub views which 
        // handle loading and displaying data from the GitHub API  
        var contributorsView = new ContributorsView();
    });

*/
    // Unlike the above, we don't call render on this view as it will handle
    // the render call internally after it loads data. Further more we load it
    // outside of an on-route function to have it loaded no matter which page is
    // loaded initially.
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

      this.now = section;
      if(!this.now){
        this.now = "curatorial-note";
      }

      if(ThemesViewInstance.model.get("theme") === theme){
        ThemesViewInstance.model.set({"section": section});
      }

      if( ThemesViewInstance.model.get("menuModal")){
         console.log(ThemesViewInstance.model.get("menuModal"));
         $("#menuModal").modal('toggle');
         ThemesViewInstance.model.set({"menuModal": false});
      }
      ThemesViewInstance.model.set({"theme": theme, "section": section});
    
     // console.log(theme, section, this.Themes, this.now);
    });

    
    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
