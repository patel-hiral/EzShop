import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Apple MacBook Air",
    price: "$1299.99",
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1737781969_3002786.jpg?format=webp&w=480&dpr=1.0",
  },
  {
    id: 2,
    name: "H&M Shoulder Bag and Pouch",
    price: "$59.99",
    image:
      "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw0814ec34/images/Titan/Catalog/1805QM04_1.jpg?sw=600&sh=600",
  },
  {
    id: 3,
    name: "Casual Sneaker Shoes for Men",
    price: "$79.99",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSNRpqFM85wA435vX-2fnnF37j-m-FBtvXQm2jwexXsqEdK4Du8gKbprYggxVNnbFWCCQEZvbwYMDRxbr3WOGU28ZWYzpM2C2fjRLyVzWsQ3NvaTcDcZuCMPw",
  },
  {
    id: 4,
    name: "Titan Neo Splash Quartz for Men",
    price: "$249.99",
    image:
      "https://m.media-amazon.com/images/I/316ArzLeJ2L._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 5,
    name: "Luxury Leather Wallet",
    price: "$39.99",
    image: "https://redtape.com/cdn/shop/files/RSL0562_1.jpg?v=1738395669",
  },
];

const navItems = [
  { id: "01", path: "/", title: "" },
  { id: "02", path: "/products", title: "Products" },
  { id: "03", path: "/about", title: "About" },
  { id: "04", path: "/contact", title: "Contact" },
  { id: "05", path: "/faq", title: "FAQ" },
];

export { FEATURED_PRODUCTS, queryClient, navItems };
