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
    const [addedCoin, setAddedCoin] = useState(false);
    const [alreadyAdded, setAlreadyAdded] = useState(false);

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
    }, [alreadyAddedCoins]);
    
    const handleFavoriteCoin = (coin) => {
        const newCoin = { ...coin, amount : 1 };
        console.log(alreadyAddedCoins);
        const coinExists = alreadyAddedCoins.some((c) => c.id === newCoin.id);
        if (!coinExists) {
            const newCoins = [...alreadyAddedCoins, newCoin];
            localStorage.setItem("favoriteCoins", JSON.stringify(newCoins));
            setAddedCoin(true);
        } else {
            setAlreadyAdded(true);
        }
    };

    const handleDelete = (coin, index) => {
        const newCoins = [...alreadyAddedCoins];
        newCoins.splice(index, 1);
        setAlreadyAddedCoins(newCoins);
        localStorage.setItem("favoriteCoins", JSON.stringify(newCoins));
        console.log(newCoins);
    };
    const toggleSideBar = () => {
        setIsOpen(!isOpen);
    };
    const toggleDarkMode = () => {
        setDark(!dark);
    };


    return (
        <Crypto.Provider
            value={{
                currency, setCurrency, symbol, dark, toggleDarkMode, toggleSideBar,handleDelete, isOpen, price, days, setDays, favorites, setFavorites, handleFavoriteCoin, favoritesAmount, addedCoin, alreadyAdded, setAddedCoin, setAlreadyAdded
            }}
        >
            {children}
        </Crypto.Provider>
    );
}

export default CryptoContext;