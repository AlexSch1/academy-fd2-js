//Datepicker ========== complite
$( function() {
    let datepicker = new Datepicker('#datepicker', {
    	inline: true
    });  
});

//Clock ========== complite
$( function() {
	//получить часы
	let time = $('time-now')[0];

    function clock() {
		let dataNow = new Date();
		let hour = dataNow.getHours();

		if(hour < 10) hour = '0' + hour;

		let minete = dataNow.getMinutes();

		if(minete < 10) minete = '0' + minete;

		let sec = dataNow.getSeconds();

		if(sec < 10) sec = '0' + sec;

		let output = `${hour} ${minete} ${sec}`;

		$('#timeHour').text(hour);
		$('#timeMinute').text(minete);
		$('#timeSec').text(sec);
	
	}

	let getClock = setInterval(function(){
		clock()
	}, 1000); 

});

//Open-Close Menu ========== complite
$(function() {
	let reserv = document.getElementById('reservation');
	reserv.addEventListener('click', function(EO){
		let target = EO.target;	
		if(!target.hasAttribute("data-open")) return;
		let c = target.parentNode.parentNode.getElementsByClassName('option-list')[0];
		$(c).toggle()
	});

});

//Hover and onhover ========== complite
$(function() {
	let plusHover = $('h4[data-open]');

	for(let i = 0; i < plusHover.length; i++){
		let plus = plusHover[i];
		plus.addEventListener('mouseover', function(){
			hover(plus);
		});
		plus.addEventListener('mouseout', function(){
			onhover(plus);
		});
	}

	function hover(el){
		let hoverHear = el.parentNode.getElementsByClassName('icon-plus')[0];
		hoverHear.classList.add('transformForPlus');
		hoverHear.classList.remove('transformForPlus2');
	}

	function onhover(el){
		let hoverHear = el.parentNode.getElementsByClassName('icon-plus')[0];
		hoverHear.classList.remove('transformForPlus');
		hoverHear.classList.add('transformForPlus2');
	}

});

//Get full year ========== complite
$(function(){
	//получить день
	var date = new Date( );
	let year = date.getFullYear();
	let month = ''
	
	switch (date.getMonth()) {
		case 7:
			month += 'Август ';
			break;
		case 8:
			month += 'Сентябрь ';
	}

	$('.now-monh').append(month);
	$('.now-year').append(year);
});




let pageState = {};
let pageStateFilter = [];

