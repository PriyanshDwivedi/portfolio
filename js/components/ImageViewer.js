export class ImageViewer {
  constructor() {
    this.overlay = null;
    this.img = null;
    this.container = null;
    this.scale = 1;
    this.minScale = 0.3;
    this.maxScale = 5;
    this.positionX = 0;
    this.positionY = 0;
    this.panStart = null;
    this.initialPinchDistance = 0;
    this.initialPinchScale = 1;
    this.initialPinchPosition = { x: 0, y: 0 };
    this.isSticky = false;
    this.zoomIntentTimeout = null;
    this.images = [];
    this.currentIndex = 0;
    this.boundHandleKeydown = this.handleKeydown.bind(this);
  }

  clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  open(src, alt, images, index) {
    if (this.overlay) return;

    this.images = images ?? [{ src, alt }];
    this.currentIndex = index ?? 0;
    this.scale = 1;
    this.positionX = 0;
    this.positionY = 0;

    this.overlay = document.createElement("div");
    this.overlay.className = "image-viewer-overlay";
    this.overlay.innerHTML = `
      <div class="image-viewer-backdrop"></div>
      <div class="image-viewer-controls">
        <button class="image-viewer-btn image-viewer-zoom-in" aria-label="Zoom in">
          <i class="ri-zoom-in-line"></i>
        </button>
        <button class="image-viewer-btn image-viewer-zoom-out" aria-label="Zoom out">
          <i class="ri-zoom-out-line"></i>
        </button>
        <button class="image-viewer-btn image-viewer-reset" aria-label="Reset zoom">
          <i class="ri-refresh-line"></i>
        </button>
        <button class="image-viewer-btn image-viewer-close" aria-label="Close">
          <i class="ri-close-line"></i>
        </button>
      </div>
      <button class="image-viewer-nav image-viewer-prev" aria-label="Previous image">
        <i class="ri-arrow-left-s-line"></i>
      </button>
      <button class="image-viewer-nav image-viewer-next" aria-label="Next image">
        <i class="ri-arrow-right-s-line"></i>
      </button>
      <div class="image-viewer-counter"></div>
      <div class="image-viewer-container">
        <img
          src="${src}"
          alt="${alt ?? ""}"
          class="image-viewer-img"
          draggable="false"
        />
      </div>
      <div class="image-viewer-caption">${alt ?? ""}</div>
    `;

    document.body.appendChild(this.overlay);
    document.body.style.overflow = "hidden";

    this.img = this.overlay.querySelector(".image-viewer-img");
    this.container = this.overlay.querySelector(".image-viewer-container");

    this.img.addEventListener("load", () => this.centerImage());
    if (this.img.complete) {
      requestAnimationFrame(() => this.centerImage());
    }

    this.attachListeners();

    requestAnimationFrame(() => {
      this.overlay.classList.add("active");
    });
  }

  centerImage() {
    if (!this.img || !this.container) return;
    const containerRect = this.container.getBoundingClientRect();
    const imgW = this.img.offsetWidth;
    const imgH = this.img.offsetHeight;
    this.positionX = (containerRect.width - imgW) / 2;
    this.positionY = (containerRect.height - imgH) / 2;
    this.scale = 1;
    this.applyTransform();
  }

  close() {
    if (!this.overlay) return;

    this.overlay.classList.remove("active");
    document.removeEventListener("keydown", this.boundHandleKeydown);

    if (this.zoomIntentTimeout) {
      clearTimeout(this.zoomIntentTimeout);
      this.zoomIntentTimeout = null;
    }

    setTimeout(() => {
      if (this.overlay?.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
      this.overlay = null;
      this.img = null;
      this.container = null;
      this.images = [];
      this.currentIndex = 0;
      document.body.style.overflow = "";
    }, 250);
  }

  attachListeners() {
    const backdrop = this.overlay.querySelector(".image-viewer-backdrop");
    const closeBtn = this.overlay.querySelector(".image-viewer-close");
    const zoomInBtn = this.overlay.querySelector(".image-viewer-zoom-in");
    const zoomOutBtn = this.overlay.querySelector(".image-viewer-zoom-out");
    const resetBtn = this.overlay.querySelector(".image-viewer-reset");

    closeBtn.addEventListener("click", () => this.close());
    backdrop.addEventListener("click", () => this.close());
    zoomInBtn.addEventListener("click", () => this.zoomToCenter(0.5));
    zoomOutBtn.addEventListener("click", () => this.zoomToCenter(-0.5));
    resetBtn.addEventListener("click", () => this.centerImage());

    const prevBtn = this.overlay.querySelector(".image-viewer-prev");
    const nextBtn = this.overlay.querySelector(".image-viewer-next");
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.navigateTo(this.currentIndex - 1);
    });
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.navigateTo(this.currentIndex + 1);
    });
    this.updateNavButtons();

    this.container.addEventListener("wheel", (e) => this.handleWheel(e), {
      passive: false,
    });

    this.container.addEventListener("mousedown", (e) => this.onPanStart(e));

    this.container.addEventListener("touchstart", (e) => this.onTouchStart(e), {
      passive: false,
    });

    this.container.addEventListener("touchmove", (e) => this.onTouchMove(e), {
      passive: false,
    });

    this.container.addEventListener("touchend", (e) => this.onTouchEnd(e));

    this.container.addEventListener("dblclick", (e) => this.handleDblClick(e));

    document.addEventListener("keydown", this.boundHandleKeydown);
  }

  handleWheel(e) {
    e.preventDefault();
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();

    if (e.ctrlKey) {
      const pointer = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      const delta = -e.deltaY * 0.01;
      this.zoomAtPoint(delta, pointer);
    } else {
      this.positionX -= e.deltaX;
      this.positionY -= e.deltaY;
      this.applyTransform();
    }
  }

  zoomAtPoint(delta, pointer) {
    const prevScale = this.scale;
    let newScale = this.scale + delta;

    if ((prevScale < 1 && newScale > 1) || (prevScale > 1 && newScale < 1)) {
      if (!this.isSticky) {
        newScale = 1;
        this.isSticky = true;
        if (this.zoomIntentTimeout) clearTimeout(this.zoomIntentTimeout);
        this.zoomIntentTimeout = setTimeout(() => (this.isSticky = false), 220);
      }
    } else if (this.isSticky) {
      newScale = 1;
    } else if (Math.abs(newScale - 1) > 0.1) {
      this.isSticky = false;
    }

    newScale = this.clamp(newScale, this.minScale, this.maxScale);
    const scaleRatio = newScale / prevScale;

    this.positionX = pointer.x - (pointer.x - this.positionX) * scaleRatio;
    this.positionY = pointer.y - (pointer.y - this.positionY) * scaleRatio;
    this.scale = newScale;
    this.applyTransform();
  }

  zoomToCenter(delta) {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    const center = {
      x: rect.width / 2,
      y: rect.height / 2,
    };

    const prevScale = this.scale;
    const newScale = this.clamp(
      this.scale + delta,
      this.minScale,
      this.maxScale,
    );
    const scaleRatio = newScale / prevScale;

    this.positionX = center.x - (center.x - this.positionX) * scaleRatio;
    this.positionY = center.y - (center.y - this.positionY) * scaleRatio;
    this.scale = newScale;
    this.applyTransform();
  }

  handleDblClick(e) {
    e.preventDefault();
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();

    if (this.scale !== 1) {
      this.centerImage();
    } else {
      const pointer = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      const targetScale = 2.5;
      const scaleRatio = targetScale / this.scale;
      this.positionX = pointer.x - (pointer.x - this.positionX) * scaleRatio;
      this.positionY = pointer.y - (pointer.y - this.positionY) * scaleRatio;
      this.scale = targetScale;
      this.applyTransform();
    }
  }

  handleKeydown(e) {
    if (e.key === "Escape") {
      this.close();
    } else if (e.key === "+" || e.key === "=") {
      this.zoomToCenter(0.5);
    } else if (e.key === "-") {
      this.zoomToCenter(-0.5);
    } else if (e.key === "0") {
      this.centerImage();
    } else if (e.key === "ArrowLeft") {
      this.navigateTo(this.currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      this.navigateTo(this.currentIndex + 1);
    }
  }

  navigateTo(index) {
    if (!this.img || this.images.length <= 1) return;
    this.currentIndex =
      ((index % this.images.length) + this.images.length) % this.images.length;
    const current = this.images[this.currentIndex];
    this.img.src = current.src;
    this.img.alt = current.alt ?? "";

    const caption = this.overlay.querySelector(".image-viewer-caption");
    if (caption) caption.textContent = current.alt ?? "";

    this.scale = 1;
    this.positionX = 0;
    this.positionY = 0;

    const onLoad = () => {
      this.centerImage();
      this.img.removeEventListener("load", onLoad);
    };
    if (this.img.complete) {
      requestAnimationFrame(() => this.centerImage());
    } else {
      this.img.addEventListener("load", onLoad);
    }

    this.updateNavButtons();
  }

  updateNavButtons() {
    if (!this.overlay) return;
    const prevBtn = this.overlay.querySelector(".image-viewer-prev");
    const nextBtn = this.overlay.querySelector(".image-viewer-next");
    if (!prevBtn || !nextBtn) return;

    const hasMultiple = this.images.length > 1;
    prevBtn.style.display = hasMultiple ? "" : "none";
    nextBtn.style.display = hasMultiple ? "" : "none";

    const counter = this.overlay.querySelector(".image-viewer-counter");
    if (counter) {
      counter.style.display = hasMultiple ? "" : "none";
      counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }
  }

  onPanStart(e) {
    if (e.button !== 0 && e.button !== 1) return;
    e.preventDefault();

    this.panStart = {
      x: e.clientX - this.positionX,
      y: e.clientY - this.positionY,
    };
    this.container.style.cursor = "grabbing";

    const onMove = (ev) => {
      if (!this.panStart) return;
      this.positionX = ev.clientX - this.panStart.x;
      this.positionY = ev.clientY - this.panStart.y;
      this.applyTransform();
    };

    const onUp = () => {
      this.panStart = null;
      if (this.container) this.container.style.cursor = "grab";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }

  onTouchStart(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      this.initialPinchDistance = this.getPinchDistance(e.touches);
      this.initialPinchScale = this.scale;
      this.initialPinchPosition = {
        x: this.positionX,
        y: this.positionY,
      };
    } else if (e.touches.length === 1) {
      this.panStart = {
        x: e.touches[0].clientX - this.positionX,
        y: e.touches[0].clientY - this.positionY,
      };
    }
  }

  onTouchMove(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      const rect = this.container.getBoundingClientRect();
      const midpoint = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top,
      };
      const currentDistance = this.getPinchDistance(e.touches);
      const pinchRatio = currentDistance / this.initialPinchDistance;
      const newScale = this.clamp(
        this.initialPinchScale * pinchRatio,
        this.minScale,
        this.maxScale,
      );
      const scaleRatio = newScale / this.initialPinchScale;

      this.positionX =
        midpoint.x - (midpoint.x - this.initialPinchPosition.x) * scaleRatio;
      this.positionY =
        midpoint.y - (midpoint.y - this.initialPinchPosition.y) * scaleRatio;
      this.scale = newScale;
      this.applyTransform();
    } else if (e.touches.length === 1 && this.panStart) {
      e.preventDefault();
      this.positionX = e.touches[0].clientX - this.panStart.x;
      this.positionY = e.touches[0].clientY - this.panStart.y;
      this.applyTransform();
    }
  }

  onTouchEnd(e) {
    if (e.touches.length < 2) {
      this.initialPinchDistance = 0;
    }
    if (e.touches.length === 0) {
      this.panStart = null;
    }
  }

  applyTransform() {
    if (!this.img) return;
    this.img.style.transform = `translate(${this.positionX}px, ${this.positionY}px) scale(${this.scale})`;
  }

  getPinchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

export const imageViewer = new ImageViewer();
