// ── REPLACE WITH YOUR CLOUDFLARE R2 PUBLIC URL ──
const R2_URL = "https://images.naturalmilk.net";
// ─────────────────────────────────────────────────

const img1 = document.getElementById("photo1");
const img2 = document.getElementById("photo2");
const btn = document.getElementById("shuffle");

let landscape = [];
let portrait = [];

// Shuffled queues — photos won't repeat until all have been seen
let landscapeQueue = [];
let portraitQueue = [];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getNext(arr, queue, setQueue) {
  if (queue.length === 0) {
    queue = shuffle(arr);
    setQueue(queue);
  }
  return queue.shift();
}

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

function showRandom() {
  const pool = [];
  if (landscape.length > 0) pool.push("landscape");
  if (portrait.length > 0) pool.push("portrait");
  if (pool.length === 0) return;

  const chosen = pool[Math.floor(Math.random() * pool.length)];
  const arr = chosen === "landscape" ? landscape : portrait;

  // Get two unique photos from the queue
  const a = getNext(arr, chosen === "landscape" ? landscapeQueue : portraitQueue,
    q => chosen === "landscape" ? landscapeQueue = q : portraitQueue = q);

  // Make sure second photo is different from first
  let b = null;
  if (arr.length > 1) {
    b = getNext(arr, chosen === "landscape" ? landscapeQueue : portraitQueue,
      q => chosen === "landscape" ? landscapeQueue = q : portraitQueue = q);
    if (b === a) b = null;
  }

  if (a) showPhoto(img1, a);
  if (b) {
    img2.classList.remove("hidden");
    showPhoto(img2, b);
  } else {
    img2.classList.add("hidden");
  }
}

btn.addEventListener("click", showRandom);

let loaded = 0;
function onFolderLoaded() {
  loaded++;
  if (loaded === 2) showRandom();
}

loadFolder("landscape", landscape, onFolderLoaded);
loadFolder("portrait", portrait, onFolderLoaded);
