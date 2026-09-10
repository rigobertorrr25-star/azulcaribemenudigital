AZUL CARIBE LOUNGE — MENÚ DIGITAL (v15)
=======================================

QUÉ CAMBIÓ EN v15
-------------------
- La sección "El arte de servir Azul Caribe" ya NO usa un video. Ahora es
  un vaso de mojito dibujado en SVG que se llena y se vacía siguiendo el
  scroll (bidireccional): al bajar se llena de 0% a 100%, al subir se
  vacía. No se bloquea el scroll en ningún momento — la página se
  desplaza con total normalidad y el nivel del líquido se calcula a
  partir de la posición del scroll (ver initPourScene en app.js).
- El líquido cambia de translúcido claro a verde mojito vibrante, y a
  medida que sube van apareciendo hielos, hojas de hierbabuena, una
  rodaja de lima en el borde y burbujas.
- Se eliminaron los archivos que ya no se usan: videos/mojito-pour.*,
  images/pour-empty.jpg, images/pour-full.jpg.
- Se agregaron dos números de WhatsApp separados: pedidos y reservas
  (ver "LOS NÚMEROS DE WHATSAPP" más abajo), un botón "Reservar" en la
  portada, servicio voluntario del 10% en el mensaje de pedido, y
  cache-busting (?v=) + etiquetas no-cache en index.html.

QUÉ CAMBIÓ EN v14
-------------------
- Corregido: al estar en la pestaña "Todo" y hacer scroll manualmente
  por el menú, ahora la pestaña activa de la barra de categorías
  (Desayuno, Aperitivos, Café, Bebidas, Platos, Carnes, Sides, Bar…)
  va cambiando sola para reflejar la sección que se está viendo en ese
  momento — igual que en apps de menú tipo Rappi/Maido. Antes la
  pestaña se quedaba fija en "Todo" sin importar qué tan abajo se
  hiciera scroll.
- Esto es solo un resaltado visual: si tocas directamente una
  categoría (o buscas algo), el menú se sigue filtrando exactamente
  igual que antes; el carrito y el resto del menú no se ven afectados.

QUÉ CAMBIÓ EN v13
-------------------
- Se eliminó el botón "Saltar" de la escena del video de bienvenida
  (la que se reproduce al llegar a "El arte de servir Azul Caribe").
  La escena sigue funcionando exactamente igual: se libera el scroll
  sola en cuanto el video termina (o de inmediato si el video no
  carga), solo que ya no aparece ningún botón sobre el video.

QUÉ CAMBIÓ EN v12
-------------------
- "Coctelería de autor" ya no va mezclado en la misma línea de texto
  gris que "Cocina caribeña · Cartagena de Indias, Colombia" (donde se
  perdía). Ahora aparece arriba del nombre del lugar como una etiqueta
  ("eyebrow") propia: un badge dorado con borde, en mayúsculas y bien
  separado, que resalta claramente sobre cualquier fondo. Funciona en
  los tres idiomas (ES: "Coctelería de autor", EN: "Craft Cocktails",
  PT: "Coquetelaria Autoral").

QUÉ CAMBIÓ EN v11
-------------------
- Corregido lo importante: ahora, al tocar la FOTO de una botella,
  pasan las DOS cosas a la vez, igual que con cualquier otro producto
  del menú: (1) se abre la ficha ampliada del producto con el botón de
  "Agregar al pedido" (antes esto NO pasaba al tocar la foto — solo se
  reproducía el video y ahí quedaba, había que tocar el nombre o la
  descripción para abrir la ficha), y (2) se reproduce el video del
  destape sobre la miniatura. Ahora las botellas con animación se
  comportan exactamente igual que el resto de productos del menú, con
  el video como plus — esto es lo que en v10 quedó pendiente.
- Video de Smirnoff Ice Manzana Verde REEMPLAZADO por uno nuevo, mucho
  más dramático: se ve la tapa saltar claramente, con una nube visible
  de vapor/niebla fría y gotas de agua — ya no es un movimiento sutil.

QUÉ CAMBIÓ EN v10
-------------------
- Corregido: al tocar la foto de una botella, ahora toda la tarjeta se
  AGRANDA visiblemente mientras se reproduce el video del destape (mismo
  efecto de zoom que antes solo pasaba al pasar el mouse por encima en
  computador) — así el destape se nota claramente en cualquier
  dispositivo, incluido el celular.
