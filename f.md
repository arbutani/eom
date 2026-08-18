# Product Add Guide

## File to Edit
`src/lib/items.ts`

## Product Entry Format

Copy the template below and paste it before the closing `};` of the `items` object.

```ts
  <ID>: {
    id: <ID>,
    name: "<Product Name>",
    price: "₹<Selling Price>",
    originalPrice: "₹<Original Price>",
    image: "https://cdn.jsdelivr.net/gh/arbutani/web-img@main/<ID>.webp",
    images: [
      "https://cdn.jsdelivr.net/gh/arbutani/web-img@main/<ID>.webp",
      "https://cdn.jsdelivr.net/gh/arbutani/web-img@main/<ID>-<ID>.webp",
    ],
    desc: "<Short description>",
    details: [
      "Key: Value",
      "Key: Value",
    ],
    discount: "<X% off>",
    sizes: ["<SIZE1>", "<SIZE2>"],
    category: "<category-slug>",
  },
```

## How to Fill Fields

| Field | Instructions |
|-------|-------------|
| `id` | Next sequential number. Check the last entry in `src/lib/items.ts`. |
| `name` | Exact product title. |
| `price` | Selling price with ₹ symbol (e.g. `"₹580"`). |
| `originalPrice` | MRP/strikethrough price with ₹ symbol (e.g. `"₹1200"`). |
| `image` | Primary image URL: `https://cdn.jsdelivr.net/gh/arbutani/web-img@main/<ID>.webp` |
| `images` | Array of two URLs: `<ID>.webp` and `<ID>-<ID>.webp` |
| `desc` | Short 1-2 sentence description. |
| `details` | Array of `"Label: Value"` strings for the product details grid. |
| `discount` | Calculated discount string (e.g. `"50% off"`). |
| `sizes` | Array of all available size options. |
| `category` | One of: `dresses-gowns`, `tops-tees`, `bottomwear`, `kurti-topwear`, `feeding-bras`, `briefs-bottomwear` |

## Category Mapping

| URL Path | `category` value |
|----------|------------------|
| `/category/plus-size/dresses-gowns` | `dresses-gowns` |
| `/category/plus-size/tops-tees` | `tops-tees` |
| `/category/plus-size/bottomwear` | `bottomwear` |
| `/category/maternity/kurti-topwear` | `kurti-topwear` |
| `/category/maternity/feeding-bras` | `feeding-bras` |
| `/category/maternity/briefs-bottomwear` | `briefs-bottomwear` |

## Current Last ID
Check `src/lib/items.ts` — last entry ID is currently **26**. Next ID = **27**.

## Example
```ts
  24: {
    id: 24,
    name: "Women's Red Cotton Kurta",
    price: "₹599",
    originalPrice: "₹1299",
    image: "https://cdn.jsdelivr.net/gh/arbutani/web-img@main/24.webp",
    images: [
      "https://cdn.jsdelivr.net/gh/arbutani/web-img@main/24.webp",
      "https://cdn.jsdelivr.net/gh/arbutani/web-img@main/24-24.webp",
    ],
    desc: "Elegant cotton kurta perfect for daily wear and casual outings.",
    details: [
      "Color: Red",
      "Fabric: Cotton",
      "Occasion: Casual",
      "Country of Origin: India",
    ],
    discount: "54% off",
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "kurti-topwear",
  },
```
