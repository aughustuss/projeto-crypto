import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../Config/Api';
import { CryptoState, price, theme } from '../Contexts/Context';
import CoinInfo from '../Components/CoinInfo';
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
                    <div className={` ${dark ? 'bg-slate-100' : 'bg-neutral-800'} font-oswald h-full flex justify-center `}>
                        <div className={` ${dark ? 'text-black' : 'text-white'} h-full mt-20 min-h-[700px] container mx-auto px-4 flex justify-center flex-col lg:flex-row gap-y-4`} >
                            <div className={`${dark ? 'border-slate-300' : 'border-neutral-600'} justify-between flex-1 lg:max-w-sm flex flex-col lg:border-r p-2 gap-y-4 items-center`} >
                                <img src={coin?.image.large} alt={coin?.name} className='lg:w-1/2' />
                                <p className='text-4xl font-bold capitalize'>{coin?.name}</p>
                                <p className='text-center' dangerouslySetInnerHTML={{ __html: (coin?.description.en.split('. ')[0]) }}></p>
                                <div className='font-extrabold text-xl md:text-2xl items-start w-full flex flex-col gap-4 lg:pt-12' >
                                    <p>Rank - {coin?.market_cap_rank}</p>
                                    <p>Preço atual - {symbol}{" "}{price(coin?.market_data.current_price[currency.toLowerCase()])}</p>
                                    <p>Preço total do mercado - {symbol}{" "}{price(coin?.market_data.market_cap[currency.toLowerCase()]?.toString().slice(0, -6))}M</p>
                                </div>
                                <button className='w-full border-2 border-purple-700 rounded-md p-2 hover:bg-purple-700 transition duration-200'>Adicionar aos Favoritos</button>
                            </div>
                            <div className='flex-1 flex flex-col w-full ' >
                                <CoinInfo coin={coin} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col w-full h-full text-center justify-center items-center' >
                        <p className='flex w-full text-center' >Carregando...</p>
                        <LinearProgress />
                    </div>
                )}
            </ThemeProvider>
        </>
    )
}

export default CryptoCoin