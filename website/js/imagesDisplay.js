let selectedMode = false;
let displayMode = 3;
const BASE_URL = 'http://localhost:50000'; 

document.addEventListener("DOMContentLoaded" , () => {
    try
    {
        // Retrieve and parse the data from sessionStorage
        const queryData = JSON.parse(sessionStorage.getItem("queryData"));
        console.log("Received data:", queryData);
        // Optional: Clear the data from sessionStorage if it's no longer needed
        sessionStorage.removeItem("queryData");
    
        queryData.forEach(image => {
            addImageToImageGrid(image);
        })
    }
    catch(all) {}
    selectedMode = false;
    setDisplaySelectCheckboxes();
    updateDisplay();
})

document.getElementById("backButton").addEventListener('click', () => {
    console.log("in");
    window.location.href = "./index.html";
})

document.getElementById("downloadAllButton").addEventListener("click", function() {
    // Initialize an empty array to hold the image URLs
    const imageUrls = [];

    // Select all elements with the class 'imageHolder'
    const images = document.querySelectorAll('.imageHolder');

    // Loop through each image element and get its 'src' attribute
    images.forEach(image => {
        imageUrls.push(image.src);
    });

    // Trigger download for each image
    imageUrls.forEach(url => {
        downloadImage(url);
    });
});

const selectMenu = document.getElementById("selectImageMenu");

document.getElementById("chooseButton").addEventListener('click', () => {
    selectMenu.classList.remove("hidden");
    document.querySelectorAll(".navContainer")[0].style.display = "none";
    selectedMode = true;
    setDisplaySelectCheckboxes();
    setDisplayDownloadButton();
    setOverlays();
})

document.getElementById("selectImageCancel").addEventListener("click", () => {
    selectMenu.classList.add("hidden");
    document.querySelectorAll(".navContainer")[0].style.display = "flex";
    selectedMode = false;
    setDisplaySelectCheckboxes();
    setDisplayDownloadButton();
    uncheckCheckBoxes();
    setOverlays();
})

function setDisplaySelectCheckboxes() 
{
    const images = document.querySelectorAll('.customCheckbox');
    if(selectedMode)
    {
        images.forEach(image => {
            image.style.display = "inline-block";
        })
    }
    else
    {
        images.forEach(image => {
            image.style.display = "none";
        })
    }
}

function setDisplayDownloadButton()
{
    const buttons = document.querySelectorAll(".downloadButtonImageHolder");
    if(selectedMode)
    {
        buttons.forEach(button => {
            button.style.display = "none";
        })
    }
    else
    {
        buttons.forEach(button => {
            button.style.display = "block";
        })
    }
}

function uncheckCheckBoxes()
{
    const checkboxes = document.querySelectorAll(".checkboxInput");
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    })
}

document.getElementById("selectImageDownload").addEventListener("click", () => {
    // Initialize an empty array to hold the image URLs
    const imageUrls = [];

    // Select all elements with the class 'imageContainer'
    const containers = document.querySelectorAll(".imageContainer"); // Correctly using a dot for class selector

    // Loop through each container
    containers.forEach(container => {
        const checkbox = container.querySelector(".customCheckbox input"); // Get the checkbox input

        // Check if the checkbox is checked
        if (checkbox.checked) {
            const imageHolder = container.querySelector(".imageHolder"); // Get the imageHolder inside this container
            if (imageHolder) {
                imageUrls.push(imageHolder.src); // Push the image src to the array
            }
        }
    });

    // Trigger download for each image URL
    imageUrls.forEach(url => {
        downloadImage(url);
    });

    selectMenu.classList.add("hidden");
    document.querySelectorAll(".navContainer")[0].style.display = "flex";
    selectedMode = false;
    setDisplaySelectCheckboxes();
    setDisplayDownloadButton();
    uncheckCheckBoxes();
    setOverlays();
});

function setOverlays() {
    const overlays = document.querySelectorAll(".overlay");
    overlays.forEach(overlay => {
        if (selectedMode) {
            overlay.classList.remove("hidden");
        } else {
            overlay.classList.add("hidden");
        }
    });
}

const imageContainers = document.querySelectorAll(".imageContainer");
imageContainers.forEach(container => {
    container.addEventListener("click", (event) => {
        if (selectedMode && (event.target.classList.contains("checkboxInput") || event.target.classList.contains("checkmark"))) {
            // Check if the clicked element or its parent is the customCheckbox
            const checkboxInput = container.querySelector(".customCheckbox input");
            const overlay = container.querySelector(".overlay");

            if (event.target === checkboxInput || event.target.classList.contains("customCheckbox")) {
                console.log("Checkbox or its label was clicked");

                // Toggle the overlay based on the checked state of the checkbox
                if (checkboxInput.checked) {
                    overlay.classList.add("hidden");
                } else {
                    overlay.classList.remove("hidden");
                }
            }
        }
    });
});

