import React from 'react'
import { ThemeProvider } from './context/theme-context'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import About from './pages/About'

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, children: [
      { path: '', index: true, element: <Home /> },
      { path: '/about', index: true, element: <About /> },
      { path: '/products', index: true, element: <Products /> },
      { path: '/contact', index: true, element: <Contact /> },
      { path: '/faq', index: true, element: <FAQ /> },
      { path: '/auth/login', index: true, element: <Login /> },
      { path: '/auth/register', index: true, element: <Register /> },
    ]
  }
])

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme" >
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App