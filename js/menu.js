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
    images[0].classList.add('active'); // Garante que a primeira imagem está ativa
    setInterval(() => {
      images[current].classList.remove('active');
      current = (current + 1) % images.length;
      images[current].classList.add('active');
    }, 5000);
  }
});

// === Envio do Formulário via EmailJS ===
document.addEventListener('DOMContentLoaded', () => {
  // Verificar se EmailJS está disponível
  if (typeof emailjs !== 'undefined') {
    emailjs.init('c6wlGTr_puOZynphf');
  }

  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      // Verificar se EmailJS está carregado
      if (typeof emailjs === 'undefined') {
        alert('Erro: EmailJS não carregado. Verifique sua conexão.');
        return;
      }

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