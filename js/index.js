(function(){

// window parameters
let vh = window.innerHeight,
    vw = window.innerWidth,
    isMobile = vw < 1100;

let body = $('body'),
    header = $('.header'),
    headerHamburger = $('.header__hamburger'),
    headerMenu = $('.header__menu'),
    headerMenuLi = $('.header__menu li'),
    aboutIconsUlLi = $('.about__icons ul li'),
    galleryHolder = document.querySelector('.gallery__holder'),
    showMoreButton = document.querySelector('.gallery__show-more'),
    galleryPhotoSelector = $('.gallery__photo'),
    fullphoto = $('.portfolio__fullphoto'),
    fullphotoDynamicChange = $('.fullphoto__dynamic-change'),
    fullphotoButton = $('.portfolio__fullphoto button'),
    fullphotoButtonFirst = $('.portfolio__fullphoto button:first-child'),
    fullphotoButtonLast = $('.portfolio__fullphoto button:last-child');


// set header height (prevents from transitioning on mobile)
    header.height(vh);

// hamburger menu toggle

    headerHamburger.on('click', function() {
        headerHamburger.toggleClass('header__hamburger--open');
        headerMenu.toggleClass('header__menu--open');
    });

    function noscroll() {
        window.scrollTo( 0, 0);
    }

    window.addEventListener('scroll', function() {
        if(headerMenu.hasClass('header__menu--open')) {
            noscroll();
        } else {
            window.removeEventListener('scroll', noscroll);
        }
    });


    headerMenuLi.on('click', function() {
        headerMenu.removeClass('header__menu--open');
        headerHamburger.removeClass('header__hamburger--open');
    });

// Accesibility – show focus only when tabbed
document.addEventListener('keydown', function(e) {
    if (e.keyCode === 9) {
        body.addClass('show-focus-outlines');
    }
});

document.addEventListener('click', function(e) {
    body.removeClass('show-focus-outlines');
});


// lazy load icons
$(window).scroll(function () {

    if (isMobile) {
        if ($(window).scrollTop() > vh) {
            aboutIconsUlLi.addClass('animate');
        }
    } else {
        if ($(window).scrollTop() > vh - vh/3) {
            aboutIconsUlLi.addClass('animate');
        }
    }
});


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

// image thumbnail
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
    // show all photos
    for (let i = 1; i < 17; i++) {
        galleryHolder.appendChild(createImage(i));
    }


    $('.gallery__photo').on('click', function() {
        fullphotoDynamicChange.attr('src', '');
       let elIndex = $(this).index() + 1;
       let src = `./assets/img/photos/${elIndex}.jpg`;

        fullphotoDynamicChange.attr('src', src);
       let userView = window.pageYOffset;
        fullphoto.offset({top: userView});
        fullphoto.addClass('portfolio__fullphoto--open');
    });

    fullphoto.on('click', function() {
        if(!(fullphotoButton.is(':focus')))
         {
           $(this).removeClass('portfolio__fullphoto--open');
         }

    });

    //

    function changeImage(number) {
        let portfolioImg = fullphotoDynamicChange,
            currentSrc = portfolioImg.attr('src').toString(),
            regex = /\d+/,
            numArr = currentSrc.match(regex),
            num = parseInt(numArr[0]),
            change = num + number;

        let src = `./assets/img/photos/${change}.jpg`;

        return src
    }

    // Close gallery if there is no such photo ( error 404 )

    window.addEventListener('error', function(e) {
        console.log(e);
        if (e.path[1].className === 'portfolio__fullphoto fullphoto portfolio__fullphoto--open') {
            console.log('removing...');
            fullphoto.removeClass('portfolio__fullphoto--open');
            return null;
        }
    }, true);

    // Switch photos with keyboard arrows

    function keyImgChange(e) {
        let keycode = e.keyCode;

        if(fullphoto.hasClass('portfolio__fullphoto--open')) {
            if(keycode === 37) {
                fullphotoDynamicChange.attr('src', changeImage(-1));

            } else if (keycode === 39) {

                fullphotoDynamicChange.attr('src', changeImage(1));

            } else if (keycode === 27) {
                fullphoto.removeClass('portfolio__fullphoto--open');
            }
        }
    }

    // Add function to arrow buttons in portfolio

    window.addEventListener('keydown', keyImgChange, true);

    fullphotoButtonFirst.on('click', function() {
        fullphotoDynamicChange.attr('src', changeImage(-1));
    });

    fullphotoButtonLast.on('click', function() {
        fullphotoDynamicChange.attr('src', changeImage(1));
    });
}
}());

