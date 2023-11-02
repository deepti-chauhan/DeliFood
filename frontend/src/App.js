import React from 'react'
import './App.css'
import './Util.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import checkAuth from './checkAuth.js'
import privateRoutes from './routes/privateRoutes.js'
import publicRoutes from './routes/publicRoutes.js'
import Home from './pages/Home.js'

function App() {
  const router = createBrowserRouter([
    checkAuth() ? privateRoutes() : {},
    publicRoutes(),
  ])

  return <RouterProvider router={router} fallbackElement={<Home />} />
}

export default App
