const url_api = "http://localhost:5678/api/users/login";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;
    
    if (!email || !password) { //si email ou mdp pas bon ou vide ! || !
      alert("Merci d' indiquer votre mot de passe et votre E-mail");
      return;
    }
    
    const response = await fetch(url_api, {
      method: "POST", 
      headers: { "Content-Type": "application/json" }, //HEADERS HTTP!! Content-Type: application/json → “je t’envoie du JSON” autres ex : Authorization: Bearer XXXXXX → “voici mon jeton d’accès” Authorization: Bearer XXXXXX → “voici mon jeton d’accès” Accept: application/json → “je veux une réponse au format JSON”
      body: JSON.stringify({ email, password }) // on transforme les données en JSON (texte brut pour que le serv comprenne jemploie JSON.stringify) et donc données concernées email et pwd. body= corp/contenu de la requete
    });
    
    if (response.ok) {
      const data = await response.json(); 
      localStorage.setItem("authToken", data.token); 
      window.location.href = "index.html"; 
    } else {
      alert("E-mail ou mot de passe incorrect");
    }
  });
});


