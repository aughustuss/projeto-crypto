import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import CryptoCoin from './Pages/CryptoCoin'
import Home from './Pages/Home'
import Footer from './Components/Footer'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} index />
          <Route path='/coin/:id' element={<CryptoCoin />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
