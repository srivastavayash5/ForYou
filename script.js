document.addEventListener("DOMContentLoaded", function () {
  // Remove preloader on window load and generate floating hearts
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    preloader.classList.add("animate__animated", "animate__fadeOut");
    setTimeout(() => { preloader.style.display = "none"; }, 1000);
  });

  // Attempt to auto-play music (subject to browser policies)
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.volume = 0.2;
  bgMusic.play().catch(e => console.error("Auto-play was blocked:", e));

  // Generate Floating Hearts
  generateHearts(30);

  // Ripple effect for buttons
  document.querySelectorAll(".ripple-btn").forEach(button => {
    button.addEventListener("click", function (e) {
      const circle = document.createElement("span");
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - (this.offsetLeft + radius)}px`;
      circle.style.top = `${e.clientY - (this.offsetTop + radius)}px`;
      circle.classList.add("ripple");
      const ripple = this.getElementsByClassName("ripple")[0];
      if (ripple) { ripple.remove(); }
      this.appendChild(circle);
    });
  });

  // Music toggle functionality
  const musicToggle = document.getElementById("musicToggle");
  let isPlaying = true;
  musicToggle.addEventListener("click", () => {
    if(isPlaying) {
      bgMusic.pause();
      musicToggle.innerHTML = '<i class="fas fa-play"></i>';
      musicToggle.title = "Play Music";
      isPlaying = false;
    } else {
      bgMusic.play().then(() => {
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        musicToggle.title = "Pause Music";
        isPlaying = true;
      }).catch(e => console.error(e));
    }
  });
  musicToggle.innerHTML = '<i class="fas fa-music"></i>';

  // Thoughts posting functionality with localStorage persistence
  const thoughtForm = document.getElementById("thoughtForm");
  const thoughtInput = document.getElementById("thoughtInput");
  const thoughtList = document.getElementById("thoughtList");
  function loadThoughts() {
    const thoughts = JSON.parse(localStorage.getItem("thoughts")) || [];
    thoughtList.innerHTML = "";
    thoughts.forEach(thought => {
      const div = document.createElement("div");
      div.className = "thought-item";
      div.textContent = thought;
      thoughtList.appendChild(div);
    });
  }
  thoughtForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const thought = thoughtInput.value.trim();
    if(thought !== ""){
      const thoughts = JSON.parse(localStorage.getItem("thoughts")) || [];
      thoughts.push(thought);
      localStorage.setItem("thoughts", JSON.stringify(thoughts));
      thoughtInput.value = "";
      loadThoughts();
    }
  });
  loadThoughts();

  // Mobile navigation toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Gallery lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  if (lightbox && lightboxImage && lightboxCaption) {
    document.querySelectorAll(".gallery-item").forEach(item => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        if (!img) { return; }
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || "Gallery image";
        lightboxCaption.textContent = item.dataset.title || img.alt || "";
        lightbox.classList.add("active");
      });
    });
    if (lightboxClose) {
      lightboxClose.addEventListener("click", () => {
        lightbox.classList.remove("active");
      });
    }
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        lightbox.classList.remove("active");
      }
    });
  }

  // Modal for Developer's Thoughts
  const devThoughtBtn = document.getElementById("devThoughtBtn");
  const devThoughtModal = document.getElementById("devThoughtModal");
  const modalClose = document.getElementById("modalClose");
  devThoughtBtn.addEventListener("click", () => { devThoughtModal.classList.add("active"); });
  modalClose.addEventListener("click", () => { devThoughtModal.classList.remove("active"); });
  window.addEventListener("click", (e) => { if(e.target === devThoughtModal) { devThoughtModal.classList.remove("active"); } });

  // Scroll-to-top functionality
  const scrollTopBtn = document.getElementById("scrollTop");
  window.addEventListener("scroll", () => {
    if(window.scrollY > 300) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Function to generate floating hearts
  function generateHearts(count) {
    const container = document.getElementById("floatingHearts");
    for (let i = 0; i < count; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerHTML = "\u2764\uFE0F";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = (4 + Math.random() * 4) + "s";
      heart.style.fontSize = (20 + Math.random() * 20) + "px";
      container.appendChild(heart);
    }
  }
});

