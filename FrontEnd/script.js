// Variables globales
let allWorks = []; // Tableau pour stocker toutes les données des œuvres récupérées depuis l'API. Il sert de référence pour effectuer les filtrages.
let filteredWorks = []; // Tableau pour stocker les données filtrées en fonction de la catégorie sélectionnée. Il est utilisé pour afficher une vue spécifique dans la galerie.

async function getWorks() { //Déclare une fonction asynchrone pour pouvoir utiliser await.
  const response = await fetch("http://localhost:5678/api/works"); // Envoie une requête HTTP à l'URL spécifiée (http://localhost:5678/api/works) pour récupérer les données des œuvres. await attend la réponse de l'API avant de continuer.
  allWorks = await response.json(); // Convertit la réponse JSON en un objet JavaScript (ou tableau).Stocke les données dans allWorks pour une utilisation ultérieure.
  console.log("Données des œuvres :", allWorks); //Affiche les données récupérées dans la console pour les vérifier.
  displayGallery(allWorks); // Appelle la fonction displayGallery() pour afficher toutes les œuvres dans la galerie.
}

function displayGallery(data) { 
  const gallery = document.querySelector('.gallery'); // Sélectionne l'élément HTML avec la classe .gallery, qui est le conteneur de la galerie.
  gallery.innerHTML = ''; // Vide la galerie pour éviter d'ajouter les mêmes éléments plusieurs fois.

  data.forEach(work => { // Parcourt chaque objet (œuvre) du tableau data.
    const figure = document.createElement('figure'); // Crée un élément <figure>, qui sert de conteneur principal pour chaque œuvre.
    const img = document.createElement('img'); // Crée une balise <img> pour afficher l'image de l'œuvre.
    img.src = work.imageUrl; // Définit l'attribut src de l'image avec l'URL fournie par l'API
    img.alt = work.title; // Ajoute un texte alternatif (accessibilité).

    const figcaption = document.createElement('figcaption'); // Crée une balise <figcaption> pour afficher le titre de l'œuvre.
    figcaption.textContent = work.title; //  Ajoute le titre comme contenu texte.

    figure.appendChild(img); //  Ajoute l'image à la balise <figure>.
    figure.appendChild(figcaption); // Ajoute la légende à la balise <figure>.
    gallery.appendChild(figure); // Ajoute le conteneur <figure> complet à la galerie.
  });
}

async function getCategories() { // Similaire à getWorks(), elle récupère les catégories depuis l'API.
  const response = await fetch("http://localhost:5678/api/categories");
  const data = await response.json(); // Les données des catégories sont converties en objet JavaScript avec response.json().
  console.log("Données des catégories :", data); // Affiche les catégories pour vérifier les données récupérées.
  displayCategories(data); // Appelle la fonction pour créer dynamiquement les boutons de filtrage.
}

function displayCategories(categories) {
  const filtersContainer = document.querySelector('.filters'); // Sélectionne l'élément HTML avec la classe .filters qui est le conteneur de mes boutons.
  
  // Bouton pour afficher toutes les œuvres
  const allButton = document.createElement('button'); // Créé le bouton "Tous".
  allButton.textContent = "Tous"; // Texte du bouton.
  allButton.className =  "filterbutton"
  filtersContainer.appendChild(allButton); 

  allButton.addEventListener('click', () => { // Ajoute un eventListener pour réinitialiser filteredWorks avec toutes les œuvres et mettre à jour la galerie.
    filteredWorks = allWorks; // Réinitialise les données filtrées à toutes les œuvres
    displayGallery(filteredWorks); // Met à jour la galerie
    updateFilterStyle(0)
  });

  // Boutons pour chaque catégorie
  categories.forEach((category, index) => {
    const button = document.createElement('button');
    button.textContent = category.name; // Tetxte des boutons selon les catégories (category.name).
    button.className =  "filterbutton"
    filtersContainer.appendChild(button);

  // Filtrer les données en fonction de la catégorie sélectionnée
    button.addEventListener('click', () => { 
      filteredWorks = allWorks.filter(work => work.categoryId === category.id); // filter() : Crée un nouveau tableau avec les œuvres dont categoryId correspond à l'ID de la catégorie.
      displayGallery(filteredWorks); // Appelle displayGallery(filteredWorks) pour afficher uniquement les œuvres filtrées.
      updateFilterStyle(index+1); 
    });
  });
}

function updateFilterStyle(index) {
  const buttons = document.querySelectorAll('.filterbutton'); //On selectionne tout les éléments avec la classe 'button' avec 'querySelectorAll
  buttons.forEach((button, i) => { //parcour tout les buttons
      if (i === index) { // condition pour appliquer 'button selected' 
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
  
    if (authToken) {
      // Si l'utilisateur est connecté, changer le bouton en Logout
      loginLink.innerText = "logout";
      loginLink.href = "#"; // On empêche la redirection vers la page de login
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

  //****************modal************************ */
document.querySelectorAll('.js_modal').forEach(a => {
  a.addEventListener('click', openModal)
})

const openModal = function (e) {
  e.preventDefault()
  const target = document.querySelector(e.target.getAttribute('href'))
  target.style.display = null;
  target.removeAttribute('aria-hidden')
}




// Appels des fonctions pour charger les données
getWorks();
getCategories();

 