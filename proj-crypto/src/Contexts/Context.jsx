import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
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

    const [favorites, setFavorites] = useState([]);
    const [alreadyAddedCoins, setAlreadyAddedCoins] = useState([]);

    const [coinList, setCoinList] = useState([]);
    const [singleCoin, setSingleCoin] = useState([]);
    const [historicalCoin, setHistoricalCoin] = useState([]);
    const [trendingCoin, setTrendingCoin] = useState([]);
    useEffect(() => {
        getCoinList();
    }, [currency]);

    useEffect(() => {
        getTrendingCoins();
    }, [currency])

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

    const toggleDarkMode = () => {
        setDark(!dark);
    };

    const handleFavoriteCoin = (coin) => {
        const newCoin = { ...coin };
        const coinExists = alreadyAddedCoins.some((c) => c.id === newCoin.id)
        console.log(alreadyAddedCoins);
        console.log(newCoin);
        if (!coinExists) {
            const newCoins = [...Object.values(alreadyAddedCoins), newCoin];
            localStorage.setItem("favoriteCoins", JSON.stringify(newCoins));
        } else {
            alert("ja foi adicionado.")
        }
    };

    const getCoinList = async () => {
        try {
            const listCoins = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setCoinList(listCoins.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getSingleCoin = async (id) => {
        try {
            const singleCoin = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
            setSingleCoin(singleCoin.data);
        } catch (error) {
            console.log(error)
        }
    };

    const getHistoricalCoin = async (id) => {
        console.log(id);
        try {
            const historicalCoin = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
            setHistoricalCoin(historicalCoin.data);
        } catch (error) {
            console.log(error);
        };
    };

    const getTrendingCoins = async () => {
        try {
            const trendingCoin = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`);
            setTrendingCoin(trendingCoin.data);
        } catch (error) {
            console.log(error)
        };
    };

    return (
        <Crypto.Provider
            value={{
                currency, setCurrency, symbol, dark, toggleDarkMode, price, coinList, singleCoin, historicalCoin, trendingCoin, days, setDays, favorites, setFavorites, getHistoricalCoin, handleFavoriteCoin, getSingleCoin
            }}
        >
            {children}
        </Crypto.Provider>
    );
}

export default CryptoContext;