$(function(){
		
	////========== Функция которая записывает в УРЛ
	function switchToState(name, filter) {
		let URL = window.location.hash.substr(1);
		let URLsplit = URL.split('_');
		let newURL = [];
		
		if (!name['home']) {
			newURL[0] = pageState['home'];
		} else {
			newURL[0] = name['home'];
		}

		if (!name['cotalog']) {
			newURL[1] = pageState['cotalog'];
		} else {
			newURL[1] = name['cotalog'];
		}

		let URLjoin = newURL.join('_');
		let filterStr;

		if (filter !== undefined) {
			filterStr = '';
			if (filter.length !== 0) {	
				filter.forEach((value) => {
					filterStr += `_${value}`;
				});
				URLjoin += filterStr;
				location.hash = URLjoin;
				return;
			} else {
				location.hash = URLjoin;
				return;
			}
		} else {
			filterStr = '';
			if (pageStateFilter.length !== 0) {
				pageStateFilter.forEach((value) => {
					filterStr += `_${value}`;
				});
				URLjoin += filterStr;
				location.hash = URLjoin;
				return;
			} else {
				location.hash = URLjoin;
				return;
			}
			
		} 
		
	}


	//========== Функция которая записывает в объект состояния УРЛА
	function writeInObjState (name) {
		if (name.home) {
			pageState.home = name.home;
		} else if (name.cotalog) {
			pageState.cotalog = name.cotalog;
		}
	}

	//Следим за URL (-.-)
	window.addEventListener('hashchange', myHashChange);

	function myHashChange() {
		let URLHash = window.location.hash;
		let stateStr = URLHash.substr(1);		

		if (stateStr !== "") {
			let parst = stateStr.split("_");
			urlNoEmpty(parst);
		} else {
			pageState.home = 'Home1';
			pageState.cotalog = 'AllProducts';
			switchToState({'home': 'Home1', 'cotalog': 'AllProducts'});
			writeHomePage();
			writeCotalogTypeProduct();
		}	
	}


	//========== Отрисовка таблицы
	function writeHomePage() {
		switch (pageState.home) {
			case 'Home1':
				WriteTableReserv('Home1');
				break;
			case 'Home2':
				WriteTableReserv('Home2');
				break;
			case 'Home3':
				WriteTableReserv('Home3');
				break;
		}
	}	

	//========== Коталога
	function writeCotalogTypeProduct() {
		switch (pageState.cotalog) {
			case 'AllProducts':
				getAllProtucts();
				tabsProduct();
				break;
			case 'Crem':
				getTypeProducts('Crem');
				tabsProduct();
				break;	
			case 'Gel':
				getTypeProducts('Gel');
				tabsProduct();
				break;
			case 'Powder':
				getTypeProducts('Powder');
				tabsProduct();
				break;
			case 'Sprey':
				getTypeProducts('Sprey');
				tabsProduct();
				break;
			case 'Shampoo':
				getTypeProducts('Shampoo');
				tabsProduct();
				break;				
		}
	}

	//========== УРЛ не пустой
	function urlNoEmpty(url_split) {
		//Работа с Home  и Cotalog
		let home_state = url_split[0];
		let cotalog_state = url_split[1];
		let old_state = pageState['cotalog'];
		let state = cotalog_state;

		if (!pageState.home) {
			pageState.home = home_state;
			writeHomePage();
		} else if (pageState.home === home_state) {
			//Nothing
		} else if (pageState.home !== home_state) {
			writeInObjState({'home': home_state});
			writeHomePage();		
		}
		getDayLine();

		if (!pageState.cotalog) {
			pageState.cotalog = cotalog_state;
			writeCotalogTypeProduct();	
		} else if (pageState.cotalog === cotalog_state) {
			//Nothing
		} else if (pageState.cotalog !== cotalog_state) {
			writeInObjState({'cotalog': cotalog_state});
			writeCotalogTypeProduct();
		}

		//Работа с Фильтрацией коталога
		//слежка за чекетами
		putChekCotalogOrClear();
	
		if (!url_split[2]) {			
			pageStateFilter = [];
			writeCotalogTypeProduct();		
			return;
		}

		let filter_arry = url_split.slice(2);
		
		if (pageStateFilter.length === 0) {
			writeFilterPage(filter_arry, cotalog_state);
			pageStateFilter = filter_arry;
			return;
		}

		let other = test(filter_arry, pageStateFilter);

		if(other) {	
			if (cotalog_state !== old_state) {
				writeFilterPage(filter_arry, cotalog_state);
				pageStateFilter = filter_arry;	
			}
			//Nothing
		} else {	
			//массивы не равны надо отрисовать новые фильтры	
			writeFilterPage(filter_arry, cotalog_state);
			pageStateFilter = filter_arry;		
		}

		function test(a,b) {
			let c = {};
			a.forEach((value) => {
		        c[value] = 1; 
		    });
		    
		    b.forEach((value) => {
		       c[value] = 1; 
		    });

		    if(Object.keys(c).length === a.length && Object.keys(c).length === b.length) {
		    	return true;
		    }
		}
			
	}

	//========== Отрисовка, если есть фильтры у коталога
	function writeFilterPage(filter_mass, stateCotalog) {
		//Берем из локала продукты
		let tableReserveFromLocal = localStorage.getItem('products');
		let pars_Product = JSON.parse(tableReserveFromLocal);
		let filtrePrice = [];
		let filtreOther = [];
		let allProdPrice = { 'cotalogs': [] };

		if (stateCotalog === 'AllProducts') {
			filter_mass.forEach((value) => {
				if(value === 'price-1' || value === 'price-2' || value === 'price-3') {
					filtrePrice.push(value);
				} else {
					filtreOther.push(value);
				}
			});

			if (filtrePrice.length > 0 && filtreOther.length <= 0) {
				includeValueInPricePage(filtrePrice);				
				writeAllProtuctsFilter(allProdPrice);
			} else if (filtrePrice.length > 0 && filtreOther.length > 0) {
				includeValueInPricePage(filtrePrice);
				getPriceFilter(filtreOther);
			} else if (filtrePrice.length <= 0 && filtreOther.length > 0) {
				getNoPriceFilter(filtreOther);
			}
		} else {
			filter_mass.forEach((value) => {
				if(value === 'price-1' || value === 'price-2' || value === 'price-3') {
					filtrePrice.push(value);
				} else {
					filtreOther.push(value);
				}
			});

			if (filtrePrice.length > 0 && filtreOther.length <= 0) {
				includeValueInPricePage(filtrePrice, stateCotalog);
				writeAllProtuctsFilter(allProdPrice);
			} else if (filtrePrice.length > 0 && filtreOther.length > 0) {
				includeValueInPricePage(filtrePrice, stateCotalog);
				getPriceFilter(filtreOther);
			} else if (filtrePrice.length <= 0 && filtreOther.length > 0) {
				getNoPriceFilter(filtreOther , stateCotalog);
			}
		}


		function writeAllProtuctsFilter(name) {
			$('.products-right-bar #prods').html('');
			let productsAll = $('#products-types').html();
			let tamplateAllProd = Handlebars.compile(productsAll);
			let itemAllProducts;

			name['cotalogs'].forEach((value) => {
				itemAllProducts = tamplateAllProd(value);
				$('.products-right-bar #prods').append(itemAllProducts);
			});

		}

		function includeValueInPricePage(massPrice , cotalog) {
			if (!cotalog) {
				massPrice.forEach((value) => {
					let priceMax;
					let priceMin;

					if(value === 'price-1') {priceMax = 20; priceMin = 10;};
					if(value === 'price-2') {priceMax = 30; priceMin = 20;};
					if(value === 'price-3') {priceMax = 40; priceMin = 30;};

					pars_Product['cotalogs'].forEach((valueCotalog) => {
						if( parseFloat(valueCotalog['size']) >= priceMin && parseFloat(valueCotalog['size']) <= priceMax) {
							allProdPrice[`cotalogs`].push(valueCotalog);
						}
					});

				});
			} else {
				let objType = [];
				pars_Product[`cotalogs`].forEach((value) => {
					if (value[`type`] === cotalog) {
						objType.push(value);
					}
					
				});
				massPrice.forEach((value) => {
					let priceMax;
					let priceMin;

					if(value === 'price-1') {priceMax = 20; priceMin = 10;};
					if(value === 'price-2') {priceMax = 30; priceMin = 20;};
					if(value === 'price-3') {priceMax = 40; priceMin = 30;};

					objType.forEach((valueCotalog) => {
						if( parseFloat(valueCotalog['size']) >= priceMin && parseFloat(valueCotalog['size']) <= priceMax) {
							allProdPrice[`cotalogs`].push(valueCotalog);
						}
					});

				});
			}
			
		}

		function getPriceFilter (name) {
			let = allProdPriceFilter = { 'cotalogs': [] };

			name.forEach((value) => {

				let inputName = value.split('-')[0];
				let inputValue = value.split('-')[1];

				allProdPrice['cotalogs'].forEach((valuePriceCotal) => {

					if(valuePriceCotal[inputName] === inputValue) {
						allProdPriceFilter['cotalogs'].push(valuePriceCotal);
					}

				});

			});

			writeAllProtuctsFilter(allProdPriceFilter);
		}

		function getNoPriceFilter (name, cotalog) {
			let = allProdNo = { 'cotalogs': [] };

			if (!cotalog) {
				name.forEach((value) => {

					let inputName = value.split('-')[0];
					let inputValue = value.split('-')[1];	

					pars_Product['cotalogs'].forEach((valuePriceCotal) => {

						if(valuePriceCotal[inputName] === inputValue) {
							allProdNo['cotalogs'].push(valuePriceCotal);
						}

					});

				});
			} else {
				let objType = [];
				pars_Product[`cotalogs`].forEach((value) => {
					if (value[`type`] === cotalog) {
						objType.push(value);
					}
					
				});
				name.forEach((value) => {

					let inputName = value.split('-')[0];
					let inputValue = value.split('-')[1];	

					objType.forEach((valuePriceCotal) => {

						if(valuePriceCotal[inputName] === inputValue) {
							allProdNo['cotalogs'].push(valuePriceCotal);
						}

					});

				});
			}

			writeAllProtuctsFilter(allProdNo);

		}

	}

	//Слежка за чекнутыми боксами католога - при обнавлении стр и про переходе назад-вперед
	function putChekCotalogOrClear() {
		let URL = window.location.hash.substr(1).split('_');
		let sliceURL = URL.slice(2);
		let input = $('.products-left-bar input:checked').get();
		
		if (sliceURL.length === 0) {
			input.forEach((value) => {
				value.checked = false;
				$(value).next().removeClass('checkbox-custom1-active');
			});
		} else {
			let inputNo = $(`.products-left-bar input`).get();
			inputNo.forEach((value) => {
				value.checked = false;
				$(value).next().removeClass('checkbox-custom1-active');
			});
			sliceURL.forEach((value) => {
				let inputs = $(`.products-left-bar input[value="${value}"`)[0];
				if (!inputs.checked) {
					inputs.checked = true;
					$(inputs).next().addClass('checkbox-custom1-active');
				}
			});
		}	
	}

	//ставич чекбоксы
	$('.products-left-bar')[0].addEventListener('click', function(EO) {
		let target = EO.target;	
		if (target.tagName === 'I' || target.tagName === 'SPAN' || target.tagName === 'LABEL') {			
			$(target.parentNode).find('span').toggleClass('checkbox-custom1-active');
			return;
		} else {
			return
		}
	},true);


	//==========  Отрисовка страниц == СЕКЦИЯ ТАБЛИЦА
		//==========  HandelBadr отрисовка
	function WriteTableReserv(name) {
		let tableReserveFromLocal = localStorage.getItem('tableView');
		let parsC = JSON.parse(tableReserveFromLocal);
		let info = $('#table-reserve-item-template-1').html();
		let template = Handlebars.compile(info);
		let html = template(parsC[name]);

		$('.table-bar').html(html);
		writeChecBoxes(parsC);
	}

		//==========  Отрисовка резервов + добавление id резерва
	function writeChecBoxes(name) {
		let URLHash = window.location.hash;
		let stateStr = URLHash.substr(1).split("_")[0]; //название страницы Home 1-2-3

		name[stateStr]['Barber'].forEach((value, key) => {

			value['box'].forEach((boxValue, boxKey) => {

				if (boxValue == 1) {

					let id = value['id'][boxKey];
					let barberItem = value['data'];
					let items = $('.barber').get();

					items.forEach((valueItem, keyItem) => {

						if (valueItem.getAttribute('data-barber') === barberItem) {	

							let keys = boxKey + 1;
							$(valueItem.parentNode.children[keys]).html(`<div class="box-resirvs" data-selected id="${id}"></div>`);

						}

					});
					
				}

			});

		});	

	}

		//==========  Устанавливаем дату над табл. в зависимости от УРЛА
	function getDayLine() {
		let day = new Date().getDate();
		let datePage = $('.now-day').html();

		if (pageState.home === 'Home1') {
			$('.now-day').html(day++);
		} else if (pageState.home === 'Home2') {
			day += 1;
			$('.now-day').html(day);
		} else {
			day += 2;
			$('.now-day').html(day);
		}

	}

	//==========  Отрисовка страниц == СЕКЦИЯ COTALOG
	//========== Всте товары
	function getAllProtucts() {
		let tableReserveFromLocal = localStorage.getItem('products');
		let parsProduct = JSON.parse(tableReserveFromLocal);
		let productsAll = $('#products-all').html();
		let tamplateAllProd = Handlebars.compile(productsAll);
		let itemAllProducts = tamplateAllProd(parsProduct);
		$('.products-right-bar #prods').html(itemAllProducts);
	}

	//==========Товары по типам
	function getTypeProducts(name) {
		$('.products-right-bar #prods').html('');
		let tableReserveFromLocal = localStorage.getItem('products');
		let parsProduct = JSON.parse(tableReserveFromLocal);

		parsProduct.cotalogs.forEach((value, key) => {
			for (let keyObj in value) {
				let innerHTML = '';

				if(value[keyObj] !== name) continue;

				let productsAll = $('#products-types').html();
				let tamplateAllProd = Handlebars.compile(productsAll);
				let itemAllProducts = tamplateAllProd(value);
				$('.products-right-bar #prods').append(itemAllProducts);
			}		
		});
	}

	//========== Работа с вкладками товаров
	function tabsProduct () {
		let URLHash = window.location.hash;
		let stateStr = URLHash.substr(1);
		let parst = stateStr.split("_")[1]; //название страницы Home 1-2-3

		switch (parst) {
			case 'AllProducts':
				chekTabsBrod('AllProducts');
				break;
			case 'Crem':
				chekTabsBrod('Crem');
				break;
			case 'Gel':
				chekTabsBrod('Gel');
				break;	
			case 'Powder':
				chekTabsBrod('Powder');
				break;	
			case 'Sprey':
				chekTabsBrod('Sprey');
				break;	
			case 'Shampoo':
				chekTabsBrod('Shampoo');
				break;					
		}


		function chekTabsBrod (name) {
			let clearTabs = $(`.products-nav`).find('a').get();

			clearTabs.forEach((value) => {
				if ( $(value).hasClass('active-tabs-product') ) {
					$(value).removeClass('active-tabs-product');
				}
				
			});

			let tabs = $(`.products-nav`).find(`a[data-products="${name}"]`);
			$(tabs).addClass('active-tabs-product')

		}

	}


	//==========  Обработка клика Tabs категории
	$('.products-header').on('click', function(EO) {
		let target = EO.target;

		if (target.tagName === 'A') {
			EO.preventDefault();
		}

		if (target.tagName !== 'A') return;

		switch (target.getAttribute('data-products')) {
			case 'AllProducts':
				switchToState({'cotalog': 'AllProducts'});
				break;
			case 'Crem':
				switchToState({'cotalog': 'Crem'});
				break;
			case 'Gel':
				switchToState({'cotalog': 'Gel'});
				break;
			case 'Powder':
				switchToState({'cotalog': 'Powder'});
				break;
			case 'Sprey':
				switchToState({'cotalog': 'Sprey'});
				break;
			case 'Shampoo':
				switchToState({'cotalog': 'Shampoo'});
				break;				
		}

	});

	
	//========== Обработка клика next день / before день		
	$('.right-bar-now-day').on('click', function(EO) {
		let target = EO.target;
		let date = new Date().getDate();
		let limit = date + 1;
		let nowDay = $('.now-day').html();
		let homePage = pageState.home;
		let URLHash = window.location.hash;
		let stateStr = URLHash.substr(1).split('_')[0];

		if(target.tagName !== 'I') return;

		if (target.className === 'icon-right-open') {
			setDayNext();
		}else if (target.className === 'icon-left-open') {
			setDayBefore();	
		}

		function setDayNext() {
			if(nowDay > limit ) return;
			homePage++;

			if(homePage > 3) return;

			let dayForObj = pageState.home.substr(0, 4);

			if (pageState.home === 'Home1') {
				dayForObj += '2';
				switchToState({'home': dayForObj});
			} else if (pageState.home === 'Home2') {
				dayForObj += '3';
				switchToState({'home': dayForObj});
			}	

		}

		function setDayBefore() {
			if (nowDay <= date) return;

			let dayForObj = pageState.home.substr(0, 4);

			if (pageState.home === 'Home3') {
				dayForObj += '2';
				switchToState({'home': dayForObj});
			}else if (pageState.home === 'Home2') {
				dayForObj += '1';
				switchToState({'home': dayForObj});
			}

		}

	});


	//==========  Обработка клика Фильтра товаров
	$('.products-left-bar').on('click', function(EO) {
		if(EO.target.tagName !== 'INPUT') return;

		//Берем все чекнутые инпуты
		let checkInputArr = []; 
		let input = $('.products-left-bar input:checked').get();
		input.forEach((value) => {
			checkInputArr.push(value.value);
		});

		if (checkInputArr.length > 0) {
			$('.products-right-bar #prods').html('');
			switchToState('', checkInputArr);
		} else {
			switchToState('', checkInputArr);
			writeCotalogTypeProduct();
		}
	});


	//==========  Запускаем слежку за УРЛом
	myHashChange();





	//==========================

	let target;
	//========================== По клику создаем бокс и записываем в Сторедж обнавленную инфу о Таблице
	$('.table-bar').on('click', function(EO) {	
		target = EO.target;
		if(target.className !== 'table-item-box') return;
		if(target.className === 'box-resirvs') return;

		//========================== Генерация уникального когда для резерва
		let code = generationCode ();
		$(target).html(`<div class="box-resirvs" data-selected id="${code}"></div>`);

			//==========================Показываем форму
		$('.popapForReservOnClick').show(500);

		//========= Узнаем какой контейнер у какого барбера чекнут
		let parentChek = target.parentNode;
		let parentChekChildren = $(parentChek).children().slice(1);
		let nameChekBarber = parentChek.firstElementChild.innerHTML; //Имя барбера
		let arrChekNow = [];  //[0] Барбер  [1] индекс куда записать true

		for (let i = 0; i < parentChekChildren.length; i++) {
			let c = parentChekChildren[i].firstElementChild;
			
			if (c) {
				let antC = c.getAttribute('id');
				if (antC === code) {
					arrChekNow[0] = nameChekBarber;
					arrChekNow[1] = i;
					break;
				}
			}
		}


		//========================== Тут раюотаем с формой
		$('#popap-btn-reserv').on('click', function(EO) {
			let thisForm = EO.target.parentNode;
			let input = $( thisForm ).find('input').get();
			let cRadio = $( thisForm );

			//Валидайия текста и телефона
			let inpTelText = validationForm(input);
			let radio = validRadio(cRadio);
			let chek = validChek(cRadio);
			if(inpTelText || radio || chek) return;

			//Запись данных в оюъект - инфа о клиенте который зарезервировал посещение
			let inputName = $( thisForm ).find('input[type="text"]').val();
			let inputTel = $( thisForm ).find('input[type="tel"]').val();
			let answe = [];
			let inputChek = $( thisForm ).find('input[type="checkbox"]:checked').get().forEach((value)=>{
				
				answe.push($(value).val())
				
			});
			let inputRadio = $( thisForm ).find('input[type="radio"]:checked').val();

			//Добавля. все в новый объект - Код-Имя-Телефон-Выбранные уcлуги
			let infoClientReservFromLocal = localStorage.getItem('reservInfo');
			let parsInfoReserv = JSON.parse(infoClientReservFromLocal);
	
			let pushObj = {};

			pushObj['code'] = code;
			pushObj['name'] = inputName;
			pushObj['tel'] = inputTel;
			pushObj['barber'] = inputRadio;
			pushObj['service'] = answe;
			parsInfoReserv.push(pushObj);

			//========================== Добавляем нашу инфу о клиенте в LocaleStarage
			let stringifInfo = JSON.stringify(parsInfoReserv);
			localStorage.setItem('reservInfo', stringifInfo);

			//Закрытие попапа
			$('.popapForReservOnClick').hide(500);

			//Очищаем форму
			input.forEach((vall) => {
				$(vall).val('');
			});

			//Показываем код
			$('#popupCode').show(500);
			$('#popupCode .code-popup').find('h2').html(code)
			$('#popupCode .code-popup').find('button').on('click', ()=>{$('#popupCode').hide(500);});

			//========= Теперь надо  результат положить в  локал стореж в объект tableReserve
			let tableViewFromLocStor = localStorage.getItem('tableView');
			let parsC = JSON.parse(tableViewFromLocStor);

			//========= Узнаем на какой странице мы находимся
			let URLHash = window.location.hash;
			let stateStr = URLHash.substr(1);
			let parst = stateStr.split("_")[0]; //название страницы Home 1-2-3

			//Берем нужный Home > Barber  и проходимся по нему
			//что бы найти нужного и записать true в box
			let BarberObj = parsC[parst]['Barber'];

			BarberObj.forEach((value, key) => {

				if(value['name'] === nameChekBarber) {

					value['box'][arrChekNow[1]] = true;
					value['id'][arrChekNow[1]] = code;

					//и обратно добавляем в localStorage
					localStorage.setItem('tableView', JSON.stringify(parsC));
				}

			});
			
		});		

		$(document).on('click', '.icon-cancel', function(EO) {
			let targetClose = EO.target;
			$(target).html(``);
			$('.popapForReservOnClick').hide(500);
			$(targetClose.parentNode).find('input').get().forEach((value)=>{
				$(value).val('');
			});

		});
			

	});



	//========================== Ф-ця Генерации уникального когда
	function generationCode () {
		let code = 'B';
		for(let i = 0; i < 4; i++) {
			code += Math.round(Math.random() * 10);
		}
		return code;
	}

	//========================== Ф-ци Валидации формы
	function validationForm (massiv) {
		let c;
		massiv.forEach((value) => {

			switch( value.getAttribute('type') ) {
				case 'text': 
					c = valT(value);
					break;
				case 'tel':
					c = valT(value);
					break;	
			}
			if(c === 1) return;
	
		});

		if(c === 1) return true;
		return false;
	}

	function valT (input) {
		let value = input.value;
		let type = input.getAttribute('type');

		if (type === 'text') {
			if (value.length <= 0) {
				input.style.border = "3px solid rgba(255, 0, 0, 0.51)";
				input.setAttribute('placeholder', 'заполните поле');
				return 1;
			} else {
				input.style.border = "3px solid transparent";
				return;
			}
		} else if (type === 'tel') {
			if (value.length <= 0) {
				input.style.border = "3px solid rgba(255, 0, 0, 0.51)";
				input.setAttribute('placeholder', 'заполните поле');
				return 1;
			} else if (isNaN(value)) {
				input.style.border = "3px solid rgba(255, 0, 0, 0.51)";
				input.setAttribute('placeholder', 'заполните поле правильно');
				return 1;
			} else {
				input.style.border = "3px solid transparent";
				return;
			}
		}

	}

	function validRadio (radio) {	
		let ckeckedBox = $(radio).find('input[type="radio"]:checked');

		if (ckeckedBox.length <= 0) {
			$(radio).find('input[type="radio"]').closest('div').find('p').css('color', 'red');
			return 1;
		}
		$(radio).find('input[type="radio"]').closest('div').find('p').css('color', 'inherit');
		return
	}

	function validChek (chek) {
		let ckeckedBox = $(chek).find('input[type="checkbox"]:checked');

		if (ckeckedBox.length <= 0) {

			$(chek).find('input[type="checkbox"]').closest('div').find('p').css('color', 'red');
			return 1;
		}
		$(chek).find('input[type="checkbox"]').closest('div').find('p').css('color', 'inherit');
		return;
	}


	
	//============ Поиск своего резерва по коду 
	let clear;
	$(document).on('click', '.serch-code', function() {

		if(clear) {
			clearInterval(clear);
		}

		let value = $('.serch-code-text').val();
		let addId = '#' + value;
		let URLHash = window.location.hash;
		let stateStr = URLHash.substr(1);
		let parst = stateStr.split("_")[0]; //название страницы Home 1-2-3
		let tableViewFromLocStor = localStorage.getItem('tableView');
		let parsC = JSON.parse(tableViewFromLocStor);


		for (let parstObj  in parsC) {			
			parsC[parstObj]['Barber'].forEach((valueBarb, keyBarb) => {					
				valueBarb['id'].forEach((valueId, keyId) => {
					if (valueId === value) {

						if (parstObj === parst) {						
							clear = setInterval(() => {							
								$(addId).toggleClass('animated jello rubberBand');
								$(addId).addClass('code-box');									
							}, 900);

							setTimeout(function() {
								clearInterval(clear);
								$(addId).removeClass('animated jello rubberBand');
								$(addId).removeClass('code-box');
							}, 10000);
							return;
						}

						switchToState({home: `${parstObj}`});
						clear = setInterval(() => {	
							$(addId).toggleClass('animated jello rubberBand');
							$(addId).addClass('code-box');							
						}, 900);

						setTimeout(function() {
							clearInterval(clear);
							$(addId).removeClass('animated jello rubberBand');
							$(addId).removeClass('code-box');
						}, 10000);
						return;

					}

				});

			});
		}

	});


});



