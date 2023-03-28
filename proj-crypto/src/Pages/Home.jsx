import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TrendingCoins } from '../Config/Api'
import { CryptoState } from '../Contexts/Context'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'

const Home = () => {
    const { dark, toggleDarkMode, currency } = CryptoState();
    const [trending, setTrending] = useState([]);

    const responsive = {
        0: {
            items: 2
        },
        512: {
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
    console.log('trending: ', trending);
    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const items = trending.map((item) => {
        return (
            <Link
                to={`coin/${item.id}`}
                className='h-fit w-fit '
            >
                <img className='p-10 ' src={item.image} alt={item.name} height='100%' width='100%' />
                <div className='flex flex-row justify-center items-center'>
                    <span className={`${!dark ? 'text-white' : 'text-black'}`} >{item.name}</span>
                    <span className='text-md uppercase text-purple-700'>{`(${item.symbol})`}</span>
                </div>
            </Link>
        )
    })

    return (
        <>
            <div className={` ${dark ? 'bg-slate-100' : 'bg-neutral-800'} font-oswald font-bold w-screen h-screen overflow-x-hidden`}>
                <div className='h-full w-full flex justify-center mx-auto pt-14'>
                    <div className=' md:h-5/6 w-5/6  flex items-center text-center flex-col  pt-24' >
                        <div className='h-1/2 w-full  justify-evenly flex flex-col'>
                            <p className={`${dark ? 'text-black' : 'text-white'} text-6xl md:text-8xl`}>Análise de Criptomoedas</p>
                            <p className='text-neutral-400' >Tenha todas as informações de qualquer moeda ou procure a sua favorita!</p>
                        </div>
                        <div className='h-1/2 w-full justify-center items-center flex'>
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
            </div>
        </>
    )
}

export default Home