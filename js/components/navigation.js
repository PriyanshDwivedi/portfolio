/**
 * Navigation Component
 * Handles navbar, mobile hamburger menu, and scroll behavior
 */

export function initNavigation() {
  // Update year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile hamburger menu
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

  // Close overlay when a link is clicked
  overlay.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Navbar scroll behavior
  const navbar = document.getElementById("navbar");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  window.addEventListener("scroll", () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 60);
    }
    if (scrollIndicator) {
      scrollIndicator.style.opacity = window.scrollY > 50 ? "0" : "";
    }
  });
}
