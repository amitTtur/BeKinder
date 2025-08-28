document.addEventListener("DOMContentLoaded", () => {

});

const swiper = document.getElementById("swiper");
let startX = 0;
let tracking = false;
let activeId = null;

// start
swiper.addEventListener("pointerdown", (e) => {
if (e.pointerType === "mouse" && e.button !== 0) return;

activeId = e.pointerId;
startX = e.clientX;
tracking = true;

swiper.setPointerCapture(activeId);
});

// end
swiper.addEventListener("pointerup", (e) => {
if (!tracking || e.pointerId !== activeId) return;

const deltaX = e.clientX - startX;
tracking = false;
swiper.releasePointerCapture(activeId);
activeId = null;

if (deltaX > 40) swipeRight();
else if (deltaX < -40) swipeLeft();
});

swiper.addEventListener("pointercancel", () => {
    tracking = false;
    activeId = null;
});

 function swipeLeft() {
    console.log("left");
    swiper.style.transition = "transform 300ms ease";
    swiper.style.transform = "translateX(-50%) translateX(-40%) rotate(-12deg)";
    swiper.addEventListener("transitionend", resetPosition, { once: true });
}

function swipeRight() {
    console.log("right");
    swiper.style.transition = "transform 300ms ease";
    swiper.style.transform = "translateX(-50%) translateX(40%) rotate(12deg)";
    swiper.addEventListener("transitionend", resetPosition, { once: true });
}

function resetPosition() {
    swiper.style.transition = "none";
    swiper.style.transform = "translateX(-50%) rotate(0)";
    swiper.style.transition = "transform 300ms ease";
}

const userButton = document.getElementById('userScreen');
userButton.addEventListener('click',()=>{
    console.log('here')
    window.location.href ='./userView.html','blank';
});
