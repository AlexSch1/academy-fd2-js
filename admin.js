$(function(){
	function writePageAdmin() {
		$('.buttom-line').html('<a href="index.html" id="exit-admin">Exit</a>');

		let reservInfo =JSON.parse(localStorage.getItem('reservInfo'));

		let info = $('#admin-one').html();
		let template = Handlebars.compile(info);
		let html;
		
		let	newInfo = [];
		let num = 1
		reservInfo.forEach((value) => {
			let obj = {};
			obj['num'] = num;
			obj['code'] = value['code'];
			obj['name'] = value['name'];
			obj['tel'] = value['tel'];

			if (value['barber'] === 'barber1') {
				obj['barber'] = 'Рома';
			} else if (value['barber'] === 'barber2') {
				obj['barber'] = 'Артем';
			} else if (value['barber'] === 'barber3') {
				obj['barber'] = 'Эдвард';
			} else {
				obj['barber'] = 'Лиза';
			}

			obj['service'] = [];

			value['service'].forEach((val) => {
				obj['service'].push(val);
			});
			newInfo.push(obj);
			num++;
		});

		$('#admin-table').find('tbody').html('');
		newInfo.forEach((value) => {
			html = template(value);
			$('#admin-table').find('tbody').append(html);
		});

		if (!localStorage.getItem('orderWas')) {
			return;
		}

		let goodsvInfo =JSON.parse(localStorage.getItem('orderWas'));
		let	newInfoGoods = [];
		let num2 = 1;

		goodsvInfo.forEach((value) => {
			let obj = {};
			obj['num'] = num2;
			obj['name'] = value['nameClient'];
			obj['tel'] = value['telClient'];
			obj['goods'] = value['goods'];
			newInfoGoods.push(obj);
			num2++;
		});	

		let info2 = $('#admin-two').html();
		let template2 = Handlebars.compile(info2);
		let html2;
		$('#admin-goods').find('tbody').html('');

		newInfoGoods.forEach((value) => {
			html2 = template2(value);
			$('#admin-goods').find('tbody').append(html2);
		});


	}

	writePageAdmin();

	$(document).on('click', '#admin-goods', function(EO) {
		let target = EO.target;
		if (target.className !== 'delete-admin-goods') return;

		let targetParent = $(target).closest('tr');
		let targetParentNum = $(targetParent).find('th[scope="row"]').text();
		targetParentNum = targetParentNum - 1;
		let orderWasFromLocal = JSON.parse(localStorage.getItem('orderWas'));
		orderWasFromLocal.splice(targetParentNum, 1);
		localStorage.setItem('orderWas', JSON.stringify(orderWasFromLocal));
		$(targetParent).remove();
		writePageAdmin();
		
	});

	$(document).on('click', '.btn-add-godd', function(EO) {
		let name = $('#new-goods').find('#input-name').val();
		let price = $('#new-goods').find('#input-price').val();
		let type = $('#new-goods').find('select[name="type"]').val();
		let hold = $('#new-goods').find('select[name="hold"]').val();
		let shine = $('#new-goods').find('select[name="shine"]').val();
		let img =  $('#new-goods').find('#input-img').val();

		if (name === '') {
			$('#new-goods').find('#input-name').css('border', '1px solid red')
			return;
		} else {
			$('#new-goods').find('#input-name').css('border', '1px solid transparent')
		}

		if (price === '') {
			$('#new-goods').find('#input-price').css('border', '1px solid red')
			return;
		} else {
			$('#new-goods').find('#input-price').css('border', '1px solid transparent')
		}

		if (img === '') {
			$('#new-goods').find('#input-img').css('border', '1px solid red')
			return;
		} else {
			$('#new-goods').find('#input-img').css('border', '1px solid transparent')
		}
		
		
		let newGoods = {}

		newGoods['size'] = price;
		newGoods['name'] = name;
		newGoods['hold'] = hold;
		newGoods['shine'] = shine;
		newGoods['type'] = type;
		newGoods['img'] = img;
		
		let infoClientReservFromLocal = JSON.parse(localStorage.getItem('products'));
		
		infoClientReservFromLocal['cotalogs'].push(newGoods);
		localStorage.setItem('products', JSON.stringify(infoClientReservFromLocal));

		$('.new-goods').css('background', '#abef9a');
		$('.new-goods').addClass('animated bounceOutLeft');

		setTimeout(() => {
			$('.new-goods').css('background', 'rgba(216, 216, 216, 0.37)');
			$('.new-goods').removeClass('animated bounceOutLeft');
		},1000);
		writeProductList();	

	});

	function writeProductList() {
		let reservInfo =JSON.parse(localStorage.getItem('products'));
		let info = $('#admin-goods-list').html();
		let template = Handlebars.compile(info);
		let html;
		let num = 1;

		$('#goods-list-head').find('tbody').html('');
		reservInfo['cotalogs'].forEach((val) => {
			let value = val;
			value['num'] = num;
			html = template(val);
			$('#goods-list-head').find('tbody').append(html);
			num++;
		});
	}

	writeProductList();

	$(document).on('click', '.delete-admin-list', function(EO) {
		let target = EO.target;
		let targetParent = $(target).closest('tr');
		let targetParentNum = $(targetParent).find('th[scope="row"]').text();
		targetParentNum = targetParentNum - 1;
		let productFromLocal = JSON.parse(localStorage.getItem('products'));
		productFromLocal['cotalogs'].splice(targetParentNum, 1);
		localStorage.setItem('products', JSON.stringify(productFromLocal));
		$(targetParent).remove();
		writeProductList();	
	});

	$(document).on('blur', '.cheng-price', function(EO) {
		let target = EO.target;
		let txtInput = $(target).html();
		let targetParent = $(target).closest('tr');
		let targetParentNum = $(targetParent).find('th[scope="row"]').text();
		targetParentNum -= 1;
		let productFromLocal = JSON.parse(localStorage.getItem('products'));
		let c = productFromLocal['cotalogs'][targetParentNum]['size'] = txtInput;
		localStorage.setItem('products', JSON.stringify(productFromLocal));
		$(targetParent).addClass('animated shake');
		setInterval(() => {
			$(targetParent).removeClass('animated shake');
		}, 1000);
	});
	

})
