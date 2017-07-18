define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html',
  'views/home/ephemera'
], function($, _, Backbone, homeTemplate, Ephemera){
 

  var HomeView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){

      this.render();
    },

    render: function(){
      $('.menu li').removeClass('active');
      $('.menu li a[href="#"]').parent().addClass('active');
      this.$el.html(homeTemplate); 
      Ephemera.render();
      $('[data-toggle=dropdown').dropdown();
    }

  });

  return HomeView;
  
});
