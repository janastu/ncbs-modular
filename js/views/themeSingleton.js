
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
  'text!templates/themes/audioGalleryIcon.html',
  'views/components/slideComponent',
  'views/sandBox',
  'libs/utilities',
  'bootstrap'
], function($, _, Backbone, identityTemplate, institutionBuilding, growthTemplate,
            researchTemplate, educationTemplate, rippleTemplate, intersectionTemplate, 
            ComponentCollection, storyCollection, audioIconTemplate, audioPlayerTemplate, 
            sliderIconTemplate, audioGalleryIcon, ImageSliderView, SandboxView){


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
      this.listenTo(this.model, "change:theme change:section", this.navSocialLinks);
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
      // bind animatation events 
      self.$el.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
        function (event) {
          self.$el.toggleClass("animated fadeIn");
         //console.log("end animated", event);
        });

      
      var cssSelector =  {jPlayer: "#jquery_jplayer_N", cssSelectorAncestor: "#jp_container_N"};
      var playerOptions = {
        playlistOptions: {
          autoPlay: true,
          enableRemoveControls: true
        },
        swfPath: "/js/libs/jplayer/jplayer",
        useStateClassSkin: true,
        smoothPlayBar: true,
        supplied: "mp3"
      };
      var playlist = [];
      self.player = new jPlayerPlaylist(cssSelector, playlist, playerOptions);
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
      this.$el.addClass("loading");
      if(this.player.player){
        this.player.player.closePlayer();
      }
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
       var requestURL = "http://stories.archives.ncbs.res.in/api/items?collection="+requestParam;
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
          self.$el.toggleClass("loading");
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
     
     //this.cleanupAnimations();
     // Iterate through the DOM elements and initalize subViews
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
         //console.log(imageModel, "image model", element);
         self.subView.sliders.push(new sliderThumbView({
          content: imageModel, 
          el: $(element), 
          thumbnail: imageModel[0], 
          slider:false
        }));
          
       } else {
        console.log("data unavailable");
         self.loading();
       }

     }, self);

      //Iterate to slider references to find the DATA
     //console.log(sliderDoms, self.sectionData, this.model.toJSON());
     _.each(sliderDoms, function (element){

        if(self.sectionData){
          var sliderModels = self.sectionData.filter(function (item){
            
            var tagArray = item.get('tags')[0].name.split('-');
            
           // console.log(item.get('tags'), tagArray);
            if(tagArray.length === 3){
             // console.log('tag length === 3', tagArray, "No popping needed");
            } else if (tagArray.length > 3){
              //console.log('tag length > 3', tagArray, "popping one item");
              tagArray.pop();
              if(tagArray.length > 3){
                //console.log('tag length > 4', tagArray, "popping two item");
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
           self.loading();
          console.log("data unavailable");
        }

      }, self);

      // console.log(self.sectionData);

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
      if(galleryDom[0]){
        $(galleryDom[0]).html('');
        if(self.sectionData){
          var galleryItems = self.sectionData.filter(function(item){
            return item.get('tags')[0].name === galleryDom[0].dataset.tag;
          });
          var groupedByItemType = _.groupBy(galleryItems, function(item){
            return item.get('item_type').name;
          });
          // For credits fields in images and videos related to issue #161
          if(groupedByItemType['Still Image']){
            var sanitizeItem_type = groupedByItemType['Still Image'].map(function(item){
              if(item.get('element_texts').length<4){
                item.get('element_texts')[2] = {'text': ""};
              } 
              return item; 
            });
            self.subView.sliders.push(new sliderThumbView({
                                                            content: sanitizeItem_type, 
                                                            el: $(galleryDom[0]), 
                                                            thumbnail: sanitizeItem_type[0], 
                                                            gallery:true
                                                          }));
            //console.log(galleryItems, groupedByItemType,  sanitizeItem_type, "gallery Items");
          }
          
          if(groupedByItemType['Sound']){
            var sanitizedSound = groupedByItemType['Sound'].map(function(item){
              if(item.get('element_texts').length<4){
                item.get('element_texts')[2] = {'text': ""};
              } 
              return item; 
            });
            self.subView.audios.push(new audioGalleryIconView({
                                                            content: sanitizedSound, 
                                                            el: $(galleryDom[0])
                                                            
                                                          }));
            //console.log(galleryItems, groupedByItemType, sanitizedSound, "gallery Items");
          }
          
          
        }
      }

    },
    dataSanitizer: function () {
      //NOTE: Group the api data as per sections using the groupByTags api of the collection
      //which will take a number as first argument and group by the index of the tag split at '-' 
      //Index and its meaning ->
      //0: group by theme, 1:group by Section, 
      //2:group by component (either picture slide, audio slide or audio), 
      //3: group by order (order for sliders)
      
      var self = this;
      self.subView.audios= [];
      self.subView.sliders=[];
      //REMOVE: self.sectionData = this.cacheStory.groupByTags(1)[capitalizeFirstLetter(this.ontology[this.model.get("section")])];
      self.sectionData = this.omekaItems.groupByTags(1)[capitalizeFirstLetter(this.ontology[this.model.get("section")])];
      //console.log(self.sectionData, capitalizeFirstLetter(this.ontology[this.model.get("section")]), this.ontology);
      this.subViewManager();
    },
    updateRoute: function(event){
      //Note: Triggered when the tabs are clicked
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
      //Note: build url to navigate
      var finalURL = "#/theme/"+urlThemeparam+urlFragmentPath;
      //console.log(this.model.toJSON().theme, finalURL);
      //close audio player
      if(this.player.player){
        this.player.player.closePlayer();
      }
      
      //navigate to built path
      Backbone.history.navigate(finalURL, {trigger: true });

    },
    navSocialLinks: function(event){
      //update URL in social sharing links
      
        this.socialHook.model.set('readUrl', 
          'http://stories.archives.ncbs.res.in/exhibit/13ways/#/theme/'+
          this.model.get('theme')+'/'+
          this.model.get('section'));
    },
    onAudioPlayer: function(event){
      event.preventDefault();
      var self=this;
      var model = new Backbone.Model(event.target.dataset);
      self.player = new audioGalleryIconView({content: {title: model.get('description') +''+ model.get('rights'), 
                          mp3: model.get('url')
                        }, el: $(event.target), referer: 'inline'});
      self.player.onClicked(event);
      /*self.playlist = [];

      self.playlist.push({title: model.get('description') +''+ model.get('rights'), 
                          mp3: model.get('url')
                        });
      self.player.setPlaylist(self.playlist);*/

      /*if(self.audioPlayer){
        self.audioPlayer.closePlayer();
      }
      self.audioPlayer = new AudioPlayerView({model: new Backbone.Model(event.target.dataset)});
      self.audioPlayer.render();*/
      console.log(self.player, new Backbone.Model(event.target.dataset).toJSON() );
    },
    onFeatured: function(event){
      //BUG: currently buggy due to hardcoding the first slide,
      //which may not be true in all cases
      event.preventDefault();
      this.subView.sliders[0].onClicked();
    },
    cleanupAnimations: function() {
      $("#page").removeClass("animated fadeIn");
    },
    close: function(){
      this.stopListening(this.model);
    }

  });

/*NOTE: http://sachinchoolur.github.io/lightGallery/demos/dynamic.html
Using the Light Gallery jQuery plugin DynamicEl method, the data structure should be in below
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
   // _.bindAll(self, 'onclicked');
   //this.on('click', 'onClicked', self);
    //console.log(self.options);
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
      //console.log(orderedContent, "ordered content");
      self.album = _.compact(orderedContent.map(function(item, index){
        //console.log(item.get('element_texts')[2].text);
        var thisfileurl = self.fileurls.filter(function (filesresponse){
                  
          if(filesresponse.item.id === item.get('id')) {
            return filesresponse;
          }
        });

 
        if(thisfileurl.length > 0 ){
          if(item.get('element_texts').length<4){
            item.get('element_texts')[2] = {'text': ''};

          }
          //console.log(item.get('element_texts')[2].text, self.options, item.toJSON());
          return {
            'src': thisfileurl[0].file_urls.fullsize || '.././imgs/slider.svg', 
            'thumb': thisfileurl[0].file_urls.square_thumbnail || '.././imgs/slider.svg', 
            'subHtml': '<p>'+item.get('element_texts')[1].text + ' <em> ' + ' '+ item.get('element_texts')[2].text+'</em>' + '</p>'
          }
        }
        
      }));

     // console.log(self.album, "from slider images");
    } else {

      self.album = _.compact(self.options.content.map(function (item){
        var thisfileurl = self.fileurls.filter(function (filesresponse){
         // console.log(filesresponse.item, item.get('id'), "files responser");
          if(filesresponse.item.id === item.get('id')) {
            //console.log(filesresponse, "mat hed files");
            return filesresponse;
          }
        });

        if(thisfileurl.length > 0){
          //console.log(item.get('element_texts')[2].text, self.options, item.toJSON());
          return {
            'src': thisfileurl[0].file_urls.fullsize,  
            'thumb': thisfileurl[0].file_urls.square_thumbnail, 
            'subHtml': '<p>'+item.get('element_texts')[1].text + ' <em> ' + item.get('element_texts')[2].text  +'</em>' +'</p>'
          }
        }
        
      }));

      //console.log(self.album, "from single image");
    }
  },
  render: function(){
    // Render Thumbnail with Caption and icon
    var self = this;
    //console.log(self.options, this.$el, "img slider render")
    self.options.thumbnail.collection.getFileByUrl(self.options.thumbnail.get('files').url).then(function (response){
      //console.log(response, self.options, "is gallery");
      if(!self.options.gallery){
        self.$el.html(self.sliderThumbTemplate({files: response[0], thumbnail:self.options.thumbnail.toJSON(), gallery:false}));  
      } else {
        //console.log($.parseHTML(self.sliderThumbTemplate({files: response[0], thumbnail:'imgs/components/slider.svg', text: 'Click to open Image Gallery', gallery: true})), "Image gallery ren");
        self.$el.append($.parseHTML(self.sliderThumbTemplate({files: response[0], thumbnail:'imgs/components/slider.svg', text: 'Image Reserve', gallery: true}))[4]);
      }
      
      self.sanitizeData();
    }, self);
    //console.log("rendering slider thumb", self, self.options.thumbnail.toJSON());
   // self.delegateEvents();
    
  },
  onClicked: function (){
    //pass the album object to the plugin to render 
    //event.preventDefault();
    //console.log(event, this);
    var self = this;
   console.log(self.album, self.options, "on clicked gallery");
    $(this).lightGallery({
        dynamic: true,
        closable: true,
        hash:true,
        galleryId: self.options.el[0].dataset.tag,
        share: false,
        download: false,
        thumbnail: false,
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
      //console.log(this.options);
     // self.player = new AudioPlayerView({model: this.model});
      //this.render();
    },
    getData: function () {
      var self = this;
      //console.log(self.options, this.$el, "getter for data in audio icon");
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
      //console.log(modelMaker);
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
      this.sanitizeData();
    },
    sanitizeData: function(){
      var self = this;

      // function to find the appropriate item for the file
      // to display metadata
      function getDescription(id){
        var found = _.find(self.model.get('content'), function(item){
          return item.get('id') === id;
        });
        return found.get('element_texts')[1].text +'<em> '+ found.get('element_texts')[2].text || ''+' </em>';
      }

      //playlist data structure
      /*[{
              title:"Cro Magnon Man",
              artist:"The Stark Palace",
              mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
              
              poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
            }];*/
    
        var finalAudios = _.map(self.options.item, function (file){
          return {mp3: file.file_urls.original,
                  title: getDescription(file.item.id)
                }
        });
        console.log(finalAudios);

        return finalAudios;
      
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
      //console.log("closing");
      //event.preventDefault();
      // COMPLETELY UNBIND THE VIEW
          this.undelegateEvents();

          this.$el.removeData().unbind(); 

          // Remove view from DOM
          this.remove();  
          Backbone.View.prototype.remove.call(this);

    }
   });

