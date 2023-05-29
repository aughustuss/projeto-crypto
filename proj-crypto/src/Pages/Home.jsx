import React from 'react'
import { CryptoState } from '../Contexts/Context'
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