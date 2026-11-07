/* ============================================================
   app.js — UI wiring: nav drawer, product grid, filters,
   product modal, cart drawer, checkout & WhatsApp ordering
   ============================================================ */

/* ---------- Configuration ---------- */
const CONFIG = {
  WHATSAPP_NUMBER: "60123456789", // <-- replace with your WhatsApp number
  RESTAURANT_NAME: "BURGERKU",
  DELIVERY_ADDRESS: "Jalan Kenanga 12, Taman Pelangi, 81700 Johor Bahru",
  MAPS_URL: "https://maps.google.com/?q=Johor+Bahru"
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const money = (n) => `RM${n.toFixed(2)}`;

/* ---------- Mobile nav drawer ---------- */
function initNavDrawer() {
  const drawer = $("#navDrawer");
  const overlay = $("#navOverlay");
  const openBtn = $("#navOpen");
  const closeBtn = $("#navClose");

  const open = () => {
    drawer.classList.add("is-open");
    overlay.classList.add("is-open");
    document.body.classList.add("no-scroll");
    openBtn.setAttribute("aria-expanded", "true");
    closeBtn.focus();
  };
  const close = () => {
    const wasOpen = drawer.classList.contains("is-open");
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    openBtn.setAttribute("aria-expanded", "false");
    if (wasOpen) openBtn.focus();
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) close();
  });

  // Close drawer when a nav link is clicked
  $$(".nav-link").forEach(link =>
    link.addEventListener("click", close)
  );
  // "Order Now" inside the drawer: close nav, then cart opens (handled by initCartDrawer)
  $$("#navDrawer .js-open-cart").forEach(btn =>
    btn.addEventListener("click", close)
  );
}

/* ---------- Cart drawer ---------- */
function initCartDrawer() {
  const drawer = $("#cartDrawer");
  const overlay = $("#cartOverlay");
  const openBtn = $("#cartOpen");
  const closeBtn = $("#cartClose");
  const checkoutBtn = $("#checkoutBtn");

  const open = () => {
    Cart.render?.();
    drawer.classList.add("is-open");
    overlay.classList.add("is-open");
    document.body.classList.add("no-scroll");
  };
  const close = () => {
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) close();
  });

  checkoutBtn.addEventListener("click", () => {
    if (Cart.count() === 0) return;
    close();
    openCheckout();
  });

  // "Order Now" buttons also open the cart
  $$(".js-open-cart").forEach(btn => btn.addEventListener("click", open));
  $("#floatingOrderBtn")?.addEventListener("click", open);
}

/* ---------- Product grid + filters ---------- */
let activeCategory = "all";

function productCard(p) {
  return `
    <article class="product-card" data-id="${p.id}" tabindex="0" role="button"
             aria-label="View ${p.name}">
      <div class="product-card__media">
        ${foodArt(p.art)}
        ${p.bestseller ? '<span class="badge badge--bestseller">BEST SELLER</span>' : ""}
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__desc">${p.description}</p>
        <div class="product-card__meta">
          <span class="rating" aria-label="Rated ${p.rating} out of 5">★ ${p.rating.toFixed(1)}</span>
          <span class="product-card__price">${money(p.price)}</span>
        </div>
        <button type="button" class="btn btn--primary btn--add js-add-cart"
                data-id="${p.id}" aria-label="Add ${p.name} to cart">
          + Add to Cart
        </button>
      </div>
    </article>`;
}

function renderProducts(filter = activeCategory) {
  const grid = $("#productGrid");
  const list = PRODUCTS.filter(p => filter === "all" || p.category === filter);
  grid.innerHTML = list.map(productCard).join("");
  grid.classList.remove("is-filtering");
  void grid.offsetWidth; // restart transition
  grid.classList.add("is-filtering");
}

function initFilters() {
  const chips = $$(".filter-chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => {
        c.classList.remove("is-active");
        c.setAttribute("aria-pressed", "false");
      });
      chip.classList.add("is-active");
      chip.setAttribute("aria-pressed", "true");
      activeCategory = chip.dataset.filter;
      renderProducts(activeCategory);
    });
  });
}

/* ---------- Product detail modal ---------- */
let modalProduct = null;
let modalQty = 1;
let modalAddons = new Set();

