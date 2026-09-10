// ============ CONFIGURACIÓN ============
// Números de WhatsApp (código de país + número, sin + ni espacios).
const WHATSAPP_ORDER_NUMBER = "573213296814";       // pedidos (botón 🛒)
const WHATSAPP_RESERVATION_NUMBER = "573103670548"; // reservas (botón Reservar)

// Mensaje que se abre en WhatsApp al tocar el botón "Reservar" (mismo número
// que los pedidos). Está redactado en primera persona: lo envía el cliente,
// que completa cada campo y lo manda.
const RESERVATION_MESSAGE = `🌴 ¡Hola! Quiero hacer una reserva en *Azul Caribe Lounge* 🌊

Estos son mis datos:

📋 *1. Datos principales*
👤 Nombre completo (titular de la reserva):
👥 Número de personas:
📅 Fecha y hora deseada:
🎉 Motivo de la celebración: (Cena casual / Aniversario / Reunión de negocios / Despedida de soltero/a / Cumpleaños / Otro)

🎂 *2. Si es un cumpleaños*
🥳 Nombre de quien cumple años:
✨ Preparación especial que me gustaría: (pastel de la casa, decoración temática, brindis sorpresa, etc.)

🍽️ *3. Restricciones alimentarias*
⚠️ Alergias o restricciones de algún asistente: (intolerancias, vegetariano/vegano, sin gluten, sin lactosa… o "Ninguna")

🙌 Quedo atento/a a la confirmación de disponibilidad. ¡Gracias!`;

// Productos destacados dentro de la "pour scene" (escena de scroll bloqueado
// con el video de Higgsfield). Edita este arreglo con los ids de data.js
// que quieras mostrar mientras se llena el vaso (2 a 4 ideales).
// Vacío = no se muestran tarjetas, para que se aprecie mejor el video del Mojito.
const POUR_SHOWCASE_IDS = [];

// Efecto de "destape" interactivo: al hacer clic directamente sobre la foto
// del producto, se reproduce un video real (generado con Higgsfield) donde
// la botella se destapa. SOLO para botellas reales con tapa: cervezas
// embotelladas y licores. No se aplica a cócteles, vino por copa, sangría
// ni bebidas servidas en vaso (Refajo/Michelada), porque no tienen tapa.
const UNCORK_IDS = new Set([
  "z1", "z2", "z3", "z4", "z5", "z6", "z7", // cervezas embotelladas
  "l1", "l2", "l3", "l4", "l5", "l6", "l7", // licores
]);
// Cada id de UNCORK_IDS tiene su propio video en videos/uncork-<id>.webm|mp4
function uncorkVideoSrc(id, ext) { return `videos/uncork-${id}.${ext}`; }

const fmt = (n) => "$" + n.toLocaleString("es-CO");

// ============ ESTADO ============
let activeCat = "all"; // "all" | "destacados" | id de categoría
let searchTerm = "";
let cart = JSON.parse(localStorage.getItem("azulcaribe_cart") || "{}");
// priceMode: para items con precio + precioBotella, guarda "unit" o "botella" seleccionado por producto
let priceMode = JSON.parse(localStorage.getItem("azulcaribe_pricemode") || "{}");
let modalItemId = null; // id del producto actualmente abierto en el modal
let spyEnabled = false; // true cuando se puede resaltar la categoría según el scroll (solo en "Todo", sin búsqueda)

function saveCart() { localStorage.setItem("azulcaribe_cart", JSON.stringify(cart)); }
function savePriceMode() { localStorage.setItem("azulcaribe_pricemode", JSON.stringify(priceMode)); }

function cartKey(item) {
  if (item.precioBotella) return `${item.id}:${priceMode[item.id] || (item.precio != null ? "unit" : "botella")}`;
  return item.id;
}
function unitPriceFor(item, mode) {
  if (item.precioBotella) return mode === "botella" ? item.precioBotella : item.precio;
  return item.precio;
}
function priceLabelShort(item) {
  if (item.precio == null && item.precioBotella) return fmt(item.precioBotella);
  return fmt(item.precio);
}
function qtyForItem(item) {
  return cart[cartKey(item)] || 0;
}
function itemName(item) { return item.nombre[currentLang] || item.nombre.es; }
function desc(item) { return item.desc[currentLang] || item.desc.es; }
function catName(cat) { return cat.nombre[currentLang] || cat.nombre.es; }
function subName(subKey) { return (BAR_SUBS[subKey] && BAR_SUBS[subKey][currentLang]) || subKey; }
function badgeLabel(key) { return (BADGE_LABELS[currentLang] && BADGE_LABELS[currentLang][key]) || key; }
function tagLabel(key) { return (TAG_SHORT[currentLang] && TAG_SHORT[currentLang][key]) || key; }
function productCountLabel(n) { return `${n} ${n === 1 ? t("productWord") : t("productWordPlural")}`; }

