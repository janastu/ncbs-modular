define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var ComponentModel = Backbone.Model.extend({

    defaults : {
      tag : '#A67D3D',
      component : '100px',
      length : 'concat github and login',
      hidden: true
    }

  });

  return ComponentModel;

});
