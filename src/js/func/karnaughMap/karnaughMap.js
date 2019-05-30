// Код, реализующий минимизацию картами Карно на основе массива Y[]

let firstLineArrayVer = [];
let firstColumnArrayVer = [];
let lastLineArrayVer = [];
let lastColumnArrayVer = [];

let firstLineArrayHor = [];
let firstColumnArrayHor = [];
let lastLineArrayHor = [];
let lastColumnArrayHor = [];

let firstLineArray = [];
let firstColumnArray = [];
let lastLineArray = [];
let lastColumnArray = [];

/*
TODO
принимаем количество переменных и массив
необходимо сделать: array и сформировать код грея.
можно в начале сформировать код грея, зная число переменных, Затем по массиву кода грея заполнить массив array

TODO
на данном этапе можно сформировать представление числа из входного массива, затем его увеличивать на единицу, затем
по  carnotMap определить индекс в массиве array и занести его в массив array
*/

class IndexVertical {
	constructor(firstIndexLine, firstIndexColumn, lastIndexLine, lastIndexColumn) {
		this.firstIndexLine = firstIndexLine;
		this.firstIndexColumn = firstIndexColumn;
		this.lastIndexLine = lastIndexLine;
		this.lastIndexColumn = lastIndexColumn;
		firstLineArrayVer.push(firstIndexLine);
		firstColumnArrayVer.push(firstIndexColumn);
		lastLineArrayVer.push(lastIndexLine);
		lastColumnArrayVer.push(lastIndexColumn);
		this.glueMore();
	}

	glueMore() {
		for (let i = 0; i < firstLineArrayVer.length; i++) {
			for (let j = 0; j < firstLineArrayVer.length; j++) {
				let sameFirstLine = firstLineArrayVer[i] === firstLineArrayVer[j];
				let sameLastLine = lastLineArrayVer[i] === lastLineArrayVer[j];
				let sameColumn = firstColumnArrayVer[i] === Math.abs(firstColumnArrayVer[j] - 1);
				if (sameFirstLine && sameLastLine && sameColumn) {
					lastColumnArrayVer[i] = lastColumnArrayVer[j];
					deleteElementVer(j);
				}
			}
		}
	}
}

function deleteElementVer(j) {
	delete firstColumnArrayVer[j];
	delete firstLineArrayVer[j];
	delete lastLineArrayVer[j];
	delete lastColumnArrayVer[j];
}

class IndexHorizontal {
	constructor(firstIndexLine, firstIndexColumn, lastIndexLine, lastIndexColumn) {
		this.firstIndexLine = firstIndexLine;
		this.firstIndexColumn = firstIndexColumn;
		this.lastIndexLine = lastIndexLine;
		this.lastIndexColumn = lastIndexColumn;
		firstLineArrayHor.push(firstIndexLine);
		firstColumnArrayHor.push(firstIndexColumn);
		lastLineArrayHor.push(lastIndexLine);
		lastColumnArrayHor.push(lastIndexColumn);
		this.glueMore();
	}

	glueMore() {
		for (let i = 0; i < firstLineArrayHor.length; i++) {
			for (let j = 0; j < firstLineArrayHor.length; j++) {
				let sameColumnFirst = firstColumnArrayHor[i] === firstColumnArrayHor[j];
				let sameColumnLast = lastColumnArrayHor[i] === lastColumnArrayHor[j];
				let sameLine = firstLineArrayHor[i] === Math.abs(firstLineArrayHor[j] - 1);
				if (sameColumnFirst && sameColumnLast && sameLine) {
					lastLineArrayHor[i] = lastLineArrayHor[j];
					deleteElementHor(j);
				}
			}
		}
	}
}

function deleteElementHor(j) {
	delete firstLineArrayHor[j];
	delete firstColumnArrayHor[j];
	delete lastLineArrayHor[j];
	delete lastColumnArrayHor[j];
}

let array = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
];

// Строит карты Карно на основе массива Y[]
let truthArray = [];

function createKarnaughMap(string) {
	truthArray = getTruthTable(string); // Получить Y[]
	// КОД
};

let inputArray = truthArray;
//let inputArray = [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1];
let numberVar = Math.log(inputArray.length) / Math.log(2);
let binaryVar = [];