// ============ SPLASH SCREEN ============
function hideSplash() {
  const splash = document.getElementById("splash");
  splash.classList.add("hide");
  setTimeout(() => splash.remove(), 700);
}

// ============ TEXTOS ESTÁTICOS (traducción de la interfaz) ============
// setText/setHTML/setPlaceholder no hacen nada si el elemento no existe
// (p. ej. el splash se elimina del DOM después de la animación inicial),
// así una traducción posterior nunca se corta a mitad de camino.
function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function setHTML(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; }
function setPlaceholder(id, text) { const el = document.getElementById(id); if (el) el.placeholder = text; }

function applyStaticTranslations() {
  document.documentElement.lang = currentLang;
  setText("splash-sub", t("splashSub"));
  setText("splash-loading-text", t("splashLoading"));
  setText("status-text", t("statusOpen"));
  setText("venue-eyebrow", t("venueEyebrow"));
  setText("venue-tagline", t("tagline"));
  setText("info-btn-label", t("infoBtn"));
  setText("reserve-btn-label", t("reserveBtn"));
  setPlaceholder("search-input", t("searchPlaceholder"));
  setText("foot-note", t("footNote"));
  setText("info-modal-title", t("infoHeader"));
  setText("info-whatsapp-text", t("infoWhatsapp"));
  setText("info-prices-text", t("infoPrices"));
  setText("info-cuisine-text", t("infoCuisine"));
  setHTML("info-note-text", t("infoNote"));
  setText("drawer-title", t("yourOrder"));
  setText("total-label", t("total"));
  setPlaceholder("order-note", t("notePlaceholder"));
  setText("send-whatsapp", t("sendWhatsapp"));
  setText("clear-cart", t("clearCart"));
  setText("lang-btn-label", currentLang.toUpperCase());
  setText("pour-eyebrow", t("pourEyebrow"));
  setHTML("pour-title", t("pourTitle"));
}

// ============ SELECTOR DE IDIOMA ============
function renderLangMenu() {
  const menu = document.getElementById("lang-menu");
  menu.innerHTML = LANGS.map(l => `
    <button class="lang-option ${currentLang === l.code ? "active" : ""}" data-lang="${l.code}">
      <span class="code">${l.label}</span> ${l.name}
    </button>`).join("");
  menu.querySelectorAll(".lang-option").forEach(btn => {
    btn.addEventListener("click", () => {
      setLang(btn.dataset.lang);
      closeLangMenu();
      refreshAll();
    });
  });
}
function toggleLangMenu() {
  document.getElementById("lang-menu").classList.toggle("open");
  document.getElementById("lang-btn").classList.toggle("active");
}
function closeLangMenu() {
  document.getElementById("lang-menu").classList.remove("open");
  document.getElementById("lang-btn").classList.remove("active");
}
function initLangSwitcher() {
  renderLangMenu();
  document.getElementById("lang-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleLangMenu();
  });
  document.addEventListener("click", (e) => {
    const menu = document.getElementById("lang-menu");
    const btn = document.getElementById("lang-btn");
    if (menu.classList.contains("open") && !menu.contains(e.target) && !btn.contains(e.target)) closeLangMenu();
  });
}

function refreshAll() {
  applyStaticTranslations();
  renderLangMenu();
  renderCatNav();
  renderGrid();
  renderCart();
  renderPourProducts();
  if (modalItemId) renderProductModal();
}

// ============ CATEGORY NAV (estructura tipo Maido: pills en la barra sticky) ============
function renderCatNav() {
  const nav = document.getElementById("catnav");
  let html = `<button class="catchip ${activeCat === "all" ? "active" : ""}" data-cat="all">${t("catAll")}</button>`;
  if (getDestacados().length) {
    html += `<button class="catchip ${activeCat === "destacados" ? "active" : ""}" data-cat="destacados">${t("catDestacados")}</button>`;
  }
  CATEGORIES.forEach(c => {
    html += `<button class="catchip ${activeCat === c.id ? "active" : ""}" data-cat="${c.id}">${catName(c)}</button>`;
  });
  nav.innerHTML = html;
  nav.querySelectorAll(".catchip").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCat = btn.dataset.cat;
      renderCatNav();
      renderGrid();
      btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      scrollToMenu();
    });
  });
  updateNavFade();
}
function scrollToMenu() {
  const nav = document.getElementById("sticky-nav");
  const y = nav.getBoundingClientRect().bottom + window.scrollY - 78;
  window.scrollTo({ top: Math.max(y, 0), behavior: "smooth" });
}

