const editButton = document.querySelector(".edit-button");
const modal = document.querySelector(".editModal");
const closeModal = document.querySelector(".closeModal");

editButton.addEventListener("click", () => modal.showModal());
closeModal.addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close();
});