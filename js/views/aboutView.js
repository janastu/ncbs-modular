define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/aboutTemplate.html',
  'youTubeIFrame'
], function($, _, Backbone, aboutTemplate, YT){

  var AboutView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){
      this.render();
    },
    render: function(){
      console.log(YT);
     
      this.$el.html(aboutTemplate); 
      
    }

  });

  return AboutView;
  
});