const mainTitleElement = document.getElementById("main-title");
const carouselContentElement = document.getElementById("carousel-section");
const imageParallaxTextList = [...document.getElementsByClassName("image-parallax-media-text")];
const imageParallaxDescriptionElement = document.getElementById("image-parallax-desc");

window.addEventListener("scroll", (event) => {
    handleCarouselParallax();
    imageParallaxTextList.forEach((element) => handleImageTextParallax(element));
    handleImageDescParallax();
})

function handleCarouselParallax() {
    const relVelocityTitle = 0.225
    const relVelocityConstant = 0.054;
    mainTitleElement.style.transform = `translateY(clamp(0px, ${document.scrollingElement.scrollTop*relVelocityTitle}px, 180px))`;
    carouselContentElement.style.transform = `translateY(${document.scrollingElement.scrollTop*relVelocityConstant}px)`;
}

function handleImageTextParallax(element) {
    if (window.innerWidth < 970) return;
    const elementData = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (windowHeight - elementData.top < 0 || elementData.bottom < 0) return;
    
    const relVelocity = 0.063;
    element.style.paddingTop = `${(windowHeight - elementData.top)*relVelocity}px`;
}

function handleImageDescParallax() {
    if (window.innerWidth < 970) return;
    const elementData = imageParallaxDescriptionElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (windowHeight - elementData.top < 0 || elementData.bottom < 0) return;
    
    const relVelocity = 0.1;
    imageParallaxDescriptionElement.style.transform = `translateY(${(windowHeight - elementData.top)*relVelocity}px)`;
}