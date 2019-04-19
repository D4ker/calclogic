// Добавляет символ value в поле для ввода
function addCurrentValue(value) {
	document.getElementById('func-input').value += value;
};

// Удаляет последний символ из поля для ввода
function removeLastSymbol() {
	const inputString = document.getElementById('func-input').value;
	document.getElementById('func-input').value = inputString.slice(0, inputString.length - 1);
};

// Выполняет парсинг введённых данных
function parser() {
	let inputString = document.getElementById('func-input').value;
	var tree = createParseTree(inputString);
	console.log(tree.leaves);
};

// Анализирует корректность введённых данных
function analyzer() {

};

// Нормирует строку (убирает лишние пробелы и скобки)
function stringNorm(string) {
	string = string.replace(/ /g, ""); // Удалить лишние пробелы
	if (string[0] === "(") {

		let bracket = 1;
		for (let i = 1; i < string.length - 1; i++) {
			let symbol = string[i];
			if (bracket === 0) {
				return string;
			} else if (symbol === "(") {
				bracket++;
			} else if (symbol === ")") {
				bracket--;
			}
		}

		string = string.slice(1, string.length - 1);
	}

	return string;
};

// Создаёт дерево синтаксического разбора
function createParseTree(inputString) {
	let tree = new ParseTree();
	tree.root = new Node();
	createTreeNode(inputString, tree, tree.root);
	return tree;
};

const operandPriority = "+*";

// Создаёт узел для дерева синтаксического разбора
function createTreeNode(string, tree, node) {
	string = stringNorm(string);

	const stringLength = string.length;

	// Если дошли до переменой. Иначе, если длина 2, то это унарная операция над переменной
	if (stringLength === 1) {
		node.value = string;
		tree.leaves.push(node);
		return;
	} else if (stringLength === 2) {
		node.value = "!";
		node.right = new Node(string[1]);
		node.right.parent = node;
		tree.leaves.push(node.right);
		return;
	}

	for (let k = 0; k < operandPriority.length; k++) {
		let bracket = 0;
		let currentOperand = operandPriority[k];
		// Предполагается, что строка корректная (нормированная)
		for (let i = 0; i < stringLength; i++) {
			let symbol = string[i];
			if (symbol === "(") {
				bracket++;
			} else if (symbol === ")") {
				bracket--;
			} else if (bracket === 0 && symbol === currentOperand) {
				node.value = currentOperand;

				node.left = new Node();
				node.right = new Node();

				node.left.parent = node;
				node.right.parent = node;

				createTreeNode(string.slice(0, i), tree, node.left);
				createTreeNode(string.slice(i + 1, stringLength), tree, node.right);

				return;
			}
		}
	}

	node.value = "!";
	node.right = new Node();
	node.right.parent = node;
	createTreeNode(string.slice(1, stringLength), tree, node.right);
};