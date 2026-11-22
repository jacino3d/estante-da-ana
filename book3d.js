import * as THREE from './vendor/three.module.js';

// The cover is one face of a complete, lit book. Its boards, cloth spine and
// paper block are independent meshes so the object has volume at every angle.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const views = {};
const mat = (color, roughness = .72) => new THREE.MeshStandardMaterial({color, roughness, metalness: .02});

function paperTexture(direction) {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#e8dfce'; ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 256; i += 3) {
    ctx.fillStyle = i % 9 === 0 ? '#a99b85' : '#c6baa6';
    if (direction === 'vertical') ctx.fillRect(i, 0, 1, 256);
    else ctx.fillRect(0, i, 256, 1);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
const paperSide = paperTexture('vertical');
const paperTop = paperTexture('horizontal');
const paperMaterials = [
  new THREE.MeshStandardMaterial({map: paperSide, roughness: .94, emissive: '#9d9282', emissiveIntensity: .12}),
  new THREE.MeshStandardMaterial({color: '#bcb09e', roughness: .94}),
  new THREE.MeshStandardMaterial({map: paperTop, roughness: .96}),
  new THREE.MeshStandardMaterial({map: paperTop, roughness: .96}),
  new THREE.MeshStandardMaterial({color: '#f1e9d9', roughness: .95}),
  new THREE.MeshStandardMaterial({color: '#dbcfbd', roughness: .95})
];

function makeCover(book) {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 768;
  const ctx = canvas.getContext('2d');
  const coverColor = book.color || '#344048';
  const color = new THREE.Color(coverColor);
  const lightCover = color.r * .2126 + color.g * .7152 + color.b * .0722 > .42;
  ctx.fillStyle = coverColor; ctx.fillRect(0, 0, 512, 768);
  ctx.fillStyle = lightCover ? '#00000010' : '#ffffff17'; ctx.fillRect(18, 18, 476, 732);
  ctx.strokeStyle = lightCover ? '#262b2855' : '#ffffff55'; ctx.lineWidth = 2; ctx.strokeRect(28, 28, 456, 712);
  ctx.fillStyle = lightCover ? '#252924' : '#f7f0df';
  ctx.font = '600 18px Arial';
  ctx.fillText((book.genre || 'LIVRO').toLocaleUpperCase().slice(0, 29), 54, 82);
  const title = String(book.title || 'Livro');
  let size = title.length > 60 ? 38 : title.length > 38 ? 48 : 60;
  ctx.font = `600 ${size}px Georgia`;
  const words = title.split(/\s+/), lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > 400 && line) {lines.push(line); line = word;}
    else line = next;
  }
  if (line) lines.push(line);
  while (lines.length * size * 1.12 > 455 && size > 28) {
    size -= 2; ctx.font = `600 ${size}px Georgia`;
  }
  ctx.font = `600 ${size}px Georgia`;
  let y = Math.max(220, 375 - lines.length * size * .56);
  for (const item of lines.slice(0, 9)) {ctx.fillText(item, 54, y, 400); y += size * 1.12;}
  ctx.fillStyle = lightCover ? '#3a403a' : '#e9ddc5'; ctx.font = '24px Arial';
  const author = String(book.author || '');
  ctx.fillText(author.length > 37 ? `${author.slice(0, 34)}…` : author, 54, 686, 400);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function createView(kind, host) {
  const canvas = document.createElement('canvas');
  canvas.className = `book-mesh-canvas book-mesh-${kind}`;
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);
  const renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true, powerPreference: 'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 30);
  camera.position.set(0, 0, kind === 'preview' ? 8.2 : 7.1);
  scene.add(new THREE.AmbientLight(0xffffff, 1.05));
  const key = new THREE.DirectionalLight(0xffebd0, 1.8); key.position.set(-3, 5, 7); scene.add(key);
  const rim = new THREE.DirectionalLight(0xd8e8ff, 1.5); rim.position.set(4, 2, -4); scene.add(rim);
  const bounce = new THREE.DirectionalLight(0xffffff, .45); bounce.position.set(3, -4, 3); scene.add(bounce);
  const book = new THREE.Group(); scene.add(book);
  const pages = new THREE.Mesh(new THREE.BoxGeometry(2.42, 3.58, .48), paperMaterials);
  pages.position.set(.06, 0, 0); book.add(pages);
  const front = new THREE.Mesh(new THREE.BoxGeometry(2.62, 3.78, .075), []);
  front.position.z = .286; book.add(front);
  const back = new THREE.Mesh(new THREE.BoxGeometry(2.62, 3.78, .075), mat('#47302a'));
  back.position.z = -.286; book.add(back);
  // A curved, closed half-cylinder wraps the left binding. Its faces and normals
  // belong to one volume rather than a separate skewed plane beside the cover.
  const spine = new THREE.Mesh(new THREE.CylinderGeometry(.31,.31,3.78,40,1,false,Math.PI,Math.PI),mat('#47302a'));
  spine.scale.x=.48;spine.position.x=-1.24;book.add(spine);
  const state = {kind, host, canvas, renderer, scene, camera, book, front, back, spine, crop: null,
    baseTexture: null, coverTexture: null, active: false, generation: 0, targetX: .06, targetY: .36, x: .06, y: .36, frame: 0};
  const observer = new ResizeObserver(() => resize(state)); observer.observe(host);
  resize(state);
  return state;
}

