const fgPicker = document.getElementById("fgColorPicker");

fgPicker.addEventListener("input", (event) => {
  const color = event.target.value;
  document.documentElement.style.setProperty("--icon-color", color);
});

const bgPicker = document.getElementById("bgColorPicker");

bgPicker.addEventListener("input", (event) => {
  const color = event.target.value;
  document.documentElement.style.setProperty("--bg-fill", color);
});

// Add event listeners to the toggle buttons
const toggleButtons = document.querySelectorAll(".toggle-class-button");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const className = button.dataset.class;
    const iconContainer = document.getElementById("iconContainer");
    const iconCards = iconContainer.querySelectorAll(".icon-card");

    iconCards.forEach((card) => {
      card.classList.toggle(className);
    });
  });
});
