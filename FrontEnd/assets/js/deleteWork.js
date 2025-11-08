export async function deleteWork(workId) {
  const token = localStorage.getItem("authToken");

  try {
    // 1️⃣ Envoi de la requête DELETE à l’API
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 2️⃣ Si la requête réussit
    if (response.ok) {
      // 3️⃣ Sélectionner tous les éléments ayant le bon data-id
      const elementsToRemove = document.querySelectorAll(`[data-id="${workId}"]`);
      
      // 4️⃣ Supprimer chaque élément du DOM
      elementsToRemove.forEach((element) => {
        element.remove();
      });
    } 
    // 5️⃣ Si la suppression échoue
    else {
      alert("Échec de la suppression du projet ❌");
    }
  } catch (error) {
    alert("Erreur lors de la suppression !");
  }
}