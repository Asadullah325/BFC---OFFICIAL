import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FoodPage from './pages/FoodPage'
import CartPage from './pages/CartPage'

const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:searchTerm" element={<Home />} />
        <Route path="/tag/:tagName" element={<Home />} />
        <Route path="/food/:id" element={<FoodPage />} />
        <Route path="/cart" element={<CartPage />} />
    </Routes>
    </>
  )
}

export default AppRoutes