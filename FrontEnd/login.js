document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const errorMessage = document.querySelector("#error-message");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const userData = {
        email: emailInput.value,
        password: passwordInput.value,
      };
  
      try {
        const response = await fetch("http://localhost:5678/api/users/login", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
  
        const data = await response.json();
        console.log("Réponse serveur :", data);
        if (response.ok) {
          localStorage.setItem("authToken", data.token); 
          window.location.href = "index.html"; 
        } else {
          errorMessage.textContent = "Identifiants incorrects !";
          errorMessage.style.display = "block"; 
        }
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        errorMessage.textContent = "Problème de connexion au serveur.";
        errorMessage.style.display = "block";
      }
    });
  });

