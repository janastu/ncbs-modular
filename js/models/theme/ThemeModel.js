define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var ThemeModel = Backbone.Model.extend({

  	defaults : {
  		theme : 'string',
  		section : 'image',
  		alias: 'string'
   	}

  });

  return ThemeModel;

});
