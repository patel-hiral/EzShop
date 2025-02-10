import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Footer from "@/components/Footer";

const FEATURED_PRODUCTS = [
  { id: 1, name: "Apple MacBook Air", price: "$1299.99", image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1737781969_3002786.jpg?format=webp&w=480&dpr=1.0" },
  { id: 2, name: "H&M Shoulder Bag and Pouch", price: "$59.99", image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw0814ec34/images/Titan/Catalog/1805QM04_1.jpg?sw=600&sh=600" },
  { id: 3, name: "Casual Sneaker Shoes for Men", price: "$79.99", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSNRpqFM85wA435vX-2fnnF37j-m-FBtvXQm2jwexXsqEdK4Du8gKbprYggxVNnbFWCCQEZvbwYMDRxbr3WOGU28ZWYzpM2C2fjRLyVzWsQ3NvaTcDcZuCMPw" },
  { id: 4, name: "Titan Neo Splash Quartz for Men", price: "$249.99", image: "https://m.media-amazon.com/images/I/316ArzLeJ2L._SX300_SY300_QL70_FMwebp_.jpg" },
  { id: 5, name: "Luxury Leather Wallet", price: "$39.99", image: "https://redtape.com/cdn/shop/files/RSL0562_1.jpg?v=1738395669" }
];

export default function NewHome() {

  return (
    <div className="dark:bg-gray-900 dark:text-white h-fit">
      {/* Hero Section */}
      <section className="text-center py-20 rounded bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607083205626-956228d6185d?q=80&w=1493&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <h2 className="text-4xl font-bold mb-4">Discover the Best Deals at EzStore</h2>
        <p className="text-lg">Shop the latest trends with amazing discounts</p>
        <button className="mt-6 bg-white text-blue-500 dark:text-gray-900 px-6 py-2 rounded-lg font-semibold shadow-lg hover:scale-105 transition">Shop Now</button>
      </section>

      {/* Slider Section */}
      <section className="pt-10">
        <h3 className="text-3xl font-bold text-center mb-6">Featured Products</h3>
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="w-11/12 mx-auto p-2"
        >
          {FEATURED_PRODUCTS.map((product) => (
            <SwiperSlide key={product.id} className="p-4 rounded-lg shadow-md border border-secondary overflow-hidden">
              <img src={product.image} alt="Product" className="w-full h-40 object-cover rounded" />
              <h4 className="text-lg font-semibold mt-2">{product.name}</h4>
              <p className="text-gray-500 dark:text-gray-400">{product.price}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Categories Section */}
      <section className="py-10 text-center">
        <h3 className="text-3xl font-bold mb-6">Popular Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-11/12 mx-auto">
          {["Clothing", "Electronics", "Home", "Accessories"].map((category, index) => (
            <div key={index} className="p-6 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md cursor-pointer hover:scale-105 transition">
              <h4 className="text-lg font-semibold">{category}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="pt-10 text-center">
        <h3 className="text-3xl font-bold mb-6">Bestsellers</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <div key={product.id} className="p-4 rounded-lg shadow w-64">
              <img src={product.image} alt="Bestseller" className="w-full h-40 object-cover rounded" />
              <h4 className="text-lg font-semibold mt-2">{product.name}</h4>
              <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1"><Star className="text-yellow-500" /> 4.9</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="pt-10 text-center">
        <h3 className="text-3xl font-bold mb-6">What Our Customers Say</h3>
        <div className="w-11/12 mx-auto border border-secondary rounded-md shadow">
          <Swiper pagination={{ clickable: false }} autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }} modules={[Pagination, Autoplay]}>
            {["Great quality products!", "Fast delivery and amazing service!", "Love the discounts!", "My go-to shopping site!"].map((review, index) => (
              <SwiperSlide key={index} className="p-6">
                <p className="text-lg font-semibold">"{review}"</p>
                <p className="mt-2 text-gray-500 dark:text-gray-400">- Customer {index + 1}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <footer className="text-center py-4 text-gray-500 dark:text-gray-400">
        @EzShop Alrights Reserved! 2025
      </footer>
    </div>
  );
}
