const BASE_URL = 'http://127.0.0.1:5500';
const registerButton = document.getElementById('register_button');

register_button.addEventListener('click', () => {
    let inputUsername = document.getElementById('username_id').value;
    let inputPassword = document.getElementById('password_id').value;
    let inputPhone = document.getElementById('phone_id').value;

    if (inputPassword==='' || inputUsername==='' || inputPhone==='') { return}

    const urlWithParams = `${BASE_URL}/RegisterRequest?username=${encodeURIComponent(inputUsername)}&password=${encodeURIComponent(inputPassword)}&phone=${encodeURIComponent(inputPhone)}`;
    requestActive = true; // Set the flag to indicate a request is active

    console.log(urlWithParams)

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
        window.location.href ='./Login_page.html','blank';
    })
});

function gotoLogin(){
    window.location.href = "./Login_page.html";
}