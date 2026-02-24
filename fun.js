const h1 = document.querySelector("h1");
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let vx = 2;
let vy = 2;

h1.style.position = "fixed";
h1.style.transform = "none";

function flee(clientX, clientY) {
  const rect = h1.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = centerX - clientX;
  const dy = centerY - clientY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 150) {
    vx += (dx / dist) * 3;
    vy += (dy / dist) * 3;
  }
}

document.addEventListener("mousemove", (e) => {
  flee(e.clientX, e.clientY);
});

document.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  flee(touch.clientX, touch.clientY);
}, { passive: false });

function move() {
  const w = h1.offsetWidth;
  const h = h1.offsetHeight;

  if (x < 0) { x = 0; vx = Math.abs(vx); }
  if (x + w > window.innerWidth) { x = window.innerWidth - w; vx = -Math.abs(vx); }
  if (y < 0) { y = 0; vy = Math.abs(vy); }
  if (y + h > window.innerHeight) { y = window.innerHeight - h; vy = -Math.abs(vy); }

  const maxSpeed = 8;
  vx = Math.max(-maxSpeed, Math.min(maxSpeed, vx));
  vy = Math.max(-maxSpeed, Math.min(maxSpeed, vy));

  vx *= 0.99;
  vy *= 0.99;

  if (Math.abs(vx) < 1.5) vx = vx < 0 ? -1.5 : 1.5;
  if (Math.abs(vy) < 1.5) vy = vy < 0 ? -1.5 : 1.5;

  x += vx;
  y += vy;

  h1.style.left = x + "px";
  h1.style.top = y + "px";

  requestAnimationFrame(move);
}

move();