// ============ BARRA DE CATEGORÍAS DESLIZABLE ============
// La barra ya se puede deslizar con el dedo (touch) por defecto. Aquí se
// agrega: (1) desplazamiento con la rueda del mouse/trackpad en desktop,
// (2) arrastre con el mouse (clic y arrastrar), y (3) un degradado en los
// bordes que indica que hay más categorías hacia ese lado (p. ej. "Bar").
function initCatnavScroll() {
  const nav = document.getElementById("catnav");
  const wrap = document.getElementById("nav-scroll-wrap");

  // Rueda del mouse/trackpad -> desplazamiento horizontal
  nav.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      nav.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  // Arrastrar con el mouse (desktop)
  let isDown = false, startX = 0, startScroll = 0, dragged = false;
  nav.addEventListener("mousedown", (e) => {
    isDown = true; dragged = false;
    startX = e.pageX; startScroll = nav.scrollLeft;
  });
  window.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 4) dragged = true;
    nav.scrollLeft = startScroll - dx;
  });
  window.addEventListener("mouseup", () => { isDown = false; });
  // Evita que un arrastre se interprete como clic en una categoría
  nav.addEventListener("click", (e) => {
    if (dragged) { e.stopPropagation(); e.preventDefault(); dragged = false; }
  }, true);

  nav.addEventListener("scroll", updateNavFade);
  window.addEventListener("resize", updateNavFade);
}
function updateNavFade() {
  const nav = document.getElementById("catnav");
  const wrap = document.getElementById("nav-scroll-wrap");
  if (!nav || !wrap) return;
  const atStart = nav.scrollLeft <= 2;
  const atEnd = nav.scrollLeft + nav.clientWidth >= nav.scrollWidth - 2;
  wrap.classList.toggle("at-start", atStart);
  wrap.classList.toggle("at-end", atEnd);
}

// ============ SEARCH TOGGLE ============
function initSearchToggle() {
  const btn = document.getElementById("search-toggle");
  const row = document.getElementById("search-row");
  const input = document.getElementById("search-input");
  btn.addEventListener("click", () => {
    const willOpen = !row.classList.contains("open");
    row.classList.toggle("open", willOpen);
    btn.classList.toggle("active", willOpen);
    if (willOpen) setTimeout(() => input.focus(), 200);
    else { searchTerm = ""; input.value = ""; renderGrid(); }
  });
  input.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    renderGrid();
  });
}

// ============ FILTRADO ============
function getDestacados() {
  return MENU_DATA.filter(i => i.badge);
}

function matchesFilters(item) {
  if (searchTerm.trim()) {
    const t = searchTerm.toLowerCase();
    const hay = [item.nombre.es, item.nombre.en, item.nombre.pt, item.desc.es, item.desc.en, item.desc.pt].join(" ").toLowerCase();
    if (!hay.includes(t)) return false;
  }
  return true;
}

function getFilteredItems() {
  let base = MENU_DATA;
  if (activeCat === "destacados") base = getDestacados();
  else if (activeCat !== "all") base = base.filter(i => i.cat === activeCat);
  return base.filter(matchesFilters);
}

// ============ RENDER: GRID DE PRODUCTOS (tarjetas) ============
function sectionHeaderHTML(title, count, spyId) {
  const spyAttr = spyId ? ` data-spy-cat="${spyId}"` : "";
  return `<div class="section-title"${spyAttr}><h2>${title}</h2><span class="count">${productCountLabel(count)}</span><span class="line"></span></div>`;
}

function cardHTML(item) {
  const badgeHTML = item.badge ? `<span class="card-badge">${badgeLabel(item.badge)}</span>` : "";
  const qty = qtyForItem(item);
  const qtyHTML = qty > 0 ? `<span class="card-qty-badge">${qty}</span>` : "";
  const uncork = UNCORK_IDS.has(item.id);
  const uncorkVideoHTML = uncork ? `
      <video class="uncork-video" muted playsinline preload="none" poster="images/${item.img}.jpg">
        <source src="${uncorkVideoSrc(item.id, "webm")}" type="video/webm">
        <source src="${uncorkVideoSrc(item.id, "mp4")}" type="video/mp4">
      </video>
      <div class="uncork-hint" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </div>` : "";
  return `
  <div class="card${uncork ? " uncork-wrap" : ""}" data-id="${item.id}" tabindex="0" role="button" aria-label="${itemName(item)}">
    <div class="card-img-wrap"${uncork ? ` data-uncork-id="${item.id}" title="${t("uncorkHint")}"` : ""}>
      <img src="images/${item.img}.jpg" alt="${itemName(item)}" loading="lazy">
      ${uncorkVideoHTML}
      ${badgeHTML}${qtyHTML}
    </div>
    <div class="card-body">
      <div class="card-title-line">
        <span class="card-name">${itemName(item)}</span>
        <span class="card-price">${priceLabelShort(item)}</span>
      </div>
      <div class="card-desc">${desc(item)}</div>
      <div class="card-tags">${item.tags.map(k => `<span class="tag">${tagLabel(k)}</span>`).join("")}</div>
    </div>
  </div>`;
}