function resize(view) {
  const rect = view.canvas.getBoundingClientRect();
  if (rect.width < 1 || rect.height < 1) return;
  view.camera.aspect = rect.width / rect.height;
  view.camera.updateProjectionMatrix();
  view.renderer.setSize(rect.width, rect.height, false);
  view.renderer.render(view.scene, view.camera);
}

function animate(view, stamp) {
  if (!view.active) {view.frame = 0; return;}
  const drift = reducedMotion.matches ? 0 : Math.sin(stamp * .00065) * .11;
  view.x += (view.targetX - view.x) * .08;
  view.y += (view.targetY - view.y) * .08;
  view.book.rotation.set(view.x + drift * .3, view.y + drift, -.025);
  view.book.position.y = reducedMotion.matches ? 0 : Math.sin(stamp * .0008) * .035;
  view.renderer.render(view.scene, view.camera);
  view.frame = requestAnimationFrame(t => animate(view, t));
}

function show(kind, book, url) {
  const view = views[kind]; if (!view) return;
  view.generation++;
  view.crop = book.coverCrop || null;
  for (const material of new Set(view.front.material)) material?.dispose();
  if (view.baseTexture) view.baseTexture.dispose();
  if (view.coverTexture) view.coverTexture.dispose();
  view.coverTexture = null;
  view.baseTexture = makeCover(book);
  const color = new THREE.Color(book.color || '#47302a');
  const cloth = mat(color, .83);
  view.front.material = [cloth, cloth, cloth, cloth, new THREE.MeshStandardMaterial({map: view.baseTexture, roughness: .78}), cloth];
  view.back.material.color.copy(color).multiplyScalar(.72);
  view.spine.material.color.copy(color).multiplyScalar(.9);
  view.active = true;
  view.targetX = kind === 'preview' ? .09 : .055;
  view.targetY = kind === 'preview' ? .36 : .32;
  view.x=view.targetX;view.y=view.targetY;
  resize(view);
  if (!view.frame) view.frame = requestAnimationFrame(t => animate(view, t));
  if (url) setCover(kind, url);
}

function setCover(kind, url) {
  const view = views[kind]; if (!view || !view.active || !url) return;
  const generation = ++view.generation;
  const image = new Image(); image.crossOrigin = 'anonymous';
  image.onload = () => {
    if (view.generation !== generation || image.naturalWidth < 20) return;
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 768;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#eee8dc'; ctx.fillRect(0, 0, 512, 768);
    const [rx, ry, rw, rh] = view.crop || [0, 0, 1, 1];
    const sx = image.naturalWidth * rx, sy = image.naturalHeight * ry;
    const sw = image.naturalWidth * rw, sh = image.naturalHeight * rh;
    const scale = Math.min(512 / sw, 768 / sh);
    const w = sw * scale, h = sh * scale;
    ctx.drawImage(image, sx, sy, sw, sh, (512 - w) / 2, (768 - h) / 2, w, h);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 8;
    view.coverTexture?.dispose(); view.coverTexture = texture;
    view.front.material[4].map = texture;
    view.front.material[4].needsUpdate = true;
  };
  image.onerror = () => {};
  image.src = url;
}

function hide(kind) {
  const view = views[kind]; if (!view) return;
  view.active = false; view.generation++;
  if (view.frame) cancelAnimationFrame(view.frame);
  view.frame = 0;
}

try {
  views.preview = createView('preview', document.querySelector('#hover-preview'));
  views.dialog = createView('dialog', document.querySelector('.dialog-visual'));
  document.body.classList.add('webgl-ready');
  window.book3D = {
    showPreview: (book, url) => show('preview', book, url),
    showDialog: (book, url) => show('dialog', book, url),
    setCover, hidePreview: () => hide('preview'), hideDialog: () => hide('dialog'),
    pointDialog: (x, y) => {views.dialog.targetX = .06 - y * .24; views.dialog.targetY = .32 + x * .45;},
    resetDialogPointer: () => {views.dialog.targetX = .055; views.dialog.targetY = .32;}
  };
} catch (error) {
  console.error('3D book preview unavailable; using the accessible fallback.', error);
}
