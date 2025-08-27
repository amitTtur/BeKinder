const BASE_URL = 'http://localhost:50000'; 

const options = document.getElementById("options")

let queryName = "first"
let requestActive = false

const optionElements = document.querySelectorAll('#options .option');
optionElements.forEach(option => {
    option.addEventListener('click', () => {
        // Get the text of the clicked option
        queryName = option.querySelector('span').textContent;
        console.log('Selected option:', queryName);
        options.classList.toggle("hidden");
        overlay.style.display = "none";
    });
});

document.querySelectorAll('.historyItem').forEach(item => {
    item.addEventListener('click', () => {
        const itemTags = item.querySelector('.itemTags').textContent;
        const itemQuery = item.querySelector('.underTags .queryHolder').textContent;
        const itemPage = item.querySelector('.underTags .pageHolder').textContent;
        
        console.log("Clicked item tags: " + itemTags);
        console.log("Clicked item query: " + itemQuery);
        console.log("Clicked item Page: " + itemPage + "\n");
    });
});

document.getElementById('escapeButton').addEventListener('click', () => {
    window.open('https://playsnake.org', '_blank');
    window.close();
})

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        window.open('https://playsnake.org', '_blank');
        window.close();
    }
});

document.getElementById('searchButton').addEventListener('click', () => {
    const searchValue = document.getElementById('searchInput').value;
    if (searchValue === '') {
        document.getElementById("ErrorWindow").classList.toggle("hidden");
        document.getElementById("errorData").textContent = "Add a domain to search.";
        document.getElementById("overlay").style.display = "block";
    } else if (!requestActive) {
        const searchButton = document.getElementById("searchButton");
        searchButton.src = "./images/loading.gif"
        // Construct the URL with query parameter
        const urlWithParams = `${BASE_URL}/search?url=${encodeURIComponent(searchValue)}`;
        requestActive = true; // Set the flag to indicate a request is active

        fetch(urlWithParams, { // Use the constructed URL
            method: 'GET', // GET requests don't need a body
            headers: {
                'Content-Type': 'application/json', // Optional for GET requests
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            const queryData = data.query_received;
            if (queryData[0] === "ERROR") {
                document.getElementById("ErrorWindow").classList.toggle("hidden");
                document.getElementById("errorData").textContent = queryData[1];
                document.getElementById("overlay").style.display = "block";
            } else {
                // Handle the successful response data here
                console.log('Received data:', queryData);
                sessionStorage.setItem("queryData", JSON.stringify(queryData));
                const newWindow = window.open("imagesDisplay.html","_self");
            }
        })
        .catch((error) => {
            if (error instanceof TypeError) {
                console.error('Type Error:', error);
            } else if (error instanceof SyntaxError) {
                console.error('Syntax Error:', error);
            } else {
                console.error('General Error:', error);
            }
        })
        .finally(() => {
            // Set requestActive to false once the fetch operation is complete
            requestActive = false;
            searchButton.src = "./images/search.png"
        });
    }

});

document.getElementById("errorCloseButton").addEventListener('click', () => {
    document.getElementById("ErrorWindow").classList.toggle("hidden");
    document.getElementById("overlay").style.display = "none";
})