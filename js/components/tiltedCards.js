/**
 * Tilted Cards Component
 * 3D parallax tilt effect for project cards with spring physics
 */

export function initTiltedCards() {
  const cards = document.querySelectorAll(".tilted-card");

  cards.forEach((card) => {
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
}
