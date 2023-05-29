import React, { createContext, useContext, useEffect, useState } from 'react'
import { createTheme, TextField } from '@mui/material';
import styled from '@emotion/styled';

const Crypto = createContext();

export const CryptoState = () => {
    return useContext(Crypto)
}

export function price(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            'borderColor': 'rgb(147, 51, 234)'
        },
        '&:hover fieldset': {
            'borderColor': 'rgb(147, 51, 234)'
        },
        '& input': {
            'color': 'rgb(163, 163, 163) !important'
        },
        '& textarea': {
            'color': 'rgb(163, 163, 163)'
        },
        '& .MuiInputBase-input': {
            color: 'rgb(163, 163, 163)',
        },
    }

})

export const theme = createTheme({
    components: {
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    color: 'gray'
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: 'rgb(147, 51, 234)'
                }
            }
        },
        MuiPaginationItem:{
            styleOverrides:{
                root:{
                    color: 'rgb(147, 51, 234)',
                    fontSize: '12px'
                }
            }
        }
    },
    palette: {
        mode: 'light',
        primary: {
            main: 'rgb(147, 51, 234)',
        }
    }
})

const CryptoContext = ({ children }) => {

    const [currency, setCurrency] = useState("BRL");
    const [symbol, setSymbol] = useState("R$");
    const [dark, setDark] = useState(false);

    const toggleDarkMode = () => {
        setDark(!dark);
    }

    useEffect(() => {
        if(currency === 'BRL'){
            setSymbol("R$")
        } else if (currency === 'USD'){
            setSymbol('$')
        }
    }, [currency])
    
    return (
        <Crypto.Provider
            value={{
                currency, setCurrency, symbol, dark ,toggleDarkMode, StyledTextField, theme, price
            }}
        >
            {children}
        </Crypto.Provider>
    );
}

export default CryptoContext;