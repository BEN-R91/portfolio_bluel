// on importe ce dont on a besoin
import { works, createFigure } from "./getWorks.js";
import { token } from "./edit-mode.js";

// on selectionne les éléments
const form = document.querySelector(".addModal form");
// const fileInput = document.getElementById("file");
// const titleInput = document.getElementById("title");
// const categorySelect = document.getElementById("category");
const previewImage = document.querySelector(".addModal form img");

// ** on commence la logique :

// on écoute le submit
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // // on récupère les valeurs du formulaire
  // const file = fileInput.files[0];
  // const title = titleInput.value.trim();
  // const category = categorySelect.value;
  
  // // on en crée un FormData pour envoyer le données 
  // const formData = new FormData();
  // formData.append("image", file);
  // formData.append("title", title);
  // formData.append("category", category);
  
  // on l' envoie à l' api
  // le FormData est obligatoire ici car on a une image !
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: new FormData(form), // Quand on utilise un FormData on peut lui passer directement le formulaire en paramèter pour récupérer les données des champs à l'intérieur
  });
  
  // on alerte si ça plante
  if (!response.ok) {
    alert("Impossible d'ajouter le projet.");
    return;
  }
  
  // on reçoit en json dans newWork
  const newWork = await response.json();

  // on ajoute newWork dans la galerie
  document.querySelector(".gallery")
    .appendChild(createFigure(newWork));

  // on ajoute newWork dans la modale
  document.querySelector(".editModal article section")
    .appendChild(createFigure(newWork, true));

  // on reset formulaire + preview
  form.reset();
  previewImage.src = "/assets/images/image.svg";
  previewImage.parentElement.classList.remove('div-img');
});