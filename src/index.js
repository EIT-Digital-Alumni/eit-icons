/**
 * EIT Icons Web Component
 * A custom element for displaying SVG icons with styling options
 *
 * @example
 * <eit-icons name="add_user"></eit-icons>
 * <eit-icons name="book" with-circle background="red"></eit-icons>
 */

import { icons } from "./icons.js";

export class EitIcons extends HTMLElement {
  constructor() {
    super();
    // Attach here, but also guard in render() in case render runs early
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["name", "with-circle", "background"];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  buildStyles({ withCircle, background }) {
    if (withCircle && background) {
      return `
        .eit-icon-circle {
          fill: ${background};
          stroke: ${background};
        }
        .eit-icon {
          color: white;
        }
      `;
    } else if (withCircle) {
      return ``;
    }
    return `
      .eit-icon {
        transform: scale(1.3);
        transform-origin: center;
        transform-box: content-box;
      }
      .eit-icon-circle {
        display: none;
      }
    `;
  }

  render() {
    // Ensure shadow root exists even if render() fires early
    const root = this.shadowRoot || this.attachShadow({ mode: "open" });

    const iconName = this.getAttribute("name");
    const withCircle = this.hasAttribute("with-circle");
    const background = this.getAttribute("background");

    let svgContent = null;

    if (iconName && icons[iconName]) {
      svgContent = icons[iconName];
    } else {
      svgContent =
        '<svg width="24" height="24" viewBox="0 0 24 24"><text x="0" y="12" font-size="4px">Missing name attribute or icon</text></svg>';
    }

    const styles = this.buildStyles({ withCircle, background });
    root.innerHTML = `<style>${styles}</style>${svgContent}`;
  }
}

// Define the custom element (guard against double registration)
if (typeof window !== "undefined" && !window.customElements.get("eit-icons")) {
  window.customElements.define("eit-icons", EitIcons);
}

export default EitIcons;
