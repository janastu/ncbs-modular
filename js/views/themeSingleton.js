define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/themes/identity.html',
  'text!templates/themes/institution-building.html',
  'text!templates/themes/growth.html',
  'text!templates/themes/research.html',
  'text!templates/themes/education.html',
  'text!templates/themes/ripple-effect.html',
  'text!templates/themes/intersection.html',
  'collections/theme/ComponentCollection',
  'collections/theme/storyCollection',
  'text!templates/themes/audioIcon.html',
  'text!templates/themes/audioPlayer.html',
  'text!templates/themes/sliderIconTemplate.html',
  'views/components/slideComponent',
  'bootstrap'
], function($, _, Backbone, identityTemplate, institutionBuilding, growthTemplate,
            researchTemplate, educationTemplate, rippleTemplate, intersectionTemplate, 
            ComponentCollection, storyCollection, audioIconTemplate, audioPlayerTemplate, 
            sliderIconTemplate, ImageSliderView){


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

  //Helper for sorting the items by tags
  // While sorting the order of the tags, we need to check for natural sorting since the tag is a text
  // with numbers marked as order

    function naturalCompare(a, b) {
        var ax = [], bx = [];
        //console.log(a, b);
        a.get('tags')[0].name.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
        b.get('tags')[0].name.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
        
        while(ax.length && bx.length) {
            var an = ax.shift();
            var bn = bx.shift();
            var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
            if(nn) return nn;
        }
            return ax.length - bx.length;
        }
  
  

  var ThemesView = Backbone.View.extend({
  
    events: {
     // "shown.bs.tab a[data-toggle='tab']": "updateRoute"
     "click .nav-pills a[data-toggle='tab']": "updateRoute",
     "click .audio-icon": "onAudioPlayer"
    },
    initialize: function(options){
      this.options = options || {};
     // this.getData();
     // this.listenTo(this.model, "change:theme", this.getData);
      this.listenTo(this.model, "change:theme", this.getData);
      this.listenTo(this.model, "change:section", this.toggleTabs);
      this.listenTo(this.model, "change:section", this.dataSanitizer);
      //this.listenTo(this.model, "change:section", this.updateRoute);
      var self = this;
      this.omekaItems = new storyCollection;
      this.listenTo(self.omekaItems, "reset", self.dataSanitizer);
     // this.listenTo(self.omekaItems, "reset", self.dataSanitizer);
      this.ontology = {
                        'space-for-biology': 'Space', 
                        'science-in-india': 'India',
                        'recognition': 'Recognition',
                        'reflections': 'Reflection',
                        'space-&-autonomy': 'Autonomy',
                        'paper-trails':'Paper',
                        'architecture': 'Arch',
                        'hiring': 'Hiring',
                        'start-ups': 'Startup',
                        'collaborations': 'Collab',
                        'student-selections': 'Students',
                        'scaling': 'Scaling',
                        'applied-toggle': 'Toggle',
                        'area-shifts': 'Shifts',
                        'processes': 'Process',
                        'queries-tools': 'Tool',
                        'building-knowledge': 'Knowledge',
                        'mentorship': 'Mentor',
                        'effects-toll': 'Effect-Toll',
                        'interaction-and-isolation': 'Isolation',
                        'gender-equality': 'Gender',
                        'heirarchy-and-class': 'Hierarchy',
                        'ncbs-community': 'NCBS',
                        'outside-world': 'Outside'  
                       };
      self.themeList = ["identity", "institution-building", "growth", "research", 
                        "education", "ripple-effect", "intersections"];
   
      self.cacheStory = new storyCollection;
     
      self.subView = {};
      self.subView.audios = [];
      self.subView.sliders = [];
      //self.render();

     /* self.cacheStory.fetch({
        cache: true,
        url: "https://jants.cloudant.com/ncbs-narrative/d2dffbc585d35241ec14e22f565eefaa",
        headers: {"Authorization": "Basic amFudHM6c2xvdHMzMzU0"}
      }).then(function (response){
        //console.log(response, this, self,"from then");
        self.cacheStory.set(response.narrative);
        self.dataSanitizer();
      }); */
 
    },
    loading: function() {
      console.log("loading...");
    },
    getData: function(){
       var self = this;
       //this method will be called every time the route param Theme changes
        self.render();
       //request omeka items - requestParam is the id of the collection in omeka
       var requestParam = this.themeList.indexOf(this.model.get('theme'))+1;
       //dynamic url build to request for items
       var requestURL = "https://www.ncbs.res.in/ncbs25/omeka/api/items?collection="+requestParam;
       //console.log(requestURL, this.model.get('theme'), this.themeList.indexOf(this.model.get('theme'))+1);
       //self.audioPlayer = new AudioPlayerView;
       //based on options fetch the api items from omeka server
       self.omekaItems.fetch({
         cache: true,
         url: requestURL
         //headers: {"Authorization": "Basic amFudHM6c2xvdHMzMzU0"}
       }).then(function (response){
          console.log(response, self);
          self.omekaItems.reset(response);
          //self.omekaItems.set(response);
          //console.log(self.omekaItems);
         //self.dataSanitizer();
       }); 
      self.loading();
      
    },
    render: function(){
      //this.getData();
      //console.log(this.omekaItems, "omeka items from render");

      switch(this.model.get('theme')) {
        case 'identity':
          this.$el.html(identityTemplate); 
          break;
        case 'institution-building':
          this.$el.html(institutionBuilding);
          break;
        case 'research':
          this.$el.html(researchTemplate);
          break;
        case 'growth':
          this.$el.html(growthTemplate);
          break;
        case 'education':
          this.$el.html(educationTemplate);
          break;
        case 'ripple-effect':
          this.$el.html(rippleTemplate);
          break;
        case 'intersections':
          this.$el.html(intersectionTemplate);
          break;
        case 'default':
          console.log('default');

      }
      /*if(this.model.get('theme')==='identity'){
        this.$el.html(identityTemplate); 
      } else if(this.model.get('theme')==='institution-building'){
        this.$el.html(institutionBuilding);
      } else if (this.model.get('theme')==='research') {
        this.$el.html(researchTemplate);
      }*/
      
   //   console.log(this.model);
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
      // Images 
      var imageDoms = this.$el.find(".tab-pane.active [data-component='image']");
      console.log(audiosDom, sliderDoms, imageDoms);
      //Iterate thru audio references to find the data
      _.each(audiosDom, function (element) {
        console.log(self.sectionData);
        if(self.sectionData){
          var audioModel = self.sectionData.filter(function (item){
            return item.get('tags')[0].name === $(element).data().tag.trim();
          });
          console.log(audioModel, element, "audio model");
          self.subView.audios.push(new audioIconView({item: audioModel[0], el: $(element)}));
        } else {
          console.log("waiting for data . . .");
        }
      }, self);
      //Iterate to slider references to find the DATA
     // console.log(self.sectionData);
     _.each(sliderDoms, function (element){

        if(self.sectionData){
          var sliderModels = self.sectionData.filter(function (item){
            
            var tagArray = item.get('tags')[0].name.split('-');
            tagArray.pop();
           // console.log(item.get('tags'), tagArray);
            if(tagArray.length === 3){
             // console.log(tagArray.join('-'), $(element).data().tag, tagArray.join('-') === $(element).data().tag, "checker");
              if(tagArray.join('-') === $(element).data().tag.trim()){
                return item;
              }
            }
          });
          console.log(sliderModels, "slider models");
          self.subView.sliders.push(new sliderThumbView({content: sliderModels, el: $(element), thumbnail: sliderModels[0], slider:true}));
          
        }

      }, self);

      // console.log(self.sectionData);
       _.each(imageDoms, function (element){

         if(self.sectionData){
           var imageModel = self.sectionData.filter(function (item){
               if(item.get('tags')[0].name === $(element).data().tag.trim()){
                 return item;
               }
             
           });
           console.log(imageModel, "image model", element);
           self.subView.sliders.push(new sliderThumbView({
            content: imageModel, 
            el: $(element), 
            thumbnail: imageModel[0], 
            slider:false
          }));
           
         }

       }, self);
      console.log(sliderDoms, self.subView);
    },
    dataSanitizer: function () {
      //based on the section, query the omeka collection for media tags
      var self = this;
      self.subView.audios= [];
      self.subView.sliders=[];
      //self.sectionData = this.cacheStory.groupByTags(1)[capitalizeFirstLetter(this.ontology[this.model.get("section")])];
      self.sectionData = this.omekaItems.groupByTags(1)[capitalizeFirstLetter(this.ontology[this.model.get("section")])];
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
    console.log(self.options);
    self.fileurls = [];
    self.getData();
    /*this.model = this.options.model || this.model;
    this.model.set("content", this.options.content);
    this.model.set("total", this.options.content.length);*/
    
    //console.log(self.album, "Albums");
    
  },
  getData: function () {
    var self = this;
      self.options.content.forEach(function (item){
          item.collection.getFileByUrl(item.get('files').url).then(function (response){
          self.fileurls.push(response[0]);
          self.sanitizeData();
      });
    });
      self.render();
      console.log(self.fileurls, "img slider file urls");

    // self.sanitizeData();
  },
  sanitizeData: function() {
    var self = this;
    if(self.options.slider){
      var orderedContent = _.sortBy(self.options.content, function(item){
        return item.get('tags')[0].name.split('-')[3];
        
      }).sort(naturalCompare);
     // orderedContent.sort(naturalCompare);
      console.log(orderedContent, "ordered content");
      self.album = _.compact(orderedContent.map(function(item, index){
                
        var thisfileurl = self.fileurls.filter(function (filesresponse){
                  
          if(filesresponse.item.id === item.get('id')) {
            return filesresponse;
          }
        });

 
        if(thisfileurl.length > 0 ){
          return {
            'src': thisfileurl[0].file_urls.fullsize || '.././imgs/slider.svg', 
            'thumb': thisfileurl[0].file_urls.square_thumbnail || '.././imgs/slider.svg', 
            'subHtml': item.get('element_texts')[1].text || '' + item.get('element_texts')[2].text || '' 
          }
        }
        
      }));

      console.log(self.album, "from slider images");
    } else {

      self.album = _.compact(self.options.content.map(function (item){
        var thisfileurl = self.fileurls.filter(function (filesresponse){
          console.log(filesresponse.item, item.get('id'), "files responser");
          if(filesresponse.item.id === item.get('id')) {
            console.log(filesresponse, "mat hed files");
            return filesresponse;
          }
        });

        if(thisfileurl.length > 0){
          return {
            'src': thisfileurl[0].file_urls.fullsize,  
            'thumb': thisfileurl[0].file_urls.square_thumbnail, 
            'subHtml': item.get('element_texts')[1].text || '' + item.get('element_texts')[2].text || '' 
          }
        }
        
      }));

      console.log(self.album, "from single image");
    }
  },
  render: function(){
    var self = this;
    console.log(self.options, this.$el, "img slider render")
    self.options.thumbnail.collection.getFileByUrl(self.options.thumbnail.get('files').url).then(function (response){
      console.log(response);
      self.$el.html(self.sliderThumbTemplate(response[0]));
      self.sanitizeData();
    }, self);
    console.log("rendering slider thumb", self.options.thumbnail.toJSON());
    
  },
  onClicked: function (event){
    //console.log(event, this);
    var self = this;
    
    console.log(self.album, "on clicked gallery");
    $(this).lightGallery({
        dynamic: true,
        closable: true,
        hash:false,
        dynamicEl: self.album/*[{
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
      self.model = new Backbone.Model;
      self.listenTo(this.model, "change", self.render);
      self.getData();
      //console.log(self.file);
      console.log(this.options);
     // self.player = new AudioPlayerView({model: this.model});
      //this.render();
    },
    getData: function () {
      var self = this;
      console.log(self.options, this.$el, "getter for data in audio icon");
      self.options.item.collection.getFileByUrl(self.options.item.get('files').url).then(function (response){
        self.fileurls = response[0].file_urls;
        self.sanitizeData();
      });
    },
    sanitizeData: function (){
      var modelMaker = {};
      modelMaker.url = this.fileurls.original;
      modelMaker.description = this.options.item.get('element_texts')[1].text;
      modelMaker.rights = this.options.item.get('element_texts')[2].text;
      console.log(modelMaker);
      this.model.set(modelMaker);
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
