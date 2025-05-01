import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { getProduct } from "./pages/ProductDetails";
import Toaster from "./components/ui/toaster";
import { ThemeProvider } from "./context/ThemeContext";
import { getProductsBycategory } from "./pages/ProductsByCategory";
import { getProductByCategory } from "./pages/CategoryProductDetails";
import { fetchProducts, queryClient } from "./utils/constants";
import { getCategories } from "./pages/NewHome";
import Loader from "./components/Loader";

const RootLayout = lazy(() => import("./layout/RootLayout.jsx"));
const AdminLayout = lazy(() => import("./layout/AdminLayout.jsx"));
const NewHome = lazy(() => import("./pages/NewHome.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
const CategoryProductDetails = lazy(() => import('./pages/CategoryProductDetails.jsx'))
const ManageProducts = lazy(() => import("./admin/ManageProducts.jsx"));
const ProductsByCategory = lazy(() => import("./pages/ProductsByCategory.jsx"));
const Orders = lazy(() => import("./pages/Orders.jsx"));
const Dashboard = lazy(() => import("./admin/Dashboard.jsx"));
const ProtectedRoutes = lazy(() => import("./layout/ProtectedRoutes.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const CheckOut = lazy(() => import("./pages/CheckOut.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const FAQ = lazy(() => import("./pages/FAQ.jsx"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const Register = lazy(() => import("./pages/auth/Register.jsx"));
const PaymentSuccess = lazy(() => import('./components/PaymentSuccess.jsx'))
const PaymentFailed = lazy(() => import('./components/PaymentFailed.jsx'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: () => Promise.resolve(fetchProducts()),
    children: [
      { path: "", index: true, element: <NewHome />, loader: getCategories },
      { path: "about", element: <About /> },
      { path: "success", element: <PaymentSuccess /> },
      { path: "failed", element: <PaymentFailed /> },

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
        <Suspense fallback={<Loader isVisible={isLoading} />}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster />
        <Loader isVisible={isLoading} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
