window.onscroll = ()=>{
	sidebarActivation();
	s2Animation();
};

window.onresize = ()=>{
	if(window.screen.width < 760){
		sideMenu.classList.remove('active');
		sections.forEach((s)=>{
			s.style.removeProperty('padding-right');
		});
	}
};

//sidebar activation
const sections = document.querySelectorAll('section');
const coachImg = document.querySelector('.intro__img');
const sideMenu = document.querySelector('.side-menu');
const introBackgroundImg = document.querySelector('.image-bg__outter');


function sidebarActivation () {
	if(window.pageYOffset > 85 && window.screen.width > 760)
		{
			sideMenu.classList.add('active');
			introBackgroundImg.classList.add('offsetLeft'); 
			//width of fixed side menu = 250px 
			sections.forEach((s)=>{
				s.style.paddingRight = '125px';
			});
		} else {
			sideMenu.classList.remove('active');
			introBackgroundImg.classList.remove('offsetLeft');
			sections.forEach((s)=>{
				s.style.removeProperty('padding-right');
			});
			
		}
}

//s2 animation
const topics = document.querySelectorAll('s2__topic');
const vLine = document.querySelector('.s2__v-line');
const s3 = document.querySelector('.s3');
const topicTitles = document.querySelectorAll('.topic__title');
const afterPseudoElementTopOffset = 10;
let height = 155;

function s2Animation () {
	topicTitles.forEach((title)=>{
			const topicTriggerPoint = afterPseudoElementTopOffset 
				+ title.getBoundingClientRect().top - window.innerHeight / 2;
			if(topicTriggerPoint <= 0) {
				const currentTopic = title.parentElement.parentElement.parentElement;
				currentTopic.classList.add('s2__topic--active');
			}
		});

		if(vLine.getBoundingClientRect().top - window.innerHeight  <= 0 
			&&  s3.getBoundingClientRect().top - window.innerHeight / 2 >= -10){
			let height = window.pageYOffset - (vLine.getBoundingClientRect().top
				 + window.scrollY) + (window.innerHeight / 2);	
			vLine.style.height = `${height}px`;
		}
}

// reviews slider

const nextBtn = document.querySelector('.s7__next-btn');
const sliderItems = document.querySelectorAll('.s7__slider-item');
let slideOffset = 0;

nextBtn.addEventListener('click', ()=>{
	slideOffset -= 1;
	let slidesCountDisplayed = 2;
	if(window.matchMedia('(max-width: 730px)').matches){
		slidesCountDisplayed = 1;
	}
	if (Math.abs(slideOffset) > sliderItems.length - slidesCountDisplayed) {
		slideOffset = 0;
	}
	sliderItems.forEach((item)=>{
		item.style.transform = `translateX(${100 * slideOffset}%)`;
	});
});

const prevBtn = document.querySelector('.s7__prev-btn');
prevBtn.addEventListener('click', ()=>{
	slideOffset += 1;
	if (slideOffset > 0) {
		let slidesCountDisplayed = 2;
		if(window.matchMedia('(max-width: 730px)').matches){
			slidesCountDisplayed = 1;
		}
		slideOffset = 0 - (sliderItems.length - slidesCountDisplayed);
	}
	sliderItems.forEach((item)=>{
		item.style.transform = `translateX(${100 * slideOffset}%)`;
	});
});


// smooth scroll
(function () {
  var smoothScroll = function smoothScroll(targetSelector, duration) {
    var headerHeight = document.querySelector('.header').clientHeight;
    var currentTarget = document.querySelector(targetSelector);
    var targetPosition = currentTarget.getBoundingClientRect().top;
    if(document.querySelector('.header').classList.contains('mobile-menu-active')) {
    	targetPosition -= headerHeight;
    }
    var startPosition = window.pageYOffset;
    var startTime = null;

    var easeTimeFunction = function easeTimeFunction(t, b, c, d) {
      t /= d / 2;

      if (t < 1) {
        return c / 2 * t * t + b;
      }

      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    var animation = function animation(currentTime) {
      if (startTime === null) {
        startTime = currentTime;
      }

      var timeElapsed = currentTime - startTime;
      var run = easeTimeFunction(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  var scrollTo = function scrollTo() {
    var links = document.querySelectorAll('.js-scroll');
    links.forEach(function (each) {
      each.addEventListener('click', function () {
        var currentTarget = this.getAttribute('href');
        smoothScroll(currentTarget, 1000);
      });
    });
  };

  scrollTo();
})();


//burger
const burgerBtn = document.querySelector('.burger__btn');
const header =  document.querySelector('.header');
burgerBtn.addEventListener('click', ()=>{
	header.classList.toggle('mobile-menu-active');

});

const closeBtn = document.querySelector('.mobile-menu__close-btn');
closeBtn.addEventListener('click', ()=>{
	header.classList.toggle('mobile-menu-active');
	
});

// hide mobile menu when click on link
const menuLinks = document.querySelectorAll('.menu__link');
menuLinks.forEach((link)=>{
	link.addEventListener('click', ()=>{
		header.classList.remove("mobile-menu-active");
		console.log('click');
	});
});