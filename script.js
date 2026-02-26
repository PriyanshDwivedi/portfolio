/* ── Year in footer ── */
document.getElementById("year").textContent = new Date().getFullYear();

/* ── Mobile hamburger menu ── */
(() => {
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("mobile-overlay");
  if (!hamburger || !overlay) return;

  function openMenu() {
    hamburger.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    if (overlay.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close overlay when a link is tapped
  overlay.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
})();

/* ── GSAP Animations ── */
gsap.registerPlugin(ScrollTrigger);

// Reveals
gsap.utils.toArray(".reveal").forEach((el, i) => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 88%",
      toggleActions: "play none none none",
    },
    opacity: 1,
    y: 0,
    duration: 0.9,
    delay: (i % 6) * 0.07,
    ease: "power3.out",
  });
});
gsap.utils.toArray(".reveal-left").forEach((el) => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    opacity: 1,
    x: 0,
    duration: 0.9,
    delay: 0.1,
    ease: "power3.out",
  });
});
gsap.utils.toArray(".reveal-right").forEach((el, i) => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 88%",
      toggleActions: "play none none none",
    },
    opacity: 1,
    x: 0,
    duration: 0.8,
    delay: i * 0.1,
    ease: "power3.out",
  });
});
gsap.utils.toArray(".reveal-scale").forEach((el, i) => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none none",
    },
    opacity: 1,
    scale: 1,
    duration: 0.5,
    delay: i * 0.04,
    ease: "back.out(1.5)",
  });
});

// Scroll to top on load
window.scrollTo(0, 0);

// Navbar scroll + hide scroll indicator
const navbar = document.getElementById("navbar");
const scrollIndicator = document.querySelector(".scroll-indicator");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
  if (scrollIndicator) {
    scrollIndicator.style.opacity = window.scrollY > 50 ? "0" : "";
  }
});

// Skill tag hover stagger
document.querySelectorAll(".skill-category").forEach((cat) => {
  cat.addEventListener("mouseenter", () => {
    gsap.fromTo(
      cat.querySelectorAll(".skill-tag"),
      { scale: 0.9, opacity: 0.5 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        stagger: 0.04,
        ease: "back.out(2)",
      },
    );
  });
});

// Timeline dot glow
gsap.utils.toArray(".timeline-dot").forEach((dot) => {
  gsap.to(dot, {
    scrollTrigger: {
      trigger: dot,
      start: "top 70%",
      toggleActions: "play none none none",
    },
    boxShadow: "0 0 25px rgba(108,99,255,0.6)",
    background: "#6c63ff",
    duration: 0.5,
  });
});

// Hero entrance
gsap.fromTo(
  "#hero .hero-name",
  { opacity: 0, y: 60 },
  { opacity: 1, y: 0, duration: 1.1, delay: 0.5 },
);
gsap.fromTo(
  "#hero .hero-role",
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.8, delay: 0.85 },
);
gsap.fromTo(
  "#hero .hero-desc",
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.8, delay: 1.05 },
);
gsap.fromTo(
  "#hero .hero-cta",
  { opacity: 0, y: 25 },
  { opacity: 1, y: 0, duration: 0.8, delay: 1.25 },
);
gsap.fromTo(
  "#hero .scroll-indicator",
  { opacity: 0 },
  { opacity: 1, duration: 1, delay: 2.2 },
);

/* ── Projects stacked scroll ── */
(function () {
  const section = document.getElementById("projects");
  const cards = gsap.utils.toArray("#projectsStack .project-card");
  const n = cards.length;
  if (!section || n < 2) return;

  const STEP_Y = 12; // px each back card is shifted upward
  const STEP_S = 0.03; // scale decrement per depth level

  // Set initial stacked deck positions
  cards.forEach((card, i) => {
    gsap.set(card, {
      zIndex: n - i,
      y: -i * STEP_Y,
      scale: 1 - i * STEP_S,
      transformOrigin: "top center",
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=" + (n - 1) * 100 + "vh",
      scrub: 0.6,
      pin: true,
      pinSpacing: true,
      invalidateOnRefresh: true,
    },
  });

  for (let i = 0; i < n - 1; i++) {
    // Current front card exits upward
    tl.to(
      cards[i],
      {
        y: "-115%",
        scale: 0.85,
        opacity: 0,
        duration: 1,
        ease: "none",
      },
      i,
    );
    // All remaining cards advance one depth step forward
    for (let j = i + 1; j < n; j++) {
      const newDepth = j - (i + 1);
      tl.to(
        cards[j],
        {
          y: -newDepth * STEP_Y,
          scale: 1 - newDepth * STEP_S,
          duration: 1,
          ease: "none",
        },
        i,
      );
    }
  }
})();

/* ── Project image auto-rotation ── */
document.querySelectorAll(".project-card-right").forEach((panel) => {
  const imgs = panel.querySelectorAll("img");
  if (imgs.length < 2) return;
  let current = 0;
  setInterval(() => {
    imgs[current].classList.remove("active");
    current = (current + 1) % imgs.length;
    imgs[current].classList.add("active");
  }, 3000);
});
