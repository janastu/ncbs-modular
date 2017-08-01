define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/sandbox/sandbox.html'
  ], function($, _, Backbone, SandboxTemplate){

  	var sandboxView = Backbone.View.extend({
  		el: '#page',
  		events: {
  			'show.bs.tab': 'tabShown'
  		},
  		initialize: function (){
  			var self = this;
  			self.render();
  		},
  		render: function () {
  			console.log("rendering sandbox", SandboxTemplate);
  			this.$el.html(SandboxTemplate);
  		},
  		tabShown: function(e){
  			//Hack: Iframe loading content after tabshown, 
  			//else content rendering is buggy
  			paneID = $(e.target).attr('href');
		    src = $(paneID+" iframe").attr('data-src');
		    if($(paneID+" iframe").attr("src")==""){
		    	$(paneID+" iframe").attr("src",src);
		    }
		    
  		}
  	});

  	return sandboxView;
  });