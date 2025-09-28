const reponse = await fetch("http://localhost:5678/api/works");
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
    // 1.
}

const createFigure = () => {
    // 2.
}

const insertInContainer = () => {
    // 3.
}