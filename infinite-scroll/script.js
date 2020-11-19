const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

// default var
let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []
let isInitLoad = true

// Unsplash API
const count = 5
// Normally, don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// update API URl
function updateAPIURL(newCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${newCount}`
}

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded, totalImages)
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
    }
}

// Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length

    // Run function for each object in photoArray
    photosArray.forEach((photo) => {
        // Create <a> to link full photo
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // create <img> for photo
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img)
        imageContainer.appendChild(item)
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        loader.hidden = false
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
        if ( isInitLoad ) {
            updateAPIURL(30)
            isInitLoad = false
        }
    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();
