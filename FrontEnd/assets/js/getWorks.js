export let works = [];
import { deleteWork } from "./deleteWork.js";
/**
* Récupération des données.
* @typedef Work
* @type {object}
* @property {number} id - L'id de l'objet
* @property {string} title - Nom du projet
* @property {string} imageUrl - L'URL de la vignette associée au projet
* @property {number} categoryId - Identifiant de la catégorie associée
* @property {number} userId - Identifiant de l'auteur
* @property {Category} category - Catégorie associée
*/
const getWorks = async () => {              
  try {
    const response = await fetch('http://localhost:5678/api/works');
    works = await response.json();
    console.log("Récupération des travaux terminée", works)
    
    /*if (!response.ok) { <= le "!" indique le contraire de la condition à côté, si ok = true, alors !ok = false
    // Alors j'affiche à l'utilisateur que le chargement a eu un souci. 
    }*/
  } catch (error) { 
    console.error("Erreur lors de la récupération des travaux", error);
    return [];
  }
}

/**
* Création des éléments pour chaques données
* 
* @param {Work} work - Projet à passer en paramètre pour créer la vignette associée
* 
* @returns {HTMLElement} Retourne la <figure> créée pour le projet
*/
export const createFigure = (work, isModal = false) => {
  const figureElement = document.createElement('figure');
  figureElement.dataset.id = work.id;
  
  const imageElement = document.createElement('img'); 
  imageElement.src = work.imageUrl; 
  imageElement.alt = work.title; 
  figureElement.appendChild(imageElement); //ASSEMBLAGE : on place <img> et <figcaption> dans <figure>
  
  
  
  if (isModal) {
    const trash = document.createElement('button');
    trash.innerHTML = '<i class="mdi mdi-trash-can-outline"></i>';
    trash.classList.add('deleteBtn');
    trash.type = 'button';
    figureElement.appendChild(trash);

    trash.addEventListener('click', async (e) => {
      e.preventDefault();
      const confirmDelete = confirm("Supprimer ce projet ?");
      if (!confirmDelete) return;
      await deleteWork(work.id);
    });
  } else {
    const captionElement = document.createElement('figcaption'); 
    captionElement.innerText = work.title;
    figureElement.appendChild(captionElement);
  }
  
  return figureElement; //on retourne l' élément <figure> complet
}                                                                      

/**
* On "coordonne" getWorks et creatFigure et on les insert dans le DOM (<div class="gallery"></div>)
*/
const insertInContainer = async () => {
  await getWorks(); 
  
  const galleryContainer = document.querySelector('.gallery'); 
  const modalContainer = document.querySelector('.editModal article section'); 
  
  works.forEach((work) => {
    if (galleryContainer && modalContainer) {
      galleryContainer.appendChild(createFigure(work));
      modalContainer.appendChild(createFigure(work, true));
    }
  });
};

insertInContainer(); /*APPEL LA FONCTION !!!!!!*/
