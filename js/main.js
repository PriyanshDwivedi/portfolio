/**
 * Main Application Entry Point
 * Initializes all components and modules
 */

import { initNavigation } from "./components/navigation.js";
import { initScrollAnimations } from "./components/scrollAnimations.js";
import { initTiltedCards } from "./components/tiltedCards.js";
import { initInteractiveSkills } from "./components/interactiveSkills.js";
import { initInteractiveProjects } from "./components/interactiveProjects.js";
import { initFitText } from "./components/fitText.js";
import { onReady } from "./utils/dom.js";

/**
 * Initialize the application
 */
function initApp() {
  // Scroll to top on load
  window.scrollTo(0, 0);

  // Initialize components
  initNavigation();
  initScrollAnimations();
  initTiltedCards();
  initFitText();

  // Initialize interactive filtering
  const interactiveProjects = initInteractiveProjects();
  initInteractiveSkills((tags) => {
    // When skills are filtered, update projects
    interactiveProjects.filterProjects(tags);
  });
}

// Wait for DOM to be ready, then initialize
onReady(initApp);

// Export for module access if needed
export { initApp };
