/*jshint esversion: 6 */

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
    for (let i = 1; i < 17; i++) {
        galleryHolder.appendChild(createImage(i));
    }


    $('.gallery__photo').on('click', function() {
        $('.portfolio__fullphoto img').attr('src', '');
       let elIndex = $(this).index() + 1;
       let src = `./assets/img/photos/${elIndex}.jpg`;
       $('.portfolio__fullphoto img').attr('src', src);
       let fullPhoto = $('.portfolio__fullphoto');
       let userView = window.pageYOffset;
       fullPhoto.offset({top: userView});
       fullPhoto.addClass('portfolio__fullphoto--open');
    });

    $('.portfolio__fullphoto').on('click', function() {
       $(this).removeClass('portfolio__fullphoto--open');
    });

    window.addEventListener('keydown', keyImgChange, true);



    function changeImage(number) {
        let portfolioImg = $('.portfolio__fullphoto img'),
            currentSrc = portfolioImg.attr('src').toString(),
            regex = /\d+/,
            numArr = currentSrc.match(regex),
            num = parseInt(numArr[0]),
            change = num + number;

        let src = `./assets/img/photos/${change}.jpg`;

        console.log(num);

        if (num < 2 || num > 15) {
            console.log('end of photos');
            $('.portfolio__fullphoto').removeClass('portfolio__fullphoto--open');
            return null;
        }

        return src

    }

    function keyImgChange(e) {
        let keycode = e.keyCode;

        if($('.portfolio__fullphoto').hasClass('portfolio__fullphoto--open')) {
            if(keycode === 37) {
                $('.portfolio__fullphoto img').attr('src', changeImage(-1));

            } else if (keycode === 39) {

                $('.portfolio__fullphoto img').attr('src', changeImage(1));

            }
        }
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
