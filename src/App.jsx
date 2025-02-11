import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getProduct } from "./pages/product-details";
import { useSelector } from "react-redux";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./context/theme-context";
import Loader from "./components/loader";
import NewHome, { getCategories } from "./pages/home";
import Orders from "./pages/orders";

import ProductsByCategory, { getProductsBycategory, } from "./pages/products-by-category";
import CategoryProductDetails, { getProductByCategory, } from "./pages/category-product-details";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/constants";

const Products = lazy(() => import("./pages/products"));
const ProductDetails = lazy(() => import("../src/pages/product-details"));
const ProtectedRoutes = lazy(() => import("../src/layout/ProtectedRoutes"));
const Cart = lazy(() => import("./pages/cart"));
const CheckOut = lazy(() => import("./pages/check-out"));
const Profile = lazy(() => import("./pages/profile"));
const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));
const FAQ = lazy(() => import("./pages/faq"));
const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/register"));
const RootLayout = lazy(() => import("../src/layout/RootLayout"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", index: true, element: <NewHome />, loader: getCategories },
      { path: "about", element: <About /> },

      { path: "products", element: <Products /> },
      {
        path: "products/:id",
        element: <ProductDetails />,
        loader: ({ params }) => getProduct(params.id),
      },

      {
        path: "category/:category",
        loader: getProductsBycategory,
        element: <ProductsByCategory />,
      },
      {
        path: "cat/:id",
        element: <CategoryProductDetails />,
        loader: getProductByCategory,
      },

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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster />
      <Loader isVisible={isLoading} />
    </ThemeProvider>
  );
}

export default App;
