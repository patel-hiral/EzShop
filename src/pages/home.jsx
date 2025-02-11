import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { FEATURED_PRODUCTS } from "@/utils/constants";

export default function NewHome() {
  const categories = useLoaderData();
  console.log("Categories", categories);

  return (
    <div className="dark:bg-gray-900 dark:text-white h-fit px-4 sm:px-0">
      {/* Hero Section */}
      <section className="text-center py-20 rounded bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607083205626-956228d6185d?q=80&w=1493&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <h2 className="text-4xl font-bold mb-4">Discover the Best Deals at EzShop</h2>
        <p className="text-lg pb-4">Shop the latest trends with amazing discounts</p>
        <Link to="/products" className="mt-6 bg-white text-blue-600 dark:text-gray-900 px-6 py-2 rounded-lg font-semibold ">Shop Now</Link>
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
        <h3 className="text-3xl font-bold mb-6">Shop By Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-11/12 mx-auto">
          {categories.map((category) => (
            <Link to={`category/${category.slug}`} key={category.name} className="p-6 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md cursor-pointer hover:scale-105 transition">
              <p className="text-lg font-semibold">{category.name}</p>
            </Link>
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
        @EzShop All rights Reserved! 2025
      </footer>
    </div>
  );
}


export async function getCategories() {
  const response = await fetch('https://dummyjson.com/products/categories');
  if (!response.ok) {
    throw new Error('Something went wrong');
  }
  const categories = await response.json();
  return categories;
}