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
