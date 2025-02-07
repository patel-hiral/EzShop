import React, { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { getAllProducts } from './pages/Products'
import { getProduct } from './pages/product-details'
import { useSelector } from 'react-redux'
import { Toaster } from './components/ui/toaster'
import { ThemeProvider } from './context/theme-context'
import Loader from './components/Loader'
import NewHome from './pages/NewHome'

const Products = lazy(() => import('../src/pages/Products'))
const ProductDetails = lazy(() => import('../src/pages/product-details'))
const ProtectedRoutes = lazy(() => import('../src/layout/ProtectedRoutes'))
const Cart = lazy(() => import('../src/pages/Cart'))
const CheckOut = lazy(() => import('../src/pages/CheckOut'))
const Profile = lazy(() => import('../src/pages/Profile'))
const Home = lazy(() => import('../src/pages/Home'))
const About = lazy(() => import('../src/pages/About'))
const Contact = lazy(() => import('../src/pages/Contact'))
const FAQ = lazy(() => import('../src/pages/FAQ'))
const Login = lazy(() => import('../src/pages/Auth/Login'))
const Register = lazy(() => import('../src/pages/Auth/Register'))
const RootLayout = lazy(() => import('../src/layout/RootLayout'))

const router = createBrowserRouter([  
  {
    path: '/', element: <RootLayout />, children: [
      { path: '', index: true, element: <NewHome /> },
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
          { path: 'checkout', element: <CheckOut /> },
        ]
      },
    ]
  }
])

function App() {
  const isLoading = useSelector((state) => state.ui.isLoading)

  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme" >
      <RouterProvider router={router} />
      <Toaster />
      <Loader isVisible={isLoading} />
    </ThemeProvider>
  )
}

export default App