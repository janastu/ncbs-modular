	// Site content required by the client interfaces.
	// the items, files and collections are put through makesitecontent method to add 
	// models to this app.APIcontent collection - and views will listen to this collection for rendering
	// particular media and meta content 
	
	define([
	  'underscore',
	  'backbone'
	], function(_, Backbone){
	var storyCollection = Backbone.Collection.extend({
		groupByTags: function(index){
			return this.groupBy(function(item){
				return item.get('tags').name.split('-')[index];
			}, index);
		}
	});
	return storyCollection;
});