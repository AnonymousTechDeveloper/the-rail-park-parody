const navBar = document.getElementById("navbar");
const visitContainerList = [...document.getElementsByClassName("visit-content")];
const visitTitleElement = document.getElementById("visit-title");
const hovMediaTitleElement = document.getElementById("hov-media-title");
const hovMediaMainLineElement = document.getElementById("hov-media-line-main");
const hovMediaVideoElementDesktop = document.getElementById("hov-media-desktop");
const hovMediaVideoElementMobile = document.getElementById("hov-media-mobile");
const hovMediaControllerButton = document.getElementById("hov-media-controller");
const emailInputElement = document.getElementById("email-section-input");
const emailSubmitButton = document.getElementById("email-submit-button");
const emailTextElement = document.getElementById("email-section-text");
const menuButton = document.getElementById("nav-menu-button");
const menuBody = document.getElementById("menu-body");
const menuAnimationElementsDesktop = [...document.getElementById("desktop-menu").getElementsByClassName("menu-anim-elem")];
const menuAnimationElementsMobile = [...document.getElementById("mobile-menu").getElementsByClassName("menu-anim-elem")];

const totalAnimationDelay = 1; 
menuAnimationElementsDesktop.forEach((element, index) => element.style.animationDelay = `${totalAnimationDelay*index/(menuAnimationElementsDesktop.length - 1)}s`);
menuAnimationElementsMobile.forEach((element, index) => element.style.animationDelay = `${totalAnimationDelay*index/(menuAnimationElementsMobile.length - 1)}s`);

[...document.getElementsByClassName("image-parallax-media")].forEach((mediaElement) => {
    mediaElement.onmouseenter = () => mediaElement.play()
    mediaElement.onmouseleave = () => {
        mediaElement.pause();
        mediaElement.currentTime = 0;
    }
});
[...document.getElementsByClassName("visit-content")].forEach((containerElement) => {
    const mediaElement = containerElement.getElementsByTagName("video")[0];
    containerElement.onmouseenter = () => mediaElement.play()
    containerElement.onmouseleave = () => {
        mediaElement.pause();
        mediaElement.currentTime = 0;
    }
})


let prevScrollTop = 0;
let cursorCoords = [0, 0];
let videoCoords = [0, 0];

const visitTitleObserver = new window.IntersectionObserver(([entries], observer) => {if (entries.isIntersecting) visitTitleElement.classList.add("visit-title-intro-animated");}, {threshold: 0.5})
visitTitleObserver.observe(visitTitleElement);
const hovMediaTitleObserver = new window.IntersectionObserver(([entries], observer) => {if (entries.isIntersecting) hovMediaTitleElement.classList.add("hov-media-title-intro-anim");}, {threshold: 0.5})
hovMediaTitleObserver.observe(hovMediaTitleElement);

window.addEventListener("scroll", () => {
    if (navBar.classList.contains("menu-on")) return;

    const newScrollTop = document.scrollingElement.scrollTop;
    const deltaScrollTop = newScrollTop - prevScrollTop;
    const scrollThreshhold = 6;

    prevScrollTop = newScrollTop;

    if (deltaScrollTop > scrollThreshhold) navBar.style.transform = 'translateY(-100%)';
    else if (deltaScrollTop < -scrollThreshhold)  navBar.style.transform = 'translateY(0%)';
})

hovMediaMainLineElement.onmouseenter = (event) => {
    if (window.innerWidth < 970) return;

    cursorCoords = [event.screenX, event.screenY];
    const moveVideoToCursorInterval = setInterval(moveVideoTowardsCursor, 0);

    hovMediaVideoElementDesktop.style.opacity = 1;

    const updateCursorCoords = (_event) => {cursorCoords = [_event.screenX, _event.screenY];}

    window.addEventListener("mousemove", (_event) => updateCursorCoords(_event));

    hovMediaMainLineElement.onmouseleave = (_event) => {
        
        setTimeout(() => {hovMediaMainLineElement.onmousemove = null}, 300);
        hovMediaVideoElementDesktop.style.opacity = 0;
        window.removeEventListener("mousemove", updateCursorCoords);
        setTimeout(() => clearInterval(moveVideoToCursorInterval), 300)
    }
}

const distanceBetweenCursorVideo = () => Math.sqrt((cursorCoords[0] - videoCoords[0])**2 + (cursorCoords[1] - videoCoords[1])**2);
const directionFromVideoToCursor = () => [Math.round(cursorCoords[0] - videoCoords[0]), Math.round(cursorCoords[1] - videoCoords[1])]

function moveVideoTowardsCursor() {
    const distanceScalar = distanceBetweenCursorVideo();
    const distanceVector = directionFromVideoToCursor();
    const velocityContant = 0.002;
    const velocityCoefficient = 50;

    videoCoords = [videoCoords[0] + (distanceVector[0]*(Math.log(distanceScalar*velocityCoefficient + 1))*velocityContant), videoCoords[1] + (distanceVector[1]*(Math.log(distanceScalar*velocityCoefficient + 1))*velocityContant)];

    hovMediaVideoElementDesktop.style.left = `${videoCoords[0]}px`;
    hovMediaVideoElementDesktop.style.top = `${videoCoords[1]}px`;
}

emailInputElement.oninput = (event) => {
    if (emailInputElement.value !== '') emailSubmitButton.disabled = false;
    else emailSubmitButton.disabled = true;
}

function handleEmailSubmit() {
    const emailQuery = emailInputElement.value;
    if (!emailQuery) return;
    const emailFormat = /^((\w[\w\.-_]*\w)|(\w))@\w(\w|\.)*\.(\w|\.)*\w$/;

    document.getElementById("email-section-input-wrapper").style.display = 'none';
    if (emailFormat.test(emailQuery)) emailTextElement.innerText = "Thank you for subscribing!";
    else emailTextElement.innerText = "The email you entered is not valid.";
}

emailSubmitButton.onclick = () => handleEmailSubmit();
emailInputElement.onkeydown = (event) => (event.key === 'Enter') ? handleEmailSubmit() : null;

hovMediaControllerButton.onclick = () => {
    if (hovMediaVideoElementMobile.paused) hovMediaVideoElementMobile.play();
    else hovMediaVideoElementMobile.pause();
    hovMediaControllerButton.classList.toggle("hov-media-play");
    hovMediaControllerButton.classList.toggle("hov-media-pause");
}

menuButton.onclick = () => {
    if (navBar.classList.toggle("menu-on")) document.scrollingElement.style.overflowY = "hidden";
    else document.scrollingElement.style.overflowY = "scroll";
}