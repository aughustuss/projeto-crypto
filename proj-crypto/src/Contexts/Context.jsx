import React, { createContext, useContext, useEffect, useState } from 'react'

const Crypto = createContext();

export const CryptoState = () => {
    return useContext(Crypto)
}

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
                currency, setCurrency, symbol, dark ,toggleDarkMode
            }}
        >
            {children}
        </Crypto.Provider>
    );
}

export default CryptoContext;