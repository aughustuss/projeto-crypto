import React from 'react'
import { CryptoState } from '../Contexts/Context'
import CoinsTable from '../Components/CoinsTable'
import Hero from '../Components/Hero'
import News from '../Components/News'


const Home = () => {
    const { dark } = CryptoState();
    return (
        <>
            <div className={` ${dark ? 'bg-slate-100' : 'bg-neutral-800'} font-oswald font-bold h-fit min-h-screen overflow-x-hidden `}>
                <div className='container mx-auto px-2 lg:px-0'>
                    <div>
                        <Hero />
                    </div>
                    <div>
                        <CoinsTable />
                    </div>
                    <div>
                        <News/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home