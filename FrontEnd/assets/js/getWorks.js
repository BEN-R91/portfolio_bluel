/*const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();
console.log(works);

/*
1. Récupérer les données avec fetch avec une fonction
2. Créer des images (src + alt) + figcaption + figure dans une fonction
<figure>
	<img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
	<figcaption>Abajour Tahina</figcaption>
</figure>
3. Dans une fonction :
3.1 Boucler (faire une boucle au sens JS) sur le tableau récupéré en 1. pour construire les figures avec la fonction 2.
3.2 Insérer chaque figure dans le container approprié (<div class="gallery"></div>)
*/

export const works = [];

/**
 * Récupération des données.
 * 
 * @typedef Category
 * @type {object}
 * @property {number} id - Identifiant de la catégorie
 * @property {string} name - Nom de la catégory
 * 
 * @typedef Work
 * @type {object}
 * @property {number} id - L'id de l'objet
 * @property {string} title - Nom du projet
 * @property {string} imageUrl - L'URL de la vignette associée au projet
 * @property {number} categoryId - Identifiant de la catégorie associée
 * @property {number} userId - Identifiant de l'auteur
 * @property {Category} category - Catégorie associée
 * 
 * @returns {Promise<Work[]>}
 */
const getWorks = async () => {              
    try {
        const response = await fetch('http://localhost:5678/api/works');
        const worksData = await response.json();
        console.log("Récupération des travaux terminée", worksData)

        /*if (!response.ok) { <= le "!" indique le contraire de la condition à côté, si ok = true, alors !ok = false
           // Alors j'affiche à l'utilisateur que le chargement a eu un souci. 
        }*/

        return worksData;
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
export const createFigure = (work) => {
    const figureElement = document.createElement('figure'); 
    
    const imageElement = document.createElement('img'); 
    imageElement.src = work.imageUrl; 
    imageElement.alt = work.title; 

    const captionElement = document.createElement('figcaption'); 
    captionElement.innerText = work.title;

    figureElement.appendChild(imageElement); //ASSEMBLAGE : on place <img> et <figcaption> dans <figure>
    figureElement.appendChild(captionElement);

    return figureElement; //on retourne l' élément <figure> complet
}                                                                      

/**
 * On "coordonne" getWorks et creatFigure et on les insert dans le DOM (<div class="gallery"></div>)
 */
const insertInContainer = async () => {
    const works = await getWorks(); //On attend que getWorks soit terminé
    const galleryContainer = document.querySelector('.gallery'); //On cible .gallery

    works.forEach((work) => {
        const workFigure = createFigure(work);
        galleryContainer.appendChild(workFigure);
        // galleryContainer.appendChild(createFigure(work)); <= à privilégier pour éviter de créer une variable
    })
}



insertInContainer(); /*APPEL LA FONCTION !!!!!!*/
