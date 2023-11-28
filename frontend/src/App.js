import './App.css'
import './Util.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import checkAuth from './checkAuth.js'
import privateRoutes from './routes/privateRoutes.js'
import publicRoutes from './routes/publicRoutes.js'
import toast, { Toaster } from 'react-hot-toast'
import { ToastContainer } from "react-toastify";

function App() {
  const router = createBrowserRouter([
    checkAuth() ? privateRoutes() : {},
    publicRoutes(),
  ])

  return <RouterProvider router={router} />
}

export default App
