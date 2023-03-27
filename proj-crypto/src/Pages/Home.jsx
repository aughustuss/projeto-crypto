import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TrendingCoins } from '../Config/Api'
import { CryptoState } from '../Contexts/Context'

const Home = () => {
    const { dark, toggleDarkMode, currency } = CryptoState();
    const [trending, setTrending] = useState([]);
    
    const fetchCoins = async () => {
        const { res } = await axios.get(TrendingCoins(currency))
        console.log(res);
        setTrending(res);
    }
    useEffect(() => {
        fetchCoins();
    }, [currency]);

    console.log(currency);
    return (
        <>
            <div className={` ${dark ? 'bg-slate-100' : 'bg-neutral-800'} font-oswald font-bold w-screen h-screen overflow-x-hidden`}>
                <div className='h-full w-full flex justify-center mx-auto pt-14'>
                    <div className=' md:h-5/6 w-5/6  flex items-center text-center flex-col  pt-24' >
                        <div className='h-1/2 w-full bg-green-600 justify-evenly flex flex-col'>
                            <p className={`${dark ? 'text-black' : 'text-white'} text-6xl md:text-8xl`}>Análise de Criptomoedas</p>
                            <p className='text-neutral-400' >Tenha todas as informações de qualquer moeda ou procure a sua favorita!</p>
                        </div>
                        <div className='h-1/2 bg-red-600 w-full justify-center items-center flex'>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Home