- Revisado el caso de Smirnoff Ice Manzana Verde: el video sí se estaba
  reproduciendo, pero su movimiento (la tapa se afloja/levanta un poco)
  es más sutil que el de una cerveza con tapa corona clásica — con el
  nuevo efecto de zoom debería notarse bien. Si sigues viendo que "no
  pasa nada" en esa botella específica, avísame y genero un video nuevo
  con un destape más dramático para ese producto.

QUÉ CAMBIÓ EN v9
-------------------
- Se reemplazó el efecto de "destapar" (que en v8 era una animación de
  CSS/JS con botón) por VIDEOS REALES generados con Higgsfield, uno por
  cada botella: se ve la tapa destaparse de verdad, no una simulación.
- Ya NO hay ningún botón sobre la foto. Ahora se toca directamente la
  FOTO del producto y ahí mismo se reproduce el video del destape
  (silencioso, sin sonido). Al terminar (dura ~2 segundos), vuelve solo
  a la foto normal, lista para volver a tocarse las veces que quieras.
- (Actualizado en v11: al tocar la foto ahora también se abre la ficha
  del producto, además de reproducirse el video — ver arriba.)
- Aplica a las mismas 14 botellas de siempre: Águila Original, Águila
  Light, Club Colombia Dorada, Corona, Stella Artois, Modelo Especial,
  Smirnoff Ice, y los 7 licores (Ron Viejo de Caldas, Buchanan's DeLuxe
  12, Grand Old Parr 12, Johnnie Walker Black Label, Buchanan's Master,
  Tanqueray, Aguardiente Amarillo de Manzanares). No se aplica a
  cócteles, vino por copa, sangría, Refajo ni Michelada (se sirven en
  vaso, no tienen tapa).
- Cada video pesa muy poco (60–280 KB en formato WebM, con respaldo en
  MP4 para navegadores que no soporten WebM) y solo se carga la primera
  vez que se toca esa botella — no afecta la velocidad de carga del
  menú.

QUÉ CAMBIÓ EN v8
-------------------
- (Versión anterior, reemplazada en v9): efecto interactivo de "destapar"
  100% CSS/JS con un botón dorado sobre la foto — no usaba video real.

QUÉ CAMBIÓ EN v7
-------------------
- Se eliminaron por completo los filtros "Vegetariano" y "Sin Alcohol"
  (el botón de embudo/filtros y la fila de chips ya no aparecen en el
  encabezado del menú).
- Corregido: en las tarjetas de bebidas ya no aparece la etiqueta
  "Sin Alcohol" ni "Vegetariano" (esas etiquetas venían del mismo sistema
  de filtros y se quitaron de todos los productos).

QUÉ CAMBIÓ EN v6
-------------------
- Se reemplazó la sección de Cerveza, Vino y Licores con los productos
  REALES de la carpeta que enviaste ("PRODUCTOR SOLICITADOS"), usando la
  foto de cada botella/lata como base y el mismo estilo de tarjeta del
  resto del menú (fondo claro uniforme, misma tipografía y tamaño).
- Cada producto ahora es una tarjeta individual (antes eran grupos
  genéricos tipo "Cerveza Nacional" o "Whisky 12 Años" que mezclaban
  varias marcas en un solo ítem). Quedaron así:
    Cerveza (9): Águila Original, Águila Light, Club Colombia Dorada,
      Corona, Stella Artois, Modelo Especial, Smirnoff Ice Manzana Verde,
      Refajo, Michelada Colombiana.
    Vino (6): Vino por Copa, Sangría (Jarra), Finca Las Moras Chardonnay,
      Finca Las Moras Cabernet Sauvignon, Rosaleda Cabernet Sauvignon,
      Rosaleda Sauvignon Blanc.
    Licores (7): Ron Viejo de Caldas Añejo 3 Años, Buchanan's DeLuxe 12
      Años, Grand Old Parr 12 Años, Johnnie Walker Black Label,
      Buchanan's Master, Tanqueray London Dry Gin, Aguardiente Amarillo
      de Manzanares.
- IMPORTANTE — siguiendo tu instrucción de dejar solo lo que está en la
  carpeta, estas marcas/categorías genéricas que estaban antes en el menú
  SE ELIMINARON por no tener foto en la carpeta: Poker, Heineken, Chivas
  Regal 12 Años, Absolut, Tito's, Bombay Sapphire, Hendrick's, Aguardiente
  Antioqueño, Néctar, Whisky Buchanan's 18 Años. TEN EN CUENTA: el VODKA
  SOLO (para tomar derecho o en botella) quedó totalmente fuera del menú,
  porque la carpeta no incluía ninguna foto de vodka — el Smirnoff que sí
  llegó es un "Ice" (vodka ya mezclado, listo para tomar), no vodka solo.
  Si quieres que el vodka vuelva a la carta, avísame la marca y precio.
