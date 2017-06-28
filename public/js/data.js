// data.js - (c) 2017 Jeffrey David Allen

// avoid problems like: 0.01 + 0.06  //0.06999999999999999
function addReal(a, b) {
  return Math.round((a + b) * 1e12) / 1e12;
}

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

var meta = {
  "Dividend": {
    "keys": ['TradeDate','Symbol', 'Amount', 'Description']
  }
};

function indexData(data) {

  console.log("indexData", data);

  var keys = data[0],
      numKeys = keys.length,
      numData = data.length,
      vals = [],
      objs = [],
      idx = {"keys":{},"calc":{}},
      v,w,x,y,z,
      result;

  // set-up index
  for (x=0; x<numKeys; x++) {
    idx.keys[keys[x]] = x;
  }

  // reverse data to get time-ordered
  for (x=0, y=numData-1; x<y; y--) {
    // data line
    z = data[y];
    if (z.length === numKeys) {
      // save copy
      vals.push(z);
      w = {};
      for (v=0; v<numKeys; v++) {
        w[keys[v]] = z[v];
      }
      objs.push(w);
    } else {
      console.log("!!! indexData BAD DATA LENGTH idx[", y, "] is ", z.length, " should be ", numKeys);
    }
  }

  result = {
    "keys": keys,
    "vals": vals,
    "objs": objs,
    "idx": idx
  };

  return result;
}

function getCalc(type, data) {

  console.log("getCalc", type, data);
  
  var vals = data.vals,
      idx = data.idx,
      numVals = vals.length,
      idxKeys = idx.keys,
      
      SYMBOL_IDX = idxKeys["Symbol"],
      ACTION_IDX = idxKeys["ActionNameUS"],
      AMOUNT_IDX = idxKeys["Amount"],

      idxs = [],
      symbols = {},
      actions = {}, 
      amounts = {},

      keys = (meta[type] || data).keys,

      total = 0,

      val, symbol, action, amount, x;

  for (x=0; x<numVals; x++) {
    // row
    val = vals[x];
    //console.log("val", val);
    action = val[ACTION_IDX];
    //console.log("action", action);
    if (type === "All" || type === action) {
      // save idx
      idxs.push(x);
      // get col vals
      symbol = val[SYMBOL_IDX];
      amount = val[AMOUNT_IDX];
      if (type === "All") {
        // init if necessary
        actions[action] = actions[action] || {"idxs":[]};
        actions[action].idxs.push(x);

      }
      // symbol
      symbols[symbol] = symbols[symbol] || {"idxs":[]};
      symbols[symbol].idxs.push(x);
      // amount by symbol
      amounts[symbol] = amounts[symbol] || 0;
      amounts[symbol] = addReal(amounts[symbol], amount);
      // total
      total = addReal(total, amount);
    }
  }

  // modify data
  data.idx.calc[type] = {
    "idxs": idxs,
    "keys": keys,
    "symbols": symbols,
    "actions": actions,
    "amounts": amounts,
    "_total": total
  };

  return data;
}

