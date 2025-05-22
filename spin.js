if (window.location.pathname.includes("/carkifelek")) {
  setTimeout(() => {
    const popup = document.getElementById("wheel-popup");
    if (popup) popup.style.display = "block";
  }, 5000);
}

const wheel = document.getElementById("wheel-img");
const resultCode = document.getElementById("result-code");
const resultContainer = document.getElementById("result-container");

const codes = ["INDIRIM10", "INDIRIM20", "INDIRIM30", "INDIRIM40", "INDIRIM50", "INDIRIM60"];
let usedCodes = new Set();

document.getElementById("spin-button").addEventListener("click", () => {
  const available = codes.filter(code => !usedCodes.has(code));
  if (available.length === 0) {
    alert("Tüm kodlar tükendi!");
    return;
  }

  const selectedCode = available[Math.floor(Math.random() * available.length)];
  usedCodes.add(selectedCode);

  const angle = 360 * 5 + Math.floor(Math.random() * 360);
  wheel.style.transform = `rotate(${angle}deg)`;

  setTimeout(() => {
    resultCode.innerText = selectedCode;
    resultContainer.style.display = "block";
  }, 5000);
});