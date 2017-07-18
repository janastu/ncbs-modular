define([
  'underscore',
  'backbone',
  'models/theme/ComponentModel'
], function(_, Backbone, ComponentModel){

  var ComponentCollection = Backbone.Collection.extend({
      
      model: ComponentModel,

      initialize : function(models, options) {}
  });
  return ComponentCollection;
});
      