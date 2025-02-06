import React, { lazy, Suspense } from 'react'
import { ThemeProvider } from './components/theme-context'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Home from './pages/Home'
import { getAllProducts } from './pages/Products'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import About from './pages/About'
import { Toaster } from './components/ui/toaster'
import Profile from './pages/Profile'
import ProtectedRoutes from './layout/ProtectedRoutes'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import ProductDetails, { getProduct } from './pages/product-details'
const Products = lazy(() => import('../src/pages/Products'))

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, children: [
      { path: '', index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'products', element: <Products />, loader: getAllProducts },
      { path: 'contact', element: <Contact /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'auth/login', element: <Login /> },
      { path: 'auth/register', element: <Register /> },
      { path: 'products/:id', element: <ProductDetails />, loader: getProduct },
      {
        path: 'react-store', element: <ProtectedRoutes />,
        children: [
          { path: 'profile', element: <Profile /> },
          { path: 'cart', element: <Cart /> },
          { path: 'orders', element: <Orders /> },
        ]
      },
    ]
  }
])

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme" >
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  )
}

export default App