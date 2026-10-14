/* ===================================================== */
/* NAVBAR SCROLL EFFECT */
/* ===================================================== */

const navbar = document.querySelector(".custom-navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

/* ===================================================== */
/* SCROLL REVEAL ANIMATION */
/* ===================================================== */

const reveals = document.querySelectorAll(
  ".info-card, .problem-card, .objective-card, .timeline-item, .scam-card, .question-item, .team-card, .gallery-img, .cartilha-card, .quiz-block"
);

function revealElements() {
  const windowHeight = window.innerHeight;
  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

reveals.forEach((element) => {
  element.classList.add("reveal");
});

window.addEventListener("scroll", revealElements);
revealElements();

/* ===================================================== */
/* SMOOTH ACTIVE MENU */
/* ===================================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active-link");
    }
  });
});

/* ===================================================== */
/* PARALLAX EFFECT */
/* ===================================================== */

window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-section");
  if (hero) {
    let offset = window.pageYOffset;
    hero.style.backgroundPositionY = offset * 0.5 + "px";
  }
});

/* ===================================================== */
/* GLOW EFFECT FOLLOW MOUSE */
/* ===================================================== */

document.addEventListener("mousemove", (e) => {
  const glow = document.querySelector(".hero-overlay");
  if (!glow) return;
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  glow.style.background = `
    radial-gradient(
      circle at ${x * 100}% ${y * 100}%,
      rgba(59,130,246,0.22),
      transparent 35%
    )
  `;
});

/* ===================================================== */
/* FLOATING CARDS EFFECT */
/* ===================================================== */

const floatingCards = document.querySelectorAll(
  ".objective-card, .problem-card, .scam-card"
);

floatingCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  });
});

/* ===================================================== */
/* LIGHTBOX GALLERY */
/* ===================================================== */

const galleryImages = document.querySelectorAll(".gallery-img");

galleryImages.forEach((img) => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => {
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.innerHTML = `<img src="${img.src}" alt="">`;
    document.body.appendChild(lightbox);
    lightbox.addEventListener("click", () => {
      lightbox.remove();
    });
  });
});

/* ===================================================== */
/* MOBILE MENU AUTO CLOSE */
/* ===================================================== */

const navItems = document.querySelectorAll(".nav-link");
const menuToggle = document.querySelector(".navbar-collapse");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (menuToggle && menuToggle.classList.contains("show")) {
      new bootstrap.Collapse(menuToggle).toggle();
    }
  });
});

/* ===================================================== */
/* DYNAMIC YEAR */
/* ===================================================== */

const yearElement = document.querySelector(".copyright");

if (yearElement) {
  const currentYear = new Date().getFullYear();
  yearElement.innerHTML = `© ${currentYear} - Projeto Integrado UNIFEV`;
}

/* ===================================================== */
/* TYPEWRITER EFFECT HERO */
/* ===================================================== */

const title = document.querySelector(".hero-title");

if (title) {
  title.style.opacity = "0";
  window.addEventListener("load", () => {
    setTimeout(() => {
      title.style.transition = "1s ease";
      title.style.opacity = "1";
    }, 300);
  });
}

/* ===================================================== */
/* PROGRESS BARS */
/* ===================================================== */

window.addEventListener("load", () => {
  const bars = document.querySelectorAll(".progress-bar");
  bars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    if (width) {
      setTimeout(() => {
        bar.style.width = width;
      }, 300);
    }
  });
});

/* ===================================================== */
/* PRELOADER */
/* ===================================================== */

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }
});

/* ===================================================== */
/* OPÇÃO INTERATIVA: DESTAQUE AO SELECIONAR */
/* ===================================================== */

document.addEventListener("change", (e) => {
  if (e.target.type === "radio") {
    const name = e.target.name;
    const labels = document.querySelectorAll(`input[name="${name}"]`);
    labels.forEach((input) => {
      const label = input.closest(".option-label");
      if (label) label.classList.remove("selected");
    });
    const selected = e.target.closest(".option-label");
    if (selected) selected.classList.add("selected");
  }
});

/* ===================================================== */
/* QUESTIONÁRIO — LÓGICA PRINCIPAL */
/* ===================================================== */

/*
  Gabaritos:
  Parte 1 (antes): não há certo/errado, é diagnóstico. Apenas registra.
  Parte 2 (depois): d1=c, d2=a, d3=b, d4=b, d5=c
*/

const gabarito = {
  d1: "c",
  d2: "a",
  d3: "b",
  d4: "b",
  d5: "c",
};

