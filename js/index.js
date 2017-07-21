/*jshint esversion: 6 */

let vh = window.innerHeight;
let vw = window.innerWidth;
let isMobile = vw < 1100;

const galleryHolder = document.querySelector('.gallery__holder');
const showMoreButton = document.querySelector('.gallery__show-more');

// set header height (prevents from transitioning on mobile)
$('.header').height(vh);

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
    // } else {
    //     showMoreButton.innerText = 'To już wszystko!';
    //     showMoreButton.style.color = '#919191';
    //     showMoreButton.style.border = '2px solid #919191';
    // }
}

// show only 4 thumbnails first o mobile
if(isMobile) {
    for(let i = 1; i < 5; i++) {
        galleryHolder.appendChild(createImage(i));
    }

} else {
    for(let i = 1; i < 17; i++) {
        galleryHolder.appendChild(createImage(i));
    }
}

showMoreButton.addEventListener('click', showMore);
