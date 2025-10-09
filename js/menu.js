// === Preloader ===
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hide');
    }, 1000);
  }
});

// === Menu Mobile ===
document.addEventListener('DOMContentLoaded', () => {
  const btnMobile = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (btnMobile && navMenu) {
    btnMobile.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const isExpanded = btnMobile.getAttribute("aria-expanded") === "true";
      btnMobile.setAttribute("aria-expanded", !isExpanded);
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        btnMobile.setAttribute('aria-expanded', 'false');
      });
    });
  }
});

// === Animação Scroll ===
const fadeElements = document.querySelectorAll(".fade-in, .service-item");

function showOnScroll() {
  const trigger = window.innerHeight * 0.85;
  fadeElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add("show");
  });
}
window.addEventListener("scroll", showOnScroll);
window.addEventListener("load", showOnScroll);

// === Slider de Imagens ===
document.querySelectorAll('.img-slider').forEach(slider => {
  const images = slider.querySelectorAll('img');
  if (images.length > 0) {
    let current = 0;
    images[0].classList.add('active');
    setInterval(() => {
      images[current].classList.remove('