function destCardHTML(item) {
  return `
  <div class="dest-card" data-id="${item.id}" tabindex="0" role="button" aria-label="${itemName(item)}">
    <div class="dest-img-wrap"><img src="images/${item.img}.jpg" alt="${itemName(item)}" loading="lazy"></div>
    <div class="dest-price">${priceLabelShort(item)}</div>
    <div class="dest-name">${itemName(item)}</div>
  </div>`;
}

function renderSection(cat, items, spyId) {
  if (cat.id === "bar") {
    const subs = [...new Set(items.map(i => i.sub))];
    let inner = "";
    subs.forEach(sub => {
      inner += `<div class="section-title" style="margin:24px 0 12px;"><h2 style="font-size:16px;">${subName(sub)}</h2><span class="line"></span></div>`;
      inner += `<div class="grid">${items.filter(i => i.sub === sub).map(cardHTML).join("")}</div>`;
    });
    return sectionHeaderHTML(catName(cat), items.length, spyId) + inner;
  }
  return sectionHeaderHTML(catName(cat), items.length, spyId) + `<div class="grid">${items.map(cardHTML).join("")}</div>`;
}

function renderGrid() {
  const container = document.getElementById("menu-content");
  const items = getFilteredItems();

  if (items.length === 0) {
    container.innerHTML = `<div class="empty-state">${t("emptyState")}</div>`;
    attachCardEvents();
    return;
  }

  let html = "";

  // ---- Carrusel de Destacados (solo cuando no hay categoría/búsqueda/filtro activos) ----
  if (activeCat === "all" && !searchTerm.trim()) {
    const dest = getDestacados();
    if (dest.length) {
      html += `<div class="section-title"><h2>${t("destacadosTitle")}</h2><span class="line"></span></div>`;
      html += `<div class="destacados-scroll">${dest.map(destCardHTML).join("")}</div>`;
    }
  }

  if (activeCat === "destacados") {
    html += `<div class="section-title"><h2>${t("destacadosTitle")}</h2><span class="count">${productCountLabel(items.length)}</span><span class="line"></span></div>`;
    html += `<div class="grid">${items.map(cardHTML).join("")}</div>`;
  } else if (activeCat !== "all") {
    html += renderSection(CATEGORIES.find(c => c.id === activeCat), items);
  } else {
    CATEGORIES.forEach(cat => {
      const catItems = items.filter(i => i.cat === cat.id);
      if (catItems.length) html += renderSection(cat, catItems, cat.id);
    });
  }

  container.innerHTML = html;
  attachCardEvents();
  initScrollSpy();
}

// ============ RESALTADO DE CATEGORÍA SEGÚN EL SCROLL (estructura tipo Maido) ============
// Cuando se está viendo "Todo" (todas las categorías seguidas, sin búsqueda),
// al hacer scroll manualmente la pestaña activa en la barra de categorías
// debe ir cambiando sola para reflejar la sección que se está viendo — igual
// que en apps de menú tipo Maido/Rappi. Esto es SOLO un resaltado visual:
// no toca la variable "activeCat" (que sigue siendo "all" y controla el
// filtrado real), para no romper el carrito ni el resto del menú.
function initScrollSpy() {
  spyEnabled = (activeCat === "all" && !searchTerm.trim());
  if (spyEnabled) updateScrollSpy();
}

function updateScrollSpy() {
  if (!spyEnabled) return;
  const stickyNav = document.getElementById("sticky-nav");
  const nav = document.getElementById("catnav");
  if (!stickyNav || !nav) return;
  const navBottom = stickyNav.getBoundingClientRect().bottom;
  const sections = document.querySelectorAll(".section-title[data-spy-cat]");
  let current = "all";
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top - navBottom <= 8) current = sec.dataset.spyCat;
  });
  if (nav.querySelector(`.catchip.active[data-cat="${current}"]`)) return; // ya resaltado, no tocar el DOM
  nav.querySelectorAll(".catchip").forEach(btn => btn.classList.toggle("active", btn.dataset.cat === current));
  const activeBtn = nav.querySelector(`.catchip[data-cat="${current}"]`);
  if (activeBtn) activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}

function initScrollSpyListener() {
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!spyEnabled || ticking) return;
    ticking = true;
    requestAnimationFrame(() => { updateScrollSpy(); ticking = false; });
  }, { passive: true });
}

