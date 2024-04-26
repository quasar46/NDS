import './fonts/stylesheet.scss';
import './scss/styles.scss';
import $ from "jquery";

document.addEventListener('DOMContentLoaded', function () {
	function openMenu() {
		const body = document.querySelector('body')
		const btn = document.querySelector('.header__menu')
		const content = document.querySelector('.header__content')
		btn.addEventListener('click', function () {
			content.classList.toggle('menu-show')
			// body.classList.toggle('hidden')
			this.classList.toggle('active')
		})
	}
	openMenu()

	function openModal() {
		const btns = document.querySelectorAll('.open-modal')
		const close = document.querySelector('.feedback__close')
		const overlay = document.querySelector('.overlay')
		const body = document.querySelector('body')
		btns.forEach(btn => {
			btn.addEventListener('click', function (e) {
				e.preventDefault()
				overlay.classList.add('show')
				body.classList.add('hidden')
			})
		})
		overlay.addEventListener('click', function (e) {
			const target = e.target
			if (overlay.classList.contains('show')) {
				if (!(target.closest('.feedback'))) {
					overlay.classList.remove('show')
				}
			}
		})
		close.addEventListener('click', function () {
			overlay.classList.remove('show')
			body.classList.remove('hidden')
		})
	}
	openModal()

})

window.addEventListener("DOMContentLoaded", function () {
	[].forEach.call(document.querySelectorAll('.tel'), function (input) {
		var keyCode;
		function mask(event) {
			event.keyCode && (keyCode = event.keyCode);
			var pos = this.selectionStart;
			if (pos < 3) event.preventDefault();
			var matrix = "+7 (___) ___ ____",
				i = 0,
				def = matrix.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, ""),
				new_value = matrix.replace(/[_\d]/g, function (a) {
					return i < val.length ? val.charAt(i++) : a
				});
			i = new_value.indexOf("_");
			if (i != -1) {
				i < 5 && (i = 3);
				new_value = new_value.slice(0, i)
			}
			var reg = matrix.substr(0, this.value.length).replace(/_+/g,
				function (a) {
					return "\\d{1," + a.length + "}"
				}).replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
				this.value = new_value;
			}
			if (event.type == "blur" && this.value.length < 5) {
				this.value = "";
			}
		}

		input.addEventListener("input", mask, false);
		input.addEventListener("focus", mask, false);
		input.addEventListener("blur", mask, false);
		input.addEventListener("keydown", mask, false);

	});

});

function hideEls() {
	const els = document.querySelectorAll('.delegation__wrap .item')
	els.forEach((item, index) => {
		if (index > 5) {
			item.classList.add('hidden')
		}
	})
}
if (window.innerWidth < 768) {
	hideEls()
}

function showEls() {
	const els = document.querySelectorAll('.delegation__wrap .item')
	const btn = document.querySelector('.delegation__btn')
	btn.addEventListener('click', function () {
		this.remove()
		els.forEach(item => {
			item.classList.remove('hidden')

		})
	})

}
if (document.querySelectorAll('.delegation__wrap .item').length > 0) {
	showEls()
}



document.querySelectorAll('a[href^="#"').forEach(link => {

	link.addEventListener('click', function (e) {
		e.preventDefault();
		document.querySelectorAll('a[href^="#"').forEach(item => {
			item.classList.remove('active')
		})
		link.classList.add('active')

		let href = this.getAttribute('href').substring(1);

		const scrollTarget = document.getElementById(href);

		// const topOffset = document.querySelector('.scrollto').offsetHeight;
		const topOffset = 100; // если не нужен отступ сверху 
		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;

		window.scrollBy({
			top: offsetPosition,
			behavior: 'smooth'
		});
	});
});

const linksHeader = document.querySelectorAll('.header__nav a')
const wrapMenuMobile = document.querySelector('.header__content')
const burger = document.querySelector('.header__menu')
linksHeader.forEach(link => {
	link.addEventListener('click', function () {
		wrapMenuMobile.classList.remove('menu-show')
		burger.classList.remove('active')
	})

})


$(".feedback__form").on('submit', function (e) {
	e.preventDefault();
	var $form = $(this); /* получаете текущю форму*/
	$.ajax({
		url: 'action.php',
		type: "POST",
		data: {
			name: $form.find("[name='name']").val(),
			phone: $form.find("[name='phone']").val(),
		},
		success: function (data) {
			window.location = "/thanks.html";
			setTimeout(function () {
				$form.trigger("reset");
			}, 1000);

		}
	})
});

function scrollToTop() {
	setTimeout(function () {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	});
}

const topScroll = document.querySelector('#topScroll')

window.addEventListener('scroll', function () {
	if (pageYOffset > 200) {
		topScroll.classList.add('show')
		topScroll.addEventListener('click', function () {
			scrollToTop()
		})
	} else {
		topScroll.classList.remove('show')
	}
})

const btns = document.querySelectorAll('.btn')
btns.forEach(btn => {
	btn.addEventListener('click', function () {
		this.classList.add('jump')
		setTimeout(function () {
			btn.classList.remove('jump')
		}, 500)
	})
})


// window.AMOPIXEL_IDENTIFIER_PARAMS = window.AMOPIXEL_IDENTIFIER_PARAMS || {};
// window.AMOPIXEL_IDENTIFIER_PARAMS.onload = function (pixel_identifier) {
// 	var visitor_uid = pixel_identifier.getVisitorUid(); // Получаем visitor_uid
// 	// console.log('visitor_uid', visitor_uid);
// 	if (visitor_uid) {
// 		// Записываем его в скрытое поле формы 'visitor_uid'
// 		document.querySelectorAll('.visitor_uid').forEach(vid => {
// 			vid.value = visitor_uid
// 		})
// 	}
// };

