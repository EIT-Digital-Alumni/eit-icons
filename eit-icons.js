class EitIcons extends HTMLElement {
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
      const response = await fetch(`icons/${name}.svg`);
      if (!response.ok) {
        throw new Error(`Icon ${name}.svg not found`);
      }
      const svg = await response.text();
      return svg;
    } catch (error) {
      console.error(error);
      return `<svg width="24" height="24" viewBox="0 0 24 24"><text x="0" y="12">Icon not found: ${name}</text></svg>`;
    }
  }

  async render() {
    const iconName = this.getAttribute("name");
    const withCircle = this.hasAttribute("with-circle");
    const background = this.getAttribute("background");

    let svgContent = await this.fetchIcon(iconName);

    if (withCircle && background != null) {
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
    }

    if (!withCircle) {
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

    this.shadow.innerHTML = `
      ${svgContent}
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("eit-icons", EitIcons);
