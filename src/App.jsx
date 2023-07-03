import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import CryptoCoin from './Pages/CryptoCoin'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import Favorites from './Components/Favorites'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} index />
          <Route path='/coin/:id' element={<CryptoCoin />} />
        </Routes>
        <Favorites/>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
