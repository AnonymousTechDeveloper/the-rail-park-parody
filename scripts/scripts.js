const navBar = document.getElementById("navbar");
const visitContainerList = [...document.getElementsByClassName("visit-content")];
const visitTitleElement = document.getElementById("visit-title");
const hovMediaTitleElement = document.getElementById("hov-media-title");
const hovMediaMainLineElement = document.getElementById("hov-media-line-main");
const hovMediaVideoElement = document.getElementById("hov-media");
const emailInputElement = document.getElementById("email-section-input");
const emailSubmitButton = document.getElementById("email-submit-button");
const emailTextElement = document.getElementById("email-section-text");

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
    const newScrollTop = document.scrollingElement.scrollTop;
    const deltaScrollTop = newScrollTop - prevScrollTop;
    const scrollThreshhold = 6;

    prevScrollTop = newScrollTop;

    if (deltaScrollTop > scrollThreshhold) navBar.style.transform = 'translateY(-100%)';
    else if (deltaScrollTop < -scrollThreshhold)  navBar.style.transform = 'translateY(0%)';
})

visitContainerList.forEach((container) => {
    const mediaThumbnail = container.getElementsByTagName("img")[0];
    const mediaVideo = container.getElementsByTagName("video")[0];

    container.addEventListener("cursorenter", (event) => {
        mediaVideo.play();
        mediaThumbnail.style.opacity = 0;
    })
    container.addEventListener("cursorleave", (event) => {
        mediaVideo.pause();
        mediaVideo.currentTime = 0;
        mediaThumbnail.style.opacity = 1;
    })
})

hovMediaMainLineElement.onmouseenter = (event) => {
    if (window.innerWidth < 900) return;

    cursorCoords = [event.screenX, event.screenY];
    const moveVideoToCursorInterval = setInterval(moveVideoTowardsCursor, 0);

    hovMediaVideoElement.style.opacity = 1;

    const updateCursorCoords = (_event) => {cursorCoords = [_event.screenX, _event.screenY];}

    window.addEventListener("mousemove", (_event) => updateCursorCoords(_event));

    hovMediaMainLineElement.onmouseleave = (_event) => {
        
        setTimeout(() => {hovMediaMainLineElement.onmousemove = null}, 300);
        hovMediaVideoElement.style.opacity = 0;
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

    console.log(videoCoords, cursorCoords)

    hovMediaVideoElement.style.left = `${videoCoords[0]}px`;
    hovMediaVideoElement.style.top = `${videoCoords[1]}px`;
}

emailInputElement.oninput = (event) => {
    if (emailInputElement.value !== '') emailSubmitButton.disabled = false;
    else emailSubmitButton.disabled = true;
}

function handleEmailSubmit() {
    const emailQuery = emailInputElement.value;
    //TODO: Make it more precise: https://stackoverflow.com/questions/2049502/what-characters-are-allowed-in-an-email-address
    const emailFormat = /^([\w\.-])+@(\w|\.)+$/;

    document.getElementById("email-section-input-wrapper").style.display = 'none';
    if (emailFormat.test(emailQuery)) emailTextElement.innerText = "Thank you for subscribing!";
    else emailTextElement.innerText = "The email you entered is not valid.";
}

emailSubmitButton.onclick = () => handleEmailSubmit();
