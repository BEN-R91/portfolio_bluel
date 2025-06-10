let allWorks = [];
let filteredWorks = []; 

async function getWorks() { 
  const response = await fetch("http://localhost:5678/api/works"); 
  allWorks = await response.json(); 
  displayGallery(allWorks); 
}

function displayGallery(data) { 
  const gallery = document.querySelector('.gallery'); 
  const modalGallery = document.querySelector('.modal_gallery');
  gallery.innerHTML = ''; 
  modalGallery.innerHTML = '';
  
  data.forEach(work => { 
    const figure = document.createElement('figure'); 
    const img = document.createElement('img'); 
    img.src = work.imageUrl; 
    img.alt = work.title; 
    const figcaption = document.createElement('figcaption'); 
    figcaption.textContent = work.title; 
    figure.appendChild(img); 
    figure.appendChild(figcaption); 
    gallery.appendChild(figure); 
    
    const figure_modal = document.createElement('figure');
    const icon = document.createElement('i');
    icon.className = "fa-solid fa-trash-can fa-xs";
    
    icon.addEventListener('click', () => {
      fetch(`http://localhost:5678/api/works/${work.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("authToken")}` 
        }
      })
      .then(response => {
        if (response.ok) {
          figure_modal.remove(); 
          figure.remove();       
        } 
        
        else {
          console.error(`Erreur de suppression pour l'œuvre ${work.id}`);
        }
      })
      .catch(error => { 
        console.error("Erreur réseau :", error);
      });
    });
    
    figure_modal.appendChild(img.cloneNode());
    figure_modal.appendChild(icon);
    modalGallery.appendChild(figure_modal);

  });
}

async function getCategories() { 
  const response = await fetch("http://localhost:5678/api/categories");
  const data = await response.json(); 
  displayCategories(data); 
}

function displayCategories(categories) {
  const filtersContainer = document.querySelector('.filters'); 
  
  
  const allButton = document.createElement('button');
  allButton.textContent = "Tous";
  allButton.className =  "filterbutton"
  filtersContainer.appendChild(allButton); 

  allButton.addEventListener('click', () => { 
    filteredWorks = allWorks; 
    displayGallery(filteredWorks); 
    updateFilterStyle(0)
  });

  // Boutons pour chaque catégorie
  categories.forEach((category, index) => {
    const button = document.createElement('button');
    button.textContent = category.name; 
    button.className =  "filterbutton"
    filtersContainer.appendChild(button);

  // Filtrer les données en fonction de la catégorie sélectionnée
    button.addEventListener('click', () => { 
      filteredWorks = allWorks.filter(work => work.categoryId === category.id); 
      displayGallery(filteredWorks); 
      updateFilterStyle(index+1); 
    });
  });
}

function updateFilterStyle(index) {
  const buttons = document.querySelectorAll('.filterbutton'); 
  buttons.forEach((button, i) => { 
      if (i === index) { 
          button.classList.add('filterbutton_selected');
      } else {
          button.classList.remove('filterbutton_selected');
      }
    })
  }

  function checkAuth() {
    const authToken = localStorage.getItem("authToken");
    const loginLink = document.querySelector('nav ul li a[href="loginpage.html"]');
    const filtersContainer = document.querySelector('.filters');
    const link_modal = document.querySelector('.link_modal');
    const edition_mode = document.querySelector('.edition_mode');
    if (authToken) {
      // Si l'utilisateur est connecté, changer le bouton en Logout
      loginLink.innerText = "logout";
      loginLink.href = "#"; 
      loginLink.addEventListener("click", logout);
  
      // Masquer les catégories si elles existent
      if (filtersContainer) {
        filtersContainer.style.display = "none";
      }
  }
    else {
      
      link_modal.style.display = "none";
      edition_mode.style.display = "none";
    }
}
  function logout() {
    localStorage.removeItem("authToken"); // Supprimer le token
    window.location.href = "loginpage.html"; // Rediriger vers la page de login
  }
  document.addEventListener("DOMContentLoaded", checkAuth) 

getWorks();
getCategories();