function initializeBinaryVar() {
	let binaryString = '';
	let flag = 1;
	for (let i = 0; i < numberVar; i++) {
		binaryVar[i] = 0;
	}

	for (let k = 0; k < inputArray.length; k++) {
		binaryString = binaryVar.join('');
		locationInArray(binaryString);
		array[indexLineInArray][indexColumnInArray] = inputArray[k];
		for (let i = 0; i < numberVar; i++) {
			if (binaryVar[i] === 0) {
				flag = 0;
			}
		}
		if (flag === 0) {
			addBinaryNumbers()
		}
	}
}

let indexLineInArray;
let indexColumnInArray;

function locationInArray(binaryStr) {
	let arrayCodeGray = chooseGrayCode();
	for (let i = 0; i < arrayCodeGray.length; i++) {
		for (let j = 0; j < arrayCodeGray[0].length; j++) {
			if (arrayCodeGray[i][j] === binaryStr) {
				indexLineInArray = i;
				indexColumnInArray = j;
			}
		}
	}
}

function addBinaryNumbers() {
	for (let i = 0; i < numberVar; i++) {
		if (binaryVar[numberVar - 1 - i] === 0) {
			binaryVar[numberVar - 1 - i] = 1;
			break;
		} else {
			binaryVar[numberVar - i - 1] = 0;
		}

	}
}

let line;
let column;

function initializeLineColumn() {
	switch (numberVar) {
		case 2:
			line = 2;
			column = 2;
			break;
		case 3:
			line = 2;
			column = 4;
			break;
		case 4:
			line = 4;
			column = 4;
			break;
		case 5:
			line = 8;
			column = 4;
			break;
		default:
			alert('при таком количестве переменных минимизация картами Карно не является оптимальной');
	}
	for (let i = 0; i < line; i++) {
		for (let j = 0; j < column; j++) {
			array[i][j] = 0;
		}
	}
}

/*
arrayFlagHorizontal отвечает за то, пройден ли элемент
true - элемент не пройден, false - элемент пройден
 */
let arrayFlagHorizontal = [];
let arrayFlagVertical = [];

function initializeFlagArray() {
	for (let i = 0; i < line; i++) {
		arrayFlagHorizontal[i] = [];
		arrayFlagVertical[i] = [];
		for (let j = 0; j < column; j++) {
			arrayFlagHorizontal[i][j] = 1;
			arrayFlagVertical[i][j] = 1;
		}
	}
}

function initializeFlagArrayZero() {
	for (let i = 0; i < line; i++) {
		for (let j = 0; j < column; j++) {
			if (array[i][j] === 0) {
				arrayFlagHorizontal[i][j] = 0;
			}
		}
	}
	for (let j = 0; j < column; j++) {
		for (let i = 0; i < line; i++) {
			if (array[i][j] === 0) {
				arrayFlagVertical[i][j] = 0;
			}
		}
	}
}

let carnotMap2 = [
	['00', '01'],
	['10', '11'],
];

let carnotMap3 = [
	['000', '001', '011', '010'],
	['100', '101', '111', '110'],
];

let carnotMap4 = [
	['0000', '0001', '0011', '0010'],
	['0100', '0101', '0111', '0110'],
	['1100', '1101', '1111', '1110'],
	['1000', '1001', '1011', '1010'],
];

let carnotMap5 = [
	['00000', '00001', '00011', '00010'],
	['00100', '00101', '00111', '00110'],
	['01100', '01101', '01111', '01110'],
	['01000', '01001', '01011', '01010'],
	['11000', '11001', '11011', '11010'],
	['11100', '11101', '11111', '11110'],
	['10100', '10101', '10111', '10110'],
	['10000', '10001', '10011', '10010'],
];

let degree2 = [2, 4, 8, 16, 32];

//метод проверяет симметрию относительно колонок
function HorizontalSymmetry(firstIndex, lastIndex) {
	let midlle = (column / 2) - 1;
	if (firstIndex < midlle && lastIndex >= midlle) {
		let distanceLeft = midlle - firstIndex;
		let distanceRight = lastIndex - midlle;
		return (distanceLeft === distanceRight);
	}
	return true;
}

