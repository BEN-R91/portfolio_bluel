// Elements modal 1
const editButton = document.querySelector(".edit-button");
const editModal = document.querySelector(".editModal");
const closeModal = editModal.querySelector("header button");

// Elements modal 2 
const addPhotoButton = document.getElementById("addPhotoButton");
const addPhotoModal = document.getElementById("addPhotoModal");
const closeAddPhotoModal = document.getElementById("closeAddPhotoModal");
const backToGalleryModal = document.getElementById("backToGalleryModal");

// Fermeture générique    
 const closeIfOutside = (modal) => {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });
};

closeIfOutside(editModal);
closeIfOutside(addPhotoModal);

// Ouvertures et fermetures spécifiques

// Ouverture / Fermeture modal 1
editButton.addEventListener("click", () => editModal.showModal()); // edit
closeModal.addEventListener("click", () => editModal.close()); // X

addPhotoButton.addEventListener("click", () => { // Ouverture modal 2
    editModal.close(); 
    addPhotoModal.showModal(); 
});

closeAddPhotoModal.addEventListener("click", () => addPhotoModal.close()); // X

backToGalleryModal.addEventListener("click", () => {
    addPhotoModal.close();
    editModal.showModal();
});