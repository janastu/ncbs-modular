
/*console.log($('#dynamic'));
    $('#dynamic').on('click', */
// argument album is a array of objects in below format
/* [{
                "src": '../imgs/img/img1.jpg',
                'thumb': '../imgs/img/img1.jpg',
                'subHtml': '<h4>Fading Light</h4><p>Classic view from Rigwood Jetty on Coniston Water an old archive shot similar to an old post but a little later on.</p>'
            }, {
                'src': '../imgs/img/img2.jpg',
                'thumb': '../imgs/img/img2.jpg',
                'subHtml': "<h4>Bowness Bay</h4><p>A beautiful Sunrise this morning taken En-route to Keswick not one as planned but I'm extremely happy I was passing the right place at the right time....</p>"
            }, {
                'src': '../imgs/img/img3.jpg',
                'thumb': '../imgs/img/img3.jpg',
                'subHtml': "<h4>Coniston Calmness</h4><p>Beautiful morning</p>"
            }]*/


window.lightGallery = function(album) {
        console.log("licked gallery", album);
        $(this).lightGallery({
            dynamic: true,
            closable: true,
            hash:false,
            share: false,
            download: false,
            dynamicEl: album
        })
     
    };


//JSON data of galleries in each chapter is a globar variable
//Images of space for biology in Identity themes
spaceGallery = [{
                "src": 'http://archives.ncbs.res.in/files/original/d04ef3f34052b4776c21d2c4cdbf8317.jpg',
                'thumb': 'http://archives.ncbs.res.in/files/original/d04ef3f34052b4776c21d2c4cdbf8317.jpg',
                'subHtml': 'The DAE sanction order to TIFR to set up the Centre for Fundamental Research in Biological Sciences, which would eventually become the National Centre for Biological Sciences. The Oct 22, 1991, letter was followed up by another one on Oct 23 due to a typo in the cost breakdown. Records Office, TIFR'
            }, {
                'src': 'http://archives.ncbs.res.in/files/original/04660b8c6aeaea0aaa5390d1950a0677.jpg',
                'thumb': 'http://archives.ncbs.res.in/files/original/04660b8c6aeaea0aaa5390d1950a0677.jpg',
                'subHtml': 'The DAE approval to sign a memorandum of understanding with the University of Agricultural Sciences in Bangalore. January 1991.'
            }, {
                'src': 'http://archives.ncbs.res.in/files/original/5ea17761a408916371a9fdf3da2ae189.jpg',
                'thumb': 'http://archives.ncbs.res.in/files/original/5ea17761a408916371a9fdf3da2ae189.jpg',
                'subHtml': "Notes from Obaid Siddiqi's presentation to the TIFR Faculty in 1988, on his proposal to set up a new centre for biology. Siddiqi summarizes the journey from 1978, based on an invitation from S. Ramaseshan to start a joint TIFR-IISC centre for biological research. Courtesy of Indira Chowdhury"
            }, {
                'src': 'http://archives.ncbs.res.in/files/original/0bc836c7e3683c93e5a10e06b3a0e43b.jpg',
                'thumb': 'http://archives.ncbs.res.in/files/original/0bc836c7e3683c93e5a10e06b3a0e43b.jpg',
                'subHtml': 'The National Biotechnology Board sends its approval in September 1985 to TIFR for allowing the set up of a Centre for Fundamental Research in Biological Sciences under the Department of Atomic Energy.'
            }, {
                'src': 'http://archives.ncbs.res.in/files/original/4fa44ced95771386e990b81547e2f2cd.jpg',
                'thumb': 'http://archives.ncbs.res.in/files/original/4fa44ced95771386e990b81547e2f2cd.jpg',
                'subHtml': 'The first official proposal for an independent centre for biology under TIFR, as seen in the TIFR Five Year Plan from 1980-85. It was called the "TIFR-IISC Joint Centre for Biological Research"'
            }, {
                'src': 'http://archives.ncbs.res.in/files/original/f8e6445882e2f006175961d943218f16.jpg',
                'thumb': 'http://archives.ncbs.res.in/files/original/f8e6445882e2f006175961d943218f16.jpg',
                'subHtml': 'The first official proposal for an independent centre for biology under TIFR, as seen in the TIFR Five Year Plan from 1980-85. It was called the "TIFR-IISC Joint Centre for Biological Research"'
            }] ;

            //end of space for biology

//India gallery in Identity theme

indiaGallery =[{

        "src": 'http://archives.ncbs.res.in/files/original/2924b41778e2a4e06706a94cede81c67.mp4',
        'thumb': 'http://archives.ncbs.res.in/files/original/2924b41778e2a4e06706a94cede81c67.mp4',
        'subHtml': 'NCBS origins-P Balaram'
    }, {
        'src': 'http://archives.ncbs.res.in/files/original/8e6c9e4c5ac67ed0aca1baff53dfabb1.mp4',
        'thumb': 'http://archives.ncbs.res.in/files/original/8e6c9e4c5ac67ed0aca1baff53dfabb1.mp4',
        'subHtml': 'On Obaid Siddiqi: Building a space for diverging views-K VijayRaghavan. NCBS Archives'
    }, {
        'src': 'http://archives.ncbs.res.in/files/original/74a4a55db888a22d121ecfb63677de40.mp4',
        'thumb': 'http://archives.ncbs.res.in/files/original/74a4a55db888a22d121ecfb63677de40.mp4',
        'subHtml': "Excerpts from speeches at the laying of the TIFR foundation stone in 1954. Films Division of India / TIFR Archives"
    }, {
        'src': 'http://archives.ncbs.res.in/files/original/b3f5209a0ae6fd0b14ed908331bc856c.mp4',
        'thumb': 'http://archives.ncbs.res.in/files/original/b3f5209a0ae6fd0b14ed908331bc856c.mp4',
        'subHtml': 'Correspondence between JRD Tata and Homi Bhabha on building TIFR. Films Division of India / TIFR Archives'
    }, {
        'src': 'http://archives.ncbs.res.in/files/original/84819f61524b4fd1fbcf85376b7f5cce.jpg',
        'thumb': 'http://archives.ncbs.res.in/files/original/84819f61524b4fd1fbcf85376b7f5cce.jpg',
        'subHtml': "Extracts from AV Hill's letter in January 1945 to Homi Bhabha, reflecting on scientific cooperation. TIFR Archives"
    }, {
        'src': 'http://archives.ncbs.res.in/files/original/e01569e87addb25396526e5a29d066cf.jpg',
        'thumb': "http://archives.ncbs.res.in/files/original/e01569e87addb25396526e5a29d066cf.jpg",
        'subHtml': "Extracts from AV Hill's letter in January 1945 to Homi Bhabha, reflecting on scientific cooperation. TIFR Archives"
    }] ;

   