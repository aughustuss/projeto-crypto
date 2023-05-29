import React, { createContext, useContext, useEffect, useState } from 'react'
const Crypto = createContext();

export const CryptoState = () => {
    return useContext(Crypto)
};

export function price(num) {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("BRL");
    const [symbol, setSymbol] = useState("R$");
    const [dark, setDark] = useState(false);
    const [days, setDays] = useState(1);
    
    const [isOpen, setIsOpen] = useState(false);

    const [favorites, setFavorites] = useState([]);
    const [alreadyAddedCoins, setAlreadyAddedCoins] = useState([]);
    const [favoritesAmount, setFavoritesAmount] = useState(0);

    useEffect(() => {
        if (currency === 'BRL') {
            setSymbol("R$")
        } else if (currency === 'USD') {
            setSymbol('$')
        }
    }, [currency]);

    useEffect(() => {
        const coinAdded = localStorage.getItem("favoriteCoins");
        if(coinAdded){
            setAlreadyAddedCoins(JSON.parse(coinAdded));
        };
    }, []);

    useEffect(() => {
        const itemAmount = alreadyAddedCoins.reduce((acc, item) => {
            return acc + item.amount;
        }, 0);
        setFavoritesAmount(itemAmount);
    }, [alreadyAddedCoins])
    
    const toggleSideBar = () => {
        setIsOpen(!isOpen);
    };
    const toggleDarkMode = () => {
        setDark(!dark);
    };

    const handleFavoriteCoin = (coin) => {
        const newCoin = { ...coin, amount : 1 };
        const coinExists = alreadyAddedCoins.some((c) => c.id === newCoin.id);
        if (!coinExists) {
            const newCoins = [...Object.values(alreadyAddedCoins), newCoin];
            localStorage.setItem("favoriteCoins", JSON.stringify(newCoins));
        } else {
            alert("ja foi adicionado.")
        }
    };

    const handleDelete = (coin, index) => {
        const newCoins = [...alreadyAddedCoins];
        newCoins.splice(index, 1);
        setAlreadyAddedCoins(newCoins);
        localStorage.setItem("favoriteCoins", JSON.stringify(newCoins));
        console.log(newCoins);
    };

    return (
        <Crypto.Provider
            value={{
                currency, setCurrency, symbol, dark, toggleDarkMode, toggleSideBar,handleDelete, isOpen, price, days, setDays, favorites, setFavorites, handleFavoriteCoin, favoritesAmount
            }}
        >
            {children}
        </Crypto.Provider>
    );
}

export default CryptoContext;