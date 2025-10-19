// Import the web component from npm package
import "@EIT-Digital-Alumni/eit-icons";

// List of colors for the toolbar
const colorOptions = [
  // Core palette
  { name: "Pantone Reflex Blue", value: "#034EA2" },
  { name: "Green (Pantone 368)", value: "#6BB745" },
  { name: "Pantone Process Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },

  // Supporting palette
  { name: "Dark Navy", value: "#031241" },
  { name: "Deep Purple", value: "#530051" },
  { name: "Purple", value: "#630F7A" },
  { name: "Indigo", value: "#4F137B" },
  { name: "Magenta Pink", value: "#E74394" },
  { name: "Royal Blue", value: "#152D79" },
  { name: "EIT Blue", value: "#0065B2" },
  { name: "Sky Blue", value: "#73C4EE" },
  { name: "Raspberry", value: "#CD154F" },
  { name: "Orange", value: "#ED6F00" },
  { name: "Golden", value: "#FDCD15" },
  { name: "Yellow", value: "#FFED00" },
  { name: "Dark Green", value: "#003612" },
  { name: "Forest Green", value: "#00662F" },
  { name: "Light Green", value: "#96C247" },
  { name: "Teal", value: "#009E83" },
  { name: "Aqua", value: "#00AFAA" },
  { name: "Gray 80%", value: "#575757" },
  { name: "Gray 60%", value: "#878787" },
  { name: "Pale Lime", value: "#D2DF83" },
];

// Icon names for showcase
const iconNames = [
  "add_user",
  "arrows_both_ways",
  "artificial_intelligence",
  "atom",
  "bar_chart",
  "battery_charging",
  "book",
  "brainstorming_idea_exchange",
  "cable",
  "camera",
  "challenge_solution",
  "chart",
  "chart_globe",
  "chart_presentation",
  "chat",
  "chat_symbol",
  "clock",
  "coin_and_shield",
  "computer_monitor",
  "computer_mouse",
  "control_panel",
  "currency_exchange",
  "delete_user",
  "direction_arrows",
  "drop",
  "education",
  "flag",
  "flask",
  "flowchart",
  "folder",
  "gear",
  "gears",
  "globe",
  "graduation_cap",
  "group_people",
  "head_with_bolt",
  "headphones",
  "heart_health",
  "hourglass",
  "id_card",
  "innovation",
  "leaf",
  "led",
  "light_bulb",
  "looping_arrows",
  "machine_learning",
  "mail",
  "meeting",
  "megaphone",
  "mind_setting",
  "mobile_phone",
  "network",
  "network_diagram",
  "northwest_arrow",
  "notebook_contact",
  "notepad",
  "people_arrow",
  "people_connected",
  "people_exchange",
  "person_idea",
  "power_button",
  "presentation_chart",
  "prize",
  "recycling_symbol",
  "refresh",
  "satellite",
  "satellite_dish",
  "signal",
  "skill_set",
  "social_group",
  "target_bullseye",
  "teamwork",
  "thought_bubble",
  "thought_bubble_person",
  "thumbs_up",
  "training_gears",
  "training_people",
  "trophy_on_podium",
  "user",
  "user_globe",
  "user_profile",
  "user_search",
  "video_play",
  "wind_turbine",
];

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Render color buttons
  const colorButtonsDiv = document.getElementById("color-buttons");
  colorOptions.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.className = "color-btn" + (i === 0 ? " selected" : "");
    btn.style.background = c.value;
    btn.dataset.color = c.value;
    btn.title = c.name;
    colorButtonsDiv.appendChild(btn);
  });

  // Render icon cards
  const container = document.getElementById("examples-container");
  iconNames.forEach((iconName) => {
    const card = document.createElement("div");
    card.className = "example-card";

    // Create header
    const header = document.createElement("h3");
    header.textContent = iconName;
    card.appendChild(header);

    // Create icon container for better centering
    const iconContainer = document.createElement("div");
    iconContainer.className = "icon-container";

    // Create the icon element
    const icon = document.createElement("eit-icons");
    icon.setAttribute("name", iconName);

    // Append elements
    iconContainer.appendChild(icon);
    card.appendChild(iconContainer);

    // Add to main container
    container.appendChild(card);
  });

  // Toolbar controls
  const toggleCircle = document.getElementById("toggle-circle");
  const colorBtns = Array.from(document.querySelectorAll(".color-btn"));
  const colorMode = document.getElementById("color-mode");
  const sizeSelector = document.getElementById("size-selector");
  let selectedColor = colorBtns[0].dataset.color;

  colorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      colorBtns.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedColor = btn.dataset.color;
      updateIcons();
    });
  });

  toggleCircle.addEventListener("change", updateIcons);
  colorMode.addEventListener("change", updateIcons);
  if (sizeSelector) sizeSelector.addEventListener("change", updateIcons);

  function updateIcons() {
    const size = parseInt((sizeSelector && sizeSelector.value) || "40", 10);
    if (!Number.isNaN(size)) {
      document.documentElement.style.setProperty("--icon-size", size + "px");
    }
    document.querySelectorAll("eit-icons").forEach((icon) => {
      if (toggleCircle.checked) {
        icon.setAttribute("with-circle", "");
        if (colorMode.value === "circle") {
          icon.setAttribute("background", selectedColor);
          icon.style.color = "";
        } else {
          icon.removeAttribute("background");
          icon.style.color = selectedColor;
        }
      } else {
        icon.removeAttribute("with-circle");
        icon.removeAttribute("background");
        if (colorMode.value === "stroke") {
          icon.style.color = selectedColor;
        } else {
          icon.style.color = "";
        }
      }
    });
  }

  // Initial update
  updateIcons();
});
