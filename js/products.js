/* ============================================================
   products.js — product catalogue + SVG food illustrations
   Products are rendered dynamically from this array.
   ============================================================ */

const PRODUCTS = [
  {
    id: 1,
    name: "Classic Beef Burger",
    category: "beef",
    price: 8.90,
    rating: 4.9,
    description: "Juicy beef patty with fresh lettuce, tomato and our signature sauce.",
    art: "beef",
    bestseller: true
  },
  {
    id: 2,
    name: "Double Cheese Burger",
    category: "cheese",
    price: 11.90,
    rating: 4.8,
    description: "Two smashed beef patties stacked with double melted cheese.",
    art: "cheese",
    bestseller: true
  },
  {
    id: 3,
    name: "Crispy Chicken Burger",
    category: "chicken",
    price: 9.90,
    rating: 4.7,
    description: "Golden crispy chicken fillet with coleslaw and tangy mayo.",
    art: "chicken",
    bestseller: true
  },
  {
    id: 4,
    name: "Spicy Beef Burger",
    category: "beef",
    price: 10.50,
    rating: 4.8,
    description: "Beef patty packed with jalapeños and our fiery spicy sauce.",
    art: "spicy",
    bestseller: false
  },
  {
    id: 5,
    name: "Smoky BBQ Burger",
    category: "beef",
    price: 12.90,
    rating: 4.9,
    description: "Slow-smoked flavour with caramelised onions and BBQ glaze.",
    art: "bbq",
    bestseller: false
  },
  {
    id: 6,
    name: "Signature Deluxe Burger",
    category: "combo",
    price: 15.90,
    rating: 5.0,
    description: "Our proudest creation — triple toppings, premium beef, secret sauce.",
    art: "signature",
    bestseller: true
  },
  {
    id: 7,
    name: "Cheesy Chicken Stack",
    category: "chicken",
    price: 13.50,
    rating: 4.6,
    description: "Double chicken fillets with extra cheese and crunchy slaw.",
    art: "cheesechicken",
    bestseller: false
  },
  {
    id: 8,
    name: "Trio Combo Meal",
    category: "combo",
    price: 19.90,
    rating: 4.9,
    description: "Any 3 burgers of your choice — feed the whole crew.",
    art: "combo",
    bestseller: false
  },
  {
    id: 9,
    name: "Iced Lemon Tea",
    category: "drinks",
    price: 3.50,
    rating: 4.7,
    description: "Refreshing iced lemon tea, perfectly sweetened.",
    art: "drink",
    bestseller: false
  },
  {
    id: 10,
    name: "Classic Milkshake",
    category: "drinks",
    price: 6.90,
    rating: 4.8,
    description: "Thick, creamy chocolate milkshake topped with whipped cream.",
    art: "shake",
    bestseller: false
  },
  {
    id: 11,
    name: "French Fries",
    category: "sides",
    price: 4.50,
    rating: 4.6,
    description: "Golden crispy fries with a pinch of sea salt.",
    art: "fries",
    bestseller: false
  },
  {
    id: 12,
    name: "Onion Rings",
    category: "sides",
    price: 5.90,
    rating: 4.5,
    description: "Beer-battered onion rings, crunchy on the outside.",
    art: "rings",
    bestseller: false
  },
  {
    id: 13,
    name: "Cheese Fries Deluxe",
    category: "sides",
    price: 7.90,
    rating: 4.7,
    description: "Fries loaded with cheese sauce, bacon bits and spring onion.",
    art: "cheesefries",
    bestseller: false
  },
  {
    id: 14,
    name: "Family Feast Combo",
    category: "combo",
    price: 39.90,
    rating: 5.0,
    description: "4 burgers, 2 large fries, 4 drinks — the ultimate feast.",
    art: "feast",
    bestseller: true
  }
];

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "beef", label: "Beef" },
  { key: "chicken", label: "Chicken" },
  { key: "cheese", label: "Cheese" },
  { key: "combo", label: "Combo" },
  { key: "drinks", label: "Drinks" },
  { key: "sides", label: "Sides" }
];

const ADDONS = [
  { id: "cheese", label: "Extra Cheese", price: 2.00 },
  { id: "patty", label: "Extra Patty", price: 5.00 },
  { id: "sauce", label: "Extra Sauce", price: 1.00 },
  { id: "egg", label: "Egg", price: 2.00 }
];