function attachCardEvents() {
  document.querySelectorAll(".card, .dest-card").forEach(card => {
    const open = () => openProductModal(card.dataset.id);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
  initUncorkVideos();
}

// ============ EFECTO "DESTAPAR" (solo cervezas embotelladas y licores) ============
// Al hacer clic sobre la foto de una botella pasan DOS cosas a la vez, igual
// que con cualquier otro producto del menú: (1) se abre la ficha ampliada
// del producto con el botón de "Agregar al pedido" (el comportamiento
// normal de toda tarjeta al hacer clic), y (2) además se reproduce el
// video real del destape sobre la miniatura de la tarjeta. Ya NO se bloquea
// la apertura de la ficha al tocar la foto — antes sí se bloqueaba
// (stopPropagation) y por eso las botellas no se "agrandaban" como el
// resto de productos; ahora se comportan exactamente igual, con el video
// como plus.
function initUncorkVideos() {
  document.querySelectorAll(".card-img-wrap[data-uncork-id]").forEach(wrap => {
    const video = wrap.querySelector(".uncork-video");
    if (!video) return;
    const card = wrap.closest(".card");
    wrap.addEventListener("click", () => {
      playUncorkVideo(wrap, video, card);
      // sin stopPropagation: el clic sigue su curso normal y abre la ficha
      // del producto (igual que en cualquier otra tarjeta del menú).
    });
    video.addEventListener("ended", () => resetUncorkVideo(wrap, video, card));
    video.addEventListener("error", () => resetUncorkVideo(wrap, video, card));
  });
}

// Al tocar la foto, la tarjeta completa se agranda (mismo efecto visual que
// al pasar el mouse por encima) mientras dura el video, para que el destape
// se sienta como un zoom deliberado y no pase desapercibido.
function playUncorkVideo(wrap, video, card) {
  if (wrap.classList.contains("is-playing")) return; // ya reproduciendo, ignora clics extra
  wrap.classList.add("is-playing");
  if (card) card.classList.add("pressed");
  try { video.currentTime = 0; } catch (err) { /* aún no cargó metadata, no pasa nada */ }
  const playPromise = video.play();
  if (playPromise && playPromise.catch) playPromise.catch(() => resetUncorkVideo(wrap, video, card));
}

function resetUncorkVideo(wrap, video, card) {
  wrap.classList.remove("is-playing");
  if (card) card.classList.remove("pressed");
  video.pause();
  try { video.currentTime = 0; } catch (err) { /* no-op */ }
}

// ============ POUR SCENE: escena de scroll bloqueado (video Higgsfield) ============
function renderPourProducts() {
  const wrap = document.getElementById("pour-products");
  if (!wrap) return;
  const items = POUR_SHOWCASE_IDS.map(id => MENU_DATA.find(i => i.id === id)).filter(Boolean);
  wrap.innerHTML = items.map((item, i) => `
    <div class="pour-card" data-id="${item.id}" data-order="${i}" tabindex="0" role="button" aria-label="${itemName(item)}">
      <img src="images/${item.img}.jpg" alt="${itemName(item)}" loading="lazy">
      <div class="pour-card-body">
        <div class="pour-card-name">${itemName(item)}</div>
        <div class="pour-card-price">${priceLabelShort(item)}</div>
      </div>
    </div>`).join("");
  wrap.querySelectorAll(".pour-card").forEach(card => {
    const open = () => openProductModal(card.dataset.id);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
}

// Escena "El arte de servir" con scroll bloqueado:
// 1) Cuando la sección entra en pantalla se bloquea el scroll (wheel/touch/
//    teclado), el video de fondo se reproduce (atenuado) en bucle y arranca
//    el MONTAJE DE FOTOS: arte-1 -> arte-4 se funden en secuencia dentro de
//    un marco dorado, con un zoom lento (Ken Burns).
// 2) La barra de progreso avanza según el montaje (no según el video).
// 3) Al terminar el montaje (o tras el salvavidas de seguridad), el scroll
//    se libera; queda visible la última foto sobre el video.
// Config: PHOTO_MS = tiempo por foto, HOLD_MS = extra al final.
const POUR_PHOTO_MS = 900;
const POUR_HOLD_MS = 600;

function initPourScene() {
  const section = document.getElementById("pour-scene");
  const video = document.getElementById("pour-video");
  const progressBar = document.getElementById("pour-progress-bar");
  const photoEls = Array.from(section ? section.querySelectorAll(".pour-photo") : []);
  if (!section || !video) return;

  let state = "idle"; // idle -> locked -> playing -> done
  let safetyTimer = null;
  let photoTimers = [];
  const montageTotal = POUR_PHOTO_MS * Math.max(1, photoEls.length) + POUR_HOLD_MS;

  function lockScroll() {
    document.body.classList.add("scroll-locked");
  }
  function unlockScroll() {
    document.body.classList.remove("scroll-locked");
  }
  function blockEvent(e) { e.preventDefault(); }
  function attachScrollBlockers() {
    window.addEventListener("wheel", blockEvent, { passive: false });
    window.addEventListener("touchmove", blockEvent, { passive: false });
    window.addEventListener("keydown", blockKeyScroll, { passive: false });
  }
  function detachScrollBlockers() {
    window.removeEventListener("wheel", blockEvent, { passive: false });
    window.removeEventListener("touchmove", blockEvent, { passive: false });
    window.removeEventListener("keydown", blockKeyScroll, { passive: false });
  }
  function blockKeyScroll(e) {
    const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Spacebar", "Home", "End"];
    if (keys.includes(e.key)) e.preventDefault();
  }

  function showPhoto(idx) {
    photoEls.forEach((el, i) => el.classList.toggle("on", i === idx));
  }

  function runMontage() {
    const start = performance.now();
    photoEls.forEach((_, i) => {
      photoTimers.push(setTimeout(() => { if (state !== "done") showPhoto(i); }, i * POUR_PHOTO_MS));
    });
    (function bar(now) {
      if (state === "done") return;
      const p = Math.min(1, (now - start) / montageTotal);
      if (progressBar) progressBar.style.width = (p * 100).toFixed(1) + "%";
      if (p < 1) requestAnimationFrame(bar);
    })(start);
    safetyTimer = setTimeout(finishScene, montageTotal);
  }

  function revealContent() {
    section.classList.add("reveal");
  }

  function finishScene() {
    if (state === "done") return;
    state = "done";
    clearTimeout(safetyTimer);
    photoTimers.forEach(clearTimeout);
    if (photoEls.length) showPhoto(photoEls.length - 1); // deja la última foto visible
    if (progressBar) progressBar.style.width = "100%";
    detachScrollBlockers();
    unlockScroll();
    section.classList.add("pour-done");
  }

  function startFilling() {
    if (state !== "idle") return;
    state = "playing";
    lockScroll();
    attachScrollBlockers();
    revealContent();

    // El video corre de fondo, atenuado y en bucle, solo como ambiente. Si no
    // carga, queda la imagen de respaldo detrás (pour-empty.jpg). El montaje
    // de fotos es independiente del video y controla cuándo termina la escena.
    video.addEventListener("canplay", () => section.classList.add("video-ready"), { once: true });
    video.loop = true;
    video.playbackRate = 1;
    const playPromise = video.play();
    if (playPromise && playPromise.catch) playPromise.catch(() => { /* el montaje sigue igual */ });

    runMontage();

    // Salvavidas absoluto: el scroll SIEMPRE se libera aunque algo falle.
    setTimeout(finishScene, montageTotal + 2000);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.6 && state === "idle") {
        startFilling();
      }
    });
  }, { threshold: [0, 0.6, 1] });
  io.observe(section);
}