function openProductModal(id) {
  modalProduct = PRODUCTS.find(p => p.id === id);
  if (!modalProduct) return;
  modalQty = 1;
  modalAddons = new Set();

  $("#modalArt").innerHTML = foodArt(modalProduct.art);
  $("#modalName").textContent = modalProduct.name;
  $("#modalDesc").textContent = modalProduct.description;
  $("#modalRating").textContent = `★ ${modalProduct.rating.toFixed(1)}`;
  $("#modalPrice").textContent = money(modalProduct.price);
  $("#modalQty").textContent = "1";
  $("#modalInstructions").value = "";

  renderAddons();
  updateModalTotal();
  $("#productModal").classList.add("is-open");
  document.body.classList.add("no-scroll");
}

function closeProductModal() {
  $("#productModal").classList.remove("is-open");
  document.body.classList.remove("no-scroll");
  modalProduct = null;
}

function renderAddons() {
  const wrap = $("#modalAddons");
  wrap.innerHTML = ADDONS.map(a => `
    <label class="addon">
      <input type="checkbox" data-addon="${a.id}" ${modalAddons.has(a.id) ? "checked" : ""}>
      <span>${a.label} <em>+${money(a.price)}</em></span>
    </label>`).join("");
}

function selectedAddons() {
  return ADDONS.filter(a => modalAddons.has(a.id));
}

function updateModalTotal() {
  if (!modalProduct) return;
  const addonsCost = selectedAddons().reduce((s, a) => s + a.price, 0);
  $("#modalTotal").textContent = money((modalProduct.price + addonsCost) * modalQty);
}

function initProductModal() {
  const modal = $("#productModal");

  // Card clicks (delegated) on both product grids — open modal or quick-add
  const handleGridClick = (e) => {
    const addBtn = e.target.closest(".js-add-cart");
    if (addBtn) {
      e.stopPropagation();
      const product = PRODUCTS.find(p => p.id == addBtn.dataset.id);
      Cart.add(product.id, 1);
      toast(`${product.name} added to cart`);
      return;
    }
    const card = e.target.closest(".product-card");
    if (card) openProductModal(parseInt(card.dataset.id, 10));
  };
  const handleGridKey = (e) => {
    if (e.key === "Enter" && e.target.classList.contains("product-card")) {
      openProductModal(parseInt(e.target.dataset.id, 10));
    }
  };
  ["#productGrid", "#bestSellerGrid"].forEach(sel => {
    const grid = $(sel);
    grid.addEventListener("click", handleGridClick);
    grid.addEventListener("keydown", handleGridKey);
  });

  $("#modalClose").addEventListener("click", closeProductModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("modal__backdrop")) closeProductModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeProductModal();
  });

  $("#modalQtyDec").addEventListener("click", () => {
    modalQty = Math.max(1, modalQty - 1);
    $("#modalQty").textContent = modalQty;
    updateModalTotal();
  });
  $("#modalQtyInc").addEventListener("click", () => {
    modalQty += 1;
    $("#modalQty").textContent = modalQty;
    updateModalTotal();
  });

  $("#modalAddons").addEventListener("change", (e) => {
    const id = e.target.dataset.addon;
    if (e.target.checked) modalAddons.add(id);
    else modalAddons.delete(id);
    updateModalTotal();
  });

  $("#modalAddToCart").addEventListener("click", () => {
    Cart.add(modalProduct.id, modalQty, selectedAddons(), $("#modalInstructions").value.trim());
    closeProductModal();
    toast(`${modalProduct.name} added to cart`);
  });
}

/* ---------- Checkout / order ---------- */
function openCheckout() {
  $("#checkoutModal").classList.add("is-open");
  document.body.classList.add("no-scroll");
  renderCheckoutSummary();
}

