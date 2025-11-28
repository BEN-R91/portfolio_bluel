// ****previewImage

const fileInput = document.getElementById("file");         
const previewImage = document.querySelector(".previewImage"); 
const uploadZone = fileInput.parentElement;               

const showImagePreview = () => {
    const selectedFile = fileInput.files[0];
    
    if (selectedFile) {
        // Outil pour lire le contenu du fichier
        const fileReader = new FileReader();
        
        fileReader.onload = (e) => {
            previewImage.src = e.target.result; 
            previewImage.style.display = "block";
            
            // Masquer les éléments par défaut, en ciblant les enfants du <div> parent
            uploadZone.querySelector('img:not(.previewImage)').style.display = 'none';
            uploadZone.querySelector('label').style.display = 'none';
            uploadZone.querySelector('p').style.display = 'none';
        };
        
        // Démarrer la lecture pour créer l'adresse temporaire
        fileReader.readAsDataURL(selectedFile);
    }
};


// Attacher la fonction au changement de l'input
if (fileInput) {
    fileInput.addEventListener("change", showImagePreview);
}

// ********filter-btn-active / inactive

const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("category");
const submitBtn = document.querySelector("button[type='submit']");

function checkForm() {
    const fileOK = fileInput.files.length > 0;
    const titleOK = titleInput.value.trim() !== "";
    const categoryOK = categorySelect.value !== "";

    if (fileOK && titleOK && categoryOK) {
        submitBtn.classList.add("filter-btn-active");
        submitBtn.classList.remove("filter-btn-inactive");
        submitBtn.disabled = false;
    } else {
        submitBtn.classList.remove("filter-btn-active");
        submitBtn.classList.add("filter-btn-inactive");
        submitBtn.disabled = true;
    }
}

// Écoute tout le monde, comme un bon daron protecteur
fileInput.addEventListener("change", checkForm);
titleInput.addEventListener("input", checkForm);
categorySelect.addEventListener("change", checkForm);

// Appel initial pour griser le bouton au début
checkForm();