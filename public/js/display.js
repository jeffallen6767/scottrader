var indexedData;
function initDisplay(data) {
	indexedData = indexData(data);
	// <button class="btn btn-lg upload-btn" type="button">Upload File</button>
	$('div#content').replaceWith(
		getMenu({
			"Dividends": "showDividends"
		}, indexedData)
	);
}

function getMenu(meta, data) {
	var keys = Object.keys(meta),
			numKeys = keys.length,
			menu = $('<select id="menu"><option value="">-- select --</option></select>'),
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

}
/*

  
  $('<button class="btn btn-lg upload-btn" type="button">calc</button>').click(function() {
			show(data);
		})

*/