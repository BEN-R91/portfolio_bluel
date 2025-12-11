// ****previewImage

const fileInput = document.getElementById("image");         
const previewImage = document.querySelector(".addModal form img"); 
const uploadZone = fileInput.parentElement;               

const showImagePreview = () => {
    const selectedFile = fileInput.files[0]; // on récupère le tout premier fichier sélèctionné via l' input
    
    if (selectedFile) {
        const fileReader = new FileReader();  //** >>>>>>>>>> */ on crée l' objet FileReader OUTIL INTEGRE AU NAVIGATEUR
        
        fileReader.onload = (e) => {
            previewImage.src = e.target.result; //** e.target.result contient l'image sous forme de Data URL (une chaîne de caractères qui représente les données du fichier). Cette chaîne est directement assignée à l'attribut src de l'élément <img> de prévisualisation, ce qui affiche instantanément l'image. */
            // previewImage.style.display = "block";
            
            uploadZone.classList.add('div-img')
            // uploadZone.querySelector('img:not(.previewImage)').style.display = 'none';
            // uploadZone.querySelector('label').style.display = 'none';
            // uploadZone.querySelector('p').style.display = 'none';
            
        };
        
        // On démarre la lecture pour créer l'adresse temporaire
        fileReader.readAsDataURL(selectedFile);
    }
};

if (fileInput) {
    fileInput.addEventListener("change", showImagePreview);
}

// ********filter-btn-active / inactive

const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("category");
const submitBtn = document.querySelector("button[type='submit']");

titleInput.addEventListener("input", checkForm);
categorySelect.addEventListener("change", checkForm);
fileInput.addEventListener("change", checkForm);

function checkForm() {
    const fileOK = fileInput.files.length > 0; 
    const titleOK = titleInput.value.length > 0;
    const categoryOK = categorySelect.value !== "";
    
    if (fileOK && titleOK && categoryOK) {
        submitBtn.classList.add("filter-btn-active");
        submitBtn.classList.remove("filter-btn-inactive");
        submitBtn.disabled = false; // >>>>>>>>>le bouton devient cliquable (cool) !!
    } else {
        submitBtn.classList.remove("filter-btn-active");
        submitBtn.classList.add("filter-btn-inactive");
        submitBtn.disabled = true;
    }
}
