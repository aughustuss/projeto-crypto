import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TrendingCoins } from '../Config/Api'
import { CryptoState } from '../Contexts/Context'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import CoinsTable from '../Components/CoinsTable'


const Home = () => {
    const { dark, toggleDarkMode, currency, symbol, price } = CryptoState();
    const [trending, setTrending] = useState([]);

    const responsive = {
        0: {
            items: 2
        },
        678: {
            items: 4
        }
    }
    const fetchCoins = async () => {
        const res = await axios.get(TrendingCoins(currency), {
            headers: {
                'Content-Type': 'Application/json'
            }
        })
        setTrending(res.data)
    };

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const items = trending.map((item) => {
        let profit = item.price_change_percentage_24h >= 0;
        return (
            <Link
                to={`coin/${item.id}`}
                className='h-fit w-fit '
            >
                <img className='p-10 md:p-10 lg:p-16 ' src={item.image} alt={item.name} />
                <div className='flex flex-row justify-center items-center gap-2'>
                    <span className='text-md uppercase text-purple-700'> {item.symbol}</span>
                    <span className={`${profit && profit ? 'text-green-600' : 'text-red-600'}`} >{profit && '+ '}{item.price_change_percentage_24h?.toFixed(2)}%</span>
                </div>
                
                <span className={`${dark ? 'text-black' : 'text-white'}`} >{symbol} {price(item.current_price.toFixed(2))}</span>
            </Link>
        )
    })
    return (
        <>
            <div className={` ${dark ? 'bg-slate-100' : 'bg-neutral-800'} font-oswald font-bold w-screen h-screen overflow-x-hidden`}>
                <div className=' w-full flex justify-center mx-auto pt-14'>
                    <div className='h-4/6 md:h-5/6 lg:h-5/6 w-5/6  flex items-center text-center flex-col  pt-24' >
                        <div className='h-1/2 w-full  justify-evenly gap-4 flex flex-col'>
                            <p className={`${dark ? 'text-black' : 'text-white'} text-6xl md:text-8xl`}>Análise de Criptomoedas</p>
                            <p className='text-neutral-400' >Tenha todas as informações de qualquer moeda ou procure a sua favorita!</p>
                        </div>
                        <div className=' w-full justify-center items-center flex'>
                            <AliceCarousel
                                mouseTracking
                                infinite
                                autoPlay
                                autoPlayInterval={1000}
                                animationDuration={2000}
                                disableDotsControls
                                responsive={responsive}
                                items={items}
                                disableButtonsControls
                            />

                        </div>
                    </div>
                   
                </div> 
                <div>
                    <CoinsTable/>
                </div>
            </div>
        </>
    )
}

export default Home