function closeCheckout() {
  $("#checkoutModal").classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

function renderCheckoutSummary() {
  $("#checkoutItems").innerHTML = Cart.summaryLines()
    .split("\n")
    .filter(Boolean)
    .map(l => `<li>${l}</li>`).join("");
  $("#checkoutSubtotal").textContent = money(Cart.subtotal());
  $("#checkoutDelivery").textContent = Cart.deliveryFee() === 0 ? "FREE" : money(Cart.deliveryFee());
  $("#checkoutTotal").textContent = money(Cart.total());
}

function buildWhatsAppMessage(form) {
  const fd = new FormData(form);
  const name = fd.get("name") || "Customer";
  const phone = fd.get("phone") || "-";
  const address = fd.get("address") || "-";
  const notes = fd.get("notes") || "-";
  const payment = fd.get("payment") || "Cash";

  return [
    `*NEW ORDER — ${CONFIG.RESTAURANT_NAME}*`,
    ``,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Payment: ${payment}`,
    ``,
    `*Items:*`,
    Cart.summaryLines(),
    ``,
    `Subtotal: ${money(Cart.subtotal())}`,
    `Delivery: ${Cart.deliveryFee() === 0 ? "FREE" : money(Cart.deliveryFee())}`,
    `*Total: ${money(Cart.total())}*`,
    ``,
    `Address: ${address}`,
    notes !== "-" ? `Notes: ${notes}` : ""
  ].filter(l => l !== undefined).join("\n");
}

function initCheckout() {
  const modal = $("#checkoutModal");
  $("#checkoutClose").addEventListener("click", closeCheckout);
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("modal__backdrop")) closeCheckout();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeCheckout();
  });

  // Payment method pills
  $$("input[name='payment']").forEach(radio => {
    radio.addEventListener("change", () => {
      $$(".pay-pill").forEach(p => p.classList.remove("is-selected"));
      radio.closest(".pay-pill").classList.add("is-selected");
    });
  });

  $("#orderFormEl").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.reportValidity()) return;

    const btn = $("#placeOrderBtn");
    btn.disabled = true;
    btn.textContent = "Sending…";

    const msg = encodeURIComponent(buildWhatsAppMessage(form));
    const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${msg}`;

    // Show success state briefly, then open WhatsApp
    $("#orderSuccess").classList.remove("hidden");
    form.classList.add("hidden");
    setTimeout(() => {
      window.open(url, "_blank", "noopener");
      Cart.clear();
      closeCheckout();
      form.reset();
      $$(".pay-pill").forEach(p =>
        p.classList.toggle("is-selected", p.querySelector("input").checked));
      form.classList.remove("hidden");
      $("#orderSuccess").classList.add("hidden");
      btn.disabled = false;
      btn.textContent = "Place Order";
    }, 1200);
  });
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2200);
}

/* ---------- Promo claim ---------- */
function initPromo() {
  $("#claimPromoBtn")?.addEventListener("click", () => {
    Cart.add(6, 1); // Signature Deluxe as promo placeholder
    toast("Promo added! Signature Deluxe Burger in your cart.");
  });
}

/* ---------- Decorative art ---------- */
function initArt() {
  $("#heroArt").innerHTML =
    `<div class="hero-burger">${foodArt("signature")}<span class="hero-burger__shine" aria-hidden="true"></span></div>`;
  $("#promoArt").innerHTML = foodArt("combo");
  $("#aboutArt").innerHTML = foodArt("bbq");
}

/* ---------- Hero burger tilt (wow factor) ---------- */
function initHeroTilt() {
  const art = $("#heroArt");
  const burger = art?.querySelector(".hero-burger");
  if (!burger || !window.matchMedia("(pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  art.addEventListener("mousemove", (e) => {
    const r = burger.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    burger.style.transform =
      `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
  });
  art.addEventListener("mouseleave", () => {
    burger.style.transform = "";
  });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const targets = $$(
    ".section__head, .product-card, .feature-card, .testimonial, .contact-card, .promo, .about"
  );
  targets.forEach(el => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add("is-visible");
        const cleanup = () => el.classList.remove("reveal", "is-visible");
        el.addEventListener("transitionend", cleanup, { once: true });
        setTimeout(cleanup, 1000); // fallback if transitionend never fires
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(el => io.observe(el));
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initArt();
  initNavDrawer();
  initCartDrawer();
  initFilters();
  initProductModal();
  initCheckout();
  initPromo();
  renderProducts();
  $("#bestSellerGrid").innerHTML =
    PRODUCTS.filter(p => p.bestseller).map(productCard).join("");
  Cart.render();
  initHeroTilt();
  initScrollReveal();
});