- PRECIOS A CONFIRMAR: para los productos que no tenían un precio previo
  en tu carta, puse un estimado razonable según el tipo de producto y
  precios de mercado en Colombia — revísalos y ajústalos en "data.js" si
  no son los correctos:
    Smirnoff Ice Manzana Verde: $19.000 (estimado)
    Finca Las Moras Chardonnay / Cabernet Sauvignon: $95.000 c/u (estimado, precio por botella)
    Rosaleda Cabernet Sauvignon / Sauvignon Blanc: $70.000 c/u (estimado, precio por botella)
  El resto de licores/cervezas usó el precio que ya tenías en la carta
  para esa misma marca cuando existía, o un precio de mercado equivalente.
- Se investigaron y redactaron descripciones cortas para cada producto
  nuevo (origen, año de la marca, tipo de bebida), en los 3 idiomas.
- Se borraron las 9 fotos genéricas que ya no se usan (whisky-12,
  whisky-18, ron, vodka-ginebra, cerveza-nacional, cerveza-importada,
  club-colombia, modelo, aguardiente) y se agregaron 18 fotos nuevas
  procesadas a partir de tus imágenes (recortadas y ajustadas a fondo
  claro uniforme, mismo tamaño 480x480 que el resto del menú).

QUÉ CAMBIÓ EN v5
-------------------
- La ubicación en el encabezado ahora dice "Cartagena de Indias, Colombia"
  (antes decía Manizales), en los 3 idiomas.
- Se eliminó el filtro/etiqueta "Picante" (ya no aparece en los filtros ni
  en las tarjetas de ningún producto).
- La bebida "Gaseosas y Agua" ahora se llama simplemente "Gaseosa" (el agua
  ya tiene su propia tarjeta aparte: "Agua Natural / con Gas").
- Corregido: la "Coctelería Clásica Premium" (categoría Bar) ya no dice
  "Selección del Chef" — ahora dice "Selección del Bartender". Se agregó
  un badge nuevo ("bartender") para usar en cócteles y bebidas de barra,
  separado del badge "chef" que sigue usándose para platos de cocina.
- Pendiente: agregar más licores a la carta — quedamos en que envías la
  carpeta con los licores nuevos (marcas y precios) para incorporarlos.

QUÉ CAMBIÓ EN v4
-------------------
- Nueva sección "El arte de servir Azul Caribe" justo debajo de la portada:
  un video en pantalla completa donde el vaso del Mojito se va llenando
  progresivamente, generado con Higgsfield a partir de tus dos fotos
  (vaso vacío -> vaso servido).
- SCROLL BLOQUEADO mientras se llena: cuando el visitante llega a esa
  sección, el scroll se congela, el video se reproduce a alta velocidad
  (llenado rápido e impactante) y, apenas termina, el scroll se libera
  solo para seguir navegando el menú con total normalidad.
- Mientras el vaso se llena, aparecen animadas (con fade + slide,
  escalonadas una tras otra) 3 tarjetas de cócteles destacados de tu
  carta — puedes tocarlas para abrir su ficha completa igual que en el
  resto del menú.
- Botón "Saltar ▸" discreto en la esquina para quien no quiera esperar la
  animación, y una barra de progreso dorada abajo que muestra cuánto falta.
- Salvaguarda automática: si el video tarda o no carga por cualquier
  motivo, el scroll se libera solo igual — nunca se queda "atrapado".
- Totalmente traducido (ES/EN/PT) y responsivo (desktop y celular).
- Mantiene exactamente la misma paleta navy/dorado, tipografía y estilo
  del resto del sitio.

(v15) Esta sección ahora es un vaso SVG guiado por el scroll — ver la nota
de v15 arriba. Para ajustarla: el largo del recorrido de llenado está en
".pour-scroll { height: 240vh }" (styles.css) y los umbrales en que
aparecen hielos/hierbabuena/lima son los atributos "data-at" del SVG en
index.html. La lógica vive en initPourScene() de app.js.

