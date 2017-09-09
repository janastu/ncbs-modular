define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/footer/footerTemplate.html'
], function($, _, Backbone, footerTemplate){

  var FooterView = Backbone.View.extend({
    el: $("#footer"),
    initialize: function(){
      this.render();
      this.scroller = new ScrollHelper();
    },
    render: function(){
      this.$el.html(footerTemplate); 
    }

  });

  // Scroll to top helper
     var ScrollHelper = Backbone.View.extend({
      el: "#scroller",
      template: _.template($("#scroll-template").html()),
      events: {
        "click #scroll-to-top": "goToWindowTop"//,
        //"click #scroll-to-bottom": "goToWindowBottom"
      },
      initialize: function(){
        this.render();
        $('[data-toggle="tooltip"]').tooltip();
      },
      render: function () {
        this.$el.html(this.template());
      },
      goToWindowTop: function(event){
        event.preventDefault();
        //console.log(event.currentTarget);
        window.scrollTo(0,0);
      }//,
      /*goToWindowBottom: function(event){
        event.preventDefault();
        //console.log(event.currentTarget);
        window.scrollTo(0,document.body.scrollHeight);
      }*/
     });
  return FooterView;
  
});