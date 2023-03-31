import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../Config/Api';
import { CryptoState } from '../Contexts/Context';

const CryptoCoin = () => {
    const {id} = useParams();
    const [coin, setCoin] = useState();
    const {currency, symbol, dark} = CryptoState();

    const fetchCoin = async () => {
        try {
            const res = await axios.get(SingleCoin(id));
            console.log(res)
            setCoin(res);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchCoin();
    }, [currency])
    return (
        <>
            <div className={` ${dark ? 'bg-slate-100' : 'bg-neutral-800'} h-screen w-screen flex justify-center flex-row`}>
                <div className={` ${dark ? 'text-black' : 'text-white'} h-full pt-14 w-5/6 bg-white mx-auto`} >
                    <div className='w-2/5 bg-red-600 h-full' >

                    </div>
                </div>
            </div>
        </>
    )
}

export default CryptoCoin