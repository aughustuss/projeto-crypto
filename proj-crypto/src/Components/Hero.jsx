import React, { useEffect, useState } from 'react'
import { CryptoState } from '../Contexts/Context'
import { Link } from 'react-router-dom'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
const Hero = () => {
    const { dark, currency, symbol, price } = CryptoState();
    const [trendingCoins, setTrendingCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const responsive =
    {
        0: {
            items: 2,
        },
        640: {
            items:3,
        },
        768: {
            items: 4,
        },
        1024: {
            items: 6,
        }
    };

    const getTrendingCoins = async () => {
        try {
            const trendingCoin = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`, {
                headers: {
                    'Content-Type': 'Application/json',
                }
            });
            setLoading(false);
            setTrendingCoins(trendingCoin.data);
        } catch (error) {
            console.log(error)
        };
    };

    useEffect(() => { getTrendingCoins() }, [currency]);

    const items = trendingCoins.map((item) => {
        let profit = item?.price_change_percentage_24h >= 0;
        return (
            <Link
                to={`coin/${item.id}`}
                className='h-52 w-52 flex flex-col justify-center group'
            >
                <img className='p-14 object-cover md:p-10 lg:p-12 group-hover:scale-105 transition duration-200' src={item?.image} alt={item?.name} />
                <div className='flex flex-row justify-center items-center gap-2'>
                    <span className='text-md uppercase text-purple-700'> {item?.symbol}</span>
                    <span className={`${profit && profit ? 'text-green-600' : 'text-red-600'}`} >{profit && '+ '}{item?.price_change_percentage_24h?.toFixed(2)}%</span>
                </div>

                <span className={`${dark ? 'text-black' : 'text-white'}`} >{symbol} {price(item?.current_price?.toFixed(2))}</span>
            </Link>
        )
    });
    return (
        <>
            <div className='flex justify-center w-full pt-14 text-gray'>
                <div className='h-4/6 md:h-5/6 lg:h-5/6 flex items-center w-full text-center flex-col  pt-24' >
                    <div className='h-1/2 w-full  justify-evenly gap-4 flex flex-col'>
                        <p className='text-6xl md:text-8xl'>Análise de Criptomoedas</p>
                        <p className='font-poppins'>Tenha todas as informações de qualquer moeda ou procure a sua favorita!</p>
                    </div>
                    <div className='flex flex-col justify-center items-center w-screen min-h-[340px]'>
                        {!loading ? (
                            <AliceCarousel
                                infinite
                                autoPlay
                                autoPlayInterval={1000}
                                animationDuration={2000}
                                responsive={responsive}
                                items={items}
                                disableButtonsControls
                                disableDotsControls
                                
                            />
                        ) : (
                            <div className='min-h-[300px] w-full flex flex-row items-center justify-center text-gray text-lg'>
                                <p className='flex flex-row items-center gap-x-2'>Carregando... <span className='animate-spin'><AiOutlineLoading3Quarters/></span> </p>
                            </div>
                        )}
                    </div>
                </div>

            </div >
        </>
    )
}

export default Hero