let firstIndexLineHor = 0;
let firstIndexColumnHor = 0;
let lastIndexLineHor = 0;
let lastIndexColumnHor = 0;
let flagGroupHor = 1;
let counterHor = 0;
let flagStartIndexHor = 1;

function initialFlagHor() {
	firstIndexLineHor = 0;
	firstIndexColumnHor = 0;
	lastIndexLineHor = 0;
	lastIndexColumnHor = 0;
	flagGroupHor = 1;
	counterHor = 0;
	flagStartIndexHor = 1;
}

function initializeFirstIndexH(i, j) {
	let isFirst = flagStartIndexHor === 1 && array[i][j] === 1;
	if (isFirst) {
		firstIndexColumnHor = j;
		firstIndexLineHor = i;
		flagStartIndexHor = 0;
	}
}

function glueNoEndHor(i, j) {
	let noEnd = j !== column - 1;
	if (noEnd && arrayFlagHorizontal[i][j] !== 0 && flagGroupHor === 1) {
		let nextUnit = array[i][j] === 1 && array[i][j + 1] === 1;
		if (nextUnit) {
			arrayFlagHorizontal[i][j] = 0;
			lastIndexLineHor = i;
			lastIndexColumnHor = j;
			counterHor++;
		}
		let nextZero = array[i][j] === 1 && array[i][j + 1] === 0;
		if (nextZero) {
			arrayFlagHorizontal[i][j] = 0;
			lastIndexLineHor = i;
			lastIndexColumnHor = j;
			flagGroupHor = 0;
			counterHor++;
		}
	}
}

function glueEndHor(i, j) {
	let end = j === column - 1;
	if (end) {
		if (array[i][j] === 1) {
			arrayFlagHorizontal[i][j] = 0;
			lastIndexLineHor = i;
			lastIndexColumnHor = j;
			counterHor++;
			flagGroupHor = 0;
		}
	}
}

function glueNotEvenHor(i, j) {
	let isDegree2 = degree2.includes(counterHor);
	if (!isDegree2 && flagGroupHor === 0 && counterHor !== 1) {
		counterHor--;
		lastIndexColumnHor--;
		arrayFlagHorizontal[i][j] = 0;
		new IndexHorizontal(firstIndexLineHor, firstIndexColumnHor, lastIndexLineHor, lastIndexColumnHor);
		counterHor = 0;
		firstIndexColumnHor = j;
		firstIndexLineHor = i;
		lastIndexLineHor = i;
		lastIndexColumnHor = j;

	}
}

function overrideFlagHor(i, j) {
	if (array[i][j] === 0) {
		flagGroupHor = 1;
		flagStartIndexHor = 1;
		counterHor = 0;
	}
}

function unitGroupH() {
	for (let i = 0; i < line; i++) {
		initialFlagHor();
		for (let j = 0; j < column; j++) {
			if (arrayFlagHorizontal[i][j] === 1) {
				initializeFirstIndexH(i, j);
				glueNoEndHor(i, j);
				glueEndHor(i, j);
			}
			glueNotEvenHor(i, j);
			overrideFlagHor(i, j);
			if (flagGroupHor === 0) {
				new IndexHorizontal(firstIndexLineHor, firstIndexColumnHor, lastIndexLineHor, lastIndexColumnHor)
			}
		}
	}
}

let counterVer;
let firstIndexLineVer;
let firstIndexColumnVer;
let lastIndexColumnVer;
let lastIndexLineVer;
let flagStartIndexVer = 1;
let flagGroupVer = 1;

function initializeFlag() {
	firstIndexLineVer = 0;
	firstIndexColumnVer = 0;
	lastIndexLineVer = 0;
	lastIndexColumnVer = 0;
	flagGroupVer = 1;
	counterVer = 0;
	flagStartIndexVer = 1;
}

function initializeFirstIndex(i, j) {
	let isFirst = flagStartIndexVer === 1 && array[i][j] === 1;
	if (isFirst) {
		firstIndexColumnVer = j;
		firstIndexLineVer = i;
		flagStartIndexVer = 0;
	}
}

