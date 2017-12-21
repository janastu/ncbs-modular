define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/themeMenu.html',
  'views/components/socialShare'
], function($, _, Backbone, menuTemplate, SocialShare){

  
  var MenuView = Backbone.View.extend({
    el: $("#themeMenu"),
    events: {
      "change #search-form": "onSearch",
      /*"click a": "onNavClicked",*/
      "mouseover nav li": "onMouseOver",
      "mouseout nav li": "onMouseOut",
      "click #menu-target": "onMenuToggle",
      "click #menu-after-collapse": "onMenuToggle",
      'click .stop-propagation': "onStopPropagation"
    },
    initialize: function(){
      this.ontology = ["identity", "institution-building", "growth", "research", "education",
                        "ripple-effect", "intersections", "sandbox"];
      this.listenTo(ThemesViewInstance.model, "change:theme", this.onNavChange);
      this.activeItem = $(this.el).find("li")[this.ontology.indexOf(ThemesViewInstance.model.get('theme'))];
      this.render();
    },
    render: function(){
      this.$el.html(_.template(menuTemplate)); 

      $(this.activeItem).addClass("active");
      $('[data-toggle="dropdown"]').dropdown();
      this.socialControl = new SocialShare.App();
      this.socialControl.init();
      console.log(this.socialControl);
    },
    //Mouse events for toggling menu images
    onMouseOver: function (event) {
      event.stopPropagation();
      var targetImage = $(event.currentTarget).find('img')[0];
      
      if(targetImage){
        var newSRC = targetImage.dataset.mousein;
        $(event.currentTarget).find('img')[0].src = newSRC;
      }

    },
    onMouseOut: function(event){
      event.stopPropagation();
      console.log(event.currentTarget);
      if(!event.currentTarget.className){
        var targetImage = $(event.currentTarget).find('img')[0];
        var newSRC = targetImage.dataset.mouseout;
        $(event.currentTarget).find('img')[0].src = newSRC;
      }
    },
    //Nav change and click events for maintaining state in the view
    onNavChange: function(model){
      
      //unset previously active item
      this.prevItem = $(this.el).find(".active")[0];
      if(this.prevItem){
        $(this.prevItem).toggleClass("active");
        $(this.prevItem).find('img')[0].src = $(this.prevItem).find('img')[0].dataset.mouseout;
      }
      
  
      //set active icon
      this.activeItem = $(this.el).find("li")[this.ontology.indexOf(model.get('theme'))];
      $(this.activeItem).addClass("active");
      $(this.activeItem).find('img')[0].src = $(this.activeItem).find('img')[0].dataset.mousein;
    },
    onMenuToggle: function(event){
      event.preventDefault();
      ThemesViewInstance.model.set({"menuModal": true});
      $("#menuModal").modal('show');
      /*$('#menuModal .dropdown').on('shown.bs.dropdown', function () {
        $("#modal-search-form").focus()
      });*/
      
    },
    onSearch: function(event){
        event.preventDefault();
        var remoteURL = "http://archives.ncbs.res.in/search?query="
        var queryStr = event.target.value.trim()+"&query_type=keyword&record_types[]=Item&record_types[]=File&record_types[]=Collection&submit_search=Search"
        console.log("changes",event.target.value, event.target, encodeURI(remoteURL+queryStr));
        event.target.value = "";
        window.open(encodeURI(remoteURL+queryStr), "_blank");
    },
    onStopPropagation: function(event){
      event.stopPropagation();
      $("#search-form").focus();
    }

  });

  return MenuView;
  
});