function updateDisplay()
{
    const displayText = document.getElementById("displayModeDisplay");
    const imageGrid = document.getElementById("imageGrid");
    if (displayMode == 1)
    {
        displayText.textContent = "Big Display"
    }
    else if (displayMode == 2)
    {
        displayText.textContent = "Medium Display"
    }
    else if (displayMode == 0.5)
    {
        displayText.textContent = "Huge Display"
    }
    else
    {
        displayText.textContent = "Small Display"
    }
    
    imageGrid.style.gridTemplateColumns = `repeat(${2*displayMode}, 1fr)`;
}

document.querySelectorAll(".displayMenuItem").forEach(Item => {
    Item.addEventListener("click", () => {
        console.log("in")
        if(Item.textContent === "Big")
        {
            displayMode = 1;
        }
        else if (Item.textContent === "Small")
        {
            displayMode = 3;
        }
        else if (Item.textContent === "Huge")
        {
            displayMode = 0.5;
        }
        else
        {
            displayMode = 2;
        }
        updateDisplay();
        document.getElementById("displayOverlay").classList.add("displayHidden")
        document.getElementById("displayMenu").classList.add("displayHidden")
    })
})

document.getElementById("displayButton").addEventListener("click", () => {
    document.getElementById("displayOverlay").classList.remove("displayHidden")
    document.getElementById("displayMenu").classList.remove("displayHidden")
})

function addImageToImageGrid(url) {
    // Create a new imageContainer div
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('imageContainer');

    // Create the overlay div
    const overlay = document.createElement('div');
    overlay.classList.add('overlay', 'hidden');
    imageContainer.appendChild(overlay);

    // Create the main image
    const mainImage = document.createElement('img');
    mainImage.draggable = false;
    mainImage.classList.add('imageHolder');
    mainImage.src = url;
    imageContainer.appendChild(mainImage);

    // Create the download button for the main image
    const downloadButtonMain = document.createElement('a');
    downloadButtonMain.draggable = false;
    downloadButtonMain.classList.add('downloadButtonImageHolder');
    downloadButtonMain.href = url; // URL for downloading the image
    downloadButtonMain.download = '';

    const downloadIconMain = document.createElement('img');
    downloadIconMain.draggable = false;
    downloadIconMain.classList.add('imageDownload');
    downloadIconMain.src = './images/download.png';
    downloadButtonMain.appendChild(downloadIconMain);

    // Add event listener to prevent default action
    downloadButtonMain.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        downloadImage(downloadButtonMain.getAttribute("href"))
    });

    imageContainer.appendChild(downloadButtonMain);

    // Create checkbox container
    const checkboxContainer = document.createElement('label');
    checkboxContainer.classList.add('customCheckbox');

    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.classList.add('checkboxInput');

    const checkmark = document.createElement('span');
    checkmark.classList.add('checkmark');

    checkboxContainer.appendChild(checkboxInput);
    checkboxContainer.appendChild(checkmark);
    imageContainer.appendChild(checkboxContainer);

    // Append the imageContainer to the imageGrid
    document.getElementById("imageGrid").appendChild(imageContainer);
}



document.querySelectorAll(".downloadButtonImageHolder").forEach(dBtn => {
    dBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        downloadImage(dBtn.getAttribute("href"))
    });
});

function extractName(url) {
    // Get the last part of the URL after the last '/'
    const tmp = url.includes('/') ? url.slice(url.lastIndexOf('/') + 1) : url;

    // Find the index of 'resize' and slice accordingly
    const resizeIndex = tmp.indexOf('resize');
    return resizeIndex !== -1 ? tmp.slice(0, resizeIndex - 1) : tmp;
}


function downloadImage(url) {
    const urlWithParams = `${BASE_URL}/download_image?url=${encodeURIComponent(url)}`;
    
    fetch(urlWithParams)  // Use urlWithParams instead of imageUrl
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob(); // Convert the response to a blob
    })
    .then(blob => {
        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = extractName(url); // Set the default filename
        link.click(); // Trigger the download
        URL.revokeObjectURL(link.href); // Clean up the URL.createObjectURL
    })
    .catch(err => console.error('Failed to download image:', err));
}