function glueNoend(i, j) {
	let end = i === line - 1;
	if (!end && arrayFlagVertical[i][j] !== 0 && flagGroupVer === 1) {
		let nextUnit = array[i][j] === 1 && array[i + 1][j] === 1;
		if (nextUnit) {
			arrayFlagVertical[i][j] = 0;
			lastIndexLineVer = i;
			lastIndexColumnVer = j;
			counterVer++;
		}
		let nextZero = array[i][j] === 1 && array[i + 1][j] === 0;
		if (nextZero) {
			arrayFlagVertical[i][j] = 0;
			lastIndexLineVer = i;
			lastIndexColumnVer = j;
			flagGroupVer = 0;
			counterVer++;
		}
	}
}

function glueEnd(i, j) {
	let end = i === line - 1;
	if (end) {
		if (array[i][j] === 1) {
			counterVer++;
			arrayFlagVertical[i][j] = 0;
			lastIndexLineVer = i;
			lastIndexColumnVer = j;
			flagGroupVer = 0;
		}
	}
}

function glueNotEven(i, j) {
	let isDegree2 = degree2.includes(counterVer);
	if (!isDegree2 && flagGroupVer === 0 && counterVer !== 1) {
		counterVer--;
		lastIndexLineVer--;
		arrayFlagVertical[i][j] = 1;
		new IndexVertical(firstIndexLineVer, firstIndexColumnVer, lastIndexLineVer, lastIndexColumnVer);
		counterVer = 0;
		firstIndexLineVer = i;
		firstIndexColumnVer = j;
		lastIndexLineVer = i;
		lastIndexColumnVer = j;
	}
}

function overrideFlag(i, j) {
	if (array[i][j] === 0) {
		flagGroupVer = 1;
		flagStartIndexVer = 1;
		counterVer = 0;
	}
}

function unitGroupVertical() {
	for (let j = 0; j < column; j++) {
		initializeFlag();
		for (let i = 0; i < line; i++) {
			if (arrayFlagVertical[i][j] === 1) {
				initializeFirstIndex(i, j);
				glueNoend(i, j);
				glueEnd(i, j);
			}
			glueNotEven(i, j);
			overrideFlag(i, j);
			if (flagGroupVer === 0) {
				new IndexVertical(firstIndexLineVer, firstIndexColumnVer, lastIndexLineVer, lastIndexColumnVer);
			}
		}
	}
}

function mix() {
	for (let i = 0; i < firstLineArrayHor.length; i++) {
		for (let j = 0; j < firstLineArrayVer.length; j++) {
			let conditionFirstLineMore = firstLineArrayVer[j] >= firstLineArrayHor[i];
			let conditionFirstLineSmaller = firstLineArrayVer[j] <= lastLineArrayHor[i];
			let conditionFirstLine = conditionFirstLineMore && conditionFirstLineSmaller;
			let conditionLastLineMore = lastLineArrayVer[j] >= firstLineArrayHor[i];
			let conditionLastLineSmaller = lastLineArrayVer[j] <= lastLineArrayHor[i];
			let conditionLastLine = conditionLastLineMore && conditionLastLineSmaller;
			let conditionalFirstColumnMore = firstColumnArrayVer[j] >= firstColumnArrayHor[i];
			let conditionalFirstColumnSmaller = firstColumnArrayVer[j] <= lastColumnArrayHor[i];
			let conditionalFirstColumn = conditionalFirstColumnMore && conditionalFirstColumnSmaller;
			let conditionalLastColumnMore = lastColumnArrayVer[j] >= firstColumnArrayHor[i];
			let conditionalLastColumnSmaller = lastColumnArrayVer[j] <= lastColumnArrayHor[i];
			let conditionalLastColumn = conditionalLastColumnMore && conditionalLastColumnSmaller;
			if (conditionalFirstColumn && conditionalLastColumn && conditionFirstLine && conditionLastLine) {
				deleteElementVer(j);
			}
		}
	}

	for (let i = 0; i < firstLineArrayVer.length; i++) {
		for (let j = 0; j < firstLineArrayHor.length; j++) {
			let conditionFirstLineMore = firstLineArrayHor[j] >= firstLineArrayVer[i];
			let conditionFirstLineSmaller = firstLineArrayHor[j] <= lastLineArrayVer[i];
			let conditionFirstLine = conditionFirstLineMore && conditionFirstLineSmaller;
			let conditionLastLineMore = lastLineArrayHor[j] >= firstLineArrayVer[i];
			let conditionLastLineSmaller = lastLineArrayHor[j] <= lastLineArrayVer[i];
			let conditionLastLine = conditionLastLineMore && conditionLastLineSmaller;
			let conditionFirstColumnMore = firstColumnArrayHor[j] >= firstColumnArrayVer[i];
			let conditionFirstColumnSmaller = firstColumnArrayHor[j] <= lastColumnArrayVer[i];
			let conditionFirstColumn = conditionFirstColumnMore && conditionFirstColumnSmaller;
			let conditionLastColumnMore = lastColumnArrayHor[j] >= firstColumnArrayVer[i];
			let conditionLastColumnSmaller = lastColumnArrayHor[j] <= lastColumnArrayVer[i];
			let conditionLastColumn = conditionLastColumnMore && conditionLastColumnSmaller;
			if (conditionFirstColumn && conditionFirstLine && conditionLastColumn && conditionLastLine) {
				deleteElementHor(j);
			}
		}
	}
}

