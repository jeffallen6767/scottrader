var indexedData;
function initDisplay(data) {
	// <button class="btn btn-lg upload-btn" type="button">Upload File</button>
	$('button.upload-btn').replaceWith(
		$('<button class="btn btn-lg upload-btn" type="button">calc</button>').click(function() {
			show(data);
		})
	);
	show(data);
}

function show(data) {
	console.log("show", data);
	indexedData = indexData(data);
	console.log("indexedData");
	console.log(indexedData);
}