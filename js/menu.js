// === Menu Mobile ===
const btnMobile = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

btnMobile.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  const isExpanded = btnMobile.getAttribute("aria-expanded") === "true";
  btnMobile.setAttribute("aria-expanded", !isExpanded);
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
  let current = 0;
  setInterval(() => {
    images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
  }, 5000); // troca a cada 5 segundos
});

// === Envio do Formulário via EmailJS ===
document.addEventListener('DOMContentLoaded', () => {
  emailjs.init('c6wlGTr_puOZynphf'); // coloque seu User ID público aqui

  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      // Pegando os valores pelo name dos inputs
      const nome = this.nome.value;
      const email = this.email.value;
      const mensagem = this.mensagem.value;

      emailjs.send('gentil', 'template_qma4tuq', {
        nome: nome,
        email: email,
        mensagem: mensagem
      })
      .then(() => {
        alert('Email enviado com sucesso! Obrigado pelo contato.');
        form.reset();
      })
      .catch((error) => {
        alert('Erro ao enviar email, tente novamente mais tarde.');
        console.error('Erro:', error);
      });
    });
  }
});
