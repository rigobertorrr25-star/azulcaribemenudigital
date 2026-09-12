// ============ TEXTOS DE INTERFAZ (ES / EN / PT) ============
// Para agregar un idioma nuevo: copia uno de estos bloques, tradúcelo,
// y agrega su código (ej. "fr") a LANGS más abajo.

const LANGS = [
  { code: "es", label: "ES", name: "Español" },
  { code: "en", label: "EN", name: "English" },
  { code: "pt", label: "PT", name: "Português" },
  { code: "fr", label: "FR", name: "Français" },
];

const UI = {
  es: {
    tagline: "Cocina caribeña · Cartagena de Indias, Colombia",
    venueEyebrow: "Coctelería de autor",
    infoBtn: "Información",
    reserveBtn: "Reservar",
    searchPlaceholder: "Buscar en el menú… (ej. camarones, café, ron)",
    catAll: "Todo",
    catDestacados: "★ Destacados",
    destacadosTitle: "★ Destacados",
    productWord: "producto",
    productWordPlural: "productos",
    emptyState: "No encontramos productos con esos filtros.<br>Prueba quitando alguno.",
    addToOrder: "Agregar al pedido",
    inOrder: "En pedido",
    trago: "Trago",
    botella: "Botella",
    yourOrder: "Tu pedido",
    total: "Total",
    notePlaceholder: "Notas del pedido (mesa, alergias, etc.) — opcional",
    sendWhatsapp: "📲 Enviar pedido por WhatsApp",
    clearCart: "Vaciar pedido",
    emptyCart: "Tu pedido está vacío.<br>Agrega productos del menú para empezar.",
    each: "c/u",
    remove: "Quitar",
    confirmClear: "¿Vaciar todo el pedido?",
    footNote: "Precios en pesos colombianos (COP) · Disfrute con moderación",
    toastAdded: "Agregado al pedido",
    infoHeader: "Información",
    infoWhatsapp: "Pedidos por WhatsApp al enviar tu carrito",
    infoPrices: "Precios en pesos colombianos (COP)",
    infoCuisine: "Cocina caribeña con toques haitianos y nikkei-peruanos",
    splashLoading: "Cargando el menú…",
    splashSub: "Lounge · Bienvenidos",
    statusOpen: "Abierto ahora",
    langBtn: "Idioma",
    pourEyebrow: "Coctelería de autor",
    pourTitle: "El arte de servir <span>Azul Caribe</span>",
    pourNote: "Descúbrelos en la carta",
  },
  en: {
    tagline: "Caribbean cuisine · Cartagena de Indias, Colombia",
    venueEyebrow: "Craft Cocktails",
    infoBtn: "Info",
    reserveBtn: "Book a Table",
    searchPlaceholder: "Search the menu… (e.g. shrimp, coffee, rum)",
    catAll: "All",
    catDestacados: "★ Featured",
    destacadosTitle: "★ Featured",
    productWord: "item",
    productWordPlural: "items",
    emptyState: "We couldn't find products with those filters.<br>Try removing one.",
    addToOrder: "Add to order",
    inOrder: "In order",
    trago: "Shot",
    botella: "Bottle",
    yourOrder: "Your Order",
    total: "Total",
    notePlaceholder: "Order notes (table, allergies, etc.) — optional",
    sendWhatsapp: "📲 Send order via WhatsApp",
    clearCart: "Clear order",
    emptyCart: "Your order is empty.<br>Add products from the menu to get started.",
    each: "each",
    remove: "Remove",
    confirmClear: "Clear the whole order?",
    footNote: "Prices in Colombian pesos (COP) · Please enjoy responsibly",
    toastAdded: "Added to order",
    infoHeader: "Info",
    infoWhatsapp: "Orders via WhatsApp when you send your cart",
    infoPrices: "Prices in Colombian pesos (COP)",
    infoCuisine: "Caribbean cuisine with Haitian and Nikkei-Peruvian touches",
    splashLoading: "Loading the menu…",
    splashSub: "Lounge · Welcome",
    statusOpen: "Open now",
    langBtn: "Language",
    pourEyebrow: "Craft Cocktails",
    pourTitle: "The art of serving <span>Azul Caribe</span>",
    pourNote: "Discover them on the menu",
  },
  pt: {
    tagline: "Cozinha caribenha · Cartagena de Indias, Colômbia",
    venueEyebrow: "Coquetelaria Autoral",
    infoBtn: "Informações",
    reserveBtn: "Reservar",
    searchPlaceholder: "Buscar no cardápio… (ex. camarão, café, rum)",
    catAll: "Tudo",
    catDestacados: "★ Destaques",
    destacadosTitle: "★ Destaques",
    productWord: "produto",
    productWordPlural: "produtos",
    emptyState: "Não encontramos produtos com esses filtros.<br>Tente remover algum.",
    addToOrder: "Adicionar ao pedido",
    inOrder: "No pedido",
    trago: "Dose",
    botella: "Garrafa",
    yourOrder: "Seu pedido",
    total: "Total",
    notePlaceholder: "Notas do pedido (mesa, alergias, etc.) — opcional",
    sendWhatsapp: "📲 Enviar pedido pelo WhatsApp",
    clearCart: "Esvaziar pedido",
    emptyCart: "Seu pedido está vazio.<br>Adicione produtos do cardápio para começar.",
    each: "cada",
    remove: "Remover",
    confirmClear: "Esvaziar todo o pedido?",
    footNote: "Preços em pesos colombianos (COP) · Aproveite com moderação",
    toastAdded: "Adicionado ao pedido",
    infoHeader: "Informações",
    infoWhatsapp: "Pedidos pelo WhatsApp ao enviar seu carrinho",
    infoPrices: "Preços em pesos colombianos (COP)",
    infoCuisine: "Cozinha caribenha com toques haitianos e nikkei-peruanos",
    splashLoading: "Carregando o cardápio…",
    splashSub: "Lounge · Bem-vindos",
    statusOpen: "Aberto agora",
    langBtn: "Idioma",
    pourEyebrow: "Coquetelaria Autoral",
    pourTitle: "A arte de servir <span>Azul Caribe</span>",
    pourNote: "Descubra-os no cardápio",
  },
  fr: {
    tagline: "Cuisine caraïbe · Carthagène des Indes, Colombie",
    venueEyebrow: "Cocktails d'Auteur",
    infoBtn: "Infos",
    reserveBtn: "Réserver",
    searchPlaceholder: "Rechercher dans le menu… (ex. crevettes, café, rhum)",
    catAll: "Tout",
    catDestacados: "★ À la Une",
    destacadosTitle: "★ À la Une",
    productWord: "produit",
    productWordPlural: "produits",
    emptyState: "Nous n'avons trouvé aucun produit avec ces filtres.<br>Essayez d'en retirer un.",
    addToOrder: "Ajouter à la commande",
    inOrder: "Dans la commande",
    trago: "Verre",
    botella: "Bouteille",
    yourOrder: "Votre commande",
    total: "Total",
    notePlaceholder: "Notes de commande (table, allergies, etc.) — facultatif",
    sendWhatsapp: "📲 Envoyer la commande via WhatsApp",
    clearCart: "Vider la commande",
    emptyCart: "Votre commande est vide.<br>Ajoutez des produits du menu pour commencer.",
    each: "chacun",
    remove: "Retirer",
    confirmClear: "Vider toute la commande ?",
    footNote: "Prix en pesos colombiens (COP) · Consommez avec modération",
    toastAdded: "Ajouté à la commande",
    infoHeader: "Infos",
    infoWhatsapp: "Commandes par WhatsApp en envoyant votre panier",
    infoPrices: "Prix en pesos colombiens (COP)",
    infoCuisine: "Cuisine caraïbe aux touches haïtiennes et nikkei-péruviennes",
    splashLoading: "Chargement du menu…",
    splashSub: "Lounge · Bienvenue",
    statusOpen: "Ouvert maintenant",
    langBtn: "Langue",
    pourEyebrow: "Cocktails d'Auteur",
    pourTitle: "L'art de servir <span>Azul Caribe</span>",
    pourNote: "Découvrez-les sur la carte",
  },
};

