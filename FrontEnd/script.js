async function getWorks() {
   
      const response = await fetch("http://localhost:5678/api/works");
      const data = await response.json();
      console.log("Données des œuvres :", data);
}
  
  // Appelle la fonction pour récupérer les œuvres
  getWorks();