// ============ MODAL DE PRODUCTO (vista expandida) ============
function openProductModal(id) {
  const item = MENU_DATA.find(i => i.id === id);
  if (!item) return;
  modalItemId = id;
  renderProductModal();
  document.getElementById("product-modal").classList.add("open");
  document.getElementById("product-overlay").classList.add("open");
}
function closeProductModal() {
  document.getElementById("product-modal").classList.remove("open");
  document.getElementById("product-overlay").classList.remove("open");
  modalItemId = null;
}

function renderProductModal() {
  const item = MENU_DATA.find(i => i.id === modalItemId);
  if (!item) return;
  const mode = priceMode[item.id] || (item.precio != null ? "unit" : "botella");
  const qty = qtyForItem(item);
  const unitPrice = unitPriceFor(item, mode);

  document.getElementById("pm-photo").src = `images/${item.img}.jpg`;
  document.getElementById("pm-photo").alt = itemName(item);
  document.getElementById("pm-badge").textContent = item.badge ? badgeLabel(item.badge) : "";
  document.getElementById("pm-name").textContent = itemName(item);
  document.getElementById("pm-price").textContent = priceLabelShort(item);
  document.getElementById("pm-desc").textContent = desc(item);
  document.getElementById("pm-tags").innerHTML = item.tags.map(k => `<span class="tag">${tagLabel(k)}</span>`).join("");
  document.getElementById("pm-qty").textContent = qty;

  const priceSelectEl = document.getElementById("pm-price-select");
  if (item.precioBotella && item.precio != null) {
    priceSelectEl.innerHTML = `
      <div class="price-select" data-id="${item.id}">
        <button class="price-pill ${mode === "unit" ? "active" : ""}" data-mode="unit">
          <span class="pp-label">${t("trago")}</span><span class="pp-price">${fmt(item.precio)}</span>
        </button>
        <button class="price-pill ${mode === "botella" ? "active" : ""}" data-mode="botella">
          <span class="pp-label">${t("botella")}</span><span class="pp-price">${fmt(item.precioBotella)}</span>
        </button>
      </div>`;
    priceSelectEl.querySelectorAll(".price-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        priceMode[item.id] = btn.dataset.mode;
        savePriceMode();
        renderProductModal();
      });
    });
  } else {
    priceSelectEl.innerHTML = "";
  }

  const addBtn = document.getElementById("pm-add-btn");
  addBtn.textContent = qty > 0 ? `${t("inOrder")} · ${fmt(unitPrice * qty)}` : t("addToOrder");
  addBtn.classList.toggle("added", qty > 0);
}

