define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/themeMenu.html'
], function($, _, Backbone, menuTemplate){

  var MenuView = Backbone.View.extend({
    el: $("#themeMenu"),
    events: {
      "change #search-form": "onSearch"
    },
    initialize: function(){
      this.render();
    },
    render: function(){
      this.$el.html(_.template(menuTemplate)); 
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