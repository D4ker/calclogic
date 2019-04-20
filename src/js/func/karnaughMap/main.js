/* Главный js файл, относящийся к странице. Он отвечает за логику на странице и в обязательном порядке вызывает 
createKarnaughMap() из karnaughMap.js и, если необходимо, другие функции */

// Главная функция, которая обязательно выполнится при первом запуске страницы
function main() {
	let currentURL = window.location.href;
	createKarnaughMap(currentURL.split('?')[1]); /* Взять данные из ссылки, расположенные после первого знака ?, 
	и выполнить на их основе минимизацию картами Карно */

	// КОД
};

// КОД

main(); // Запустить главную функцию