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

fileInput.addEventListener("change", () => { 
  const file = fileInput.files[0]; 

  if (file && file.type.startsWith("image/")) { 
    const reader = new FileReader();

    reader.onload = function (e) {  
      const photoVisual = document.querySelector('.photo_visual');  

      photoVisual.innerHTML = ''; 

      const imgPreview = document.createElement('img'); 
      imgPreview.src = e.target.result; 
      imgPreview.alt = "Aperçu de l'image";  
      imgPreview.classList.add('img_preview'); 

      photoVisual.appendChild(imgPreview); 
    };

    reader.readAsDataURL(file); 
  }
});
//*************************** formData ****************************/
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

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", document.getElementById("title").value.trim());
    formData.append("category", parseInt(document.getElementById("category").value)); 

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

const activeClass = "confirm_button--active";

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