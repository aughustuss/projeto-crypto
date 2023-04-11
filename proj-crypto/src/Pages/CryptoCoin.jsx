import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../Config/Api';
import { CryptoState, price, theme } from '../Contexts/Context';
import CoinInfo from './CoinInfo';
import { LinearProgress, ThemeProvider } from '@mui/material';

const CryptoCoin = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol, dark, theme } = CryptoState();
    const [loading, setLoading] = useState(true);

    const fetchCoin = async () => {
        try {
            const res = await axios.get(SingleCoin(id.toLowerCase()));
            setCoin(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err)
        }
    }

    

    useEffect(() => {
        fetchCoin();
    }, [])
    return (
        <>
            <ThemeProvider theme={theme}>
                {!loading ? (
                    <div className={` ${dark ? 'bg-slate-100' : 'bg-neutral-800'} font-oswald h-screen w-screen flex justify-center overflow-y-scroll`}>
                        <div className={` ${dark ? 'text-black' : 'text-white'} h-full mt-36 sm:mt-30 md:mt-30 lg:mt-20 w-5/6 flex justify-center sm:flex-col lg:flex-row flex-col`} >
                            <div className={`${dark ? 'border-slate-300' : 'border-neutral-600'} lg:w-2/5 h-full flex flex-col lg:border-r p-2  items-center`} >
                                <img src={coin?.image.large} alt={coin?.name} className='lg:w-1/2' />
                                <p className='text-4xl font-bold capitalize'>{coin?.name}</p>
                                <p className='text-center' >{coin?.description.en.split('. ')[0]}.</p>
                                <div className='font-extrabold text-xl md:text-2xl items-start w-full flex flex-col gap-4 lg:pt-12' >
                                    <p>Rank: {coin?.market_cap_rank}</p>
                                    <p>Preço atual: {symbol}{" "}{price(coin?.market_data.current_price[currency.toLowerCase()])}</p>
                                    <p>Preço total do mercado: {symbol}{" "}{price(coin?.market_data.market_cap[currency.toLowerCase()]?.toString().slice(0, -6))}M</p>
                                </div>
                            </div>
                            <div className='lg:w-3/5 flex flex-col h-full' >
                                <CoinInfo coin={coin} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col w-full h-full justify-center items-center' >
                        <p className='flex w-full' >Carregando...</p>
                        <LinearProgress />
                    </div>
                )}
            </ThemeProvider>
        </>
    )
}

export default CryptoCoin