/* ------------------------------------------------------------
   foodArt(key) — returns inline SVG illustration markup for a
   product. Drawn with the site palette so images are always
   crisp, lightweight and never 404.
   ------------------------------------------------------------ */
function foodArt(key) {
  const svg = (inner) =>
    `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">${inner}</svg>`;

  const bun = `
    <ellipse cx="100" cy="36" rx="86" ry="26" fill="#FAAA77"/>
    <ellipse cx="100" cy="40" rx="72" ry="18" fill="#FEE6D8"/>`;
  const patty = `
    <rect x="26" y="62" width="148" height="20" rx="10" fill="#361602"/>
    <rect x="26" y="66" width="148" height="6" rx="3" fill="#5a3312"/>`;
  const cheese = `
    <path d="M30 60 L50 70 L75 62 L100 72 L125 62 L150 70 L170 60 L170 56 L30 56 Z" fill="#F5C542"/>`;
  const cheese2 = `<g transform="translate(0,-7)">${cheese}</g>`;
  const lettuce = `
    <path d="M28 78 q10 -10 20 0 q10 10 20 0 q10 -10 20 0 q10 10 20 0 q10 -10 20 0 q10 10 20 0 q10 -10 20 0 q10 10 20 0 L170 88 L30 88 Z" fill="#45BA36"/>`;
  const tomato = `
    <rect x="40" y="88" width="120" height="8" rx="4" fill="#FAAA77"/>`;
  const bottom = `
    <path d="M40 116 h120 a14 14 0 0 1 -14 14 h-92 a14 14 0 0 1 -14 -14 Z" fill="#FAAA77"/>
    <ellipse cx="100" cy="146" rx="90" ry="8" fill="#3F789D" opacity="0.25"/>`;

  const burger = (extras = "") =>
    svg(`${bun}${extras}${patty}${lettuce}${tomato}${bottom}`);

  switch (key) {
    case "beef":
      return burger(`<path d="M40 58 q20 -6 40 0 q20 6 40 0 q20 -6 40 0" stroke="#FEE6D8" stroke-width="5" fill="none" stroke-linecap="round"/>`);
    case "cheese":
      return burger(cheese2 + cheese);
    case "chicken":
      return svg(`${bun}
        <rect x="30" y="60" width="140" height="24" rx="10" fill="#FAAA77"/>
        <rect x="30" y="60" width="140" height="10" rx="5" fill="#FEE6D8"/>
        ${lettuce}${tomato}${bottom}`);
    case "spicy":
      return burger(`<path d="M60 58 l6 -6 M100 56 l6 -6 M140 58 l6 -6" stroke="#FA0F00" stroke-width="4" stroke-linecap="round"/>` + cheese);
    case "bbq":
      return burger(`<rect x="40" y="58" width="120" height="8" rx="4" fill="#361602" opacity="0.55"/>` + cheese);
    case "signature":
      return burger(cheese2 + cheese +
        `<circle cx="70" cy="62" r="4" fill="#FEE6D8"/><circle cx="130" cy="60" r="4" fill="#FEE6D8"/>`);
    case "cheesechicken":
      return svg(`${bun}
        <rect x="30" y="58" width="140" height="24" rx="10" fill="#FAAA77"/>
        ${cheese}${lettuce}${tomato}${bottom}`);
    case "combo":
      return svg(`
        <rect x="52" y="96" width="96" height="52" rx="10" fill="#FEE6D8"/>
        <rect x="52" y="96" width="96" height="10" rx="5" fill="#FAAA77"/>
        ${bun.replace("cy=\"36\"", "cy=\"66\"").replace("cy=\"40\"", "cy=\"70\"")}
        ${patty.replace("y=\"62\"", "y=\"84\"").replace("y=\"66\"", "y=\"88\"")}
        <rect x="60" y="116" width="80" height="6" rx="3" fill="#45BA36"/>
        <ellipse cx="100" cy="150" rx="70" ry="7" fill="#3F789D" opacity="0.25"/>`);
    case "feast":
      return svg(`
        <rect x="46" y="100" width="108" height="50" rx="10" fill="#FEE6D8"/>
        <rect x="46" y="100" width="108" height="10" rx="5" fill="#FAAA77"/>
        ${bun.replace("cy=\"36\"", "cy=\"70\"").replace("cy=\"40\"", "cy=\"74\"").replace("rx=\"86\"", "rx=\"60\"").replace("rx=\"72\"", "rx=\"50\"")}
        ${patty.replace("y=\"62\"", "y=\"92\"").replace("y=\"66\"", "y=\"96\"").replace("width=\"148\"", "width=\"104\"").replace("x=\"26\"", "x=\"48\"")}
        <rect x="56" y="120" width="88" height="6" rx="3" fill="#45BA36"/>
        <circle cx="80" cy="134" r="7" fill="#FAAA77"/><circle cx="120" cy="134" r="7" fill="#45BA36"/>
        <ellipse cx="100" cy="152" rx="76" ry="6" fill="#3F789D" opacity="0.25"/>`);
    case "drink":
      return svg(`
        <path d="M70 60 h60 l-8 80 a8 8 0 0 1 -8 7 h-28 a8 8 0 0 1 -8 -7 Z" fill="#FEE6D8"/>
        <path d="M74 72 h52 l-6 64 a6 6 0 0 1 -6 6 h-28 a6 6 0 0 1 -6 -6 Z" fill="#FAAA77"/>
        <rect x="92" y="40" width="8" height="60" rx="4" fill="#361602" transform="rotate(12 96 70)"/>
        <circle cx="120" cy="55" r="9" fill="#FEE6D8"/>
        <ellipse cx="100" cy="148" rx="60" ry="7" fill="#3F789D" opacity="0.25"/>`);
    case "shake":
      return svg(`
        <path d="M72 66 h56 l-7 78 a8 8 0 0 1 -8 7 h-26 a8 8 0 0 1 -8 -7 Z" fill="#FEE6D8"/>
        <path d="M76 78 h48 l-5 62 a6 6 0 0 1 -6 6 h-26 a6 6 0 0 1 -6 -6 Z" fill="#3F789D"/>
        <path d="M80 66 q10 -18 20 0 q10 18 20 0 q10 -18 20 0" fill="#FEE6D8"/>
        <rect x="124" y="46" width="6" height="50" rx="3" fill="#361602" transform="rotate(18 127 70)"/>
        <ellipse cx="100" cy="148" rx="60" ry="7" fill="#3F789D" opacity="0.25"/>`);
    case "fries":
      return svg(`
        <path d="M60 90 h80 l-8 52 a8 8 0 0 1 -8 7 h-48 a8 8 0 0 1 -8 -7 Z" fill="#FAAA77"/>
        <path d="M64 90 h72 l-4 26 h-64 Z" fill="#FEE6D8"/>
        <rect x="70" y="46" width="12" height="48" rx="6" fill="#F5C542"/>
        <rect x="90" y="40" width="12" height="54" rx="6" fill="#F5C542"/>
        <rect x="110" y="46" width="12" height="48" rx="6" fill="#F5C542"/>
        <ellipse cx="100" cy="148" rx="60" ry="7" fill="#3F789D" opacity="0.25"/>`);
    case "rings":
      return svg(`
        <path d="M56 92 h88 l-8 50 a8 8 0 0 1 -8 7 h-56 a8 8 0 0 1 -8 -7 Z" fill="#3F789D"/>
        <circle cx="80" cy="70" r="17" fill="#F5C542"/><circle cx="80" cy="70" r="8" fill="#FEE6D8"/>
        <circle cx="120" cy="70" r="17" fill="#F5C542"/><circle cx="120" cy="70" r="8" fill="#FEE6D8"/>
        <circle cx="100" cy="58" r="17" fill="#F5C542"/><circle cx="100" cy="58" r="8" fill="#FEE6D8"/>
        <ellipse cx="100" cy="148" rx="62" ry="7" fill="#361602" opacity="0.2"/>`);
    case "cheesefries":
      return svg(`
        <path d="M58 92 h84 l-7 48 a8 8 0 0 1 -8 7 h-54 a8 8 0 0 1 -8 -7 Z" fill="#FAAA77"/>
        <path d="M62 92 h76 l-4 24 h-68 Z" fill="#FEE6D8"/>
        <rect x="72" y="48" width="11" height="44" rx="5" fill="#F5C542"/>
        <rect x="91" y="44" width="11" height="50" rx="5" fill="#F5C542"/>
        <rect x="110" y="48" width="11" height="44" rx="5" fill="#F5C542"/>
        <path d="M66 84 q34 -12 68 0 l-3 10 h-62 Z" fill="#FFE082"/>
        <ellipse cx="100" cy="148" rx="60" ry="7" fill="#3F789D" opacity="0.25"/>`);
    default:
      return burger();
  }
}