function mergeArray() {
	Array.prototype.push.apply(firstLineArray, firstLineArrayVer);
	Array.prototype.push.apply(firstLineArray, firstLineArrayHor);
	Array.prototype.push.apply(lastLineArray, lastLineArrayVer);
	Array.prototype.push.apply(lastLineArray, lastLineArrayHor);
	Array.prototype.push.apply(firstColumnArray, firstColumnArrayVer);
	Array.prototype.push.apply(firstColumnArray, firstColumnArrayHor);
	Array.prototype.push.apply(lastColumnArray, lastColumnArrayVer);
	Array.prototype.push.apply(lastColumnArray, lastColumnArrayHor);
}

let res = '';
let symbol = ['A', 'B', 'C', 'D', 'E'];

//работа с годом Грея и массивом индексов
function grayCode(carnotMap) {
	let length = carnotMap[0][0].length;
	let factor = '';
	let flag = 1;
	let char;
	for (let m = 0; m < firstLineArray.length; m++) {// перебираем все склейки
		if (firstLineArray[m] !== undefined) {
			for (let k = 0; k < length; k++) { //перебираем все символы
				let line;
				let column;
				if (firstLineArray[m] !== undefined) {
					line = firstLineArray[m];
					column = firstColumnArray[m];
					char = (carnotMap[line][column]).charAt(k);
					for (let i = firstLineArray[m]; i <= lastLineArray[m]; i++) {
						for (let j = firstColumnArray[m]; j <= lastColumnArray[m]; j++) {
							if (char !== carnotMap[i][j].charAt(k)) {
								flag = 0;
							}
						}
					}
				}
				if (flag === 1) {
					if (char === '0') {
						factor += '!' + symbol[k];
						//factor += '!x' + (length - k);
					} else {
						factor += symbol[k];
						//factor += 'x' + (length - k);
					}
				}
				flag = 1;
			}
			if (m === firstLineArray.length - 1) {
				res += factor;
			} else {
				res += factor + "+";
			}
			factor = '';
		}
	}
	if (res.charAt(res.length - 1) === '+') {
		res = res.slice(0, res.length - 1);
	}
}

function chooseGrayCode() {
	let arrayCodeGray = [];
	switch (numberVar) {
		case 2:
			arrayCodeGray = carnotMap2;
			break;
		case 3:
			arrayCodeGray = carnotMap3;
			break;
		case 4:
			arrayCodeGray = carnotMap4;
			break;
		case 5:
			arrayCodeGray = carnotMap5;
			break;
		default:
	}
	return arrayCodeGray;
}

function main() {
	//createKarnaughMap(string);
	initializeLineColumn();
	initializeBinaryVar();
	initializeFlagArray();
	initializeFlagArrayZero();
	unitGroupVertical();
	unitGroupH();
	mix();
	mergeArray();
	grayCode(chooseGrayCode());
}

main();
document.write('<p> <span class=\"result\">' + 'Результаты минимизации карты Карно = ' + res + '</span> </p>');