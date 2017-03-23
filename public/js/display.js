/*
	<button class="btn btn-lg upload-btn" type="button">Upload File</button>
	$('<button class="btn btn-lg upload-btn" type="button">calc</button>').click(function() {
		show(data);
	})
*/

function initDisplay(data) {
	var indexedData = data.idx ? data : indexData(data);
	$('div#content').replaceWith(
		getMenu({
			"Dividends": "showDividends"
		}, indexedData)
	);
	$('div.container').css({
		'width': '100%'
	})
}

function getMenu(meta, data) {
	var keys = Object.keys(meta),
		numKeys = keys.length,
		menu = $('<select id="menu"><option value="">-- select --</option></select>'),
		key,
		x;

	for(x=0; x<numKeys; x++) {
		key = keys[x];
		menu.append(
			$('<option value="' + key + '">' + key + '</option>')
		)

	}

	menu.change(function(evt) {
		console.log("menu.change", evt);
		var val = menu.val(),
			handler = window[meta[val]] || initDisplay;
		console.log("menu val", val);
		handler(data);
	});

	return menu;
}

function showDividends(data) {
	if (!data.idx.calc["dividends"]) {
		data = getDividendData(data);
	}
	var dat = $('div#data'),
		table = '<table id="dividends" class="display compact" cellspacing="0" width="100%">',
		thead = '<thead><tr>',
		tfoot = '<tfoot><tr>',
		tbody = '<tbody>',
		keys = ['TradeDate','Symbol', 'Amount', 'Description'],
		vals = data.vals,
		numKeys = keys.length,
		div = data.idx.calc.dividends,
		idxs = div.idxs,
		idxKeys = data.idx.keys,
		numIdxs = idxs.length,

		val,
		idx,
		key,
		x,y;

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
	dat.replaceWith(table);
	table.DataTable();
}
