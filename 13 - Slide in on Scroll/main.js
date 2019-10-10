
// debounce - runs checkSlide every (wait)ms
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const sliderImages = document.querySelectorAll('.slide-in');

function slideImg(e) {
    sliderImages.forEach(slideImage => {
        // (window.scrollY + innerHeight) - botom of the window(in px) - (minus) half of the height of img
        const slideInAt = (window.scrollY + window.innerHeight) - slideImage.height / 2;
        // get bottom of the image: (offsetTop gives a position of the image from the top - add height to get position of the bottom )
        const imageBottom = slideImage.offsetTop + slideImage.height;
        const isHalfShown = slideInAt > slideImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) {
            slideImage.classList.add('active');
        } else {
            slideImage.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', debounce(slideImg));