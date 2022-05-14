//Comments
$(function(){

	let JsonComments_1 = {
		'user': [
			{'name': 'Alex', 'txt': 'Chance too good. God level bars. Im so proud of LifeOfDesiigner 1 song in the country. Panda! Dont be scared of the truth because we need to restart the human foundation in truth I stand with the most humility. We are so blessed!'},
			{'name': 'Camber', 'txt': 'Hello guys, nice to have you on the platform! There will be a lot of great stuff coming soon. We will keep you posted for the latest news.'},
			{'name': 'Tina', 'txt': 'Hello guys, nice to have you on the platform!'},
			{'name': 'Andrew', 'txt': 'Hello guys'},
			{'name': 'Tina Andrew', 'txt': 'nice to have you on the platform!'},
			{'name': 'Tim Ande', 'txt': 'niceplatform!'},
			{'name': 'Andrew', 'txt': 'Hello guys'}
		]
	};

	let JsonComments = JSON.parse(localStorage.getItem('commentUser'));

	function baseComment() {
		let jsComment = $('#comments-media').html();
		let template = Handlebars.compile(jsComment);
		$('.media-wrapp').html('');
		for(let i = 0; i < 3; i++) {
			let date = template(JsonComments['user'][i]);
			
			$('.media-wrapp').append(date);
		}
	}

	baseComment();

	

	$(document).on('click', '.btn-more', function(EO) {
		writeNewComment();
	});

	

	function writeNewComment() {
		let jsComment = $('#comments-media').html();
		let template = Handlebars.compile(jsComment);
		let target = $('.media-wrapp');
		let lengMedia = $(target).find('.media').length;
		let premedia = lengMedia + 2;
		
		for(let i = lengMedia; i < premedia; i++) {

			if(lengMedia >= JsonComments['user'].length) return;

			if(premedia > JsonComments['user'].length) {
				let difference = JsonComments['user'].length - premedia;
				for(let p = i; p < difference; p++) {
					let date = template(JsonComments['user'][p]);
					$('.media-wrapp').append(date);
				}
				return;
			}

			let date = template(JsonComments['user'][i]);
			$('.media-wrapp').append(date);
		}
	}


	//Доюавление нового комента
	$(document).on('click', '.add-comment', function(EO) {
		let area = $('#exampleBlogPost').val();
		let nameUsrer = $('#new-user-name').val();
		let setUser = {};

		if(!area) return;

		if (nameUsrer === '') {
			setUser['name'] = 'user';
		} else {
			setUser['name'] = nameUsrer;
		}

		//Добавляем в объект новогый комент ---- это пока что неизвестный пользователь
		
		
		setUser['txt'] = area;
		JsonComments['user'].unshift(setUser);

		baseComment();
		$('#exampleBlogPost').val('');

		localStorage.setItem('commentUser', JSON.stringify(JsonComments));

	});

	//Визуал текса ареа
	$(document).on('focus', '#exampleBlogPost', function(EO) {
		$('label[for="exampleBlogPost"]').animate( {'font-size':10} ,300);
        $(EO.target).css('border-bottom', '2px solid #9c27b0');
         
	});

	$(document).on('focusout', '#exampleBlogPost', function(EO) {
		$('label[for="exampleBlogPost"]').animate( {'font-size':16} ,300);
        $(EO.target).css('border-bottom', '2px solid #9c27b038');
	});

});