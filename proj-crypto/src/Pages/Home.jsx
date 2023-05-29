import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { TrendingCoins } from '../Config/Api'
import { CryptoState } from '../Contexts/Context'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import CoinsTable from '../Components/CoinsTable'
import Hero from '../Components/Hero'


const Home = () => {
    const { dark, toggleDarkMode, currency, symbol, price } = CryptoState();
    return (
        <>
            <div className={` ${dark ? 'bg-slate-100' : 'bg-neutral-800'} font-oswald font-bold h-fit min-h-screen overflow-x-hidden `}>
                <div className='container mx-auto px-4 lg:px-0'>
                    <div>
                        <Hero />
                    </div>
                    <div className='container mx-auto px-4 lg:px-0'>
                        <CoinsTable />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home