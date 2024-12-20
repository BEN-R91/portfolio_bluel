let allWorks = []; // Stocker toutes les données des œuvres récupérées
let filteredWorks = []; // Stocker les données filtrées

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works"); 
  allWorks = await response.json(); // Stocker toutes les œuvres
  console.log("Données des œuvres :", allWorks);
  displayGallery(allWorks); // Affiche toutes les œuvres par défaut
}

function displayGallery(data) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; // Vide la galerie avant d'afficher les données

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
  });
}

async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const data = await response.json();
  console.log("Données des catégories :", data);
  displayCategories(data);
}

function displayCategories(categories) {
  const filtersContainer = document.querySelector('.filters');
  
  // Bouton pour afficher toutes les œuvres
  const allButton = document.createElement('button');
  allButton.textContent = "Tous";
  allButton.dataset.category = "all";
  filtersContainer.appendChild(allButton);

  allButton.addEventListener('click', () => {
    filteredWorks = allWorks; // Réinitialise les données filtrées à toutes les œuvres
    displayGallery(filteredWorks); // Met à jour la galerie
  });

  // Boutons pour chaque catégorie
  categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category.name;
    button.dataset.category = category.id;
    filtersContainer.appendChild(button);

    button.addEventListener('click', () => {
      // Filtrer les données en fonction de la catégorie sélectionnée
      filteredWorks = allWorks.filter(work => work.categoryId === parseInt(category.id));
      displayGallery(filteredWorks); // Met à jour la galerie avec les données filtrées
    });
  });
}

// Appels des fonctions pour charger les données
getWorks();
getCategories();

 