define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var MenuModel = Backbone.Model.extend({

  	defaults : {
  		active : 'home',
  		menu : [{
        name: "home",
        slug: "#/home"
      },
      {
        name: "about",
        slug: "#/about"
      }],
      themes: [{
        name: "Identity",
        slug: "#/identity/curatorial-note",
        sections: []
      }],
      sandbox: [{
        name: "Peopleplex",
        slug: ""
      }]
  	
  	}

  });

  return MenuModel;

});
