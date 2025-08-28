const BASE_URL = 'http://127.0.0.1:5500';
const backButton = document.getElementById('backButton')
backButton.addEventListener('click', () => {
    window.location.href ='./index.html','blank';

});

const userName = document.getElementById('usernameBox')
const phone= document.getElementById('phoneNumberBox')
const hours= document.getElementById('hours')
const hoursBar = document.getElementById('hoursBar')

const maxhours= document.getElementById('maxHours')
const maxhoursBar = document.getElementById('maxHoursBar')


const placesPlace= document.getElementById('commList')



document.addEventListener("DOMContentLoaded", () => {
    console.log('here')
    
    const urlWithParams = `${BASE_URL}/getUser?username=${getCookie('username')}`;
    requestActive = true; // Set the flag to indicate a request is active

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
        userName.textContent = data.userName; 
        phone.textContent = data.phone; 

        hours.textContent = data.hours; 
        hoursBar.style.width = `calc(${data.hours}/2500 * 100%)`;  
        maxhours.textContent = data.hoursmax; 
        maxhoursBar.style.width = `calc(${data.hoursmax}/20 * 100%)`; 

        places = data.places.split('_')

        places.forEach(place => {
            const tmp = document.createElement('div')
            tmp.classList.add('commPlace')
            tmp.textContent = place
            placesPlace.appendChild(tmp) 
        });

    })
});


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