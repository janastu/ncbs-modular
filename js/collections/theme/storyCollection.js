	// Site content required by the client interfaces.
	// the items, files and collections are put through makesitecontent method to add 
	// models to this app.APIcontent collection - and views will listen to this collection for rendering
	// particular media and meta content 
	
	define([
	  'jquery',
	  'underscore',
	  'backbone'
	], function($,_, Backbone){
	var storyCollection = Backbone.Collection.extend({
		groupByTags: function(index){
			return this.groupBy(function (item){
				//assuming that all items will have only onetag seperated by "-"
				return item.get('tags')[0].name.split('-')[index];
			}, index);
			/*return this.groupBy(function(item){
				return item.get('tags').name.split('-')[index];
			}, index);*/
		},
		getFileUrl: function(arr){
			return arr.map(function (item){
				return item.get('files').url;
			});
		},
		getFileByUrl: function(url){
			return $.get({
				url: url, 
				success: function(response){
					return response;
				}
			});
		},
		getFileByUrlArray: function(array){
			return _.map(array, function(item){
				return $.get({
					url: item.get('files').url/*, 
					success: function(response){
						return response;
					}*/
				}).then(function(response){
					return response;
				});
			});
		}
	});
	return storyCollection;
});