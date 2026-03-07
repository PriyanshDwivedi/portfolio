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

/* ── 3D Tilted Cards ── */
(() => {
  const cards = document.querySelectorAll(".tilted-card");

  cards.forEach((card) => {
    const inner = card.querySelector(".tilted-card-inner");
    const tooltip = card.querySelector(".tilted-card-tooltip");

    let rotateX = 0;
    let rotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let isHovering = false;

    // Spring animation parameters
    const springStiffness = 0.05;
    const springDamping = 0.7;
    let velocityX = 0;
    let velocityY = 0;

    // Animation loop for smooth spring physics
    function animate() {
      if (
        !isHovering &&
        Math.abs(currentRotateX) < 0.01 &&
        Math.abs(currentRotateY) < 0.01
      ) {
        currentRotateX = 0;
        currentRotateY = 0;
        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
        return;
      }

      // Spring physics
      const deltaX = rotateX - currentRotateX;
      const deltaY = rotateY - currentRotateY;

      velocityX += deltaX * springStiffness;
      velocityY += deltaY * springStiffness;

      velocityX *= springDamping;
      velocityY *= springDamping;

      currentRotateX += velocityX;
      currentRotateY += velocityY;

      card.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;

      requestAnimationFrame(animate);
    }

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Calculate rotation (max 15 degrees)
      rotateY = (mouseX / (rect.width / 2)) * 15;
      rotateX = -(mouseY / (rect.height / 2)) * 15;

      // Position tooltip
      if (tooltip) {
        tooltip.style.left = `${e.clientX}px`;
        tooltip.style.top = `${e.clientY - 30}px`;
      }

      if (!isHovering) {
        isHovering = true;
        animate();
      }
    });

    card.addEventListener("mouseenter", () => {
      isHovering = true;
      animate();
    });

    card.addEventListener("mouseleave", () => {
      isHovering = false;
      rotateX = 0;
      rotateY = 0;

      // Hide tooltip
      if (tooltip) {
        tooltip.style.opacity = "0";
      }

      animate();
    });
  });
})();
