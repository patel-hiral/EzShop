import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { getProduct } from "./pages/ProductDetails";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./context/theme-context";
import { getProductsBycategory } from "./pages/ProductsByCategory";
import { getProductByCategory } from "./pages/CategoryProductDetails";
import { fetchProducts, queryClient } from "./utils/constants";
import { getCategories } from "./pages/NewHome";
import Loader from "./components/Loader";

const CategoryProductDetails = lazy(() => import('./pages/CategoryProductDetails'))
const ProductsByCategory = lazy(() => import("./pages/ProductsByCategory"));
const Orders = lazy(() => import("./pages/Orders"));
const NewHome = lazy(() => import("./pages/NewHome"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const Dashboard = lazy(() => import("./admin/Dashboard"));
const ManageProducts = lazy(() => import("./admin/ManageProducts"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const ProtectedRoutes = lazy(() => import("./layout/ProtectedRoutes"));
const Cart = lazy(() => import("./pages/Cart"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const Profile = lazy(() => import("./pages/Profile"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const RootLayout = lazy(() => import("./layout/RootLayout"));

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
  const isLoading = useSelector((state) => state.ui.isLoading);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Loader isVisible={isLoading} />
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
