
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
                'subHtml': 'Notes from Obaid Siddiqi&#39;s presentation to the TIFR Faculty in 1988, on his proposal to set up a new centre for biology. Siddiqi summarizes the journey from 1978, based on an invitation from S. Ramaseshan to start a joint TIFR-IISC centre for biological research. Courtesy of Indira Chowdhury'
            }, {
                'src': 'http://archives.ncbs.res.in/files/original/0bc836c7e3683c93e5a10e06b3a0e43b.jpg',
                'thumb': 'http://archives.ncbs.res.in/files/original/0bc836c7e3683c93e5a10e06b3a0e43b.jpg',
                'subHtml': 'The National Biotechnology Board sends its approval in September 1985 to TIFR for allowing the set up of a Centre for Fundamental Research in Biological Sciences under the Department of Atomic Energy.'
            }, {
                'src': 'http://archives.ncbs.res.in/files/original/4fa44ced95771386e990b81547e2f2cd.jpg',
                'thumb': 'http://archives.ncbs.res.in/files/original/4fa44ced95771386e990b81547e2f2cd.jpg',
                'subHtml': 'The first official proposal for an independent centre for biology under TIFR, as seen in the TIFR Five Year Plan from 1980-85. It was called the &#34;TIFR-IISC Joint Centre for Biological Research&#34;'
            }, {
                'src': 'http://archives.ncbs.res.in/files/original/f8e6445882e2f006175961d943218f16.jpg',
                'thumb': 'http://archives.ncbs.res.in/files/original/f8e6445882e2f006175961d943218f16.jpg',
                'subHtml': 'The first official proposal for an independent centre for biology under TIFR, as seen in the TIFR Five Year Plan from 1980-85. It was called the &#34;TIFR-IISC Joint Centre for Biological Research&#34;'
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
        'subHtml': 'Excerpts from speeches at the laying of the TIFR foundation stone in 1954. Films Division of India / TIFR Archives'
    }, {
        'src': 'http://archives.ncbs.res.in/files/original/b3f5209a0ae6fd0b14ed908331bc856c.mp4',
        'thumb': 'http://archives.ncbs.res.in/files/original/b3f5209a0ae6fd0b14ed908331bc856c.mp4',
        'subHtml': 'Correspondence between JRD Tata and Homi Bhabha on building TIFR. Films Division of India / TIFR Archives'
    }, {
        'src': 'http://archives.ncbs.res.in/files/original/84819f61524b4fd1fbcf85376b7f5cce.jpg',
        'thumb': 'http://archives.ncbs.res.in/files/original/84819f61524b4fd1fbcf85376b7f5cce.jpg',
        'subHtml': 'Extracts from AV Hill&#39;s letter in January 1945 to Homi Bhabha, reflecting on scientific cooperation. TIFR Archives'
    }, {
        'src': 'http://archives.ncbs.res.in/files/original/e01569e87addb25396526e5a29d066cf.jpg',
        'thumb': "http://archives.ncbs.res.in/files/original/e01569e87addb25396526e5a29d066cf.jpg",
        'subHtml': 'Extracts from AV Hill&#39;s letter in January 1945 to Homi Bhabha, reflecting on scientific cooperation. TIFR Archives'
    }] ;

   // end of science in India

   //Recognition Gallery in Identity theme

   recognitionGallery =[{

            "src": 'http://archives.ncbs.res.in/files/original/ab05321d23441800e687b0d4757d64b2.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/ab05321d23441800e687b0d4757d64b2.jpg',
            'subHtml': 'M R Das, a faculty member at TIFR in the 1970s, highlighting the media and academic attention to his virology work to MGK Menon. TIFR Archives.'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/c0472709fe54e4a728d68c7d360121ba.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/c0472709fe54e4a728d68c7d360121ba.jpg',
            'subHtml': 'M R Das, a faculty member at TIFR in the 1970s, highlighting the media and academic attention to his virology work to MGK Menon. TIFR Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/3a27cffa8c5f64c3041c0c079e03e69a.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/3a27cffa8c5f64c3041c0c079e03e69a.jpg',
            'subHtml': 'The first direct correspondence between Homi Bhabha and Obaid Siddiqi, after Bhabha received a letter from Leo Szilard, with recommendations for Siddiqi from Alan Garen and Guido Pontecorvo. March 12, 1962. Siddiqi Family / NCBS Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/81b7cd514f292892ae2a335aa952f4cc.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/81b7cd514f292892ae2a335aa952f4cc.jpg',
            'subHtml': 'Homi Bhabha makes the case for fundamental research at the inauguration of TIFR in 1945. TIFR Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/5cfa7d2a42cf851107deb7000c159537.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/5cfa7d2a42cf851107deb7000c159537.jpg',
            'subHtml': 'Copy of Homi Bhabha&#39;s letter to Dorab Tata on March 12, 1944. Bhabha raises the possibility of setting up a new institute of advanced research in physics in Bombay. TIFR Archives'
        },  {
            'src': 'http://archives.ncbs.res.in/files/original/7d382b82a44dbc6fae24fb1de833c343.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/7d382b82a44dbc6fae24fb1de833c343.jpg',
            'subHtml': 'Copy of Homi Bhabha&#39;s letter to Dorab Tata on March 12, 1944. Bhabha mentions that institute of advanced research in physics will have parallels with the Kaiser Wilhelm (later Max Planck) institutes in Germany, which are built around outstanding individuals. TIFR Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/2a6bd45188bb63e3d824eb1ba76472bd.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/2a6bd45188bb63e3d824eb1ba76472bd.jpg',
            'subHtml': 'Homi Bhabha&#39;s hand written draft of a letter to Sorab Tata in April 1944. Bhabha informs him that the Dorabji Tata Trust had agreed to sponsor his scheme of setting up an institute for advanced research in physics. TIFR Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/2f3d37ead107e9922cf16b4de0fdc55e.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/2f3d37ead107e9922cf16b4de0fdc55e.jpg',
            'subHtml': 'Homi Bhabha&#39;s hand witten draft of a letter to Sorab Tata in April 1944. Bhabha informs him that the Dorabji Tata Trust had agreed to sponsor his scheme of setting up an institute for advanced research in physics. TIFR Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/06149fd56df56ef34fa0f389bd9e4b16.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/06149fd56df56ef34fa0f389bd9e4b16.jpg',
            'subHtml': 'Homi Bhabha&#39;s hand witten draft of a letter to Sorab Tata in April 1944. Bhabha informs him that the Dorabji Tata Trust had agreed to sponsor his scheme of setting up an institute for advanced research in physics. TIFR Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/7e928a7fd2d2e9d7eae84882594062fc.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/7e928a7fd2d2e9d7eae84882594062fc.jpg',
            'subHtml': 'Homi Bhabha&#39;s hand witten draft of a letter to Sorab Tata in April 1944. Bhabha informs him that the Dorabji Tata Trust had agreed to sponsor his scheme of setting up an institute for advanced research in physics. TIFR Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/5dd94ca6b1c449ff1a183ee6f5e26e95.mp4',
            'thumb': 'http://archives.ncbs.res.in/files/original/5dd94ca6b1c449ff1a183ee6f5e26e95.mp4',
            'subHtml': 'On Obaid Siddiqi: Finding elegance in science-Indira Chowdhury. NCBS Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/ff3a40c4bac921fc2c2ee12f4b88171f.mp4',
            'thumb': 'http://archives.ncbs.res.in/files/original/ff3a40c4bac921fc2c2ee12f4b88171f.mp4',
            'subHtml': 'Designing an NCBS logo-Sumantra Chattarji.'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/96761968cb5f36e84499b4afa02fee40.mp4',
            'thumb': "http://archives.ncbs.res.in/files/original/96761968cb5f36e84499b4afa02fee40.mp4",
            'subHtml': 'The gleam in the eye-P Balaram'
        }] ;

        //end of Recognition Gallery

    //space and autonomy in institution building theme

    autonomyGallery =[{

             "src": 'http://archives.ncbs.res.in/files/original/25b161363e5fc6d40918c3e720c7ea5a.jpg',
             'thumb': 'http://archives.ncbs.res.in/files/original/25b161363e5fc6d40918c3e720c7ea5a.jpg',
             'subHtml': 'A view of the green space overlooking the NCBS old campus, c 2005. By 2012, this space was filled by the Southern Lab Complex. '
         }, {
             'src': 'http://archives.ncbs.res.in/files/original/0c9aa7f98eb6a6e41412d05d8a1cf195.jpg',
             'thumb': 'http://archives.ncbs.res.in/files/original/0c9aa7f98eb6a6e41412d05d8a1cf195.jpg',
             'subHtml': 'A current view of one of the fly labs at the Department of Biological Sciences at TIFR, some of the original lab spaces for the faculty that eventually moved to NCBS.'
         }, {
             'src': 'http://archives.ncbs.res.in/files/original/a78c11a9eea174eca071b6790bd51808.jpg',
             'thumb': 'http://archives.ncbs.res.in/files/original/a78c11a9eea174eca071b6790bd51808.jpg',
             'subHtml': 'The DAE sanction order to TIFR to set up the Centre for Fundamental Research in Biological Sciences, which would eventually become the National Centre for Biological Sciences. The Oct 22, 1991, letter was followed up by another one on Oct 23 due to a typo in the cost breakdown. Records Office, TIFR'
         }, {
             'src': 'http://archives.ncbs.res.in/files/original/e00510f25d828f328659b10e782c5965.jpg',
             'thumb': 'http://archives.ncbs.res.in/files/original/e00510f25d828f328659b10e782c5965.jpg',
             'subHtml': 'The National Biotechnology Board sends its approval in September 1985 to TIFR for allowing the set up of a Centre for Fundamental Research in Biological Sciences under the Department of Atomic Energy.'
         }, {
             'src': 'http://archives.ncbs.res.in/files/original/3894ed9a872bb55881e16b79b1f5077c.jpg',
             'thumb': 'http://archives.ncbs.res.in/files/original/3894ed9a872bb55881e16b79b1f5077c.jpg',
             'subHtml': 'The central government&#39;s letter to TIFR in July 1985, indicating the Planning Commission&#39;s approval of the biology centre and other proposal made by TIFR. The &#34;Centre for Fundamental Research in Biological Sciences&#34; is included as a &#34;National Scheme&#34; under the Department of Atomic Energy.'
         },  {
             'src': 'http://archives.ncbs.res.in/files/original/da3c87328b9dd80cf8b28f550e95add8.jpg',
             'thumb': 'http://archives.ncbs.res.in/files/original/da3c87328b9dd80cf8b28f550e95add8.jpg',
             'subHtml': 'Obaid Siddiqi wrote a proposal for a new biology centre as part of TIFR’s 1980-1985 Five Year Plan, based on S. Ramaseshan’s invitation to set it up at IISc. But even though it was approved by the government, the IISc plan lost steam. This extract shows the first time the idea came up for discussion in the TIFR Council Meeting Minutes. December 2, 1981. Office of the Registrar, Tata Institute for Fundamental Research'
         }, {
             'src': 'http://archives.ncbs.res.in/files/original/e2518367d3aab3d34e6752c0bb73092c.jpg',
             'thumb': 'http://archives.ncbs.res.in/files/original/e2518367d3aab3d34e6752c0bb73092c.jpg',
             'subHtml': 'Participants at a molecular biology course at TIFR in the 1960s, including P.K. Maitra (first from left). Courtesy Department of Biological Sciences, TIFR'
         }, {
             'src': 'http://archives.ncbs.res.in/files/original/28ecb4f43c1fd03f7e808181f292b92c.mp4',
             'thumb': 'http://archives.ncbs.res.in/files/original/28ecb4f43c1fd03f7e808181f292b92c.mp4',
             'subHtml': 'Obaid Siddiqi and institution building - K VijayRaghavan'
         }, {
             'src': 'http://archives.ncbs.res.in/files/original/cc779b13b8e90ad23bbb797c6897c41e.jpg',
             'thumb': 'http://archives.ncbs.res.in/files/original/cc779b13b8e90ad23bbb797c6897c41e.jpg',
             'subHtml': 'Obaid Siddiqi wrote a proposal for a new biology centre as part of TIFR’s 1980-1985 Five Year Plan, based on S. Ramaseshan’s invitation to set it up at IISc. But even though it was approved by the government, the IISc plan lost steam. This extract shows the first time the idea came up for discussion in the TIFR Council Meeting Minutes. December 2, 1981. Office of the Registrar, Tata Institute for Fundamental Research'
         }] ;


         //end of space and autonomy

    //Paper trails in institution building theme

         paperGallery =[{

                  "src": 'http://archives.ncbs.res.in/files/original/a892b8e4fb234451642a3ca11d1f055a.mp4',
                  'thumb': 'http://archives.ncbs.res.in/files/original/a892b8e4fb234451642a3ca11d1f055a.mp4',
                  'subHtml': 'The long wait for an NCBS - Jayant Udgaonkar'
              }, {
                  'src': 'http://archives.ncbs.res.in/files/original/17288f22192164458a63a8e7a7d3255b.jpg',
                  'thumb': 'http://archives.ncbs.res.in/files/original/17288f22192164458a63a8e7a7d3255b.jpg',
                  'subHtml': 'The first page of the lease deed signed by the University of Agricultural Sciences (UAS) and TIFR for 20 acres and 10 guntas of land at the rate of one rupee for 50 years, and extendable by another 50 years. February 8, 1991. Courtesy of TM Sahadevan'
              }, {
                  'src': 'http://archives.ncbs.res.in/files/original/79b1d39385855ed489c4e424da19db9d.jpg',
                  'thumb': 'http://archives.ncbs.res.in/files/original/79b1d39385855ed489c4e424da19db9d.jpg',
                  'subHtml': 'The first page of the lease deed signed by the University of Agricultural Sciences (UAS) and TIFR for 20 acres and 10 guntas of land at the rate of one rupee for 50 years, and extendable by another 50 years. February 8, 1991. Courtesy of TM Sahadevan'
              }, {
                  'src': 'http://archives.ncbs.res.in/files/original/1314dad2370a8b09b6b83fec510baac7.jpg',
                  'thumb': 'http://archives.ncbs.res.in/files/original/1314dad2370a8b09b6b83fec510baac7.jpg',
                  'subHtml': 'The first page of the lease deed signed by the University of Agricultural Sciences (UAS) and TIFR for 20 acres and 10 guntas of land at the rate of one rupee for 50 years, and extendable by another 50 years. February 8, 1991. Courtesy of TM Sahadevan'
              }, {
                  'src': 'http://archives.ncbs.res.in/files/original/a1365a435d9beac9155622815d01ace1.jpg',
                  'thumb': 'http://archives.ncbs.res.in/files/original/a1365a435d9beac9155622815d01ace1.jpg',
                  'subHtml': 'The first page of the lease deed signed by the University of Agricultural Sciences (UAS) and TIFR for 20 acres and 10 guntas of land at the rate of one rupee for 50 years, and extendable by another 50 years. February 8, 1991. Courtesy of TM Sahadevan'
              },  {
                  'src': 'http://archives.ncbs.res.in/files/original/b05db412dc3774e5b2b9c874c93dfa50.jpg',
                  'thumb': 'http://archives.ncbs.res.in/files/original/b05db412dc3774e5b2b9c874c93dfa50.jpg',
                  'subHtml': 'The first page of the lease deed signed by the University of Agricultural Sciences (UAS) and TIFR for 20 acres and 10 guntas of land at the rate of one rupee for 50 years, and extendable by another 50 years. February 8, 1991. Courtesy of TM Sahadevan'
              }, {
                  'src': 'http://archives.ncbs.res.in/files/original/0720dbc665490b476abfdb42c5263d0f.jpg',
                  'thumb': 'http://archives.ncbs.res.in/files/original/0720dbc665490b476abfdb42c5263d0f.jpg',
                  'subHtml': 'University of Agricultural Sciences (UAS) hands over the 20 acres of land to TIFR in April 1991. Courtesy of TM Sahadevan'
              }, {
                  'src': 'http://archives.ncbs.res.in/files/original/e43deffc7fa60307c72150e989e22506.jpg',
                  'thumb': 'http://archives.ncbs.res.in/files/original/e43deffc7fa60307c72150e989e22506.jpg',
                  'subHtml': 'After the memorandum of understanding was signed between the University of Agricultural Sciences (UAS) and TIFR, there was the additional problem of ensuring that it didn’t get used for other purposes.'
              }, {
                  'src': 'http://archives.ncbs.res.in/files/original/fb6af6a4fc9563e6da0fd9841e9faf2b.jpg',
                  'thumb': 'http://archives.ncbs.res.in/files/original/fb6af6a4fc9563e6da0fd9841e9faf2b.jpg',
                  'subHtml': 'Even though TIFR had in principle got confirmation that they could get land in the University of Agricultural Sciences and they were very close to a memorandum of understanding, much depended on the vagaries of the people in power. TM Sahadevan, one of the main administrative officers for NCBS, expresses his concern to K VijayRaghavan. Courtesy of TM Sahadevan'
              }, {
                  'src': 'http://archives.ncbs.res.in/files/original/8425085f6235247fdacb94b3f5645b37.jpg',
                  'thumb': 'http://archives.ncbs.res.in/files/original/8425085f6235247fdacb94b3f5645b37.jpg',
                  'subHtml': 'Excerpts from the 1985-90 Five Year Plan from TIFR. It includes the proposal for a Centre for Fundamental Research in Biological Sciences, stating that a "strong school of basic research in modern biology in India is of great and vital interest to the country".'
              },{
                  'src': 'http://archives.ncbs.res.in/files/original/c8804e9de5939396bcbd23d052d1a80e.jpg',
                  'thumb': 'http://archives.ncbs.res.in/files/original/c8804e9de5939396bcbd23d052d1a80e.jpg',
                  'subHtml': 'Excerpts from the 1985-90 Five Year Plan from TIFR. It includes the proposal for a Centre for Fundamental Research in Biological Sciences, stating that a "strong school of basic research in modern biology in India is of great and vital interest to the country".'
              }, {
                  'src': 'http://archives.ncbs.res.in/files/original/da65cae25f33d030e0b1fa62b148507e.jpgThe first official proposal for an independent centre for biology under TIFR, as seen in the TIFR Five Year Plan from 1980-85. It was called the "TIFR-IISC Joint Centre for Biological Research"',
                  'thumb': 'http://archives.ncbs.res.in/files/original/da65cae25f33d030e0b1fa62b148507e.jpgThe first official proposal for an independent centre for biology under TIFR, as seen in the TIFR Five Year Plan from 1980-85. It was called the "TIFR-IISC Joint Centre for Biological Research"',
                  'subHtml': 'The first official proposal for an independent centre for biology under TIFR, as seen in the TIFR Five Year Plan from 1980-85. It was called the "TIFR-IISC Joint Centre for Biological Research"'
              }, {
                  'src': 'http://archives.ncbs.res.in/files/original/7057909a79cb04aaefd17f510ac65aa3.jpg',
                  'thumb': 'http://archives.ncbs.res.in/files/original/7057909a79cb04aaefd17f510ac65aa3.jpg',
                  'subHtml': 'The first official proposal for an independent centre for biology under TIFR, as seen in the TIFR Five Year Plan from 1980-85. It was called the "TIFR-IISC Joint Centre for Biological Research"'
              }] ;

              //end of paper trial


   //Architecture Gallery in institution building theme

   archGallery =[{

            "src": 'http://archives.ncbs.res.in/files/original/5f9fb58bac851ef1b3c89ea6070010ad.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/5f9fb58bac851ef1b3c89ea6070010ad.jpg',
            'subHtml': 'Every month, TM Sahadevan, an administrative officer at NCBS, would send a report to TIFR with an update of the construction process. The reports would include pasted photographs of the site. By 1997, they switched to digital prints. TIFR Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/20a81e514616a04ee7156c38a80a3453.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/20a81e514616a04ee7156c38a80a3453.jpg',
            'subHtml': 'Every month, TM Sahadevan, an administrative officer at NCBS, would send a report to TIFR with an update of the construction process. The reports would include pasted photographs of the site. By 1997, they switched to digital prints. TIFR Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/2496a37bae53252be17b2d0e1ce948e6.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/2496a37bae53252be17b2d0e1ce948e6.jpg',
            'subHtml': 'Every month, TM Sahadevan, an administrative officer at NCBS, would send a report to TIFR with an update of the construction process. The reports would include pasted photographs of the site. By 1997, they switched to digital prints. TIFR Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/933c971bcff947283f37203b2e0f7ab6.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/933c971bcff947283f37203b2e0f7ab6.jpg',
            'subHtml': 'Every month, TM Sahadevan, an administrative officer at NCBS, would send a report to TIFR with an update of the construction process. The reports would include pasted photographs of the site. By 1997, they switched to digital prints. TIFR Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/73d41ca922a5a8dcd4fd2a8e8af2943d.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/73d41ca922a5a8dcd4fd2a8e8af2943d.jpg',
            'subHtml': 'Every month, TM Sahadevan, an administrative officer at NCBS, would send a report to TIFR with an update of the construction process. The reports would include pasted photographs of the site. By 1997, they switched to digital prints. TIFR Archives'
        },  {
            'src': 'http://archives.ncbs.res.in/files/original/d47481dbde565b195efb42e156dfc4fe.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/d47481dbde565b195efb42e156dfc4fe.jpg',
            'subHtml': 'Every month, TM Sahadevan, an administrative officer at NCBS, would send a report to TIFR with an update of the construction process. The reports would include pasted photographs of the site. By 1997, they switched to digital prints. TIFR Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/21a2c9a0795b05ec120f51bcfea90620.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/21a2c9a0795b05ec120f51bcfea90620.jpg',
            'subHtml': 'Every month, TM Sahadevan, an administrative officer at NCBS, would send a report to TIFR with an update of the construction process. The reports would include pasted photographs of the site. By 1997, they switched to digital prints. TIFR Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/30f31dc0c8d22d791e9e8d800953fb04.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/30f31dc0c8d22d791e9e8d800953fb04.jpg',
            'subHtml': 'Every month, TM Sahadevan, an administrative officer at NCBS, would send a report to TIFR with an update of the construction process. The reports would include pasted photographs of the site. By 1997, they switched to digital prints. TIFR Archives'
        }, {
            'src': 'http://archives.ncbs.res.in/files/original/5d4ebf245ff674e85da44336982dff9e.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/5d4ebf245ff674e85da44336982dff9e.jpg',
            'subHtml': 'Early in the project, NCBS hired an external architect, Raj Rewal, to design the campus. It also hired U.B. Poornima, a local architect, to interface between Raj Rewal Associates, the DAE and the NCBS faculty. Her role would prove to be critical as both a glue in the design process and later, as an implementor of harmonious expansions. Courtesy of TM Sahadevan'
        },{
            'src': 'http://archives.ncbs.res.in/files/original/d644b9a61a4727e7ba0242d2ece601e8.jpg',
            'thumb': 'http://archives.ncbs.res.in/files/original/d644b9a61a4727e7ba0242d2ece601e8.jpg',
            'subHtml': 'First floor plan of the TIFR Centre, Bangalore, in 1995. While NCBS was being built, the early faculty continued to work at the TIFR Centre on the IISc Campus. Courtesy of TM Sahadevan'
        }] ;
   }]