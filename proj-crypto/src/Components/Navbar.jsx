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
                <nav className={` bg-neutral-900 fixed shadow-md shadow-black z-40 py-4 w-full transition duration-500 `} >
                    <div className={`  flex items-center justify-between mx-auto w-5/6 `}>
                        <p onClick={() => {
                            navigate('/')
                        }} className='text-3xl hover:cursor-pointer text-purple-700 font-oswald font-extrabold'>Análise Cripta</p>
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
                            <Switch
                                checked={dark}
                                onChange={toggleDarkMode}
                                onColor='#000338'
                                offColor='#FAC400'
                                uncheckedIcon={
                                    <div className='flex justify-center h-full items-center' >
                                        <BsFillSunFill size={18} />
                                    </div>
                                }
                                checkedIcon={
                                    <div className='flex justify-center h-full items-center' >
                                        <BsMoonFill size={18} color='white' />
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </nav>
            </ThemeProvider>
        </>
    )
}

export default Navbar