function initProductModal() {
  document.getElementById("product-close").addEventListener("click", closeProductModal);
  document.getElementById("product-overlay").addEventListener("click", closeProductModal);

  document.getElementById("pm-stepper").querySelector(".step-plus").addEventListener("click", () => {
    const item = MENU_DATA.find(i => i.id === modalItemId);
    const key = cartKey(item);
    cart[key] = (cart[key] || 0) + 1;
    saveCart(); renderProductModal(); renderGrid(); renderCart(); updateCartUI(true);
  });
  document.getElementById("pm-stepper").querySelector(".step-minus").addEventListener("click", () => {
    const item = MENU_DATA.find(i => i.id === modalItemId);
    const key = cartKey(item);
    if (cart[key]) { cart[key]--; if (cart[key] <= 0) delete cart[key]; }
    saveCart(); renderProductModal(); renderGrid(); renderCart(); updateCartUI(false);
  });
  document.getElementById("pm-add-btn").addEventListener("click", () => {
    const item = MENU_DATA.find(i => i.id === modalItemId);
    const key = cartKey(item);
    cart[key] = (cart[key] || 0) + 1;
    saveCart(); renderProductModal(); renderGrid(); renderCart();
    showToast(t("toastAdded"));
    updateCartUI(true);
  });
}

// ============ INFO MODAL ============
function initInfoModal() {
  document.getElementById("info-btn").addEventListener("click", () => {
    document.getElementById("info-modal").classList.add("open");
    document.getElementById("info-overlay").classList.add("open");
  });
  const close = () => {
    document.getElementById("info-modal").classList.remove("open");
    document.getElementById("info-overlay").classList.remove("open");
  };
  document.getElementById("info-close").addEventListener("click", close);
  document.getElementById("info-overlay").addEventListener("click", close);
}

// ============ CARRITO ============
function parseCartKey(key) {
  const [id, mode] = key.split(":");
  const item = MENU_DATA.find(i => i.id === id);
  return { item, mode };
}

function cartCount() { return Object.values(cart).reduce((a, b) => a + b, 0); }
function cartTotal() {
  let total = 0;
  for (const key in cart) {
    const { item, mode } = parseCartKey(key);
    if (!item) continue;
    total += unitPriceFor(item, mode) * cart[key];
  }
  return total;
}

function updateCartUI(justAdded) {
  const count = cartCount();
  const fab = document.getElementById("cart-btn");
  const badge = document.getElementById("cart-count");
  const fabTotal = document.getElementById("fab-total");

  badge.textContent = count;
  fab.classList.toggle("hidden", count === 0);
  fabTotal.classList.toggle("show", count > 0);
  fabTotal.textContent = fmt(cartTotal());

  if (justAdded !== undefined && count > 0) {
    badge.classList.remove("pop");
    void badge.offsetWidth; // reflow para reiniciar animación
    badge.classList.add("pop");
  }
}

function renderCart() {
  const wrap = document.getElementById("drawer-items");
  const keys = Object.keys(cart).filter(k => cart[k] > 0);
  if (keys.length === 0) {
    wrap.innerHTML = `<div class="drawer-empty">${t("emptyCart")}</div>`;
    document.getElementById("drawer-foot").style.display = "none";
    return;
  }
  document.getElementById("drawer-foot").style.display = "block";
  wrap.innerHTML = keys.map(key => {
    const { item, mode } = parseCartKey(key);
    if (!item) return "";
    const unit = unitPriceFor(item, mode);
    const qty = cart[key];
    const variantLabel = item.precioBotella ? (mode === "botella" ? ` · ${t("botella")}` : ` · ${t("trago")}`) : "";
    return `
    <div class="cart-row" data-key="${key}">
      <img src="images/${item.img}.jpg" alt="${itemName(item)}">
      <div class="info">
        <div class="name">${itemName(item)}${variantLabel}</div>
        <div class="unit">${fmt(unit)} ${t("each")}</div>
        <div class="qty-row">
          <button class="qty-btn minus" data-key="${key}">−</button>
          <span class="qty-num">${qty}</span>
          <button class="qty-btn plus" data-key="${key}">+</button>
          <button class="remove-x" data-key="${key}">${t("remove")}</button>
        </div>
      </div>
      <div class="line-total">${fmt(unit * qty)}</div>
    </div>`;
  }).join("");

  wrap.querySelectorAll(".plus").forEach(b => b.addEventListener("click", () => {
    cart[b.dataset.key]++; saveCart(); renderCart(); renderGrid(); if (modalItemId) renderProductModal(); updateCartUI(true);
  }));
  wrap.querySelectorAll(".minus").forEach(b => b.addEventListener("click", () => {
    cart[b.dataset.key]--; if (cart[b.dataset.key] <= 0) delete cart[b.dataset.key];
    saveCart(); renderCart(); renderGrid(); if (modalItemId) renderProductModal(); updateCartUI(false);
  }));
  wrap.querySelectorAll(".remove-x").forEach(b => b.addEventListener("click", () => {
    delete cart[b.dataset.key]; saveCart(); renderCart(); renderGrid(); if (modalItemId) renderProductModal(); updateCartUI(false);
  }));

  document.getElementById("total-amt").textContent = fmt(cartTotal());
}

