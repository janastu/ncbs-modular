define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/sandbox/sandbox.html'
  ], function($, _, Backbone, SandboxTemplate){

  	var sandboxView = Backbone.View.extend({
  		el: '#page',
  		initialize: function (){
  			var self = this;
  			self.render();
  		},
  		render: function () {
  			console.log("rendering sandbox", SandboxTemplate);
  			this.$el.html(SandboxTemplate);
  		}
  	});

  	return sandboxView;
  });