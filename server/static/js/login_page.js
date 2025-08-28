const BASE_URL = 'http://127.0.0.1:5500';
const loginButton = document.getElementById('login_button');
console.log
loginButton.addEventListener('click',() => {
    console.log('here')
    // Construct the URL with query parameter
    const username = document.getElementById('username_id').value
    const password = document.getElementById('password_id').value

    if (password==='' || username==='') { return}

    const urlWithParams = `${BASE_URL}/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    requestActive = true; // Set the flag to indicate a request is active

    console.log(urlWithParams)

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
        console.log('lkjdknw')
        window.location.href ='./index.html','blank';
    })
});

function gotoRegister(){
    window.location.href = "register.html";
};