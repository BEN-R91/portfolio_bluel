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

const getWorks = async () => {
    
    try {
        const response = await fetch('http://localhost:5678/api/works'); //pourquoi ' et plus "//
        const worksData = await response.json();
        console.log("Récupération des travaux terminée", worksData)
        return worksData;
    }

    catch (error) { /*revoir role du catch (error)*/
        console.error("Erreur lors de la récupération des travaux", error); //role du "error" apres la virgule//
        return []; /*pourquoi retourner un tableau vide est essentiel*/
    }
}

const createFigure = (work) => { /*WORK ??????*/
    
    const figureElement = document.createElement('figure'); //création de l' élément "figure" (conteneur parent)//
    const imageElement = document.createElement('img'); //création de l' élément "img"//
    imageElement.src = work.imageUrl; //Récupère l' URL (src)
    imageElement.alt = work.title; //Récupère le tire (alt)

    const captionElement = document.createElement('figcaption'); //création de l'élément "figcaption"
    captionElement.innerText = work.title; //ajout du texte de la légende

    figureElement.appendChild(imageElement); //ASSEMBLAGE : on place <img> et <figcaption> dans <figure>
    figureElement.appendChild(captionElement);

    return figureElement; //ON RETOURNE l' élément <figure> complet
}                                                                              //Pour creatFigure REVISER FONCTIONNEMENT ET WORK + RAJOUT log pour verif fonctionnement si possible

const insertInContainer = () => {
    // 3.
}

getWorks(); /*appeler la fonction !!!!*/