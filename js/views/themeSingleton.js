
//================DOCUMENTATION==================================================
//This file contains all the Views required in the Themes view
//The ThemeSingleton is the global view that listens to 
//Route changes and triggers appropriate methods
//All subviews like Image slider, Audio Player also reside in this file.
//All data is fetched in getData() methods of the views
//All data is formatted in the sanitizeData() methods
//================================================================================

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
  'views/sandBox',
  
  'libs/utilities',
  'gallery',
  'bootstrap'
], function($, _, Backbone, identityTemplate, institutionBuilding, growthTemplate,
            researchTemplate, educationTemplate, rippleTemplate, intersectionTemplate, 
            ComponentCollection, storyCollection, audioIconTemplate, audioPlayerTemplate, 
            sliderIconTemplate, ImageSliderView, SandboxView){


  var ThemesView = Backbone.View.extend({
  
    events: {
     // "shown.bs.tab a[data-toggle='tab']": "updateRoute"
     "click a[data-toggle='tab']": "updateRoute",
     "click .audio-icon": "onAudioPlayer"
    },
    initialize: function(options){
      this.options = options || {};
     // this.getData();
     // this.listenTo(this.model, "change:theme", this.getData);
      this.listenTo(this.model, "change:theme", this.getData);
      this.listenTo(this.model, "change:theme", this.sandboxManager);
      this.listenTo(this.model, "change:section", this.toggleTabs);
      this.listenTo(this.model, "change:section", this.dataSanitizer);
      //this.listenTo(this.model, "change:section", this.updateRoute);
      var self = this;
      this.omekaItems = new storyCollection;
      this.listenTo(self.omekaItems, "reset", self.dataSanitizer);
     // this.listenTo(self.omekaItems, "reset", self.dataSanitizer);
     //this.ontology the Url param and tag relationship settings
     //which will be used to group the data by tags for relevant routes
      this.ontology = {
                        'space-for-biology': 'Space', 
                        'science-in-india': 'India',
                        'recognition': 'Recognition',
                        'reflections': 'Reflection',
                        'space-and-autonomy': 'Autonomy',
                        'paper-trails':'Paper',
                        'architecture': 'Arch',
                        'hiring': 'Hiring',
                        'start-ups': 'Startup',
                        'collaborations': 'Collab',
                        'student-selections': 'Students',
                        'scaling': 'Scaling',
                        'basic-and-applied-toggle': 'Toggle',
                        'areas-and-shifts': 'Shifts',
                        'processes': 'Process',
                        'queries-and-tools': 'Tool',
                        'building-knowledge': 'Knowledge',
                        'mentorship': 'Mentor',
                        'effects-and-toll': 'Effect_Toll',
                        'interaction-and-isolation': 'Isolation',
                        'gender-equality': 'Gender',
                        'hierarchy-and-class': 'Hierarchy',
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
      this.$el.toggleClass("loading");
      return;
    },
    getData: function(){
       var self = this;
        
       //this method will be called every time the route param Theme changes
       if(this.model.get('theme') !== 'sandbox'){
        self.loading();
        //renders the bootstrap tabs for the relevant template
        self.render();
        
        
       //request omeka items - requestParam is the id of the collection in omeka
       //add +9 because the api import plugin has ids starting after 8
       // untill collection id 8 is reserved in ncbs25/omeka from live server
       var requestParam = this.themeList.indexOf(this.model.get('theme'))+9;
       //dynamic url build to request for items
       //var requestURL = "https://www.ncbs.res.in/ncbs25/omeka/api/items?collection="+requestParam;
       var requestURL = "http://archives.ncbs.res.in/api/items?collection="+requestParam;
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
          self.loading();
       }); 
     }
      
      
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
      //Handle Bootstrap tab show and hide 
      this.toggleTabs();
      //Handling of Dynamic Dom elements -> which creates a components collection object
      this.componentManager();
    },
    toggleTabs: function(){
      // Show the relevant tab as per route theme:section param
      this.$el.find('a[href="#'+this.model.get('section')+'"]').tab('show');
      return;
    },
    sandboxManager: function (){
      //Handle Sandbox route
      if(this.model.get('theme') === 'sandbox'){
        this.sandboxView = new SandboxView({section: this.model.get('section')});
      }
    },
    componentManager: function () {
      //Create a backbone collection for all dynamic elements
      // But looks like this collection is not used in the subview Manager
      // need to check if this method is still needed.
      var collectionelements=this.$el.find("[data-tag]");
      //collection of components for every theme
      this.componentsCollection = new ComponentCollection;
      _.each(collectionelements, function (item) {
        this.componentsCollection.add($(item).data());
      }, this);

      console.log(this.componentsCollection, "Components collection");
    },
    subViewManager: function() {
      // Gets all dynamic dom componenets namely audio, image and slides
      //and creates relevant child views
      var self = this;
      //Audio player references from the DOM
      var audiosDom = this.$el.find(".tab-pane.active [data-component='audio']");
      // Image slider references from the DOM
      var sliderDoms = this.$el.find(".tab-pane.active [data-component='slide']");
      // Images 
      var imageDoms = this.$el.find(".tab-pane.active [data-component='image']");
     
     
      //Iterate to slider references to find the DATA
     //console.log(sliderDoms, self.sectionData, this.model.toJSON());
     _.each(sliderDoms, function (element){

        if(self.sectionData){
          var sliderModels = self.sectionData.filter(function (item){
            
            var tagArray = item.get('tags')[0].name.split('-');
            
           // console.log(item.get('tags'), tagArray);
            if(tagArray.length === 3){
              console.log('tag length === 3', tagArray, "No popping needed");
            } else if (tagArray.length > 3){
              console.log('tag length > 3', tagArray, "popping one item");
              tagArray.pop();
              if(tagArray.length > 3){
                console.log('tag length > 4', tagArray, "popping two item");
                tagArray.pop();
              }
            } /*else if (tagArray.length > 4){
              console.log('tag length > 4', tagArray, "popping two item");
              tagArray.splice(3,2);
            }*/ else {
              console.log(tagArray, tagArray.length, 'tag length unknown');
            }

            if(tagArray.join('-') === $(element).data().tag.trim()){
              return item;
            }
          });
          console.log(sliderModels, "slider models", element);
          self.subView.sliders.push(new sliderThumbView({content: sliderModels, el: $(element), thumbnail: sliderModels[0], slider:true}));
          
        } else {
           //self.loading();
          console.log("data unavailable");
        }

      }, self);

      // console.log(self.sectionData);
       _.each(imageDoms, function (element){

         if(self.sectionData){
           var imageModel = self.sectionData.filter(function (item){
             var tagArray = item.get('tags')[0].name.split('-');
             
            // console.log(item.get('tags'), tagArray);
             if(tagArray.length === 3){
               if(tagArray.join('-') === $(element).data().tag.trim()){
                 return item;
               }
             }
               
             
           });
           console.log(imageModel, "image model", element);
           self.subView.sliders.push(new sliderThumbView({
            content: imageModel, 
            el: $(element), 
            thumbnail: imageModel[0], 
            slider:false
          }));
            
         } else {
          console.log("data unavailable");
           //self.loading();
         }

       }, self);
      //console.log(sliderDoms, self.subView);
      // 
      // console.log(audiosDom, sliderDoms, imageDoms);
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
       self.makeGallery();
    },
    makeGallery: function(){
      var self = this;
      //Gallery
      var galleryDom = self.$el.find(".tab-pane.active [data-component='gallery']");
      console.log(galleryDom, "gallery dom");
      if(self.sectionData){
        var galleryItems = self.sectionData.filter(function(item){
          return item.get('tags')[0].name === galleryDom[0].dataset.tag;
        });
        var groupedByMediaType = _.groupBy(galleryItems, function(item){
          return item.get('item_type').name;
        });
        self.subView.sliders.push(new sliderThumbView({content: groupedByMediaType['Still Image'], el: $(galleryDom[0]), thumbnail: groupedByMediaType['Still Image'][0], gallery:true}));
        console.log(galleryItems, groupedByMediaType, "gallery Items");
      }
    },
    dataSanitizer: function () {
      //Group the api data as per sections using the groupByTags api of the collection
      //which will group by the index of the tag split by '-' 
      //0: group by theme, 1:group by Section, 2:group by component, 3: group by order
      
      var self = this;
      self.subView.audios= [];
      self.subView.sliders=[];
      //self.sectionData = this.cacheStory.groupByTags(1)[capitalizeFirstLetter(this.ontology[this.model.get("section")])];
      self.sectionData = this.omekaItems.groupByTags(1)[capitalizeFirstLetter(this.ontology[this.model.get("section")])];
      console.log(self.sectionData, capitalizeFirstLetter(this.ontology[this.model.get("section")]), this.ontology);
      this.subViewManager();
    },
    updateRoute: function(event){
      // Triggered when the tabs are clicked
      //Build url pattern for maintiaing restful states in Themes View
      // this logic controls all url update in Theme navigation level
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

/* Using the Light slider plugin DynamicEl method, the data structure should be in below
format, This view also handles making api calls to Omeka files endpoint to fetch file
urls for each item
 /*[{
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
  },
  getData: function () {
    var self = this;
    //make ajax call to the files end point to get the fileurl
      self.options.content.forEach(function (item){
          item.collection.getFileByUrl(item.get('files').url).then(function (response){
          self.fileurls.push(response[0]);
          self.sanitizeData();
      });
    });
      self.render();
      //console.log(self.fileurls, "img slider file urls");
  },
  sanitizeData: function() {
    // handles data sanitization as required by the Lightslider (vendor) Plugin
    // based on component type image || slide
    var self = this;
    //FIXIT: Lot of repetition code, needs refactor
    if(self.options.slider){
      var orderedContent = _.sortBy(self.options.content, function(item){
        return item.get('tags')[0].name.split('-')[3];
        
      }).sort(naturalCompare);
     // orderedContent.sort(naturalCompare);
      console.log(orderedContent, "ordered content");
      self.album = _.compact(orderedContent.map(function(item, index){
        //console.log(item.get('element_texts')[2].text);
        var thisfileurl = self.fileurls.filter(function (filesresponse){
                  
          if(filesresponse.item.id === item.get('id')) {
            return filesresponse;
          }
        });

 
        if(thisfileurl.length > 0 ){
          return {
            'src': thisfileurl[0].file_urls.fullsize || '.././imgs/slider.svg', 
            'thumb': thisfileurl[0].file_urls.square_thumbnail || '.././imgs/slider.svg', 
            'subHtml': '<p>'+item.get('element_texts')[1].text +'<em>'+ ' '+ item.get('element_texts')[2].text+'</em>' + '</p>'
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
            'subHtml': '<p>'+item.get('element_texts')[1].text + '<em>'+ item.get('element_texts')[2].text  +'</em>' +'</p>'
          }
        }
        
      }));

      console.log(self.album, "from single image");
    }
  },
  render: function(){
    // Render Thumbnail with Caption and icon
    var self = this;
    console.log(self.options, this.$el, "img slider render")
    self.options.thumbnail.collection.getFileByUrl(self.options.thumbnail.get('files').url).then(function (response){
      console.log(response, self.options, "is gallery");
      if(!self.options.gallery){
        self.$el.html(self.sliderThumbTemplate({files: response[0], thumbnail:self.options.thumbnail.toJSON(), gallery:false}));  
      } else {
        self.$el.html(self.sliderThumbTemplate({files: response[0], thumbnail:'imgs/components/slider.svg', gallery: true}));
      }
      
      self.sanitizeData();
    }, self);
    console.log("rendering slider thumb", self.options.thumbnail.toJSON());
    
  },
  onClicked: function (event){
    //pass the album object to the plugin to render 
    //console.log(event, this);
    var self = this;
   // console.log(self.album, "on clicked gallery");
    $(this).lightGallery({
        dynamic: true,
        closable: true,
        hash:false,
        share: false,
        download: false,
        dynamicEl: self.album
    });
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
      var self = this;
      var modelMaker = {};
      modelMaker.url = self.fileurls.original;
      modelMaker.description = self.options.item.get('element_texts')[1].text;
      modelMaker.rights = self.options.item.get('element_texts')[2].text;
      console.log(modelMaker);
      self.model.set(modelMaker);
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
      //Remove view
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

// return the view object -> will be instantiated in the router with el and model
  return ThemesView;

});
