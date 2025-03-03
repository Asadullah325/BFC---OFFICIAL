import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:searchTerm" element={<Home />} />
        <Route path="/tag/:tagName" element={<Home />} />
    </Routes>
    </>
  )
}

export default AppRoutes