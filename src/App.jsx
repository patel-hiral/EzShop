import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getProduct } from "./pages/product-details";
import { useSelector } from "react-redux";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./context/theme-context";
import { getProductsBycategory } from "./pages/products-by-category";
import { getProductByCategory } from "./pages/category-product-details";
import { QueryClientProvider } from "@tanstack/react-query";
import { fetchProducts, queryClient } from "./utils/constants";
import { getCategories } from "./pages/home";
// import Loader from "./components/loader";

const CategoryProductDetails = lazy(() => import('./pages/category-product-details'))
const ProductsByCategory = lazy(() => import("./pages/products-by-category"));
const Orders = lazy(() => import("./pages/orders"));
const NewHome = lazy(() => import("./pages/home"));
const AdminLayout = lazy(() => import("./layout/admin-layout"));
const Dashboard = lazy(() => import("./admin/dashboard"));
const ManageProducts = lazy(() => import("./admin/manage-products"));
const Products = lazy(() => import("./pages/products"));
const ProductDetails = lazy(() => import("../src/pages/product-details"));
const ProtectedRoutes = lazy(() => import("./layout/protected-routes"));
const Cart = lazy(() => import("./pages/cart"));
const CheckOut = lazy(() => import("./pages/check-out"));
const Profile = lazy(() => import("./pages/profile"));
const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));
const FAQ = lazy(() => import("./pages/faq"));
const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/register"));
const RootLayout = lazy(() => import("./layout/root-layout"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: fetchProducts,
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
  // Admin Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <Dashboard />, index: true },
      { path: "products", element: <ManageProducts /> },
    ],
  },
]);

function App() {
  // const isLoading = useSelector((state) => state.ui.isLoading);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        {/* <Loader isVisible={isLoading} /> */}
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
