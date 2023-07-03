import React, { useState } from 'react'
import { BsMoonFill } from 'react-icons/bs'
import { FaSun } from 'react-icons/fa'
import { MdOutlineFavorite } from 'react-icons/md'
import { ThemeProvider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../Contexts/Context'
import { theme } from '../Config/Theme'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
const Navbar = () => {
    const { toggleDarkMode, dark, currency, toggleSideBar, favoritesAmount, isOpen, setCurrency } = CryptoState();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setCurrency(e.target.value);
    };

    return (
        <>
            <ThemeProvider theme={theme} >
                <nav className='bg-primary fixed shadow-md z-40 w-full transition duration-500 py-1' >
                    <div className='flex items-center justify-between mx-auto container px-4 lg:px-0'>
                        <p onClick={() => {
                            navigate('/')
                        }} className='text-xl md:text-2xl hover:cursor-pointer text-offwhite font-oswald text-center font-semibold flex flex-col md:gap-y-[2px]'>
                            ADCripto
                            <span className='md:text-xs text-[10px] text-center text-offwhite uppercase'>Análise de Criptomoedas</span>
                        </p>
                        <div className='flex gap-4 justify-center items-center'>
                            <div className='relative flex flex-row items-center border-secondary rounded-md  text-offwhite border'>
                                <select value={currency} onClick={() => setMenuOpen(!menuOpen)} onChange={handleChange} className='bg-transparent outline-none w-full py-2 px-5'>
                                    <option className='text-black' value={"BRL"}>BRL</option>
                                    <option className='text-black' value={"USD"}>USD</option>
                                </select>
                                {!menuOpen ? <IoMdArrowDropdown className='absolute right-1'/> : <IoMdArrowDropup className='absolute right-1'/>}
                                <p className='absolute -top-2 left-2 bg-primary pr-1 text-secondary text-xs'>Moeda</p>
                            </div>
                            <div onClick={toggleDarkMode} className='border border-secondary hover:bg-secondary transition duration-300 py-2 px-1 flex text-offwhite hover:cursor-pointer rounded-md'>
                                {!dark ? (
                                    <div>
                                        <FaSun size={24} />
                                    </div>
                                ) : (
                                    <div>
                                        <BsMoonFill size={24} />
                                    </div>
                                )}
                            </div>
                            <div onClick={toggleSideBar} className='cursor-pointer border border-secondary hover:bg-secondary transition duration-300 py-2 px-1 rounded-md text-offwhite relative'>
                                <MdOutlineFavorite size={24} />
                                <div className='absolute -top-1 -right-2 rounded-full bg-offwhite font-semibold text-primary h-4 text-center w-4 text-[10px]'>
                                    {favoritesAmount}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </ThemeProvider>
        </>
    )
}

export default Navbar