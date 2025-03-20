const carouselSlides = [
    {
        title: "Phase One is free & open daily",
        linkText: "Plan your visit",
        imageURL: "./assets/images/carousel_image_1.avif",
        secImageURL: "./assets/images/hours_badge.svg"
    },
    {
        title: "Turning historic tracks into an unparalleled park.",
        linkText: "See the full version",
        imageURL: "./assets/images/carousel_image_2.avif",
    }
];

let carouselActiveSlideIndex = 0;
const carouselTitleElement = document.getElementById("carousel-title");
const carouselLinkElement = document.getElementById("carousel-link");
const carouselImageElement = document.getElementById("carousel-image");
const carouselSecImageElement = document.getElementById("sec-carousel-image");
const carouselTextContainer = document.getElementById("carousel-text-content");
const carouselOuterContainer = document.getElementById("carousel-outer-container");

function switchSlide(direction) {
    carouselActiveSlideIndex += direction;
    if (carouselActiveSlideIndex >= carouselSlides.length) carouselActiveSlideIndex = 0;
    if (carouselActiveSlideIndex < 0) carouselActiveSlideIndex = carouselSlides.length - 1;

    carouselImageElement.classList.replace("carousel-intro-anim-elem", "carousel-outro-anim-elem");
    carouselSecImageElement.classList.replace("badge-intro-anim-elem", "badge-outro-anim-elem");
    carouselTextContainer.style.transform = "translateY(27px)";
    carouselTextContainer.style.opacity = "0";

    setTimeout(() => {
        carouselImageElement.src = carouselSlides[carouselActiveSlideIndex].imageURL;
        if (carouselSlides[carouselActiveSlideIndex].secImageURL) {
            carouselSecImageElement.src = carouselSlides[carouselActiveSlideIndex].secImageURL;
            carouselSecImageElement.style.display = 'block';
        }
        else carouselSecImageElement.style.display = 'none';

        carouselTitleElement.innerText = carouselSlides[carouselActiveSlideIndex].title;
        carouselLinkElement.innerText = carouselSlides[carouselActiveSlideIndex].linkText;
      
        carouselImageElement.classList.replace("carousel-outro-anim-elem", "carousel-intro-anim-elem");
        carouselSecImageElement.classList.replace("badge-outro-anim-elem", "badge-intro-anim-elem");
        carouselTextContainer.style.transform = "translateY(0px)";
        carouselTextContainer.style.opacity = "1";
    },  1000)
}

function swipeSlide(event) {
    if (window.innerWidth > 970) return;
    const initialXPos = event.clientX + carouselOuterContainer.scrollLeft - 24; // 24(px) is the left padding
    carouselOuterContainer.style.scrollSnapType = "none";
    carouselOuterContainer.style.scrollBehavior = "auto";
    
    carouselOuterContainer.onmousemove = (_event) => {
        const xPos = _event.clientX;
        carouselOuterContainer.scrollTo(initialXPos - xPos, 0);
    }

    carouselOuterContainer.onmouseup = (_event) => {
        carouselOuterContainer.onmousemove = null;
        carouselOuterContainer.onmouseup = null;
        carouselOuterContainer.style.scrollBehavior = "smooth";
        carouselOuterContainer.style.scrollSnapType = "x mandatory";
    }
}

carouselOuterContainer.onmousedown = (event) => swipeSlide(event);