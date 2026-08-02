export const products = {
   16: {
    id: 16,
    name: "Attractive Women Dresses #1",
    price: "₹549",
    originalPrice: "₹1200",
    image: "https://cdn.jsdelivr.net/gh/arbutani/web-img@main/1.webp",
    images: [
      "https://cdn.jsdelivr.net/gh/arbutani/web-img@main/1.webp",
      "https://cdn.jsdelivr.net/gh/arbutani/web-img@main/1-1.webp",
    ],
    desc: "Attractive women dress in crepe fabric with lace inserts. Fit and flare maxi dress with V-neck and three-quarter sleeves.",
    details: ["Color: Blue", "Fabric: Crepe", "Fit/Shape: Fit and Flare", "Length: Maxi", "Neck: V-neck", "Print or Pattern Type: Solid", "Surface Styling: Lace inserts", "Occasion: Casual", "Sleeve Length: Three-Quarter Sleeves", "Sleeve Styling: Regular", "Pattern: Solid", "Net Quantity (N): 1", "Country of Origin: India"],
    discount: "55% off",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    category: "dresses-gowns",
  },
};

export type Product = typeof products[keyof typeof products];
