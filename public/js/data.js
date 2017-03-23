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

function indexData(data) {

  console.log("indexData", data);

  var keys = data[0],
      numKeys = keys.length,
      numData = data.length,
      vals = [],
      idx = {"keys":{},"calc":{}},
      x,y,z,
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
    }
  }

  result = {
    "keys": keys,
    "vals": vals,
    "idx": idx
  };

  return result;
}

function getDividendData(data) {

  console.log("getDividendData", data);
  
  var vals = data.vals,
      idx = data.idx,
      numVals = vals.length,
      idxKeys = idx.keys,
      ACTION_IDX = idxKeys["ActionNameUS"],
      SYMBOL_IDX = idxKeys["Symbol"],
      AMOUNT_IDX = idxKeys["Amount"],
      dividendIdxs = [],
      dividendSymbols = {}, 
      dividendTotals = {}, 
      dividendTotal = 0,
      val, symbol, value, x;

  // calc dividends
  for (x=0; x<numVals; x++) {
    val = vals[x];
    if (val[ACTION_IDX] === "Dividend") {
      // save idx
      dividendIdxs.push(x);
      // get col vals
      symbol = val[SYMBOL_IDX];
      value = val[AMOUNT_IDX];
      // init if necessary
      dividendSymbols[symbol] = dividendSymbols[symbol] || {"idxs":[],"vals":[]};
      dividendSymbols[symbol].idxs.push(x);
      dividendSymbols[symbol].vals.push(value);
      // init if necessary
      dividendTotals[symbol] = dividendTotals[symbol] || 0;
      dividendTotals[symbol] = addReal(dividendTotals[symbol], value);
      dividendTotal = addReal(dividendTotal, value);
    }
  }

  // modify data
  data.idx.calc["dividends"] = {
    "idxs": dividendIdxs,
    "symbols": dividendSymbols,
    "totals": dividendTotals,
    "total": dividendTotal
  };

  return data;
}