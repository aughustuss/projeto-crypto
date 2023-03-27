import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import CryptoCoin from './Pages/CryptoCoin'
import Home from './Pages/Home'
const App = () => {
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 60){
        setIsTop(false);
      } else if (window.scrollY === 0) {
        setIsTop(true);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <Navbar isTop={isTop} />
        <Routes>
          <Route path='/' element={<Home />} index />
          <Route path='/coin/:id' element={<CryptoCoin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
