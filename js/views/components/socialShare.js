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
        '<!--li><a href="#" id="EmailButton" class="twitter-share-button" >Email</a></li-->' +
        '<!--li><a href="https://plus.google.com/share?url=<%= encodeURIComponent(readUrl) %>" target="_blank" id="GoogleButton">Google+</a></li-->'+    
        '<li><a href="javascript:void(0);" id="FacebookButton">Facebook</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>',
            
            render: function () {
                var dataContext = this.model.toJSON();
                var compiledTemplate = _.template(this.template);
                var html = compiledTemplate(dataContext);
                
                this.$el.html(html);
                this.twitterInit();
            },
            twitterInit: function () {
                 
            },
            onFacebook: function () {
                var currentLink = window.location.href,
                captionText,
                imageThumb,
                foo = $('#page .active');
                if(foo.length > 0){
                    captionText = $('#page .active p').first()[0].textContent.trim() || this.model.get('message');
                    imageThumb = $('#page .active .slider-thumb-icon').first() || 'http://localhost:8000/imgs/Ephemera/TIFR-Penthouse-2.jpg';
                } else {
                    captionText = $('p').first()[0].textContent.trim() || this.model.get('message');
                    imageThumb = '/imgs/Ephemera/TIFR-Penthouse-2.jpg';
                }
                
                FB.ui({
                  method: 'feed',
                  link: currentLink,
                  caption: captionText,
                  picture: imageThumb,
                }, function(response){});
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
            var model, view;
            
            this.init = function () {
                model = new SocialSharing.Model();
                view = new SocialSharing.View({model: model});
                view.render();
            };
        };

        return SocialSharing;
      /*  $(function () {
            var theApp = new SocialSharing.App();
            theApp.init();
        });*/
  });
