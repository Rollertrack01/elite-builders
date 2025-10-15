window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hide');
    }, 1000);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const btnMobile = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (btnMobile && navMenu) {
    btnMobile.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const isExpanded = btnMobile.getAttribute("aria-expanded") === "true";
      btnMobile.setAttribute("aria-expanded", !isExpanded);
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        btnMobile.setAttribute('aria-expanded', 'false');
      });
    });
  }
});

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

document.querySelectorAll('.img-slider').forEach(slider => {
  const images = slider.querySelectorAll('img');
  if (images.length > 0) {
    let current = 0;
    images[0].classList.add('active');
    setInterval(() => {
      images[current].classList.remove('active');
      current = (current + 1) % images.length;
      images[current].classList.add('active');
    }, 5000);
  }
});



const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.setAttribute('aria-label', 'Voltar ao topo');
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});



function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16);
}

const observerStats = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateCounter(stat, target);
      });
      observerStats.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  observerStats.observe(statsSection);
}



const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active de todos os botões
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filter === 'todos' || category === filter) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 10);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});



const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <div class="lightbox-content">
    <button class="lightbox-close"><i class="fas fa-times"></i></button>
    <img src="" alt="Projeto">
  </div>
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});



let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dot');

function showTestimonial(index) {
  testimonialCards.forEach((card, i) => {
    card.classList.remove('active');
    if (testimonialDots[i]) {
      testimonialDots[i].classList.remove('active');
    }
  });

  if (testimonialCards[index]) {
    testimonialCards[index].classList.add('active');
  }
  if (testimonialDots[index]) {
    testimonialDots[index].classList.add('active');
  }
}

testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
  });
});

// Auto-advance testimonials
if (testimonialCards.length > 0) {
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  }, 5000);
}



const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Fecha todos os itens
    faqItems.forEach(faq => faq.classList.remove('active'));
    
    // Abre o item clicado se não estava aberto
    if (!isActive) {
      item.classList.add('active');
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {
  if (typeof emailjs !== 'undefined') {
    emailjs.init('c6wlGTr_puOZynphf');
  }

  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

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

  

  const orcamentoForm = document.getElementById('orcamento-form');

  if (orcamentoForm) {
    orcamentoForm.addEventListener('submit', function(event) {
      event.preventDefault();

      if (typeof emailjs === 'undefined') {
        alert('Erro: EmailJS não carregado. Verifique sua conexão.');
        return;
      }

      const nome = this.nome.value;
      const email = this.email.value;
      const telefone = this.telefone.value;
      const servico = this.servico.value;
      const area = this.area.value;
      const localizacao = this.localizacao.value;
      const prazo = this.prazo.value;
      const detalhes = this.detalhes.value;

      emailjs.send('gentil', 'template_qma4tuq', {
        nome: nome,
        email: email,
        mensagem: `
          PEDIDO DE ORÇAMENTO
          
          Telefone: ${telefone}
          Serviço: ${servico}
          Área: ${area}
          Localização: ${localizacao}
          Prazo: ${prazo}
          
          Detalhes:
          ${detalhes}
        `
      })
      .then(() => {
        alert('Pedido de orçamento enviado com sucesso! Entraremos em contato em breve.');
        orcamentoForm.reset();
      })
      .catch((error) => {
        alert('Erro ao enviar pedido, tente novamente mais tarde.');
        console.error('Erro:', error);
      });
    });
  }
});



if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});