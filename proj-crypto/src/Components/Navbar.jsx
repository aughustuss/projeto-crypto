import React, { useState } from 'react'
import {  BsMoonFill } from 'react-icons/bs'
import {FaSun} from 'react-icons/fa'
import { MdOutlineFavorite } from 'react-icons/md'
import { MenuItem, ThemeProvider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../Contexts/Context'
import { theme } from '../Config/Theme'
import { StyledTextField } from '../Config/Theme'
const Navbar = () => {
    const {toggleDarkMode, dark, currency, toggleSideBar, favoritesAmount, isOpen, setCurrency} = CryptoState();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setCurrency(e.target.value);
    };

    return (
        <>
            <ThemeProvider theme={theme} >
                <nav className='bg-primary fixed shadow-md z-40 w-full transition duration-500 py-1' >
                    <div className='flex items-center justify-between mx-auto w-5/6'>
                        <p onClick={() => {
                            navigate('/')
                        }} className='text-xl md:text-2xl hover:cursor-pointer text-offwhite font-oswald text-center font-semibold flex flex-col md:gap-y-[2px]'>
                            ADCripto
                            <span className='md:text-xs text-[10px] text-center text-offwhite uppercase'>Análise de Criptomoedas</span>
                        </p>
                        <div className='flex gap-4 justify-center items-center'>
                            <StyledTextField
                                variant='outlined'
                                value={currency}
                                label='Moeda'
                                select
                                size='small'
                                onChange={handleChange}
                                style={{ color: 'white' }}
                            >
                                <MenuItem value={'BRL'} >BRL</MenuItem>
                                <MenuItem value={'USD'}>USD</MenuItem>
                            </StyledTextField>
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