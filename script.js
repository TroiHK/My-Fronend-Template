const containerProjects = document.getElementById('list-projects')
const loader = document.getElementById('loader')
loader.hidden = true

// Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create project, Add to DOM
function displayProjects() {
    // Run function for each object in listProjects
    listProjects.forEach((project) => {
        // Create <div> col
        const divCol = document.createElement('div')
        setAttributes(divCol, {
            class: 'col-12 col-md-6 col-lg-4 mt-3'
        })
        // Create <div> card 
        const divCard = document.createElement('div')
        setAttributes(divCard, {
            class: 'card h-100'
        })
        // Create <figure>
        const figure = document.createElement('figure')
        setAttributes(figure, {
            class: 'card-img-top border-bottom'
        })
        figure.innerHTML = `<a href="${project.slug}/index.html"><img class="img-fluid w-100" src="${project.slug}/screenshot.png" alt="${project.title}"></a>`
        // Create <div> card body
        const divCardBody = document.createElement('div')
        setAttributes(divCardBody, {
            class: 'card-body'
        })
        divCardBody.innerHTML = `<h5 class="card-title">${project.title}</h5><p class="card-text">${project.description}</p>`
         // Create <div> card footer
         const divCardFooter = document.createElement('div')
         setAttributes(divCardFooter, {
             class: 'card-footer'
         })
         divCardFooter.innerHTML = `<small class="text-muted">${project.date}</small></p>`
        // Put
        divCard.appendChild(figure)
        divCard.appendChild(divCardBody)
        divCard.appendChild(divCardFooter)
        divCol.appendChild(divCard)
        containerProjects.appendChild(divCol)
    });
}

// On Load
displayProjects();
