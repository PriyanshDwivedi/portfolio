/**
 * FitText — Dynamically scales heading font sizes so text never overflows.
 * Measures actual rendered width and shrinks font-size until every line fits.
 */

const SELECTOR = ".hero-name, .section-title, .contact-heading, .impact-title";
const MIN_SIZE = 10; // px – floor so text stays readable
const STEP = 0.5; // px per iteration

/**
 * Shrink a single element's font-size until its content fits its box.
 */
function fitElement(el) {
  // Reset any previous inline override so we start from the CSS value
  el.style.fontSize = "";

  let size = parseFloat(getComputedStyle(el).fontSize);

  // scrollWidth includes overflow; clientWidth is the visible box
  while (el.scrollWidth > el.clientWidth && size > MIN_SIZE) {
    size -= STEP;
    el.style.fontSize = size + "px";
  }
}

function fitAll() {
  document.querySelectorAll(SELECTOR).forEach(fitElement);
}

export function initFitText() {
  // Wait for custom fonts to load so measurements are accurate
  if (document.fonts?.ready) {
    document.fonts.ready.then(fitAll);
  } else {
    window.addEventListener("load", fitAll);
  }

  // Re-fit on resize (debounced)
  let timer;
  window.addEventListener("resize", () => {
    clearTimeout(timer);
    timer = setTimeout(fitAll, 150);
  });
}
