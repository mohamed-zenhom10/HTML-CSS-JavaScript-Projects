// Start Header Scripting
let menuIcon = document.getElementById("menu-icon");
let navBar = document.querySelector(".navbar");
menuIcon.onclick = function() {
    menuIcon.classList.toggle("fa-x");
    navBar.classList.toggle("appear");
}
// End Header Scripting
// Start Home Scripting
// let title = document.querySelector(".title");
// let text = document.querySelector(".text");
// let mainImage = document.querySelector(".main-image img");
// let secondImage = document.querySelector(".second-image img");
// window.onload = function() {
//     title.style.top = '0';
// }
// End Home Scripting

let toUp = document.querySelector(".toUp");

window.onload = function () {
    if(window.scrollY < 872) {
        toUp.style.display = "none";
    } else {
        toUp.style.display = "block";
    }
}