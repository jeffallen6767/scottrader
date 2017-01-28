
function parseCsv(text) {
  console.log('text');
  console.log(text);
  var results = Papa.parse(text, {
    dynamicTyping: true
  });
  console.log('results of Papa.parse');
  console.log(results);
  return results;
}

function indexData(data) {
  var keys = data.shift(),
    vals = [],
    idx = {},
    u,v,w,x,y,z;
  // set-up index
  for (x=0, y=keys.length; x<y; x++) {
    idx[keys[x]] = [];
  }
  // partition data and index it in reverse to get time-ordered
  for (x=-1, y=data.length-1; x<y; y--) {
    v = data[y];
    vals.push(v);
    for (w=0, z=v.length; w<z; w++) {
      u = keys[w];
      idx[u].push(v[w]);
    }
    
  }
  console.log('keys', keys);
  console.log('vals', vals);
  console.log('idx', idx);

		

}