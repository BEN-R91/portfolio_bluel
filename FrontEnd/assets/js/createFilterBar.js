                                                                            //On récupere l' ID des différentes cat

const getCategoryId = async () => {
    
    try {
        const response = await fetch ('http://localhost:5678/api/categoryID');
        const categoryID = await response.json();
        console.log("Récupération des categoryID terminée", categoryID);
        return categoryID;
    }

    catch (error) {
        console.error("Erreur lors de la récuperation des categoryID", error);
        return [];
    }
}
                                                                            //Création de la barre de nav (.filtres) et des boutons selon les cat récupérées
const createFilterBar = async () => {
    const categoryID = await getCategoryId();
}