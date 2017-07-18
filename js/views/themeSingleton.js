define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/themes/identity.html',
  'collections/theme/ComponentCollection',
  'collections/theme/storyCollection',
  'text!templates/themes/audioIcon.html',
  'text!templates/themes/audioPlayer.html',
  'text!templates/themes/sliderIconTemplate.html',
  'views/components/slideComponent',
  'bootstrap'
], function($, _, Backbone, identityTemplate, ComponentCollection, 
            storyCollection, audioIconTemplate, audioPlayerTemplate, sliderIconTemplate, ImageSliderView){


  //utilities
  function capitalizeFirstLetter(string) {
    if(string){
       return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  function urlParamToArgs(string){
    console.log(string.split('-')[0]);
    return string.split('-')[0].charAt(0).toUpperCase() + string.slice(1)
  }

  var ThemesView = Backbone.View.extend({
  
    events: {
     // "shown.bs.tab a[data-toggle='tab']": "updateRoute"
     "click .nav-tabs a[data-toggle='tab']": "updateRoute",
     "click .audio-icon": "onAudioPlayer"
    },
    initialize: function(options){
      this.options = options || {};
      this.listenTo(this.model, "change:theme", this.render);
      this.listenTo(this.model, "change:section", this.toggleTabs);
      this.listenTo(this.model, "change:section", this.dataSanitizer);
      //this.listenTo(this.model, "change:section", this.updateRoute);
      var self = this;
      this.ontology = {
                        'space-for-biology': 'Space', 
                        'science-in-india': 'India',
                        'recognition': 'Recognition',
                        'reflections': 'Reflection'
                       }
      self.cacheStory = new storyCollection;
      self.subView = {};
      self.subView.audios = [];
      self.subView.sliders = [];
      //self.audioPlayer = new AudioPlayerView;
      //based on options fetch the api items from omeka server

      self.cacheStory.fetch({
        cache: true,
        url: "https://jants.cloudant.com/ncbs-narrative/d2dffbc585d35241ec14e22f565eefaa",
        headers: {"Authorization": "Basic amFudHM6c2xvdHMzMzU0"}
      }).then(function (response){
        //console.log(response, this, self,"from then");
        self.cacheStory.set(response.narrative);
        self.dataSanitizer();
      }); 
    },
    render: function(){
      this.$el.html(identityTemplate); 
      console.log(this.model.get('section'));
      this.toggleTabs();
      this.componentManager();
    },
    toggleTabs: function(){
      this.$el.find('a[href="#'+this.model.get('section')+'"]').tab('show');
      return;
    },
    componentManager: function () {
      var collectionelements=this.$el.find("[data-tag]");
      //collection of components for every theme
      this.componentsCollection = new ComponentCollection;
      _.each(collectionelements, function (item) {
        this.componentsCollection.add($(item).data());
      }, this);
    },
    subViewManager: function() {

      var self = this;
      //Audio player references from the DOM
      var audiosDom = this.$el.find(".tab-pane.active [data-component='audio']");
      // Image slider references from the DOM
      var sliderDoms = this.$el.find(".tab-pane.active [data-component='slide']");
      console.log(audiosDom, sliderDoms);
      //Iterate thru audio references to find the data
      _.each(audiosDom, function (element) {
        //console.log($(element).data());
        if(self.sectionData){
          var audioModel = self.sectionData.filter(function (item){
            return item.get('tags').name === $(element).data().tag;
          });
          self.subView.audios.push(new audioIconView({model: audioModel[0], el: $(element)}));
        } else {
          console.log("waiting for data . . .");
        }
      }, self);
      //Iterate to slider references to find the DATA
     // console.log(self.sectionData);
      _.each(sliderDoms, function (element){

        if(self.sectionData){
          var sliderModels = self.sectionData.filter(function (item){
            
            var tagArray = item.get('tags').name.split('-');
            tagArray.pop();
           // console.log(item.get('tags'), tagArray);
            if(tagArray.length === 3){
             // console.log(tagArray.join('-'), $(element).data().tag, tagArray.join('-') === $(element).data().tag, "checker");
              if(tagArray.join('-') === $(element).data().tag){
                return item;
              }
            }
          });

          self.subView.sliders.push(new sliderThumbView({content: sliderModels, el: $(element), thumbnail: sliderModels[0]}));
          
        }

      }, self);
      console.log(sliderDoms, self.subView);
    },
    dataSanitizer: function () {
      //based on the section, query the omeka collection for media tags
      var self = this;
      self.subView.audios= [];
      self.subView.sliders=[];
      self.sectionData = this.cacheStory.groupByTags(1)[capitalizeFirstLetter(this.ontology[this.model.get("section")])];
      console.log(self.sectionData, capitalizeFirstLetter(this.ontology[this.model.get("section")]));
      this.subViewManager();
    },
    updateRoute: function(event){
      event.preventDefault();
      $(event.currentTarget).tab('show');
      var urlFragmentPath = "", //variable to build url path
      eventEmittedby = event.target.innerText.toLowerCase().trim(), //text of the event target
      urlThemeparam = this.model.toJSON().theme; //current theme from the url
      //url pattern check
      if( eventEmittedby == urlThemeparam || eventEmittedby == ""){
        urlFragmentPath = "/curatorial-note";
      } else {
        urlFragmentPath = "/"+eventEmittedby.split(" ").join("-");
      }
      //build url to navigate
      var finalURL = "#/theme/"+urlThemeparam+urlFragmentPath;
      console.log(this.model.toJSON().theme, finalURL);
      //navigate to built path
      Backbone.history.navigate(finalURL, false);
    },
    onAudioPlayer: function(event){
      event.preventDefault();
      var self=this;
      if(self.audioPlayer){
        self.audioPlayer.closePlayer();
      }
      self.audioPlayer = new AudioPlayerView({model: new Backbone.Model(event.target.dataset)});
      self.audioPlayer.render();
    },
    close: function(){
      this.stopListening(this.model);
    }

  });

var sliderThumbView = Backbone.View.extend({
  sliderThumbTemplate: _.template(sliderIconTemplate),
  events: {
    'click': 'onClicked'
  },
  initialize: function(options){
    var self = this;
    self.options = options || {};
    /*this.model = this.options.model || this.model;
    this.model.set("content", this.options.content);
    this.model.set("total", this.options.content.length);*/
    this.orderedContent = _.sortBy(self.options.content, function(item){
      return item.get('tags').name.split('-')[3];
      
    });
    console.log(this.orderedContent);
    //self.player = new AudioPlayerView({model: this.model});
    this.render();
  },
  render: function(){
    console.log("rendering slider thumb", this.options.thumbnail.toJSON());
    this.$el.html(this.sliderThumbTemplate(this.options.thumbnail.toJSON()));
  },
  onClicked(event){
    console.log(event, this);
    var album = this.orderedContent.map(function(item){
      return {
        'src': item.get('fileurls').fullsize, 
        'thumb': item.get('fileurls').square_thumbnail, 
        'subHtml': item.get('description').text || '' + item.get('rights').text || '' 
      }
    });
    console.log(this.options.content, album);
    $(this).lightGallery({
        dynamic: true,
        closable: true,
        hash:false,
        dynamicEl: album/*[{
            "src": this.options.content[0].toJSON().fileurls.fullsize,
            'thumb': this.options.content[0].toJSON().fileurls.square_thumbnail,
            'subHtml': this.options.content[0].toJSON().description.text
        }, {
            "src": this.options.content[1].toJSON().fileurls.fullsize,
            'thumb': this.options.content[1].toJSON().fileurls.square_thumbnail,
            'subHtml': this.options.content[1].toJSON().description.text
        }, {
            "src": this.options.content[2].toJSON().fileurls.fullsize,
            'thumb': this.options.content[2].toJSON().fileurls.square_thumbnail,
            'subHtml': this.options.content[2].toJSON().description.text
        }]*/
    })
  }
});
  
  var audioIconView = Backbone.View.extend({
    iconTemplate: _.template(audioIconTemplate),
    initialize: function(options){
      var self = this;
      self.options = options || {};
      self.player = new AudioPlayerView({model: this.model});
      this.render();
    },
    render: function(){
      this.$el.html(this.iconTemplate(this.model.toJSON()));
    }
  });

  /*Global audio player view fixed to the bottom of browser view port */

   var AudioPlayerView = Backbone.View.extend({
    id: "audio-player-container", 
    template: _.template(audioPlayerTemplate),

    events: {
      "click .close": "closePlayer"
    },
    initialize: function(options){
      this.options = options || {};
      this.$parent = $('body');
    },
    render: function(){
      this.$el.html(this.template({original: this.model.get('url'), 
                                  description: this.model.get('description') || "", 
                                  rights: this.model.get('rights') || ""}));
      this.$parent.append(this.$el);
      return this;
    },
    closePlayer: function(){
      console.log("closing");
      //event.preventDefault();
      // COMPLETELY UNBIND THE VIEW
          this.undelegateEvents();

          this.$el.removeData().unbind(); 

          // Remove view from DOM
          this.remove();  
          Backbone.View.prototype.remove.call(this);

    }
   });


  

   var imgSliderModel = Backbone.Model.extend({
    defaults: {
      content: [],
      currentIndex: 1,
      total: "",
      currentZoom: 0
    },
    initialize: function() {

    }
   });
   /* ==================================================
   Deprecated View
   ============================================================

   /* The Image slider view
    using http://ignitersworld.com/lab/imageViewer.html 

   var imgSliderView = Backbone.View.extend({
    template: _.template($("#img-slider-template").html()),
    footerTemplate: _.template($("#img-slider-footer").html()),
    captionTemplate: _.template($("#caption-template").html()),
    events: {
      "click .prev": "slideDecrement",
      "click .next": "slideIncrement",
      "click img": "zoomControl"
    },
    initialize: function(options){
      //Image slider view using http://ignitersworld.com/lab/imageViewer.html
      //expects options - el, content(array of objects for imgurls)
      this.options = options || {};
      this.model = this.options.model;
      this.model.set("content", this.options.content);
      this.model.set("total", this.options.content.length);
      this.$el.html(this.template(this.model.toJSON()));
      console.log(this.$('.image-container'), "img container");
      this.viewer = ImageViewer(this.$('.image-container'), {
        zoomOnMouseWheel: false
      });
   
      this.listenTo(this.model, "change:currentIndex", this.render, this);
      this.render();

    },
    render: function(){
      if(this.model.get('currentIndex') > this.model.get('total')) {
        this.model.set('currentIndex', 1);
      } else if( this.model.get('currentIndex')<1) {
        this.model.set('currentIndex', this.model.get('total'));
      }
      this.viewer.load(this.model.get('content')[this.model.get('currentIndex')-1].get('fileurls').square_thumbnail, this.model.get('content')[this.model.get('currentIndex')-1].get('fileurls').original);
      //this.viewer.load(this.model.get('content')[this.model.get('currentIndex')-1].get('fileurls').thumbnail);
      this.$(".featured-img-caption").remove();
      //window.imager = this.model;
      //console.log(this.model.get('content')[this.model.get('currentIndex')-1].get('description').text, this.model.get('content')[this.model.get('currentIndex')-1].get('rights').text);
      this.$el.append(this.captionTemplate({description: this.model.get('content')[this.model.get('currentIndex')-1].get('description'),
                          rights: this.model.get('content')[this.model.get('currentIndex')-1].get('rights') || ""}));
      this.$('.footer-info').remove();
      this.$el.append(this.footerTemplate(this.model.toJSON()));
      this.model.set("total", this.options.content.length);
      //this.viewer.refresh();
      this.$('img').css('max-width', '100%', 'max-height', '100%');
    },
    slideDecrement: function(e){
      this.model.set('currentIndex', this.model.get('currentIndex')-1);
    },
    slideIncrement: function(e){
      this.model.set('currentIndex', this.model.get('currentIndex')+1);
    },
    zoomControl: function(e){
      e.preventDefault();
      //zoom on one click instead of default doubleclick
      this.viewer.zoom(200, {x:500, y:500});
    }
   });
*/
  return ThemesView;

});