window.submeterQuiz = function(parte) {

  const formId = `form-${parte}`;
  const resultId = `resultado-${parte}`;
  const form = document.getElementById(formId);
  const resultBox = document.getElementById(resultId);

  if (!form || !resultBox) return;

  const prefix = parte === "antes" ? "a" : "d";
  const perguntas = [1, 2, 3, 4, 5].map((n) => `${prefix}${n}`);

  let semResposta = false;
  let respostas = {};

  perguntas.forEach((q) => {
    const sel = form.querySelector(`input[name="${q}"]:checked`);
    if (!sel) {
      semResposta = true;
    } else {
      respostas[q] = sel.value;
    }
  });

  if (semResposta) {
    resultBox.style.display = "block";
    resultBox.className = "quiz-result-box result-warn";
    resultBox.innerHTML = `
      <strong>⚠️ Atenção:</strong> Por favor, responda todas as perguntas antes de enviar.
    `;
    resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  /* -- PARTE 1: diagnóstico, sem pontuação -- */
  if (parte === "antes") {

    const protetora = [respostas.a1 === "sim", respostas.a2 === "nao", respostas.a3 === "nao", respostas.a4 === "nao", respostas.a5 === "sim"];
    const score = protetora.filter(Boolean).length;

    let mensagem, classe;

    if (score >= 4) {
      classe = "result-ok";
      mensagem = `
        <div class="result-score">✅ Ótimo ponto de partida!</div>
        Você já demonstra bom nível de consciência digital. Continue lendo a cartilha para reforçar o que você já sabe e descobrir ainda mais formas de se proteger.
      `;
    } else if (score >= 2) {
      classe = "result-warn";
      mensagem = `
        <div class="result-score">📖 Vale reforçar o conhecimento</div>
        Você tem alguma noção sobre golpes, mas ainda há pontos de atenção importantes. Leia a cartilha com calma — ela vai te ajudar muito!
      `;
    } else {
      classe = "result-info";
      mensagem = `
        <div class="result-score">🔍 Muita coisa para aprender!</div>
        Não se preocupe — a maioria das pessoas não conhece todos esses golpes. Por isso criamos esta cartilha! Leia com atenção e depois faça a Parte 2.
      `;
    }

    resultBox.style.display = "block";
    resultBox.className = `quiz-result-box ${classe}`;
    resultBox.innerHTML = mensagem;

    /* Desabilitar formulário */
    form.querySelectorAll("input, button").forEach((el) => (el.disabled = true));
    resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  /* -- PARTE 2: com gabarito -- */
  if (parte === "depois") {

    let acertos = 0;

    perguntas.forEach((q) => {
      const correctVal = gabarito[q];
      const inputs = form.querySelectorAll(`input[name="${q}"]`);

      inputs.forEach((input) => {
        const label = input.closest(".option-label");
        if (!label) return;
        label.classList.remove("selected");
        if (input.value === correctVal) {
          label.classList.add("correct");
        } else if (input.checked && input.value !== correctVal) {
          label.classList.add("wrong");
        }
      });

      if (respostas[q] === correctVal) acertos++;
    });

    let mensagem, classe;

    if (acertos === 5) {
      classe = "result-ok";
      mensagem = `
        <div class="result-score">🏆 ${acertos}/5 — Excelente!</div>
        Parabéns! Você acertou tudo. Você está preparado para reconhecer golpes digitais e proteger a si mesmo e sua família. Compartilhe o que aprendeu!
      `;
    } else if (acertos >= 3) {
      classe = "result-warn";
      mensagem = `
        <div class="result-score">👍 ${acertos}/5 — Bom resultado!</div>
        Você aprendeu bastante! Veja em verde as respostas corretas e em vermelho o que você errou. Releia a cartilha nas partes sobre esses temas para fixar bem.
      `;
    } else {
      classe = "result-info";
      mensagem = `
        <div class="result-score">📚 ${acertos}/5 — Continue estudando!</div>
        Não desanime! As respostas corretas estão marcadas em verde. Recomendamos reler a cartilha com calma e refazer o questionário depois. Cada detalhe que você aprende é uma proteção a mais!
      `;
    }

    resultBox.style.display = "block";
    resultBox.className = `quiz-result-box ${classe}`;
    resultBox.innerHTML = mensagem;

    form.querySelectorAll("input, button").forEach((el) => (el.disabled = true));
    resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

};
/* ===================================================== */
/* ACESSIBILIDADE - TAMANHO DA FONTE */
/* ===================================================== */

const htmlElement = document.documentElement;

const fontLevels = [
  "font-small",
  "font-medium",
  "font-large",
  "font-xlarge"
];

let currentFont = 1;

htmlElement.classList.add(fontLevels[currentFont]);

function updateFontLevel(){
  htmlElement.classList.remove(...fontLevels);
  htmlElement.classList.add(fontLevels[currentFont]);
}

document.getElementById("increaseFont")?.addEventListener("click", () => {
  if(currentFont < fontLevels.length - 1){
    currentFont++;
    updateFontLevel();
  }
});

document.getElementById("decreaseFont")?.addEventListener("click", () => {
  if(currentFont > 0){
    currentFont--;
    updateFontLevel();
  }
});

/* ===================================================== */
/* LEITOR DE VOZ PARA IDOSOS */
/* ===================================================== */

let speechInstance = null;

function falarTexto(texto){

  if(!('speechSynthesis' in window)){
    alert("Seu navegador não suporta leitura em voz.");
    return;
  }

  window.speechSynthesis.cancel();

  speechInstance = new SpeechSynthesisUtterance(texto);

  speechInstance.lang = "pt-BR";
  speechInstance.rate = 0.85;
  speechInstance.pitch = 1;
  speechInstance.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  const vozPT = voices.find(v => v.lang.includes('pt'));

  if(vozPT){
    speechInstance.voice = vozPT;
  }

  window.speechSynthesis.speak(speechInstance);
}

document.getElementById("readSite")?.addEventListener("click", () => {

  const content = document.body.innerText
    .replace(/\s+/g, ' ')
    .trim();

  falarTexto(content);
});

document.getElementById("stopReading")?.addEventListener("click", () => {
  window.speechSynthesis.cancel();
});
/* ===================================================== */
/* END */
/* ===================================================== */
