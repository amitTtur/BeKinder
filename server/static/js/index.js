const BASE_URL = 'http://127.0.0.1:5500';

document.addEventListener("DOMContentLoaded", () => {
    updateComm()
});

const nameHolder = document.getElementById('swiperName')
const descHolder = document.getElementById('swiperDesc')
const imgHolder = document.getElementById('actualImg')
function updateComm()
{
    console.log('here')

    const urlWithParams = `${BASE_URL}/community_place`;
    requestActive = true; // Set the flag to indicate a request is active

    let name = ''
    let desc = ''
    let imgName = ''

    fetch(urlWithParams, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
    })
    .then(response => {
        if (!response.ok) {
            return
        }
        return response; // return the actual response object
    })
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        nameHolder.textContent = data.name; 
        descHolder.textContent = data.description; 
        imgHolder.src = data.picture_path; 
    })
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function saveCommPlace()
{
    let username = getCookie("username")

    console.log('here')

    const urlWithParams = `${BASE_URL}/save_commPlace?username=${encodeURIComponent(username)}&place=${encodeURIComponent(nameHolder.textContent)}`;

    fetch(urlWithParams, { // Use the constructed URL
        method: 'GET', // GET requests don't need a body
        headers: {
            'Content-Type': 'application/json', // Optional for GET requests
        }
    })
    .then(response => {
        if (!response.ok) {
            return
        }
    })
}

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
    updateComm()
}

function swipeRight() {
    console.log("right");
    swiper.style.transition = "transform 300ms ease";
    swiper.style.transform = "translateX(-50%) translateX(40%) rotate(12deg)";
    swiper.addEventListener("transitionend", resetPosition, { once: true });
    saveCommPlace()
    updateComm()
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
