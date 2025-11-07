const editButton = document.querySelector(".edit-button");
const editModal = document.querySelector(".editModal");
const closeModal = editModal.querySelector("header button");

editButton.addEventListener("click", () => editModal.showModal());
closeModal.addEventListener("click", () => editModal.close());
editModal.addEventListener("click", (e) => {
  if (e.target === editModal) editModal.close();
});