// Добавляет символ value в поле для ввода
function addCurrentValue(value) {
	document.getElementById('func-input').value += value;
};

// Удаляет последний символ из поля для ввода
function removeLastSymbol() {
	const inputString = document.getElementById('func-input').value;
	document.getElementById('func-input').value = inputString.slice(0, inputString.length - 1);
};

// Открывает страницу с таблицей истинности
function createTruthTable() {
	window.open('../func/truthTable.html' + '?' + document.getElementById('func-input').value);
};

// Открывает страницу с картами Карно
function createKarnaughMap() {
	window.open('../func/karnaughMap.html' + '?' + document.getElementById('func-input').value);
};

// Открывает страницу с ДНФ и КНФ
function createDisConNormForm() {
	window.open('../func/disConNormForm.html' + '?' + document.getElementById('func-input').value);
};