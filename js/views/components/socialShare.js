// SEE: http://cdnjs.com/ for ultimate online JS resources

define([
  'jquery',
  'underscore',
  'backbone'
  ], function($, _, Backbone){
        SocialSharing = {};

        SocialSharing.Model = Backbone.Model.extend({
            defaults: {
                author: 'Venkat Srinivasan',
                name: '13 Ways',
                message: '13 ways of looking at NCBS',
                readUrl: 'http://archives.ncbs.res.in/exhibit/13ways/'
            }
        });

        SocialSharing.View = Backbone.View.extend({
            el: "#share-item",

            events: {
                'click #FacebookButton': 'onFacebook',
                'click #TwitterButton': 'onTwitter',
                'click #EmailButton': 'onEmail',
                'click #GoogleButton': 'onGoogle',
                'click #URLButton': 'onURL'
            },
           
            template:
        '<div>'+
        '<div>' +
        '<ul class="nav">' +
        '<li><a href="https://twitter.com/share?url=<%= encodeURIComponent(readUrl) %>&text=<%= encodeURIComponent(name) %> - <%= encodeURIComponent(message) %>" target="_blank" id="TwitterButton">Twitter</a></li>'+
        '<!--li><div  id="EmailButton"><a href="#" class="twitter-share-button" >Email</a></div></li-->' +
        '<!--li><a href="https://plus.google.com/share?url=<%= encodeURIComponent(readUrl) %>" target="_blank" id="GoogleButton">Google+</a></li-->'+    
        '<li><a href="javascript:void(0);" id="FacebookButton">Facebook</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>',
        initialize: function(){
            console.log(this);
            this.model.on('change:readUrl', this.render, this);

        },
            
            render: function () {

                var dataContext = this.model.toJSON();
                var compiledTemplate = _.template(this.template);
                var html = compiledTemplate(dataContext);
                console.log(dataContext, 'SocialSharing');
                this.$el.html(html);
                return this;
                //this.twitterInit();
            },
          
            twitterInit: function () {
                 /*console.log(window.twttr, twttr);
                 twttr.widgets.createShareButton(
                   'http://archives.ncbs.res.in/exhibit/13ways/',
                   document.getElementById('EmailButton'),
                   {
                     text: '13 Ways'
                   }
                 ).then( function( el ) {
                     console.log('Tweet button added.');
                   });*/
            },
            onFacebook: function () {
                var currentLink = window.location.href,
                captionText,
                imageThumb,
                foo = $('#page .active');
                // TODO: imageThumb needs to be dynamic
                if(foo.length > 0){
                    //console.log("foo length greater", foo.length, $('#page .active p').first()[0].textContent.trim());
                    captionText = $('#page .active p').first()[0].textContent.trim();
                    imageThumb = 'http://archives.ncbs.res.in/exhibit/13ways/imgs/Ephemera/TIFR-Penthouse-2.jpg';
                } else {
                    //console.log("foo length less", foo.length);
                    captionText = this.model.get('message');
                    imageThumb = 'http://archives.ncbs.res.in/exhibit/13ways/imgs/Ephemera/TIFR-Penthouse-2.jpg';
                }
                //console.log(currentLink, captionText, imageThumb, "DB share data");
                FB.ui({
                  method: 'feed',
                  link: currentLink,
                  caption: captionText,
                  picture: imageThumb,
                }, function(response){
                   // console.log("FB response share", response);
                });
                FB.AppEvents.logPageView();
                // TODO: register analytics event
            },

            onTwitter: function () {
                // TODO: register analytics event
 
            },

            onEmail: function () {
              
                // TODO: register analytics event
            },
            
            onGoogle: function() {
                // TODO: register analytics event
            },

            onURL: function () {
                // TODO: register analytics event
                alert('Give this URL to anyone! ' + this.model.get('readUrl'));
            }
        });


        SocialSharing.App = function () {
            var  model, view;

            this.init = function () {
                model = new SocialSharing.Model();
              
                model.set('readUrl', Backbone.history.location);
                view = new SocialSharing.View({model: model});
                view.render();
                return view;
            }
        };

        return SocialSharing;
      /*  $(function () {
            var theApp = new SocialSharing.App();
            theApp.init();
        });*/
  });
