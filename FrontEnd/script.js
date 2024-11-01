async function getWorks() {
   
      const response = await fetch("http://localhost:5678/api/works");
      const data = await response.json();
      console.log("Données des œuvres :", data);
}
  
  // Appelle la fonction pour récupérer les œuvres
  getWorks();

  const oeuvres = [
      {
            "id": 1,
            "image": "http://localhost:5678/images/abajour-tahina1651286843956.png",
            "title": "Abajour Tahina"
      },
      {
            "id": 2,
            "image": "http://localhost:5678/images/appartement-paris-v1651287270508.png",
            "title": "Appartement Paris V"
      },
      {
            "id": 3,
            "image": "http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png",
            "title": "Restaurant Sushisen - Londres"
      },
      {
            "id": 4,
            "image": "http://localhost:5678/images/la-balisiere1651287350102.png",
            "title": "Villa \"La Balisiere\""           
      },
      {
            "id": 5,
            "image": "http://localhost:5678/images/structures-thermopolis1651287380258.png",
            "title": "Structures Thermopolis"
      },
      {
            "id": 6,
            "image": "http://localhost:5678/images/appartement-paris-x1651287435459.png",
            "title": "Appartement Paris X"
      },
      {
            "id": 7,
            "image": "http://localhost:5678/images/le-coteau-cassis1651287469876.png",
            "title": "Pavillon \"Le coteau\" - Cassis"
      },
      {
            "id": 8,
            "image": "http://localhost:5678/images/villa-ferneze1651287511604.png",
            "title": "Villa Ferneze - Isola d'Elba"
      },
      {
            "id": 9,
            "image": "http://localhost:5678/images/appartement-paris-xviii1651287541053.png",
            "title": "Appartement Paris XVIII"
      },
      {
            "id": 10,
            "image": "http://localhost:5678/images/bar-lullaby-paris1651287567130.png",
            "title": "Bar \"Lullaby\" - Paris"
      },
      {
            "id": 11,
            "image": "http://localhost:5678/images/hotel-first-arte-new-delhi1651287605585.png",
            "title": "Hotel First Arte - New Delhi"
      }

  ];