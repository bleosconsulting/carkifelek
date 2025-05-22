if (window.location.pathname === "/carkifelek/" || window.location.pathname === "/carkifelek/index.html") {
  setTimeout(() => {
    const popup = document.getElementById("wheel-popup");
    if (popup) popup.style.display = "block";
  }, 5000);
}

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const codes = ["INDIRIM10", "INDIRIM20", "INDIRIM30", "INDIRIM40", "INDIRIM50", "INDIRIM60"];
let usedCodes = new Set();
const segments = codes.length;
const segmentAngle = 2 * Math.PI / segments;
const colors = ["#f1c40f", "#e67e22", "#e74c3c", "#2ecc71", "#3498db", "#9b59b6"];
let spinning = false;

function drawWheel() {
  for (let i = 0; i < segments; i++) {
    const startAngle = i * segmentAngle;
    const endAngle = startAngle + segmentAngle;
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 180, startAngle, endAngle);
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(startAngle + segmentAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText(codes[i], 160, 10);
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(200, 200, 40, 0, 2 * Math.PI);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
}
drawWheel();

document.getElementById("spin-button").addEventListener("click", () => {
  if (spinning) return;
  const available = codes.filter(code => !usedCodes.has(code));
  if (available.length === 0) {
    alert("Tüm kodlar tükendi!");
    return;
  }

  spinning = true;
  const selectedIndex = Math.floor(Math.random() * available.length);
  const selectedCode = available[selectedIndex];
  const anglePerSegment = 360 / segments;
  const rotation = (segments - selectedIndex) * anglePerSegment + 360 * 5;
  let rotationDeg = 0;

  const interval = setInterval(() => {
    rotationDeg += 10;
    if (rotationDeg >= rotation) {
      clearInterval(interval);
      usedCodes.add(selectedCode);
      document.getElementById("result-code").innerText = selectedCode;
      document.getElementById("result-container").style.display = "block";
      spinning = false;
    }
    canvas.style.transform = `rotate(${rotationDeg}deg)`;
  }, 10);
});
