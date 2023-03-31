import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../Config/Api';
import { CryptoState, price } from '../Contexts/Context';
import CoinInfo from './CoinInfo';
import ReactHtmlParser from 'react-html-parser'

const CryptoCoin = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol, dark } = CryptoState();

    const fetchCoin = async () => {
        try {
            const res = await axios.get(SingleCoin(id.toLowerCase()));
            console.log(res);
            setCoin(res.data);
        } catch (err) {
            console.log(err)
        }
    }
    console.log('coin: ', coin);
    useEffect(() => {
        fetchCoin();
    }, [])
    return (
        <>
            <div className={` ${dark ? 'bg-slate-100' : 'bg-neutral-800'} h-screen w-screen flex justify-center`}>
                <div className={` ${dark ? 'text-black' : 'text-white'} h-full pt-20 w-5/6 flex justify-center md:flex-row flex-col`} >
                    <div className='w-full md:w-2/5 lg:w-2/5 h-full flex flex-col lg:border-r p-2 lg:border-slate-300 items-center' >
                        <img src={coin?.image.large} alt={coin?.name} className='lg:w-1/2' />
                        <p className='text-4xl font-bold capitalize'>{coin?.name}</p>
                        <p className='text-center' >{ReactHtmlParser(coin?.description.en.split('. ')[0])}.</p>
                        <div className='font-bold text-xl md:text-2xl items-start w-full flex flex-col gap-4 lg:pt-12' >
                            <p>Rank: {coin?.market_cap_rank}</p>
                            <p>Preço atual: {symbol}{" "}{price(coin?.market_data.current_price[currency.toLowerCase()])}</p>
                            <p>Preço total do mercado: {symbol}{" "}{price(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M</p>
                        </div>
                    </div>
                    <div className='w-full sm:w-3/5 lg:w-3/5 h-full ' >
                        <CoinInfo coin={coin} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CryptoCoin