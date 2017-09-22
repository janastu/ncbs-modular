define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

var Image = Backbone.Model.extend({
	defaults: {
	    src: ""
	}
});

var Images = Backbone.Collection.extend({
	model: Image,
	getRandomImage: function(path) {
	    path = path || './imgs/Ephemera';
        var idx = Math.floor( Math.random() * this.models.length );
        return this.models[ idx ];
        // console.log(this.models [ idx ])
	}
});

var EphermeraView = Backbone.View.extend({
	initialize: function(obj) {
        this.collection = obj.collection;
	    this.path = './imgs/Ephemera';
	}, 
	render: function() {
	    var img = this.collection.getRandomImage(this.path);
			//var curatorialNote = document.createElement('div');
			//curatorialNote.className = "curatorialNote	"
			//curatorialNote.innerHTML = '<br> <h3>"Ephemera focuses on a single image of curiosity from across the history of NCBS, TIFR and their communities."</h3> <p>See the caption below for more details. Each refresh results in a new image.</p>';

			var ephemeraDiv = document.getElementById('ephemera-container');

			//ephemeraDiv.id = "ephemera-container";
			//ephemeraDiv.className = "container";
	    	
	    	var captionDiv = document.createElement('div');
	    	captionDiv.id = "view-caption";
	        captionDiv.innerHTML = img.get('caption');
	       	captionDiv.className = 'captionEphImg featured-img-caption collapse col-md-12';

	       	//ephemeraDiv.appendChild(curatorialNote);
	       	
	    	if (img.get('type') == "image") {
		        var elem = document.createElement("img");
		        elem.src = this.path + "/" + img.get('src');
	    	    elem.style.width = "100%";
	    	   }
		    else {
		        var elem = document.createElement("video");
		        elem.src = this.path + "/" + img.get('src');
		        elem.style.width = "100%";
		        elem.controls = "true";
		        elem.play()
		     		        
	    }
	    ephemeraDiv.appendChild(elem);
	    var viewButton = document.createElement('a');
	    var vbImg = document.createElement('img');
	    vbImg.className = "view-caption";
	    vbImg.src = 'imgs/components/view.svg';
	    viewButton.className = 'btn';
	    $(viewButton).attr('data-toggle', 'collapse');
	    $(viewButton).attr('href', '#view-caption');
	    $(viewButton).attr('aria-expanded', 'false');
	    $(viewButton).attr('aria-controls', 'view-caption');
	    viewButton.appendChild(vbImg);
	    ephemeraDiv.appendChild(viewButton);

	    	   
	        	ephemeraDiv.appendChild(captionDiv);
	    
	}
});

var images = new Images([
	{type: "image", src: "1960s-70s-Stahl-and-OS-awards-ceremonial.png", caption: "In the late 1960s, Frank Stahl (right), a renowned biologist, came for a workshop to TIFR. Here, he participates (in ceremonial attire, a one-time event) in an awards function for those who attended a course in phage genetics. This image is part of the exhibit's Sandbox Ephemera theme -- every screen refresh brings up a different image from across the history of NCBS, TIFR and their connected communities."},
	{type: "image", src: "1990-92-Bangalore-Land-File-Log-Book-1.jpg", caption : "File 181 in TIFR is synonymous with all things related to the TIFR Centre. People would check the logbook in and out, and it got especially busy in the years between 1990 and 1992. This image is part of the exhibit's Sandbox Ephemera theme -- every screen refresh brings up a different image from across the history of NCBS, TIFR and their connected communities."},
	{type: "image", src: "1981-Ajith-macaque-fieldwork-braille-5a.jpg", caption: "Ajith Kumar's field notes from 1982-83, written on Braille paper (sourced from a church in the US, since resources were limited, and it was good non-blotting paper). The notes are for studies on how four species of tree living mammals co-exist and compete for same resources in the Anamalai Hills, Tamil Nadu. This image is part of the exhibit's Sandbox Ephemera theme -- every screen refresh brings up a different image from across the history of NCBS, TIFR and their connected communities."},
	{type: "image", src: "2016-TIFR-bird-graffiti.JPG", caption: "Chipping on a wall at the Tata Institute for Fundamental Research. This image is part of the exhibit's Sandbox Ephemera theme -- every screen refresh brings up a different image from across the history of NCBS, TIFR and their connected communities."},
	{type: "image", src: "TIFR-Penthouse-2.jpg", caption: "In the main academic block at TIFR, near the Director's office, is a room called the Penthouse. It used to be the telephone exchange. Today, it is the records room. Records are preserved, but it takes institutional memory to track them down, including the original DAE sanction order to build NCBS. This image is part of the exhibit's Sandbox Ephemera theme -- every screen refresh brings up a different image from across the history of NCBS, TIFR and their connected communities."}
]);
return randomImageView = new EphermeraView({collection: images});
//randomImageView.render();

});