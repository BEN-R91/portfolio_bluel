/** */

import {works, createFigure} from './getWorks';

//On récupere l' ID des différentes cat

const getCategories = async () => {
    try {
        const response = await fetch ('http://localhost:5678/api/categories');
        const categoryID = await response.json();
        console.log("Récupération des categories terminée", categoryID);
        return categoryID;
    } catch (error) {
        console.error("Erreur lors de la récuperation des categories", error);
        return [];
    }
}
                                                                            //Création du container pour FilterBar
const createFiltersContainer = () => {
    const galleryContainer = document.querySelector('.gallery');
        
    const filtersContainer = document.createElement('div');
    filtersContainer.classList.add('filters');

    galleryContainer.parentNode.insertBefore(filtersContainer,galleryContainer);
    return filtersContainer;
}
                                                                            //
const displayWorks = (worksToDisplay) => {
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.innerHTML = '';  

    worksToDisplay.forEach ((work) => {
        galleryContainer.appendChild(createFigure(work)); //OMG!
    });
}                                                                           
                                                                            //Création de la barre de nav (.filtres) et des boutons selon les cat récupérées
const createFilterBar = async () => {
    const categoryID = await getCategories(); 
    const filtersContainer = document.querySelector('.filters');
    const createButton = (name, categoryID) => {
        const button = document.createElement('button');
        button.textContent = name;
        button.classList.add('filter-btn');
        
        button.addEventListener('click', () => { // on installe un écouteur sur le bouton, il attend le "click"
            //TERNAIRE (if/else en court)
            let filteredWorks = (categoryID === 0) //condition qui verifie si l' id passé à la fonction = 0 (0=Tous)
            ? works //si la condition est VRAIE (pour bouton Tous), filteredWorks reçoit tout le tableau (works => dataset)
            : works.filter(work => work.categoryID === categoryID); // si condition FAUSSE (id=1) on utilise .filter() sur works ===> (  un projet => ID du projet en cours de vérification === ID de catégorie du bouton cliqué, si False dégage sinon ajouté au nouveau tableau filteredWorks)

        displayWorks(filteredWorks); //on envoie soit le tableau complet ou le tableau filtré (fonction PRECEDENTE)
        });
    
        filtersContainer.appendChild(button);
        return button;
    }

    createButton("Tous", 0);
    categoryID.forEach(category => {
        createButton(category.name, category.id);
    });

}

getCategories();

createFiltersContainer();
createFilterBar();
