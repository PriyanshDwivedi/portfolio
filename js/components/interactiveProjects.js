/**
 * Interactive Projects Component
 * Handles project filtering and detail view navigation
 */

import { projects, getProjectsByTags } from "../data/projects.js";
import { projectDetailView } from "./ProjectDetailView.js";

export class InteractiveProjects {
  constructor() {
    this.projectCards = [];
    this.activeFilters = [];
    this.init();
  }

  /**
   * Initialize the component
   */
  init() {
    this.projectCards = document.querySelectorAll(".tilted-card");
    this.attachEventListeners();
  }

  /**
   * Attach click listeners to project cards
   */
  attachEventListeners() {
    this.projectCards.forEach((card, index) => {
      card.addEventListener("click", (e) => {
        e.preventDefault();
        const projectId = projects[index]?.id;
        if (projectId) {
          this.openProjectDetail(projectId);
        }
      });

      // Add cursor pointer
      card.style.cursor = "pointer";
    });
  }

  /**
   * Filter projects based on selected skills/tags
   */
  filterProjects(tags) {
    this.activeFilters = tags;

    if (tags.length === 0) {
      // Show all projects
      this.showAllProjects();
      return;
    }

    // Get filtered projects
    const filteredProjects = getProjectsByTags(tags);
    const filteredIds = new Set(filteredProjects.map((p) => p.id));

    // Show/hide project cards
    this.projectCards.forEach((card, index) => {
      const project = projects[index];
      const wrapper = card.closest(".tilted-card-wrapper");

      if (filteredIds.has(project?.id)) {
        this.showCard(wrapper);
      } else {
        this.hideCard(wrapper);
      }
    });

    // Show "no results" message if needed
    this.updateNoResultsMessage(filteredProjects.length);
  }

  /**
   * Show all projects
   */
  showAllProjects() {
    this.projectCards.forEach((card) => {
      const wrapper = card.closest(".tilted-card-wrapper");
      this.showCard(wrapper);
    });
    this.updateNoResultsMessage(projects.length);
  }

  /**
   * Show a project card
   */
  showCard(wrapper) {
    if (!wrapper) return;
    wrapper.style.display = "";
    wrapper.style.opacity = "1";
    wrapper.style.transform = "scale(1)";
    wrapper.style.pointerEvents = "auto";
  }

  /**
   * Hide a project card
   */
  hideCard(wrapper) {
    if (!wrapper) return;
    wrapper.style.opacity = "0";
    wrapper.style.transform = "scale(0.9)";
    wrapper.style.pointerEvents = "none";

    // Completely remove from layout after animation
    setTimeout(() => {
      if (wrapper.style.opacity === "0") {
        wrapper.style.display = "none";
      }
    }, 300);
  }

  /**
   * Update "no results" message
   */
  updateNoResultsMessage(count) {
    const projectsSection = document.querySelector("#projects");
    if (!projectsSection) return;

    let noResultsMsg = projectsSection.querySelector(".no-results-message");

    if (count === 0) {
      // Create message if it doesn't exist
      if (!noResultsMsg) {
        noResultsMsg = document.createElement("div");
        noResultsMsg.className = "no-results-message";
        noResultsMsg.innerHTML = `
          <div class="no-results-content">
            <i class="ri-search-line"></i>
            <h3>No Matching Projects</h3>
            <p>Try selecting different skills or clearing filters to see all projects.</p>
          </div>
        `;
        const grid = projectsSection.querySelector(".projects-grid");
        if (grid) {
          grid.after(noResultsMsg);
        }
      }
      noResultsMsg.style.display = "flex";
    } else {
      // Hide message if it exists
      if (noResultsMsg) {
        noResultsMsg.style.display = "none";
      }
    }
  }

  /**
   * Open project detail view
   */
  openProjectDetail(projectId) {
    projectDetailView.show(projectId, () => {
      // Optional callback when detail view is closed
      console.log("Detail view closed");
    });
  }
}

// Singleton instance
let interactiveProjectsInstance = null;

export function initInteractiveProjects() {
  if (!interactiveProjectsInstance) {
    interactiveProjectsInstance = new InteractiveProjects();
  }
  return interactiveProjectsInstance;
}

export function getInteractiveProjects() {
  return interactiveProjectsInstance;
}
