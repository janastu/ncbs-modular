define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/themeMenu.html',
  'views/components/socialShare'
], function($, _, Backbone, menuTemplate, SocialShare){
console.log(SocialShare);
  
  var MenuView = Backbone.View.extend({
    el: $("#themeMenu"),
    events: {
      "change #search-form": "onSearch",
      "click a": "onNavClicked"
    },
    initialize: function(){
      this.listenTo(ThemesViewInstance.model, "change:theme", this.onNavChange);
      this.render();
    },
    render: function(){
      this.$el.html(_.template(menuTemplate)); 
      this.socialControl = new SocialShare.App();
      this.socialControl.init();
      console.log(this.socialControl);
    },
    onNavChange: function(event){
      console.log(event, "nav changed");
    },
    onNavClicked: function(event){
      //event.preventDefault();

      console.log(event, event.target, "nav clicked");
    },
    onSearch: function(event){
      event.preventDefault();
      var remoteURL = "https://www.ncbs.res.in/ncbs25/omeka/search?query="
      var queryStr = event.target.value.trim()+"&query_type=keyword&record_types[]=Item&record_types[]=File&record_types[]=Collection&submit_search=Search"
      console.log("changes",event.target.value, encodeURI(remoteURL+queryStr));
      window.open(encodeURI(remoteURL+queryStr), "_self");
    }

  });

  return MenuView;
  
});