//========== owlCarousel
$(function(){
	$(document).ready(function(){
		$('.owl-carousel').owlCarousel({
			margin:10,
			nav:true,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1000:{
					items:1
				}
			}
		})
	});
})





//========== Работа с Корзиной
$(function(){

	function Basket() {		
		let goods = [];

		function clickOnInBasket(value, price, picture) {
			$('.basket-add').css('display', 'block');
			$('.basket-add').addClass('animated rubberBand');
			
			setTimeout(()=>{
				$('.basket-add').removeClass('rubberBand');	
			},500);	

			let itemGoods = {};
			let name = value.trim();			

			if (!sessionStorage.getItem('goods')) {
				goods = [];
			} else {
				goods = JSON.parse(sessionStorage.getItem('goods'));
			}

			let f = goods.some((value) => {			
				return value['name'] === name;
			});

			if (!f) {
				itemGoods.name = name;
				itemGoods.price = price;
				itemGoods.img = picture;
				goods.push(itemGoods);
				sessionStorage.setItem('goods', JSON.stringify(goods))
			}

			let lengthGoods = goods.length;
			$('.basket-add').html(lengthGoods);

			let priceG = 0;
			goods.forEach((value) => {
				let p = parseFloat(value['price']);
				priceG += p;
			});
			let c = Math.round(priceG * 100) / 100
			$('.bas-num').html(c);

		}

		function clickOnBasket() {
			let goodsFromSesion;
			let info = $('#goods-script').html();
			let template = Handlebars.compile(info);
			let html;			

			if (!sessionStorage.getItem('goods')) {
				$('.send-was').html('Корзину пуста').css({
					'text-align': 'center',
					'padding-top': '50px'
				});
				goods = [];
				$('.order-basket').find('#basket-offer').attr('disabled', 'disabled');
				$('.order-basket').find('#basket-offer').css('opacity', '0.3');
				return;
			} else {
				$('.send-was').html('');
				goodsFromSesion = JSON.parse(sessionStorage.getItem('goods'));
				$('.order-basket').find('#basket-offer').removeAttr('disabled');
				$('.order-basket').find('#basket-offer').css('opacity', '1');

				let priceG = 0;
				goodsFromSesion.forEach((value) => {
					let p = parseFloat(value['price']);
					priceG += p;
					let c = Math.round(priceG * 100) / 100;	
					$('.cost-all').html('');
					$('.cost-all').append(`Итого:${c}`);					
				});		

			}
			
			


			
			$('.basket-goods').html('');
			goodsFromSesion.forEach((value) => {
				html = template(value);
				$('.basket-goods').append(html);
			});



		}

		function clickOnDelete(name) {
			$(name).remove();
			let goodsFromSesion = JSON.parse(sessionStorage.getItem('goods'));
			let nameGoods = $(name).find('.name-goods').html();
			let nameClear = nameGoods.trim();
			
			goodsFromSesion.forEach((value, key) => {
				if (value['name'] === nameClear) {
					goodsFromSesion.splice(key, 1);
				}
			});

			if (goodsFromSesion.length <= 0) {
				sessionStorage.removeItem('goods');
				$('.order-basket').find('#basket-offer').attr('disabled', 'disabled');
				$('.order-basket').find('#basket-offer').css('opacity', '0.5');
				$('.send-was').html('Корзину пуста').css({
					'text-align': 'center',
					'padding-top': '50px'
				});
				$('.basket-add').css('display', 'none');
				$('.cost-all').html('');
				$('.bas-num').html('0');
				let = nameClient = $('.order-basket').find('input[type="text"]');
				let = telClient = $('.order-basket').find('input[type="tel"]');
				nameClient[0].style.border = "3px solid transparent";
				$(nameClient).attr('placeholder', 'Ваше имя');
				telClient[0].style.border = "3px solid transparent";
				$(telClient).attr('placeholder', 'Ваш телефон');
				return;
			}

			let priceG = 0;
			goodsFromSesion.forEach((value) => {
				let p = parseFloat(value['price']);
				priceG += p;	
			});

			let c = Math.round(priceG * 100) / 100;
			$('.cost-all').html('');
			$('.cost-all').append(`Итого:${c}`);

			sessionStorage.setItem('goods', JSON.stringify(goodsFromSesion));

		}

		function clickOnSend() {		
			let input = $('.order-basket input').get();
			let nameClient;
			let telClient;
			let send = validationForm(input);
			
			function validationForm (massiv) {
				let c;

				massiv.forEach((value) => {
					switch (value.getAttribute('type')) {
						case 'text': 
						c = valT(value);
						break;
						case 'tel':
						c = valT(value);
						break;	
					}
					if (c === 1) return;

				});

				if (c === 1) return true;

				nameClient = $('.order-basket').find('input[type="text"]').val();
				telClient = $('.order-basket').find('input[type="tel"]').val();
				
				input.forEach((value) => {
					$(value).val('');
				});				
				return false;
			}

			function valT (input) {
				let value = input.value;
				let type = input.getAttribute('type');

				if (type === 'text') {
					if (value.length <= 0) {
						input.style.border = "3px solid rgba(255, 0, 0, 0.51)";
						input.setAttribute('placeholder', 'заполните поле');
						return 1;
					} else {
						input.style.border = "3px solid transparent";
						return;
					}
				} else if (type === 'tel') {
					if (value.length <= 0) {
						input.style.border = "3px solid rgba(255, 0, 0, 0.51)";
						input.setAttribute('placeholder', 'заполните поле');
						return 1;
					} else if (isNaN(value)) {
						input.style.border = "3px solid rgba(255, 0, 0, 0.51)";
						input.setAttribute('placeholder', 'заполните поле правильно');
						return 1;
					} else {
						input.style.border = "3px solid transparent";
						return;
					}
				}
			}

			if (!send) {
				$('.send-was').addClass('was');
				$('.send-was').html('');
				$('.send-was').html('Заказ оформлен');
				$('.order-basket').find('#basket-offer').attr('disabled', 'disabled');
				$('.order-basket').find('#basket-offer').css('opacity', '0.5');
			} else {
				return;
			}

			let orderPushInLocal = [];		
			let goodObj = {};

			goodObj['nameClient'] = nameClient;
			goodObj['telClient'] = telClient;
			goodObj['goods'] = [];

			let doodsItem = $('.good-item').get();				
			
			doodsItem.forEach((value) => {
				let obj = {};
				obj['name'] = $(value).find('.name-goods').html().trim();
				obj['number'] = $(value).find('input[type="number"]').val();
				obj['size'] = $(value).find('.cost').html().trim();	
				obj['img'] = $(value).find('img').attr('src');
				
				goodObj['goods'].push(obj);		
			});

			
			if (!localStorage.getItem('orderWas')) {
				orderPushInLocal.push(goodObj);
				localStorage.setItem('orderWas', JSON.stringify(orderPushInLocal));
				sessionStorage.setItem('sessionGoodsSend', JSON.stringify(orderPushInLocal))
			} else {
				let orderWasFromLocal = JSON.parse(localStorage.getItem('orderWas'));
				orderWasFromLocal.push(goodObj);
				localStorage.setItem('orderWas', JSON.stringify(orderWasFromLocal));

				orderPushInLocal.push(goodObj);	
				sessionStorage.setItem('sessionGoodsSend', JSON.stringify(orderPushInLocal));
			}
	
			setTimeout(() => {
				$('.send-was').html('');
				sessionStorage.removeItem('goods');
				$('.order-basket').find('#basket-offer').attr('disabled', 'disabled');
				$('.order-basket').find('#basket-offer').css('opacity', '0.5');
				$('.basket-add').css('display', 'none');
				$('.cost-all').html('');
				$('.bas-num').html('0');
				$('.basket-goods').html('');
				$('.send-was').removeClass('was');				
			},5000);

			setTimeout(() => {
				$('.basket-goods').html('Данные отправленны, мы с вами свяжемся');		
			},5100);

			setTimeout(() => {
				$('.basket-goods').html('');	
				$('.send-was').html('Корзину пуста').css({
					'text-align': 'center',
					'padding-top': '50px'
				});	
			},10500);

		}

		function orderWasFlesh() {

			if (sessionStorage.getItem('goods')) {
				let goodsFromSesion = JSON.parse(sessionStorage.getItem('goods'));
				let lengthGoods = goodsFromSesion.length;
				$('.basket-add').html(lengthGoods);
			} 
			return false;	

		}

		return {
			addInBasket: clickOnInBasket,
			openBasket : clickOnBasket,
			delete: clickOnDelete,
			send: clickOnSend,
			orderWasFlesh: orderWasFlesh
		}
	}

	let foo = Basket();

	foo.orderWasFlesh();

	if (sessionStorage.getItem('goods')) {
		$('.basket-add').css('display', 'block');
	}

	$(document).on('click', '.in-basket', function(EO) {
		EO.preventDefault();
		let target = EO.target.parentNode;
		let nameGoods = $(target).find('.product-title').html();
		let priceGoods = $(target).find('.price').text();
		let img = $(target).prev().find('img').attr('src');
		let imgFx = $(target).prev().find('img');

		imgFx.addClass('animated rubberBand');

		setTimeout(()=>{
			imgFx.removeClass('animated rubberBand');	
		},1000);

		let i = imgFx[0].getBoundingClientRect();
		let imgfxClone = imgFx.clone();
		let basket = $('.icon-shopping-basket');
		
		imgfxClone.css({
			'opacity': 1,
			'width': imgFx.width(),
			'position' : 'absolute',
			'z-index' : '9999',
			top: imgFx.offset().top,
			left: i.x
		}).appendTo("body").animate({
			'opacity': 0.05,
			top: basket.offset().top,
			left: basket[0].getBoundingClientRect().x,
			'width': 0
		}, 1000, () => {
			imgfxClone.remove();
		});

		foo.addInBasket(nameGoods, priceGoods, img);
	});

	$('.icon-shopping-basket').on('click', function(EO) {
		foo.openBasket();
	});	

	$(document).on('click', '.basket-goods', function(EO) {
		let target = EO.target;

		if (target.tagName !== 'INPUT') return;

		let valueInput = $(target).val();
		let nameGood = $(target).closest('.good-item').find('.name-goods').text().trim();		
		let goodsFromSesion = JSON.parse(sessionStorage.getItem('goods'));

		goodsFromSesion.forEach((value) => {
			if (value['name'] === nameGood) {
				let prise = value['price'];
				prise *= valueInput;
				value['price'] = prise;
			}
		});	

		let priceG = 0;
		goodsFromSesion.forEach((value) => {
			let p = parseFloat(value['price']);
			priceG += p;
			
		});
		let c = Math.round(priceG * 100) / 100
		$('.cost-all').html('');
		$('.cost-all').append(`Итого:${c}`);

	});

	$(document).on('click', '.delite', function(EO) {
		let target = EO.target.parentNode;
		let parent = $(target).closest('.good-item')[0];
		foo.delete(parent);
	});

	$(document).on('click', '#basket-offer', function(EO) {
		foo.send();
	});

});



