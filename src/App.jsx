import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAllProducts } from "./pages/Products";
import { getProduct } from "./pages/product-details";
import { useSelector } from "react-redux";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./context/theme-context";
import Loader from "./components/Loader";
import NewHome, { getCategories } from "./pages/NewHome";
import Orders from "./pages/Orders";
import ProductsByCategory, {
  getProductsBycategory,
} from "./pages/ProductsByCategory";
import CategoryProductDetails, {
  getProductByCategory,
} from "./pages/category-product-details";

const Products = lazy(() => import("../src/pages/Products"));
const ProductDetails = lazy(() => import("../src/pages/product-details"));
const ProtectedRoutes = lazy(() => import("../src/layout/ProtectedRoutes"));
const Cart = lazy(() => import("../src/pages/Cart"));
const CheckOut = lazy(() => import("../src/pages/CheckOut"));
const Profile = lazy(() => import("../src/pages/Profile"));
const About = lazy(() => import("../src/pages/About"));
const Contact = lazy(() => import("../src/pages/Contact"));
const FAQ = lazy(() => import("../src/pages/FAQ"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const RootLayout = lazy(() => import("../src/layout/RootLayout"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", index: true, element: <NewHome />, loader: getCategories },
      { path: "about", element: <About /> },

      { path: "products", element: <Products />, loader: getAllProducts, },
      { path: "products/:id", element: <ProductDetails />, loader: ({ params }) => getProduct(params.id) },

      { path: "category/:category", loader: getProductsBycategory, element: <ProductsByCategory /> },
      { path: "cat/:id", element: <CategoryProductDetails />, loader: getProductByCategory },

      { path: "contact", element: <Contact /> },
      { path: "faq", element: <FAQ /> },
      { path: "auth/login", element: <Login /> },
      { path: "auth/register", element: <Register /> },
      {
        path: "react-store",
        element: <ProtectedRoutes />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "cart", element: <Cart /> },
          { path: "checkout", element: <CheckOut /> },
          { path: "orders", element: <Orders /> },
        ],
      },
    ],
  },
]);

function App() {
  const isLoading = useSelector((state) => state.ui.isLoading);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
      <Loader isVisible={isLoading} />
    </ThemeProvider>
  );
}

export default App;
