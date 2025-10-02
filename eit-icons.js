/**
 * EIT Icons Web Component
 * A custom element for displaying SVG icons with styling options
 *
 * @example
 * <eit-icons name="add_user"></eit-icons>
 * <eit-icons name="book" with-circle background="red"></eit-icons>
 */

export class EitIcons extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["name", "with-circle", "background"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "name" || name === "with-circle" || name === "background") {
      this.render();
    }
  }

  async fetchIcon(name) {
    try {
      // Try to load from the icons directory relative to this module
      let iconPath = `icons/${name}.svg`;

      // For npm packages, try to resolve the path using import.meta.url
      // which gives us the URL of the current module
      if (import.meta && import.meta.url) {
        const moduleUrl = new URL(import.meta.url);
        const basePath = moduleUrl.pathname.substring(
          0,
          moduleUrl.pathname.lastIndexOf("/"),
        );
        iconPath = new URL(
          `icons/${name}.svg`,
          `${moduleUrl.protocol}//${moduleUrl.host}${basePath}/`,
        ).href;
      }

      const response = await fetch(iconPath);
      if (!response.ok) {
        throw new Error(`Icon ${name}.svg not found`);
      }
      const svg = await response.text();
      return svg;
    } catch (error) {
      console.error(error);
      return `<svg width="24" height="24" viewBox="0 0 24 24"><text x="0" y="12" font-size="4px">Icon not found: ${name}</text></svg>`;
    }
  }

  async render() {
    const iconName = this.getAttribute("name");
    const withCircle = this.hasAttribute("with-circle");
    const background = this.getAttribute("background") || "currentColor";

    if (!iconName) {
      this.shadow.innerHTML =
        '<svg width="24" height="24" viewBox="0 0 24 24"><text x="0" y="12" font-size="4px">Missing name attribute</text></svg>';
      return;
    }

    let svgContent = await this.fetchIcon(iconName);

    if (withCircle) {
      // Apply circle styles and set color to white
      const circleStyle = `
        .eit-icon-circle {
          fill: ${background};
          stroke: ${background};
        }
        .eit-icon {
          color: white;
        }
      `;

      svgContent = svgContent.replace(
        '<g class="eit-icon">',
        `<g class="eit-icon" style="color: white;">`,
      );

      // Inject the style into the SVG
      const styleStart = "<style>";
      const styleEnd = "</style>";
      svgContent = svgContent.replace(
        "<svg",
        `<svg><defs>${styleStart}${circleStyle}${styleEnd}</defs>`,
      );
    } else {
      // Apply scaling and hide circle
      const scalingStyle = `
        .eit-icon {
          transform: scale(1.5);
          transform-origin: center;
        }
        .eit-icon-circle {
          display: none;
        }
      `;
      // Inject the style into the SVG
      const styleStart = "<style>";
      const styleEnd = "</style>";
      svgContent = svgContent.replace(
        "<svg",
        `<svg><defs>${styleStart}${scalingStyle}${styleEnd}</defs>`,
      );
    }

    this.shadow.innerHTML = svgContent;
  }

  connectedCallback() {
    this.render();
  }
}

// Define the custom element
customElements.define("eit-icons", EitIcons);

// Default export for ES modules
export default EitIcons;

// Auto-register the component if not using ES modules
if (typeof window !== "undefined") {
  if (!window.customElements.get("eit-icons")) {
    window.customElements.define("eit-icons", EitIcons);
  }
}
