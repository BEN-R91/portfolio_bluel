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
  const modalGallery = document.querySelector('.modal_gallery');
  gallery.innerHTML = ''; // Vide la galerie pour éviter d'ajouter les mêmes éléments plusieurs fois.
  modalGallery.innerHTML = '';
  
  data.forEach(work => { // Parcourt chaque objet (œuvre) du tableau data.
    const figure = document.createElement('figure'); // Crée un élément <figure>, qui sert de conteneur principal pour chaque œuvre.
    const img = document.createElement('img'); // Crée une balise <img> pour afficher l'image de l'œuvre.
    img.src = work.imageUrl; // Définit l'attribut src de l'image avec l'URL fournie par l'API
    img.alt = work.title; // Ajoute un texte alternatif (accessibilité).
    const figcaption = document.createElement('figcaption'); // Crée une balise <figcaption> pour afficher le titre de l'œuvre.
    figcaption.textContent = work.title; //  Ajoute le titre comme contenu texte.
    figure.appendChild(img); //  Ajoute l'image à la balise <figure>
    figure.appendChild(figcaption); // Ajoute la légende à la balise <figure>.
    gallery.appendChild(figure); // Ajoute le conteneur <figure> complet à la galerie.
    
    const figure_modal = document.createElement('figure');
    const icon = document.createElement('i');
    icon.className = "fa-solid fa-trash-can fa-xs";
    
    icon.addEventListener('click', () => {
      console.log(localStorage.getItem("authToken"));
      fetch(`http://localhost:5678/api/works/${work.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("authToken")}` // Envoie le token pour prouver qu'on est authentifié
        }
      })
      .then(response => {
        console.log("Status de la réponse :", response.status);
        if (response.ok) {
          figure_modal.remove(); 
          figure.remove();       
        } 
        
        else {
          console.error(`Erreur de suppression pour l'œuvre ${work.id}`);
        }
      })
      .catch(error => { // Si une erreur réseau ou JS survient (genre plus de connexion, API plantée, etc.)
        console.error("Erreur réseau :", error);
      });
    });
    
    figure_modal.appendChild(img.cloneNode());
    figure_modal.appendChild(icon);
    modalGallery.appendChild(figure_modal);

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
    const edition_mode = document.querySelector('.edition_mode');
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

   //****************modal*************************/
let modal = null 

function showModal(target) {
  // Fermer celle qui était déjà ouverte
  if (modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js_modal_close').removeEventListener('click', closeModal);
    modal.querySelector('.js_modal_stop').removeEventListener('click', stopPropagation);
  }
  // Ouvrir la nouvelle
  target.style.display = null;
  target.removeAttribute('aria-hidden');
  modal = target;
  modal.addEventListener('click', closeModal);
  modal.querySelector('.js_modal_close').addEventListener('click', closeModal);
  modal.querySelector('.js_modal_stop').addEventListener('click', stopPropagation);
}

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  showModal(target);
}

const closeModal = function (e) {
  e.preventDefault()

  if (modal.contains(document.activeElement)) {    //retire le focus de l’élément actif dans la modale, avant de la cacher pour une meilleur accessibilité.
    document.activeElement.blur();
  }

  modal.style.display = "none"
  modal.setAttribute('aria-hidden', 'true')
  modal.removeEventListener('click', closeModal)
  modal.querySelector('.js_modal_close') .removeEventListener('click', closeModal)
  modal.querySelector('.js_modal_stop') .removeEventListener('click', stopPropagation)
  modal = null
}

const stopPropagation = function (e) {
  e.stopPropagation()
}
//Liaison automatique à tous les boutons d’ouverture
document.querySelectorAll('.js_modal').forEach(a => {
  a.addEventListener('click', openModal)
})

//*********creation bouton upload et ouverture modal2************//

const uploadButton = document.createElement('button');
  uploadButton.textContent = "Ajouter une photo";
  uploadButton.classList.add("upload_button");
  uploadButton.setAttribute("data-target", "#modal2");
  document.querySelector('.upload_button_container').appendChild(uploadButton);

uploadButton.addEventListener("click", (e) => {
  const selector = e.target.getAttribute("data-target");
  const target = document.querySelector(selector);
  if (target) {
    showModal(target);
  }
})

