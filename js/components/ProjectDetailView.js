/**
 * Project Detail View Component
 * Full-screen case study view without URL changes (SPA-style)
 */

import { getProjectById } from "../data/projects.js";
import { imageViewer } from "./ImageViewer.js";

export class ProjectDetailView {
  constructor() {
    this.container = null;
    this.currentProject = null;
    this.onClose = null;
  }

  /**
   * Show project details
   * @param {string} projectId - Project ID to display
   * @param {Function} onClose - Callback when detail view is closed
   */
  show(projectId, onClose) {
    this.currentProject = getProjectById(projectId);
    if (!this.currentProject) {
      console.error(`Project not found: ${projectId}`);
      return;
    }

    this.onClose = onClose;
    this.render();
    this.attachEventListeners();

    // Prevent body scroll when detail view is open
    document.body.style.overflow = "hidden";

    // Animate in
    requestAnimationFrame(() => {
      this.container.classList.add("active");
    });
  }

  /**
   * Hide project details
   */
  hide() {
    if (!this.container) return;

    this.container.classList.remove("active");

    // Wait for animation to complete before removing
    setTimeout(() => {
      if (this.container && this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
      this.container = null;
      document.body.style.overflow = "";

      if (this.onClose) {
        this.onClose();
      }
    }, 300);
  }

  /**
   * Render the detail view
   */
  render() {
    // Remove existing container if any
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }

    const p = this.currentProject;

    this.container = document.createElement("div");
    this.container.className = "project-detail-overlay";
    this.container.innerHTML = `
      <div class="project-detail-backdrop"></div>
      <div class="project-detail-container">
        <button class="project-detail-close" aria-label="Close">
          <i class="ri-close-line"></i>
        </button>
        
        <div class="project-detail-content">
          <div class="project-detail-header">
            <div class="project-detail-meta">
              <span class="project-detail-year">${p.year}</span>
              <span class="project-detail-domain">${p.domain}</span>
            </div>
            <h1 class="project-detail-title">${p.name}</h1>
            <div class="project-detail-company">
              <i class="ri-building-line"></i> ${p.company}
            </div>
            <div class="project-detail-role">
              <i class="ri-user-star-line"></i> ${p.role}
            </div>
          </div>

          <div class="project-detail-section">
            <h2 class="project-detail-section-title">
              <i class="ri-flag-line"></i> The Challenge
            </h2>
            <p class="project-detail-text">${p.challenge}</p>
          </div>

          ${
            p.detailedDescription
              ? `
          <div class="project-detail-section">
            <h2 class="project-detail-section-title">
              <i class="ri-file-text-line"></i> Overview
            </h2>
            <div class="project-detail-text project-detail-markdown">${this.parseMarkdown(
              p.detailedDescription,
            )}</div>
          </div>
          `
              : ""
          }

          <div class="project-detail-section">
            <h2 class="project-detail-section-title">
              <i class="ri-building-4-line"></i> Architecture & Approach
            </h2>
            <ul class="project-detail-list">
              ${p.architecture.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>

          ${
            p.scale
              ? `<div class="project-detail-section">
            <h2 class="project-detail-section-title">
              <i class="ri-line-chart-line"></i> Scale & Metrics
            </h2>
            <div class="project-detail-metrics">
              ${Object.entries(p.scale)
                .map(
                  ([key, value]) => `
                <div class="project-detail-metric">
                  <div class="project-detail-metric-value">${value}</div>
                  <div class="project-detail-metric-label">${this.humanizeKey(
                    key,
                  )}</div>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>`
              : ""
          }

          <div class="project-detail-section">
            <h2 class="project-detail-section-title">
              <i class="ri-lightbulb-flash-line"></i> Business Impact
            </h2>
            <ul class="project-detail-list impact-list">
              ${p.impact.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>

          <div class="project-detail-section">
            <h2 class="project-detail-section-title">
              <i class="ri-code-s-slash-line"></i> Technology Stack
            </h2>
            <div class="project-detail-tags">
              ${p.techStack
                .map(
                  (tech) => `
                <span class="project-detail-tag">${tech}</span>
              `,
                )
                .join("")}
            </div>
          </div>

          <div class="project-detail-section">
            <h2 class="project-detail-section-title">
              <i class="ri-price-tag-3-line"></i> Skills & Expertise
            </h2>
            <div class="project-detail-tags">
              ${p.tags
                .map(
                  (tag) => `
                <span class="project-detail-tag tag-skill">${tag}</span>
              `,
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.container);
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const closeBtn = this.container.querySelector(".project-detail-close");
    const backdrop = this.container.querySelector(".project-detail-backdrop");

    closeBtn.addEventListener("click", () => this.hide());
    backdrop.addEventListener("click", () => this.hide());

    const figures = Array.from(
      this.container.querySelectorAll(".project-detail-figure-clickable"),
    );
    const images = figures.map((f) => ({
      src: f.dataset.imgSrc,
      alt: f.dataset.imgAlt,
    }));

    figures.forEach((figure, index) => {
      figure.addEventListener("click", (e) => {
        e.stopPropagation();
        imageViewer.open(
          figure.dataset.imgSrc,
          figure.dataset.imgAlt,
          images,
          index,
        );
      });
    });

    // ESC key to close
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        this.hide();
        document.removeEventListener("keydown", handleEscape);
      }
    };
    document.addEventListener("keydown", handleEscape);
  }

  /**
   * Simple markdown parser for bold text
   */
  parseMarkdown(text) {
    return text
      .split("\n")
      .map((line) => {
        line = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

        const imgMatch = line.trim().match(/^!\[(.*)\]\((.+?)\)$/);
        if (imgMatch) {
          const alt = imgMatch[1];
          const src = imgMatch[2];
          return `<figure class="project-detail-figure project-detail-figure-clickable" data-img-src="${src}" data-img-alt="${alt}"><img src="${src}" alt="${alt}" class="project-detail-inline-img" loading="lazy" /><figcaption class="project-detail-figcaption">${alt}</figcaption></figure>`;
        }

        if (line.trim() === "") {
          return "<br/>";
        }

        return `<p>${line}</p>`;
      })
      .join("");
  }

  /**
   * Humanize object keys for display
   */
  humanizeKey(key) {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }
}

// Singleton instance
export const projectDetailView = new ProjectDetailView();
