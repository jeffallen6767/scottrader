// display.js - (c) 2017 Jeffrey David Allen

function domReplace(jqEl, jqContent) {
	return jqEl.empty().append(jqContent);
}

function initDisplay(data) {
	console.log("initDisplay", data);
	var indexedData = data.idx ? data : indexData(data);
	$('div.container').css({
		'width': '100%'
	});
	domReplace(
		$('div#content'), 
		getMenu({
			"- Select -": "",
			"All Info": "All",
			"Dividends": "Dividend"
		}, indexedData)
	);
}

function getMenu(meta, data) {

	console.log("getMenu", meta, data);

	var keys = Object.keys(meta),
		numKeys = keys.length,
		menu = $('<select id="menu"></select>'),
		key,
		x;

	for(x=0; x<numKeys; x++) {
		key = keys[x];
		menu.append(
			$('<option value="' + key + '">' + key + '</option>')
		)

	}

	menu.change(function(evt) {
		//console.log("menu.change", evt);
		var val = menu.val(),
			type = meta[val];
		//console.log("menu val", val, type);
		show(type, data);
	});

	return menu;
}

function show(type, data) {
	console.log("show", type, data);
	if (type === "") {
		domReplace(
			$('div#data'),
			$('<div></div>')
		);
	} else {
		if (!data.idx.calc[type]) {
			data = getCalc(type, data);
		}
		var table = showDataTable(type, data);
		domReplace(
			$('div#data'),
			table
		);
		table.DataTable();
	}
}

function showDataTable(type, data) {
	
	console.log("showDataTable", type, data);

	var table = '<table class="display compact" cellspacing="0" width="100%">',
		thead = '<thead><tr>',
		tfoot = '<tfoot><tr>',
		tbody = '<tbody>',
		
		vals = data.vals,
		div = data.idx.calc[type],
		idxs = div.idxs,
		keys = div.keys,
		numKeys = keys.length,
		idxKeys = data.idx.keys,
		numIdxs = idxs.length,

		val, idx, key, x, y;

	// head/foot
	for (x=0; x<numKeys; x++) {
		key = keys[x];
		thead += '<th>' + key + '</th>';
		tfoot += '<th>' + key + '</th>';
	}
	thead = $(thead + '</tr></thead>');
	tfoot = $(tfoot + '</tr></tfoot>');

	// body
	for (x=0; x<numIdxs; x++) {
		idx = idxs[x];
		val = vals[idx];
		tbody += '<tr>';
		for (y=0; y<numKeys; y++) {
			key = keys[y];
			tbody += '<td>' + val[idxKeys[key]] + '</td>';
		}
		tbody += '</tr>';
	}
	tbody = $(tbody + '</tbody>');
	table = $(table).append(thead,tfoot,tbody);
	
	return table;
}

