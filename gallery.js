const R2_URL = "https://pub-xxxx.r2.dev";
// ─────────────────────────────────────────────────

const img1 = document.getElementById("photo1");
const img2 = document.getElementById("photo2");
const btn = document.getElementById("shuffle");

let landscape = [];
let portrait = [];

function loadFolder(folder, arr, callback) {
  let i = 1;
  function tryNext() {
    const src = R2_URL + "/" + folder + "/photo" + i + ".jpg";
    const test = new Image();
    test.onload = () => {
      arr.push(src);
      i++;
      tryNext();
    };
    test.onerror = () => callback();
    test.src = src;
  }
  tryNext();
}

function showPhoto(imgEl, src) {
  imgEl.classList.remove("visible");
  setTimeout(() => {
    imgEl.src = src;
    imgEl.onload = () => imgEl.classList.add("visible");
  }, 300);
}

function getTwoRandom(arr) {
  if (arr.length === 0) return [null, null];
  if (arr.length === 1) return [arr[0], null];
  let a, b;
  a = Math.floor(Math.random() * arr.length);
  do { b = Math.floor(Math.random() * arr.length); } while (b === a);
  return [arr[a], arr[b]];
}

function showRandom() {
  // Pick randomly between landscape and portrait set
  const pool = [];
  if (landscape.length > 0) pool.push(landscape);
  if (portrait.length > 0) pool.push(portrait);
  if (pool.length === 0) return;

  const chosen = pool[Math.floor(Math.random() * pool.length)];
  const [a, b] = getTwoRandom(chosen);

  if (a) showPhoto(img1, a);
  if (b) {
    img2.classList.remove("hidden");
    showPhoto(img2, b);
  } else {
    img2.classList.add("hidden");
  }
}

btn.addEventListener("click", showRandom);

// Load both folders then show initial pair
let loaded = 0;
function onFolderLoaded() {
  loaded++;
  if (loaded === 2) showRandom();
}

loadFolder("landscape", landscape, onFolderLoaded);
loadFolder("portrait", portrait, onFolderLoaded);
