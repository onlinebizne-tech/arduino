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
   foodArt(key) — returns a real food photo for a product.
   Images live in assets/images/products/ (Unsplash, free license).
   ------------------------------------------------------------ */
const ART_IMAGES = {
  beef: "assets/images/products/classic-beef.jpg",
  cheese: "assets/images/products/double-cheese.jpg",
  chicken: "assets/images/products/chickenburger.jpg",
  spicy: "assets/images/products/spicy-beef.jpg",
  bbq: "assets/images/products/bbq-burger.jpg",
  signature: "assets/images/products/signature-burger.jpg",
  cheesechicken: "assets/images/products/chickensandwich.jpg",
  combo: "assets/images/products/combo-meal.jpg",
  feast: "assets/images/products/feast-burger.jpg",
  drink: "assets/images/products/lemonade.jpg",
  shake: "assets/images/products/milkshake.jpg",
  fries: "assets/images/products/fries.jpg",
  rings: "assets/images/products/onionrings.jpg",
  cheesefries: "assets/images/products/cheesefries.jpg"
};

function foodArt(key) {
  const src = ART_IMAGES[key] || ART_IMAGES.beef;
  return `<img src="${src}" alt="" loading="lazy">`;
}
