async function getWorks() {
    try {
      const response = await fetch("http://localhost:5678/works");
      if (!response.ok) throw new Error("Erreur dans la récupération des données");
      const data = await response.json();
      console.log("Données des œuvres :", data);
      // Ici tu peux travailler avec `data` pour afficher les œuvres dans ta page
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  }
  
  // Appelle la fonction pour récupérer les œuvres
  getWorks();