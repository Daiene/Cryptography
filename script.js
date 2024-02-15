document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.getElementById("textarea");
  const encryptButton = document.getElementById("encrypt");

  encryptButton.addEventListener("click", function () {
    let textValue = textarea.value;
    textValue = textValue.replaceAll("e", "enter");
    textarea.value = textValue;
  })

  if (window.screen.width <= 992) {
    magnifyingGlass.addEventListener("animationend", () => {
      magnifyingGlass.style.display = "none";
    });
  }
});