QUÉ CAMBIÓ EN v3
-------------------
- La barra de categorías (Todo, Destacados, Desayuno... Bar & Coctelería)
  ahora se desliza claramente: con el dedo en celular, arrastrando con el
  mouse en computador, o con la rueda del mouse/trackpad. Además tiene un
  degradado en los bordes y una barrita dorada visible que avisan que hay
  más categorías hacia ese lado — así "Bar" ya no se queda escondido.
- El menú ahora es TRILINGÜE: Español, English y Português. El botón con
  el ícono de globo (🌐) arriba a la derecha de la portada abre el
  selector de idioma. Traduce categorías, nombres y descripciones de
  cada producto, filtros, badges, carrito, modal, botones, etc. El
  idioma elegido se recuerda en el navegador del cliente.
  NOTA: el mensaje que se envía por WhatsApp queda siempre en español
  (para que el personal del lounge lo lea sin problema), sin importar el
  idioma que esté usando el cliente en pantalla. Si prefieres que
  también cambie de idioma, es un ajuste sencillo en app.js
  (función buildWhatsappMessage).

QUÉ CAMBIÓ EN v2
-------------------
- Nueva estructura de navegación inspirada en plataformas de pedido tipo
  Ola Click (portada + avatar circular + botón "Información", barra
  sticky de categorías, sección "Destacados" en carrusel), manteniendo
  siempre los colores navy/dorado y el logo de Azul Caribe.
- Los productos ahora se muestran en un GRID de TARJETAS (imagen, nombre,
  precio, descripción corta) en vez del acordeón anterior.
- Efecto hover/click: las tarjetas se agrandan (zoom suave) al pasar el
  cursor o tocarlas.
- Al hacer clic en una tarjeta se abre un MODAL con foto en grande,
  nombre, precio, descripción completa, etiquetas y el botón para
  agregar al pedido (con selector de trago/botella cuando aplica).
- CORREGIDO: el filtro "Sin Alcohol" ahora muestra únicamente bebidas
  (café y bebidas sin alcohol). Antes también mostraba platos de comida
  porque el tag "sinAlcohol" estaba puesto en casi todos los platos (que,
  aunque no llevan alcohol, no son "bebidas sin alcohol"). Ese tag se
  quitó de todos los platos de comida y quedó solo en las bebidas reales.
- Se agregó el producto "Camarones al Curry con Arroz de Coco" ($42.000)
  que aparecía en tu PDF de nombres y precios pero no estaba en el menú
  digital anterior. Por ahora usa una foto reutilizada de otro plato de
  camarones — reemplázala por la foto real cuando la tengas (ver abajo).

QUÉ INCLUYE ESTA CARPETA
-------------------------
- index.html   -> la página del menú
- styles.css   -> estilos (colores, tipografía, tema Caribe)
- i18n.js      -> textos de interfaz y traducciones (ES/EN/PT) — edítalo para ajustar cualquier texto fijo
- data.js      -> TODOS los productos, precios y descripciones en los 3 idiomas (edítalo aquí para actualizar el menú)
- app.js       -> la lógica (idioma, buscador, filtros, grid, modal de producto, carrito, WhatsApp, vaso de mojito guiado por scroll)
- images/      -> las fotos de productos + el logo
- videos/      -> videos de "destape" de las botellas (uncork-*.webm/mp4)

CÓMO PUBLICARLO EN INTERNET (gratis, sin programar)
-----------------------------------------------------
Opción más fácil — Netlify Drop:
1. Entra a https://app.netlify.com/drop
2. Arrastra esta carpeta completa (azul-caribe-menu) a la página.
3. Netlify te da un link público al instante (ej: azul-caribe-menu.netlify.app).
4. Genera un código QR de ese link (con cualquier generador de QR gratuito) e imprímelo para las mesas.

Otras opciones válidas: GitHub Pages, Vercel, o subirlo por FTP a cualquier hosting.
IMPORTANTE: sube la carpeta "images" junto con los archivos, todos al mismo nivel.

LOS NÚMEROS DE WHATSAPP YA ESTÁN CONFIGURADOS
--------------------------------------------
En "app.js", al inicio hay dos números (código de país + número, sin espacios ni +):
    const WHATSAPP_ORDER_NUMBER = "573213296814";       // pedidos (botón carrito)
    const WHATSAPP_RESERVATION_NUMBER = "573103670548"; // reservas (botón Reservar)
Si cambian, edítalos ahí.

