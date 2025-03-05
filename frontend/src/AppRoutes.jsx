import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FoodPage from './pages/FoodPage'
import CartPage from './pages/CartPage'
import Login from './pages/Login'

const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:searchTerm" element={<Home />} />
        <Route path="/tag/:tagName" element={<Home />} />
        <Route path="/food/:id" element={<FoodPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
    </Routes>
    </>
  )
}

export default AppRoutes