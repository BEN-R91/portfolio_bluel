async function getWorks() {
   
      const response = await fetch("http://localhost:5678/api/works"); 
      const data = await response.json();
      console.log("Données des œuvres :", data);
      displayGallery(data)
}

function displayGallery(data) {
      const gallery = document.querySelector('.gallery');
      //**gallery.innerHTML = '';
      
      data.forEach(work => { //**forEach parcourt chaque élément du tableau data */
            const figure = document.createElement('figure'); //**création des éléments html, figure étant le conteneur principal pour chaque objet */
            const img = document.createElement('img');
            img.src = work.imageUrl; //**on définit src avec le lien de l' image fourni par le backend */
            img.alt = work.title; //** texte alternatif */
            const figcaption = document.createElement('figcaption'); //**correspond au title du projet */
            figcaption.textContent = work.title;
            figure.appendChild(img);
            figure.appendChild(figcaption); //**ajoute l' image et la légende à l' interieur de l'élément figure */
            gallery.appendChild(figure); //**on insère chaque figure dans la galerie */
    });
}

//* Qu est ce qu' on fait de la div Gallery ??

  
 
  getWorks();

 