//========== Корзину, прокрутка, появление
$(function() {
	let table = $('#reservation')[0].getBoundingClientRect().bottom + window.pageYOffset;
	let span = $('<span class="bas-num">0</span>');
	let span2 = $('<span></span>');
	
	window.onscroll = scrollBasret;

	function scrollBasret() {
		if (window.pageYOffset > table ) {
			$('.basket').addClass('scroll animated bounceInRight');
			$('.basket').append(span)
		} else {
			$('.basket').removeClass('scroll');
			$('.basket .bas-num').remove();
		}

		if (sessionStorage.getItem('goods')) {
			let goodsFromSesion = JSON.parse(sessionStorage.getItem('goods'));
			let priceG = 0;
			goodsFromSesion.forEach((value) => {
				let p = parseFloat(value['price']);
				priceG += p;
			});
			let c = Math.round(priceG * 100) / 100
			$('.bas-num').html(c);
		} 
	}

	scrollBasret();

})


//========== Вход в админку
$(function(){

	$(document).on('click', '#use-subm', function(EO) {
		let name = $('#use-modal').find('input[type="name"]').val();
		let password = $('#use-modal').find('input[type="password"]').val();
		
		if (name !== 'admin' || password !== 'admin') {
			EO.preventDefault();
			return;
		}	
	});

})





