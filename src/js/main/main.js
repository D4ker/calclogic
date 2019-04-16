function addCurrentValue(value) {
	document.getElementById('func-input').value += value;
};

function removeLastSymbol() {
	var inputString = document.getElementById('func-input').value;
	document.getElementById('func-input').value = inputString.slice(0, inputString.length - 1);
};