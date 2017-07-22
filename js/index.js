/*jshint esversion: 6 */
'use strict';

let vh = window.innerHeight;
let vw = window.innerWidth;

// scroll to hash
$('a[href^="#"]').on('click',function (e) {
    e.preventDefault();

    let target = this.hash;
    let $target = $(target);

    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 900, 'swing', function () {
        window.location.hash = target;
    });
});

/*
    Gallery component
*/

let isMobile = vw < 1100;
const galleryHolder = document.querySelector('.gallery__holder');
const showMoreButton = document.querySelector('.gallery__show-more');


// image thumbnail component
function createImage(number) {
 let src = './assets/img/photos/thumbnails/';

 let galleryPhoto = document.createElement("li");
 galleryPhoto.className = "gallery__photo";
 galleryPhoto.style.backgroundImage = `url('${src}${number}.jpg')`;

 setTimeout(
   function() {
       galleryPhoto.style.opacity = 1;
       galleryPhoto.style.top = '5px';
   }, 200
 );
 return galleryPhoto;
}

// show fullsize picture
$('.gallery__photo').on('click', function(e) {
   let elIndex = $(this).index();

   console.log(elIndex);
});


// showMore function – displays 4 next photos in portfolio
function showMore() {
    let liCounter = document.querySelectorAll('.gallery__photo');

    if(liCounter.length < 16) {
        for (let i = liCounter.length + 1; i < liCounter.length + 5; i++) {
            galleryHolder.appendChild(createImage(i));

        }
        if (liCounter.length > 10) {
            showMoreButton.style.opacity = 0;
            showMoreButton.remove();
        }
    }
}

// show only 4 thumbnails first o mobile
if(isMobile) {
    for(let i = 1; i < 5; i++) {
        galleryHolder.appendChild(createImage(i));
    }
    showMoreButton.addEventListener('click', showMore);
} else {
    for(let i = 1; i < 17; i++) {
        galleryHolder.appendChild(createImage(i));
    }
}




/*
* EFFECTS & ANIMATIONS
* */
let header = $('.header');
// set header height (prevents from transitioning on mobile)
header.height(vh);

// hamburger menu toggle
let headerHamburger = $('.header__hamburger');
let headerMenu = $('.header__menu');

headerHamburger.on('click', function() {
    headerHamburger.toggleClass('header__hamburger--open');
    headerMenu.toggleClass('header__menu--open');
});

$('.header__menu li').on('click', function() {
    headerMenu.removeClass('header__menu--open');
    headerHamburger.removeClass('header__hamburger--open');
});
