/**
 * Interactive Skills Component
 * Handles skill tag filtering and project filtering
 */

import { getProjectsByTags } from "../data/projects.js";

export class InteractiveSkills {
  constructor(onFilterChange) {
    this.onFilterChange = onFilterChange || (() => {});
    this.activeTags = new Set();
    this.skillTags = [];
    this.init();
  }

  /**
   * Initialize the component
   */
  init() {
    this.skillTags = document.querySelectorAll(".skill-tag");
    this.attachEventListeners();
    this.addResetButton();
  }

  /**
   * Attach click listeners to skill tags
   */
  attachEventListeners() {
    this.skillTags.forEach((tag) => {
      tag.addEventListener("click", (e) => {
        e.preventDefault();
        const skillName = tag.textContent.trim();
        this.toggleSkill(skillName, tag);
      });

      // Add cursor pointer style
      tag.style.cursor = "pointer";
    });
  }

  /**
   * Toggle skill filter
   */
  toggleSkill(skillName, tagElement) {
    if (this.activeTags.has(skillName)) {
      // Remove from active tags
      this.activeTags.delete(skillName);
      tagElement.classList.remove("active");
    } else {
      // Add to active tags
      this.activeTags.add(skillName);
      tagElement.classList.add("active");
    }

    // Update reset button visibility
    this.updateResetButton();

    // Notify filter change
    this.onFilterChange(Array.from(this.activeTags));
  }

  /**
   * Clear all filters
   */
  clearFilters() {
    this.activeTags.clear();
    this.skillTags.forEach((tag) => {
      tag.classList.remove("active");
    });
    this.updateResetButton();
    this.onFilterChange([]);
  }

  /**
   * Add reset button to skills section
   */
  addResetButton() {
    const skillsSection = document.querySelector("#skills");
    if (!skillsSection) return;

    const resetContainer = document.createElement("div");
    resetContainer.className = "skills-filter-controls";
    resetContainer.innerHTML = `
      <div class="skills-filter-info">
        <span class="skills-filter-count">0 skills selected</span>
        <span class="skills-project-count"></span>
        <button class="skills-filter-reset" style="display: none;">
          <i class="ri-close-circle-line"></i> Clear Filters
        </button>
      </div>
    `;

    // Insert after section title
    const title = skillsSection.querySelector(".section-title");
    if (title) {
      title.after(resetContainer);
    }

    // Attach reset button listener
    const resetBtn = resetContainer.querySelector(".skills-filter-reset");
    resetBtn.addEventListener("click", () => this.clearFilters());

    this.resetButton = resetBtn;
    this.filterCount = resetContainer.querySelector(".skills-filter-count");
    this.projectCount = resetContainer.querySelector(".skills-project-count");
  }

  /**
   * Update reset button visibility
   */
  updateResetButton() {
    if (!this.resetButton || !this.filterCount) return;

    const count = this.activeTags.size;
    this.filterCount.textContent = `${count} ${count === 1 ? "skill" : "skills"} selected`;

    // Update project count
    if (this.projectCount) {
      const filteredProjects = getProjectsByTags(Array.from(this.activeTags));
      const projectsText =
        count > 0
          ? ` • ${filteredProjects.length} ${filteredProjects.length === 1 ? "project" : "projects"}`
          : "";
      this.projectCount.textContent = projectsText;
    }

    if (count > 0) {
      this.resetButton.style.display = "inline-flex";
      this.filterCount.style.display = "inline";
    } else {
      this.resetButton.style.display = "none";
      this.filterCount.style.display = "none";
    }
  }

  /**
   * Get currently active tags
   */
  getActiveTags() {
    return Array.from(this.activeTags);
  }
}

// Singleton instance
let interactiveSkillsInstance = null;

export function initInteractiveSkills(onFilterChange) {
  if (!interactiveSkillsInstance) {
    interactiveSkillsInstance = new InteractiveSkills(onFilterChange);
  }
  return interactiveSkillsInstance;
}

export function getInteractiveSkills() {
  return interactiveSkillsInstance;
}