const backModal = function (e) {
  e.preventDefault();
  const modal1 = document.getElementById('modal');
  showModal(modal1);
}

document.querySelector('.fa-arrow-left').addEventListener('click', backModal);

//*********formulaire************/
async function CategorySelect() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  const select = document.getElementById('category');

  const emptyOption = document.createElement('option'); //rajout champ vide pour clean la selection
    emptyOption.value = '';          
    emptyOption.textContent = '';    
    select.appendChild(emptyOption); 

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.name;
    select.appendChild(option);
  });
}

  document.addEventListener("DOMContentLoaded", CategorySelect);

//*******apercu de l' image dans photVisual => FileReader*******/

const fileInput = document.getElementById('image');

fileInput.addEventListener("change", () => { //On écoute le changement du champ "file" avec "change"
  const file = fileInput.files[0]; //On récupère le premier fichier sélectionné d' une liste (files) avec [0] 

  if (file && file.type.startsWith("image/")) { // file && vérifie qu' il y a bien un fichier, file.type vérifie le format du fichier et .startsWith("image/") méthode JS qui vérifie si le type commence par "image/"
    const reader = new FileReader(); //FileReader, outil JS permettant de lire le contenu de fichiers et le convertit en URL qu' on pourra afficher dans <img>

    reader.onload = function (e) { // On utilise reader.onload comme événement qui déclenchera une fois la lecture de fichier terminée la fonction. 
      const photoVisual = document.querySelector('.photo_visual'); //On récupere la div 

      photoVisual.innerHTML = ''; //On la vide (icone,texte,bouton)

      const imgPreview = document.createElement('img'); //On crée une balise <img>
      imgPreview.src = e.target.result; // URL de l'image générée par FileReader
      imgPreview.alt = "Aperçu de l'image";  
      imgPreview.classList.add('img_preview'); 

      photoVisual.appendChild(imgPreview); 
    };

    reader.readAsDataURL(file); // déclenche reader.onload
  }
});
//*************************** formData ****************************//
document.querySelector(".upload_form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = document.getElementById("upload_form");

    // Récupération de l'image (sécurité côté client)
    const imageInput = document.getElementById("image");
    const imageFile = imageInput.files[0];

    if (!imageFile) {
        alert("Veuillez sélectionner une image.");
        return;
    }

    if (imageFile.size > 4 * 1024 * 1024) {
        alert("L'image dépasse la taille maximale de 4 Mo.");
        return;
    }

    // Création manuelle du FormData avec les bons types // Debug erreur 500
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", document.getElementById("title").value.trim());
    formData.append("category", parseInt(document.getElementById("category").value)); // categoryId <> category // Debug erreur 400

    // Log des données envoyées
    console.log("Token envoyé :", localStorage.getItem("authToken"));
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
        console.log(`${key} (typeof):`, typeof value);
    }

    // Envoi au backend
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: formData,
        });

        const responseText = await response.text();
        console.log("Réponse brute du backend :", responseText);

        if (response.ok) {
            alert("Image ajoutée avec succès !");
            form.reset();
            document.querySelector(".photo_visual").innerHTML = `
                <i class="fa-solid fa-image fa-5x" style="color: #cbd6dc;"></i>
                <div class="add_photo">
                    <label for="image" class="add_photo_button">+ Ajouter photo</label>
                </div>
                <p class="photo_type">jpg, png : 4mo max</p>
            `;
            await getWorks();
        } else {
            alert("Erreur lors de l'ajout de l'image.");
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Erreur de réseau, vérifiez votre connexion.");
    }
});

//**************confirm_button--active***************//

const imageInput = document.getElementById("image");
const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("category");
const submitButton = document.querySelector(".confirm_button");

const activeClass = "confirm_buton--active";

function checkFormValidity() {
  const imageIsValid = imageInput.files.length > 0;
  const titleIsValid = titleInput.value.trim() !== "";
  const categoryIsValid = categorySelect.value !== "";

  if (imageIsValid && titleIsValid && categoryIsValid) {
    submitButton.classList.add(activeClass);
  } else {
    submitButton.classList.remove(activeClass);
  }
}

imageInput.addEventListener("change", checkFormValidity);
titleInput.addEventListener("input", checkFormValidity);
categorySelect.addEventListener("change", checkFormValidity);

getWorks();
getCategories();