// split into two parts
// 1) oplayer

  var audioGalleryIconView = Backbone.View.extend({
    thumbnailTemplate: _.template(audioGalleryIcon),
    className: "gallery-icon-wrap",
    /*events: {
      "click": "onClicked"
    },*/
    initialize: function(options){
      var self = this;
      //self.options = options;
      self.model = new Backbone.Model(options);
      console.log(self.model);
      self.player = new audioGalleryPlayerView({model: self.model});
      this.listenTo(self.model, "change:state", self.onClose);
      self.filesData = [];
      if(!self.model.get('referer')){
        self.getData();
      }
      
      self.render();
      var cssSelector =  {jPlayer: "#jquery_jplayer_N", cssSelectorAncestor: "#jp_container_N"};
      var playerOptions = {
        playlistOptions: {
          autoPlay: true,
          enableRemoveControls: true
        },
        swfPath: "/js/libs/jplayer/jplayer",
        useStateClassSkin: true,
        smoothPlayBar: true,
        supplied: "mp3"
      };
      var playlist = [];
      self.player['playlist'] = new jPlayerPlaylist(cssSelector, playlist, playerOptions);

    },
    getData: function () {
      var self = this;
      //console.log(self.model.get('content')[0], this.$el, "getter for data in audio icon");
      var jqueryResponses = self.model.get('content')[0].collection.getFileByUrlArray(self.model.get('content'));
      _.each(jqueryResponses, function(item){
        item.then(function (response){
          self.filesData.push(response);
        });
      });


      //self.render();
      //console.log(jqueryResponses, self.filesData, "getter files");

    },
    sanitizeData: function(arg){
      var self = this;

      var groupedDataByType = _.groupBy(_.flatten(self.filesData), function(item){
        return item.mime_type;
      });
      
      // function to find the appropriate item for the file
      // to display metadata
      function getDescription(id){
        var found = _.find(self.model.get('content'), function(item){
          return item.get('id') === id;
        });
        return found.get('element_texts')[1].text +'<em> '+ found.get('element_texts')[2].text || ''+' </em>';
      }

      //playlist data structure
      /*[{
              title:"Cro Magnon Man",
              artist:"The Stark Palace",
              mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
              
              poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
            }];*/
      if(arg === "audio"){
        var finalAudios = _.map(groupedDataByType['audio/mpeg'], function (file){
          return {mp3: file.file_urls.original,
                  title: getDescription(file.item.id)
                }
        });
        //console.log(groupedDataByType, finalAudios);

        return finalAudios;
      } else if(arg === "video"){
        //console.log("video data sanitization");
        var finalVideos = _.map(groupedDataByType['video/mp4'], function (file){
          return {
                  'subHtml': '<p>'+getDescription(file.item.id)+'</p>',
               
                  'html': '<video class="lg-video-object lg-html5" controls preload="metadata"><source src="'+file.file_urls.original+'" type="video/mp4">Your browser does not support HTML5 video</video>'
                }
        });
        return finalVideos;
      }

      
      
    },
    render: function() {
      var self = this;
      //console.log(this,this.thumbnailTemplate);
      if(self.$el.data().audio){
        self.childNode = $.parseHTML(this.thumbnailTemplate({thumbnail:'imgs/components/sound.svg', data: "audio", text: "Audio Reserve", gallery: true}))[1];
        self.$el.append(self.childNode);
        $(self.childNode).on('click', function(event){ 
          self.onClicked(event);
         });
      }
      if(self.$el.data().video){
        self.vidNode = $.parseHTML(this.thumbnailTemplate({thumbnail:'imgs/components/video-icon.svg', data: "video", text: "Video Reserve", gallery: true}))[1];
        self.$el.append(self.vidNode);
        $(self.vidNode).on('click', function(event){ 
          self.onClicked(event);
         });
      }
      
      return;
    },
    onClicked: function(event) {
      //event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
      var self = this;
      console.log(event.currentTarget);
      if(event.currentTarget.dataset.audio){
        //console.log("clicked audio gallery", event, this.model.get('content'), self.filesData);
        //playlist data structure
        /*[{
                title:"Cro Magnon Man",
                artist:"The Stark Palace",
                mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
                
                poster: "http://www.jplayer.org/audio/poster/The_Stark_Palace_640x360.png"
              }];*/
        
        var playList = self.sanitizeData("audio");
        if(playList.length > 0){
          self.player.model.set({state: 'show'});
          self.player['playlist'].setPlaylist(playList);
        } else {
          self.player.model.set({state: 'hide'});
        }
        
      } 
      // this block plays the inline audio click
      else if(event.currentTarget.dataset.url) {
        var audioToPlay = [self.model.get('content')];
        self.player.model.set({state: 'show'});
        self.player['playlist'].setPlaylist(audioToPlay);
      }
      else {
        var videoPlaylist = self.sanitizeData("video");
        $(this).lightGallery({
            dynamic: true,
            closable: true,
            hash:false,
            share: false,
            download: false,
            thumbnail:false,
            videojs: true,
            dynamicEl: videoPlaylist
        });
        //console.log("clicked video gallery", event.currentTarget.dataset, videoPlaylist);
      }
      
    
    },
    onClose: function(){
      if(this.model.get("state") === "hide"){
        //console.log("hidden and stopped");
        this.player['playlist'].remove();
      }
      //console.log("shown and playing");
    }
  });

// audio gallery player uses jquery plugin
// http://jplayer.org -> documentation
   var audioGalleryPlayerView = Backbone.View.extend({
    el: "#media-player-widget",
    thumbnailTemplate: _.template(audioGalleryIcon),
    events: {
      "click .close": "closePlayer"
    },
    initialize: function(options){
      //console.log(options, "from audio gallery view");
      var self = this;
      self.model = options.model;
      this.listenTo(self.model, "change:state", this.toggleView);
      self.model.set({"state": "hide"});
      //console.log(self.model, "media mmodel");
      //Documentation: https://jqueryui.com/draggable/#constrain-movement
      self.options = options;
      self.$el.draggable({
        containment: "parent",
        axis:'y',
        scroll: false
      });
     // self.$parent = $('#page .active .gallery')[0];
      //self.getData();
    },
    closePlayer: function() {
      this.model.set({state: 'hide'});
    },
    toggleView: function() {
      //console.log(this, "Gallery view toggler");
      if(this.model.previous('state') === 'show'){
        this.$el.removeClass('show');
      } else {
        this.$el.removeClass('hide');
      }

      this.$el.addClass(this.model.get("state"));
      
    }
   });

// return the view object -> will be instantiated in the router with el and model
  return ThemesView;

});
