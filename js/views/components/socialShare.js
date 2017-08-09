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
        '<!--li><a href="mailto:friend@somewhere.com?subject=Made Fresh Coffee - <%= name %>&body=by <%= author %>, <%= message %> <%= readUrl %>" target="_blank"><button id="EmailButton">Email</button></a></li-->' +
        '<li><a href="https://plus.google.com/share?url=<%= encodeURIComponent(readUrl) %>" target="_blank" id="GoogleButton">Google+</a></li>'+    
        '<!--li><a href="#" id="URLButton">URL</a></li-->' +
        '<li><a href="https://www.facebook.com/dialog/share?app_id=505599936281672&display=popup&link=<%= encodeURIComponent(readUrl) %>&redirect_uri=http://archives.ncbs.res.in/exhibit/13ways/" target="_blank" id="FacebookButton">Facebook</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>',
            
            render: function () {
                var dataContext = this.model.toJSON();
                var compiledTemplate = _.template(this.template);
                var html = compiledTemplate(dataContext);
                
                this.$el.html(html);
            },

            onFacebook: function () {
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