// Emoji por tipo de producto para el mensaje de pedido de WhatsApp.
function itemEmoji(item) {
  if (item.cat === "bar") {
    return ({ cocteles: "🍸", premium: "🥃", vino: "🍷", cerveza: "🍺", licores: "🥃" })[item.sub] || "🍹";
  }
  return ({
    desayuno: "🍳", aperitivos: "🍤", cafe: "☕",
    bebidas: "🥤", platos: "🍽️", carnes: "🥩", sides: "🍟",
  })[item.cat] || "🍽️";
}

// El mensaje de WhatsApp se envía siempre en español porque lo recibe el
// personal del lounge (independientemente del idioma que esté viendo el
// cliente en la pantalla). Si prefieres que siga el idioma del cliente,
// se puede ajustar fácilmente aquí.
function buildWhatsappMessage() {
  const keys = Object.keys(cart).filter(k => cart[k] > 0);
  const totalItems = keys.reduce((n, k) => n + cart[k], 0);
  let lines = [
    "🌴 *Nuevo pedido — Azul Caribe Lounge* 🌊",
    "",
    `🧾 *Mi pedido* (${totalItems} ${totalItems === 1 ? "producto" : "productos"}):`,
  ];
  keys.forEach(key => {
    const { item, mode } = parseCartKey(key);
    if (!item) return;
    const unit = unitPriceFor(item, mode);
    const variantLabel = item.precioBotella ? (mode === "botella" ? " (Botella)" : " (Trago)") : "";
    lines.push(`${itemEmoji(item)} ${cart[key]}x ${item.nombre.es}${variantLabel} — ${fmt(unit * cart[key])}`);
  });
  const subtotal = cartTotal();
  const tip = Math.round(subtotal * 0.10);
  lines.push("");
  lines.push(`🧮 Subtotal: ${fmt(subtotal)}`);
  lines.push(`🙏 Servicio voluntario (10%): ${fmt(tip)}`);
  lines.push(`💰 *Total con servicio: ${fmt(subtotal + tip)}*`);
  lines.push("_El servicio es voluntario; si prefieres no incluirlo, avísanos._");
  const note = document.getElementById("order-note").value.trim();
  if (note) { lines.push(""); lines.push(`📝 *Nota:* ${note}`); }
  lines.push("");
  lines.push("🙌 ¡Gracias! Quedo atento/a a la confirmación.");
  return lines.join("\n");
}

// ============ TOAST ============
let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1500);
}

// ============ DRAWER ============
function openDrawer() {
  document.getElementById("drawer").classList.add("open");
  document.getElementById("overlay").classList.add("open");
  renderCart();
}
function closeDrawer() {
  document.getElementById("drawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("open");
}

// ============ INIT ============
document.addEventListener("DOMContentLoaded", () => {
  applyStaticTranslations();
  initLangSwitcher();
  renderCatNav();
  renderGrid();
  renderPourProducts();
  updateCartUI();
  initSearchToggle();
  initCatnavScroll();
  initProductModal();
  initInfoModal();
  initPourScene();
  initScrollSpyListener();

  document.getElementById("reserve-btn").addEventListener("click", () => {
    const msg = encodeURIComponent(RESERVATION_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_RESERVATION_NUMBER}?text=${msg}`, "_blank");
  });

  document.getElementById("cart-btn").addEventListener("click", openDrawer);
  document.getElementById("close-drawer").addEventListener("click", closeDrawer);
  document.getElementById("overlay").addEventListener("click", closeDrawer);

  document.getElementById("clear-cart").addEventListener("click", () => {
    if (confirm(t("confirmClear"))) {
      cart = {}; saveCart(); renderCart(); renderGrid(); updateCartUI();
    }
  });

  document.getElementById("send-whatsapp").addEventListener("click", () => {
    const keys = Object.keys(cart).filter(k => cart[k] > 0);
    if (keys.length === 0) return;
    const msg = encodeURIComponent(buildWhatsappMessage());
    window.open(`https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${msg}`, "_blank");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeProductModal(); closeDrawer(); closeLangMenu(); }
  });

  const minTime = new Promise(res => setTimeout(res, 1400));
  Promise.all([minTime]).then(hideSplash);
});