CÓMO ACTUALIZAR PRECIOS O PRODUCTOS
--------------------------------------
Todo el contenido del menú vive en "data.js". Cada producto es un bloque así:

  { id:"p7", cat:"platos",
    nombre:{ es:"Camarones al Ajillo", en:"Garlic Shrimp", pt:"Camarão ao Alho" },
    desc:{ es:"Salteados en mantequilla, ajo y finas hierbas.",
           en:"Sautéed in butter, garlic, and fine herbs.",
           pt:"Salteados na manteiga, alho e ervas finas." },
    precio:42000, img:"plato-camarones-ajillo", tags:[] },

- "nombre" y "desc" son objetos con las 3 traducciones (es/en/pt). Para
  cambiar solo el texto en español, edita únicamente lo que está dentro
  de las comillas después de "es:" — no toques "en:" ni "pt:" a menos
  que también quieras cambiar esos idiomas.
- "precio" es el valor en pesos (solo el número, sin puntos).
- "img" es el nombre del archivo de foto dentro de la carpeta images/ (sin ".jpg").
- "badge" (opcional) es una clave que se traduce sola: "favorito",
  "mustTry", "chef" (para platos de cocina), "bartender" (para cócteles
  y bebidas de barra) o "nuevo". Un producto con badge aparece además en
  el carrusel "Destacados".
- "tags" controla los filtros: "veg" (vegetariano), "sinAlcohol" (SOLO
  para bebidas reales sin alcohol — café y bebidas).
  No agregues "sinAlcohol" a platos de comida aunque no lleven alcohol.
- Para productos con precio por trago y por botella se usa "precio" (trago) y
  "precioBotella" (botella), como en Ron, Whisky, Vodka y Aguardiente.
- Para agregar un producto nuevo desde cero, copia un bloque parecido y
  cambia el "id" por uno que no exista todavía.

CÓMO AGREGAR UN CUARTO IDIOMA (ej. francés)
-----------------------------------------------
1. En "i18n.js", agrega su código a LANGS y copia un bloque de UI/
   FILTER_LABELS/TAG_SHORT/BADGE_LABELS traducido.
2. En "data.js", agrega esa clave (ej. "fr") a cada "nombre" y "desc",
   y a CATEGORIES / BAR_SUBS.
Si no agregas la traducción de un producto, el sitio muestra automáticamente
el texto en español como respaldo (no se rompe nada).

FOTO PENDIENTE
------------------
"Camarones al Curry con Arroz de Coco" usa temporalmente la foto de
"Arroz con Camarón" (carnes-arroz-camaron.jpg). Cuando tengas la foto real
del plato, guárdala en la carpeta images/ (por ejemplo como
"carnes-camarones-curry.jpg") y cambia esa línea en data.js:
    img:"carnes-arroz-camaron"  →  img:"carnes-camarones-curry"

INFORMACIÓN DEL LOUNGE (botón "Información")
-----------------------------------------------
El botón "Información" del encabezado abre un panel con datos básicos.
Si quieres agregar dirección, horarios de atención o redes sociales,
edítalo directamente en "index.html" dentro de la sección
<div id="info-modal">.

FUNCIONES INCLUIDAS
----------------------
- Menú en 3 idiomas (Español / English / Português) con selector persistente.
- Barra de categorías deslizable (touch, arrastre con mouse, o rueda) con
  degradado y scrollbar visibles como guía.
- Buscador de productos por nombre o descripción (busca en los 3 idiomas).
- Filtros: Vegetariano / Sin Alcohol.
- Navegación por categorías + sección "Destacados".
- Tarjetas de producto con zoom al pasar el cursor o tocar, y modal de
  vista ampliada al hacer clic.
- Carrito de pedido con cantidades, que se guarda en el navegador del
  cliente aunque cierre la página (hasta que la envíe o la vacíe).
- Botón para enviar el pedido armado directamente por WhatsApp al número del lounge.
- Funciona igual de bien en celular (QR en la mesa) que en una tablet del local.
- Sección "El arte de servir" con video del cóctel llenándose (Higgsfield),
  scroll bloqueado durante la animación y tarjetas de cócteles destacados
  con entrada animada.

SI ALGO NO SE VE BIEN
------------------------
Asegúrate de abrir "index.html" desde un servidor (Netlify, GitHub Pages, etc.),
no haciendo doble clic directo en el archivo — algunos navegadores bloquean la
carga de imágenes y datos locales (protocolo file://) por seguridad.
