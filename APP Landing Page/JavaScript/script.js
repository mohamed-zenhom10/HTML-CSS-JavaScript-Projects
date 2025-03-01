// Start Header Scripting
let menuIcon = document.getElementById("menu-icon");
let navBar = document.querySelector(".navbar");
menuIcon.onclick = () => {
    navBar.classList.toggle("active");
    menuIcon.classList.toggle("fa-x");
}
// End Header Scripting