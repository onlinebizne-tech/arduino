/* ============================================================
   cart.js — shopping cart state, persistence & rendering
   ============================================================ */

const Cart = (() => {
  const STORAGE_KEY = "burger_cart_v1";
  const DELIVERY_FEE = 5.00;
  const FREE_DELIVERY_MIN = 30.00;

  let items = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function findItem(productId, addonsKey) {
    return items.find(i => i.productId === productId && i.addonsKey === addonsKey);
  }

  function add(productId, qty = 1, addons = [], instructions = "") {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const addonsKey = addons.map(a => a.id).sort().join("+");
    const existing = findItem(productId, addonsKey);
    if (existing) {
      existing.qty += qty;
      if (instructions) existing.instructions = instructions;
    } else {
      const addonsCost = addons.reduce((s, a) => s + a.price, 0);
      items.push({
        productId,
        name: product.name,
        art: product.art,
        unitPrice: product.price + addonsCost,
        qty,
        addons: addons.map(a => a.label),
        addonsKey,
        instructions
      });
    }
    save();
    render();
  }

  function setQty(index, qty) {
    if (qty <= 0) {
      items.splice(index, 1);
    } else {
      items[index].qty = qty;
    }
    save();
    render();
  }

  function remove(index) {
    items.splice(index, 1);
    save();
    render();
  }

  function clear() {
    items = [];
    save();
    render();
  }

  function count() {
    return items.reduce((s, i) => s + i.qty, 0);
  }

  function subtotal() {
    return items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  }

  function deliveryFee() {
    return items.length === 0 || subtotal() >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
  }

  function total() {
    return subtotal() + deliveryFee();
  }

  function summaryLines() {
    return items.map(i =>
      `• ${i.qty}x ${i.name}${i.addons.length ? " (" + i.addons.join(", ") + ")" : ""} — RM${(i.unitPrice * i.qty).toFixed(2)}`
    ).join("\n");
  }

  /* ---------- DOM rendering ---------- */

  const money = n => `RM${n.toFixed(2)}`;

  function render() {
    const badge = document.getElementById("cartCount");
    if (badge) {
      badge.textContent = count();
      badge.classList.toggle("hidden", count() === 0);
    }
    renderCartPanel();
  }

  function renderCartPanel() {
    const list = document.getElementById("cartItems");
    const empty = document.getElementById("cartEmpty");
    const footer = document.getElementById("cartFooter");
    if (!list) return;

    if (items.length === 0) {
      list.innerHTML = "";
      empty?.classList.remove("hidden");
      footer?.classList.add("hidden");
      return;
    }
    empty?.classList.add("hidden");
    footer?.classList.remove("hidden");

    list.innerHTML = items.map((item, idx) => `
      <li class="cart-item">
        <div class="cart-item__art">${foodArt(item.art)}</div>
        <div class="cart-item__info">
          <p class="cart-item__name">${item.name}</p>
          ${item.addons.length ? `<p class="cart-item__addons">+ ${item.addons.join(", ")}</p>` : ""}
          ${item.instructions ? `<p class="cart-item__note">Note: ${item.instructions}</p>` : ""}
          <p class="cart-item__price">${money(item.unitPrice)}</p>
        </div>
        <div class="cart-item__qty">
          <button type="button" class="qty-btn" data-action="dec" data-index="${idx}" aria-label="Decrease quantity">−</button>
          <span class="qty-value">${item.qty}</span>
          <button type="button" class="qty-btn" data-action="inc" data-index="${idx}" aria-label="Increase quantity">+</button>
        </div>
        <button type="button" class="cart-item__remove" data-action="remove" data-index="${idx}" aria-label="Remove ${item.name}">×</button>
      </li>`).join("");

    document.getElementById("cartSubtotal").textContent = money(subtotal());
    const fee = deliveryFee();
    document.getElementById("cartDelivery").textContent =
      fee === 0 ? "FREE" : money(fee);
    document.getElementById("cartTotal").textContent = money(total());

    const hint = document.getElementById("freeDeliveryHint");
    if (hint) {
      const remaining = FREE_DELIVERY_MIN - subtotal();
      hint.textContent = remaining > 0
        ? `Add ${money(remaining)} more for FREE delivery`
        : "You unlocked FREE delivery!";
      hint.classList.toggle("hint--done", remaining <= 0);
    }
  }

  // Delegate clicks inside the cart list
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn || !btn.closest("#cartItems")) return;
    const idx = parseInt(btn.dataset.index, 10);
    if (btn.dataset.action === "inc") setQty(idx, items[idx].qty + 1);
    else if (btn.dataset.action === "dec") setQty(idx, items[idx].qty - 1);
    else if (btn.dataset.action === "remove") remove(idx);
  });

  return { add, setQty, remove, clear, count, subtotal, deliveryFee, total, summaryLines, render };
})();
