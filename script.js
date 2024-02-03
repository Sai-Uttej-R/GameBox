// Add this to your script.js
const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('nav ul');

burgerMenu.addEventListener('click', () => {
    nav.classList.toggle('show');
});