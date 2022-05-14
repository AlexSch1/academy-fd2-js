//========================== Подключение данных - json и их добавление в localeStorage


	$.ajax('../json/tableReserv.json', {
		type: 'GET',
		dataType: 'json',
		success: dataLoaded,
		error:errorHandler 
	});

	function dataLoaded(date) {
		if(localStorage.getItem('tableView')) return
		localStorage.setItem('tableView', JSON.stringify(date));
	}

	function errorHandler(jqXHR,statusStr,errorStr) {
		console.log(statusStr+' '+errorStr)
	}

	function infoReserv() {
		let info = [];
		if( localStorage.getItem('reservInfo') ) return
		localStorage.setItem('reservInfo', JSON.stringify(info));
	}

	infoReserv();

	$.ajax('../json/products.json', {
		type: 'GET',
		dataType: 'json',
		success: dataLoadedProduct,
		error:errorHandler 
	});

	function dataLoadedProduct(date) {
		if(localStorage.getItem('products')) return
		localStorage.setItem('products', JSON.stringify(date));
	}

	$.ajax('../json/coment.json', {
		type: 'GET',
		dataType: 'json',
		success: dataLoadedConemt,
		error:errorHandler 
	});

	function dataLoadedConemt(date) {
		if(localStorage.getItem('comment')) return
		localStorage.setItem('comment', JSON.stringify(date));
	}

	$.ajax('../json/conemts.json', {
		type: 'GET',
		dataType: 'json',
		success: dataLoadedConemt2,
		error:errorHandler 
	});

	function dataLoadedConemt2(date) {
		if(localStorage.getItem('commentUser')) return
			localStorage.setItem('commentUser', JSON.stringify(date));
	}
