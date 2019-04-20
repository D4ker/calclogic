/* Главный js файл, относящийся к странице. Он отвечает за логику на странице и в обязательном порядке вызывает 
getDisNormForm() и getConNormForm() из disConNormForm.js */

// Главная функция, которая обязательно выполнится при первом запуске страницы
function main() {
	let currentURL = window.location.href;
	let disNormForm = getDisNormForm(currentURL.split('?')[1]); /* Взять данные из ссылки, расположенные после первого знака ?, 
	и построить на их основе ДНФ */
	let conNormForm = getConNormForm(currentURL.split('?')[1]); /* Взять данные из ссылки, расположенные после первого знака ?, 
	и построить на их основе КНФ */

	// КОД
};

// КОД

main(); // Запустить главную функцию