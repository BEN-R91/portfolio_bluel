export async function deleteWork(workId) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const elementsToRemove = document.querySelectorAll(`[data-id="${workId}"]`);  //** voir selection par id defini ds getWorks */
      
      // 4️⃣ Supprimer chaque élément du DOM
      elementsToRemove.forEach((element) => {
        element.remove();
      });
    } 
    else {
      alert("Échec de la suppression du projet ❌");
    }
  } catch (error) {
    alert("Erreur lors de la suppression !");
  }
}