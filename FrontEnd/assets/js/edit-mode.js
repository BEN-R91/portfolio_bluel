export const token = localStorage.getItem("authToken");

export const isLogged = !!token

const banner = document.querySelector(".edit-mode-banner");
const loginLink = document.querySelector('nav ul li a[href="login-page.html"]');
const editButton = document.querySelector(".edit-button");

if (isLogged) {
  banner.style.display = "flex";
  loginLink.textContent = "logout";
  editButton.style.display = "inline-block";
  
  loginLink.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("authToken");
    window.location.reload();
  });
} else {
  banner.style.display = "none";
  loginLink.textContent = "login";
  editButton.style.display = "none";
}