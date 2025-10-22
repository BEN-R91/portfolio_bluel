/** */

import { works, createFigure } from './getWorks';                                      

/**
* On récupere l' ID des différentes cat
* 
* @typedef Category
* @type {object}
* @property {number} id - Identifiant de la catégorie
* @property {string} name - Nom de la catégory
* 
* @returns {Promise<Category[]>}
*/
const getCategories = async () => {
    try {
        const response = await fetch('http://localhost:5678/api/categories');
        const categories = await response.json();
        console.log("Récupération des categories terminée", categories);
        return categories;
    } catch (error) {
        console.error("Erreur lors de la récuperation des categories", error);
        return [];
    }
}

/**
* Création du container pour FilterBar
* 
* @returns {HTMLDivElement} - Conteneur qui englobe ensuite les boutons de filtre
*/
const createFiltersContainer = () => {
    const galleryContainer = document.querySelector('.gallery');
    
    const filtersContainer = document.createElement('div');
    filtersContainer.classList.add('filters');
    
    galleryContainer.insertAdjacentElement('beforebegin', filtersContainer); // ***********************************
    return filtersContainer;
}

// Affichage des travaux
const displayWorks = (worksToDisplay) => {
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.innerHTML = '';
    
    worksToDisplay.forEach((work) => {
        galleryContainer.appendChild(createFigure(work)); // pour chaque projets work on appel createFigure pour <figure> <img> <figacaption>
    });
}

//Création de la barre de nav (.filtres) et des boutons selon les cat récupérées
const createFilterBar = async () => {
    const categories = await getCategories();
    const filtersContainer = document.querySelector('.filters');
    
    /**
    * Crée les boutons avec les catégories
    * 
    * @param {Category} - Une catégorie
    *
    * @returns void
    */
    const createButton = ({name, id}) => {  //************************************(décomposition d'objet) */
        const button = document.createElement('button');
        button.textContent = name;
        button.classList.add('filter-btn');
        
        button.addEventListener('click', () => {
            const currentActive = filtersContainer.querySelector('.filter-btn-active');
            if (currentActive) {
                currentActive.classList.remove('filter-btn-active'); // pour retirer la class active 
            }
            button.classList.add('filter-btn-active'); // pour l' ajouter
            //TERNAIRE (if/else en court)
            let filteredWorks = (id === 0) //condition qui verifie si l' id passé à la fonction = 0 (0=Tous)
            ? works //si la condition est VRAIE (pour bouton Tous), filteredWorks reçoit tout le tableau (works => dataset)
            : works.filter((work) => work.categoryId === id); // si condition FAUSSE (id=1) on utilise .filter() sur works ===> (  un projet => ID du projet en cours de vérification === ID de catégorie du bouton cliqué, si False dégage sinon ajouté au nouveau tableau filteredWorks)
            
            displayWorks(filteredWorks); //on envoie soit le tableau complet ou le tableau filtré (fonction PRECEDENTE)
        });
        
        filtersContainer.appendChild(button);
    }
    
    createButton({
        name: "Tous", 
        id: 0,
    }); // penser à passer un objet !
    categories.forEach(createButton);
}

getCategories();

createFiltersContainer();
createFilterBar();
