/* ── Year in footer ── */
document.getElementById("year").textContent = new Date().getFullYear();

/* ── Mobile hamburger menu ── */
const hamburgerCheckbox = document.getElementById("hamburger-checkbox");
const mobileOverlay = document.getElementById("mobile-overlay");

if (hamburgerCheckbox && mobileOverlay) {
  hamburgerCheckbox.addEventListener("change", () => {
    if (hamburgerCheckbox.checked) {
      mobileOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      mobileOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close overlay when a link is tapped
  mobileOverlay.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburgerCheckbox.checked = false;
      mobileOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

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

// Navbar scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
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
