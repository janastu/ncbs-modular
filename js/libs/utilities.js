//utilities


function capitalizeFirstLetter(string) {
  if(string){
     return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

function urlParamToArgs(string){
  console.log(string.split('-')[0]);
  return string.split('-')[0].charAt(0).toUpperCase() + string.slice(1)
}

//Helper for sorting the items by tags
// While sorting the order of the tags, we need to check for natural sorting since the tag is a text
// with numbers marked as order

  function naturalCompare(a, b) {
      var ax = [], bx = [];
      //console.log(a, b);
      a.get('tags')[0].name.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
      b.get('tags')[0].name.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
      
      while(ax.length && bx.length) {
          var an = ax.shift();
          var bn = bx.shift();
          var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
          if(nn) return nn;
      }
          return ax.length - bx.length;
      }

