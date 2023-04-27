import React, { useContext, useState, useEffect } from 'react'
import { BsFillSunFill, BsMoonFill } from 'react-icons/bs'
import Switch from 'react-switch'
import { MenuItem, ThemeProvider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../Contexts/Context'

const Navbar = () => {
    const navigate = useNavigate();
    const { currency, setCurrency } = CryptoState()

    const handleChange = (e) => {
        setCurrency(e.target.value);
    }
    const { dark, toggleDarkMode, theme, StyledTextField } = CryptoState();

    return (
        <>
            <ThemeProvider theme={theme} >
                <nav className={` bg-neutral-900 fixed shadow-md shadow-black z-40 w-full transition duration-500 `} >
                    <div className={`  flex items-center justify-between mx-auto w-5/6`}>
                        <p onClick={() => {
                            navigate('/')
                        }} className='text-xl md:text-3xl hover:cursor-pointer text-purple-700 font-oswald font-extrabold flex flex-col md:gap-y-2'>
                            ADCripto Analysis
                            <span className='md:text-sm text-[10px] text-center text-white uppercase'>Análise de Criptomoedas</span>
                        </p>
                        <div className='flex gap-8 justify-center items-center'>
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
                            <div onClick={toggleDarkMode} className='border border-neutral-800 hover:bg-neutral-800 transition duration-300 py-2 px-1 flex text-white hover:cursor-pointer rounded-md'>
                                {!dark ? (
                                    <div>
                                        <BsFillSunFill size={24} />
                                    </div>
                                ) : (
                                    <div>
                                        <BsMoonFill size={24} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </ThemeProvider>
        </>
    )
}

export default Navbar