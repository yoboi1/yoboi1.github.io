const h1 = document.querySelector("h1");

let y = 0;
const speed = 1; //h1 text speed

h1.style.position = "fixed";
h1.style.left = "50%";
h1.style.transform = "translateX(-50%)";

function move() {
  y += speed;

  if (y > window.innerHeight) y = -h1.offsetHeight;

  h1.style.top = y + "px";

  requestAnimationFrame(move);
}

move();