// ============ MENSAJES DE WHATSAPP (pedido y reserva) ============
// Se arman en el idioma que el cliente tiene seleccionado en la página
// (currentLang), no siempre en español.
const WA = {
  es: {
    orderHeader: "🌴 *Nuevo pedido — Azul Caribe Lounge* 🌊",
    myOrder: "🧾 *Mi pedido*",
    variantBottle: " (Botella)",
    variantShot: " (Trago)",
    subtotal: "🧮 Subtotal:",
    tip: "🙏 Servicio voluntario (10%):",
    total: "💰 *Total con servicio:",
    tipNote: "_El servicio es voluntario; si prefieres no incluirlo, avísanos._",
    noteLabel: "📝 *Nota:*",
    orderClosing: "🙌 ¡Gracias! Quedo atento/a a la confirmación.",
    reservation: `🌴 ¡Hola! Quiero hacer una reserva en *Azul Caribe Lounge* 🌊

Estos son mis datos:

📋 *1. Datos principales*
👤 Nombre completo (titular de la reserva):
👥 Número de personas:
📅 Fecha y hora deseada:
🎉 Motivo de la celebración: (Cena casual / Aniversario / Reunión de negocios / Despedida de soltero/a / Cumpleaños / Otro)

🎂 *2. Si es un cumpleaños*
🥳 Nombre de quien cumple años:
✨ Preparación especial que me gustaría: (pastel de la casa, decoración temática, brindis sorpresa, etc.)

🍴 *3. Restricciones alimentarias*
❗ Alergias o restricciones de algún asistente: (intolerancias, vegetariano/vegano, sin gluten, sin lactosa… o "Ninguna")

🙌 Quedo atento/a a la confirmación de disponibilidad. ¡Gracias!`,
  },
  en: {
    orderHeader: "🌴 *New order — Azul Caribe Lounge* 🌊",
    myOrder: "🧾 *My order*",
    variantBottle: " (Bottle)",
    variantShot: " (Shot)",
    subtotal: "🧮 Subtotal:",
    tip: "🙏 Voluntary service (10%):",
    total: "💰 *Total with service:",
    tipNote: "_Service is voluntary; let us know if you'd rather not include it._",
    noteLabel: "📝 *Note:*",
    orderClosing: "🙌 Thank you! I'll be waiting for confirmation.",
    reservation: `🌴 Hi! I'd like to make a reservation at *Azul Caribe Lounge* 🌊

Here are my details:

📋 *1. Main details*
👤 Full name (reservation holder):
👥 Number of guests:
📅 Preferred date and time:
🎉 Occasion: (Casual dinner / Anniversary / Business meeting / Bachelor(ette) party / Birthday / Other)

🎂 *2. If it's a birthday*
🥳 Name of the birthday person:
✨ Special touch I'd like: (house cake, themed decoration, surprise toast, etc.)

🍴 *3. Dietary restrictions*
❗ Allergies or restrictions for any guest: (intolerances, vegetarian/vegan, gluten-free, dairy-free… or "None")

🙌 Looking forward to the confirmation. Thank you!`,
  },
  pt: {
    orderHeader: "🌴 *Novo pedido — Azul Caribe Lounge* 🌊",
    myOrder: "🧾 *Meu pedido*",
    variantBottle: " (Garrafa)",
    variantShot: " (Dose)",
    subtotal: "🧮 Subtotal:",
    tip: "🙏 Serviço voluntário (10%):",
    total: "💰 *Total com serviço:",
    tipNote: "_O serviço é voluntário; avise-nos se preferir não incluí-lo._",
    noteLabel: "📝 *Nota:*",
    orderClosing: "🙌 Obrigado! Fico no aguardo da confirmação.",
    reservation: `🌴 Olá! Gostaria de fazer uma reserva no *Azul Caribe Lounge* 🌊

Aqui estão meus dados:

📋 *1. Dados principais*
👤 Nome completo (titular da reserva):
👥 Número de pessoas:
📅 Data e horário desejados:
🎉 Motivo da comemoração: (Jantar casual / Aniversário de casamento / Reunião de negócios / Despedida de solteiro(a) / Aniversário / Outro)

🎂 *2. Se for um aniversário*
🥳 Nome do aniversariante:
✨ Preparação especial que eu gostaria: (bolo da casa, decoração temática, brinde surpresa, etc.)

🍴 *3. Restrições alimentares*
❗ Alergias ou restrições de algum convidado: (intolerâncias, vegetariano/vegano, sem glúten, sem lactose… ou "Nenhuma")

🙌 Fico no aguardo da confirmação de disponibilidade. Obrigado!`,
  },
  fr: {
    orderHeader: "🌴 *Nouvelle commande — Azul Caribe Lounge* 🌊",
    myOrder: "🧾 *Ma commande*",
    variantBottle: " (Bouteille)",
    variantShot: " (Verre)",
    subtotal: "🧮 Sous-total :",
    tip: "🙏 Service volontaire (10 %) :",
    total: "💰 *Total avec service :",
    tipNote: "_Le service est volontaire ; dites-le-nous si vous préférez ne pas l'inclure._",
    noteLabel: "📝 *Note :*",
    orderClosing: "🙌 Merci ! J'attends la confirmation.",
    reservation: `🌴 Bonjour ! Je souhaite réserver une table au *Azul Caribe Lounge* 🌊

Voici mes informations :

📋 *1. Informations principales*
👤 Nom complet (titulaire de la réservation) :
👥 Nombre de personnes :
📅 Date et heure souhaitées :
🎉 Motif de la célébration : (Dîner décontracté / Anniversaire de mariage / Réunion d'affaires / Enterrement de vie de garçon/fille / Anniversaire / Autre)

🎂 *2. S'il s'agit d'un anniversaire*
🥳 Nom de la personne fêtée :
✨ Préparation spéciale souhaitée : (gâteau maison, décoration à thème, toast surprise, etc.)

🍴 *3. Restrictions alimentaires*
❗ Allergies ou restrictions d'un invité : (intolérances, végétarien/végan, sans gluten, sans lactose… ou "Aucune")

🙌 J'attends la confirmation de disponibilité. Merci !`,
  },
};
function wa(key) { return (WA[currentLang] && WA[currentLang][key]) || WA.es[key]; }

// Nombre corto del tag para las etiquetas dentro de tarjetas/modal (sin emoji)

const BADGE_LABELS = {
  es: { favorito: "Favorito", mustTry: "Imperdible", chef: "Selección del Chef", bartender: "Selección del Bartender", nuevo: "Nuevo" },
  en: { favorito: "Favorite", mustTry: "Must Try", chef: "Chef's Pick", bartender: "Bartender's Pick", nuevo: "New" },
  pt: { favorito: "Favorito", mustTry: "Imperdível", chef: "Escolha do Chef", bartender: "Escolha do Bartender", nuevo: "Novo" },
  fr: { favorito: "Favori", mustTry: "Incontournable", chef: "Choix du Chef", bartender: "Choix du Barman", nuevo: "Nouveau" },
};

// ============ IDIOMA ACTUAL ============
let currentLang = localStorage.getItem("azulcaribe_lang") || "es";
if (!UI[currentLang]) currentLang = "es";

function t(key) { return UI[currentLang][key]; }
function setLang(lang) {
  if (!UI[lang]) return;
  currentLang = lang;
  localStorage.setItem("azulcaribe_lang", lang);
  document.documentElement.lang = lang;
}
