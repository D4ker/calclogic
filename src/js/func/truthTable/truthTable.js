// Код, реализующий построение таблицы истинности на основе дерева ParseTree
var columnsElement = [];//все выражения
var element = [];// переменные используемые в выражении

function returnsTheNumberOfVariables() {
	return element.length
}


// Возвращает таблицу истинности в виде массива Y[]
function getTruthTable(string) {
	let tree = getParseTree(string); // Получить дерево синтаксического разбора
	console.log(tree.leaves); // Для написания кода и отладки
	console.log(tree.root); // Для написания кода и отладки

	for (let i = 0; i < tree.leaves.length; i++) { // подсчет кол-ва ординарных переменных
		if (!element.includes(tree.leaves[i].getValue)) {
			element.push(tree.leaves[i].getValue);
		}
	}

	let k = Math.pow(2, element.length); //высота колонки
	console.log(element);

	class Column { //колонка для таблицы???
		constructor(symbol) {
			this.symbol = symbol;
			this.arrayForTruthAndLies = [];
		}

		getSymbol() {
			return this.symbol
		}
	}


	for (let i = 0; i < element.length; i++) {//первоначальное заполнение колонок
		let matrix = new Column(element[i]);
		while (matrix.arrayForTruthAndLies.length !== Math.pow(2, element.length)) {
			FalsePadding(k, matrix);
			TruePadding(k, matrix);
		}
		k = k / 2;
		columnsElement.push(matrix);
	}

	function FalsePadding(k, matrix) {
		for (let j = 0; j < k / 2; j++) {
			matrix.arrayForTruthAndLies.push(0);
		}
	}

	function TruePadding(k, matrix) {
		for (let j = 0; j < k / 2; j++) {
			matrix.arrayForTruthAndLies.push(1);
		}
	}


	let theseElementsShouldNotBeForMultiplication = ['!', '+', '*'];

	let theseElementsShouldNotBeForAmounts = ['!', '*', '+'];
	let Y = [];

	function setY(pr) {
		Y = pr;
	}

	reverseTreeTraversal(tree);//здесь происходит формирование Y[]

	function reverseTreeTraversal(tree) {
		let i = 0;
		while (tree.leaves.length !== 1) {
			let nodeEl = tree.leaves[i];//самый левый нод
			if (nodeEl.parent.getValue === "!") {
				nodeEl.parent.value = negative(tree.leaves[i]);
				if (nodeEl.parent.right === nodeEl) {
					tree.leaves[i] = nodeEl.parent;
					nodeEl.parent = null;
					nodeEl.value = null;
					setY(find(tree.leaves[i], columnsElement));
				}
			} else if (nodeEl.parent.getValue === "*" &&
				!theseElementsShouldNotBeForMultiplication.includes(nodeEl.parent.right.getValue) &&
				!theseElementsShouldNotBeForMultiplication.includes(nodeEl.parent.left.getValue)) {
				if (nodeEl.parent.right.value === nodeEl.value) {
					nodeEl.parent.value = multiplication(tree.leaves[i - 1], tree.leaves[i]);
					tree.leaves[i] = nodeEl.parent;
					nodeEl.parent = null;
					nodeEl.value = null;
					tree.leaves[i].left.parent = null;
					tree.leaves[i].left.value = null;
					tree.leaves.splice(i - 1, 1);
					setY(find(tree.leaves[i], columnsElement));
				} else {
					nodeEl.parent.value = multiplication(tree.leaves[i], tree.leaves[i + 1]);
					tree.leaves[i] = nodeEl.parent;
					nodeEl.parent = null;
					nodeEl.value = null;

					tree.leaves[i].right.parent = null;
					tree.leaves[i].right.value = null;
					tree.leaves.splice(i + 1, 1);
					setY(find(tree.leaves[i], columnsElement));
				}
			} else if (nodeEl.parent.getValue === "+" &&
				!theseElementsShouldNotBeForAmounts.includes(nodeEl.parent.right.getValue) &&
				!theseElementsShouldNotBeForAmounts.includes(nodeEl.parent.left.getValue)) {
				if (nodeEl.parent.right.value === nodeEl.value) {
					nodeEl.parent.value = summation(tree.leaves[i - 1], tree.leaves[i]);
					tree.leaves[i] = nodeEl.parent;
					nodeEl.parent = null;
					nodeEl.value = null;
					tree.leaves[i].left.parent = null;
					tree.leaves[i].left.value = null;
					tree.leaves.splice(i - 1, 1);
					setY(find(tree.leaves[i], columnsElement));
				} else {
					nodeEl.parent.value = summation(tree.leaves[i], tree.leaves[i + 1]);
					tree.leaves[i] = nodeEl.parent;
					nodeEl.parent = null;
					nodeEl.value = null;

					tree.leaves[i].right.parent = null;
					tree.leaves[i].right.value = null;
					tree.leaves.splice(i + 1, 1);
					setY(find(tree.leaves[i], columnsElement));
				}
			}
			i++;
			if (tree.leaves.length !== 1 && tree.leaves.length <= i) {
				i = 0;
			}
		}
		console.log(columnsElement);
	}

// для отрицания
	function negative(el) {
		let notEl;
		if (el.value.length < 2) {
			notEl = "!" + el.getValue;
		} else {
			notEl = "!(" + el.getValue + ")";
		}
		if (!findBool(notEl, columnsElement)) {
			let matrix = new Column(notEl);
			let n = find(el, columnsElement);
			let k = Math.pow(2, element.length);
			elementNegative(n, k, matrix);
			return matrix.symbol;
		}
		return findMatr(notEl, columnsElement);
	}

//инвертор массива
	function elementNegative(n, k, matrix) {
		for (let i = 0; i < k; i++) {
			if (n[i] === 0) {
				matrix.arrayForTruthAndLies.push(1);
			} else matrix.arrayForTruthAndLies.push(0);

		}
		columnsElement.push(matrix);
	}

//находит элемент, и копирует его массив
	function find(el, arr) {
		let i = 0;
		let end;
		while (i !== arr.length) {
			if (el.getValue === arr[i].symbol) {
				end = arr[i].arrayForTruthAndLies.slice();
			}
			i++;
		}
		return end;
	}

// ищет есть ли точно такой элемент Column
	function findBool(el, arr) {
		let i = 0;
		let bool = false;
		while (i !== arr.length) {
			if (el === arr[i].symbol) {
				bool = true;
			}
			i++;
		}
		return bool;
	}

//Если такой элемент уже есть в Column, возвращаем уже существующий элемент
	function findMatr(el, arr) {
		let i = 0;
		while (i !== arr.length) {
			if (el === arr[i].symbol) {
				return arr[i].symbol;
			}
			i++;
		}
	}

// для умножения
	function multiplication(el1, el2) {
		let multEl = el1.getValue + "*" + el2.getValue;
		if (!findBool(multEl, columnsElement)) {
			let matrix = new Column(multEl);
			let n = find(el1, columnsElement);
			let m = find(el2, columnsElement);
			let k = Math.pow(2, element.length);
			multiplicationOfElements(n, m, k, matrix);
			return matrix.symbol;
		}
		return findMatr(multEl, columnsElement);
	}

	function multiplicationOfElements(n, m, k, matrix) {
		for (let i = 0; i < k; i++) {
			if (n[i] * m[i] === 0) {
				matrix.arrayForTruthAndLies.push(0);
			} else matrix.arrayForTruthAndLies.push(1);
		}
		columnsElement.push(matrix);
	}

	//сложение
	function summation(el1, el2) {
		let sumEl = "(" + el1.getValue + "+" + el2.getValue + ")";
		if (!findBool(sumEl, columnsElement)) {
			let matrix = new Column(sumEl);
			let n = find(el1, columnsElement);
			let m = find(el2, columnsElement);
			let k = Math.pow(2, element.length);
			summationOfElements(n, m, k, matrix);
			return matrix.symbol;
		}
		return findMatr(sumEl, columnsElement);
	}

	function summationOfElements(n, m, k, matrix) {
		for (let i = 0; i < k; i++) {
			if (n[i] + m[i] === 0) {
				matrix.arrayForTruthAndLies.push(0);
			} else matrix.arrayForTruthAndLies.push(1);
		}
		columnsElement.push(matrix);
	}

	console.log(Y);//Массив Y[]
	console.log(columnsElement[1].symbol);
	var str = columnsElement;
	{
		if (columnsElement===null)
			str = 'none';
		else
			document.getElementsByTagName('h3')[0].style.display = str;
	}
	DynamicTable1(columnsElement, columnsElement.length);
	return Y;
}

function getColum() {
	return columnsElement;
}


function DynamicTable1(columnsElement, size) {
	for (i = 0; i < size; i++)
		document.write('<p> <span class=\"result\">' + columnsElement[i].symbol + ' = ' + columnsElement[i].arrayForTruthAndLies + '</span> </p>');
}


