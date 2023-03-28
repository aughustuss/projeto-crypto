import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CryptoState } from '../Contexts/Context'
import { CoinList } from '../Config/Api'

const CoinsTable = () => {
    const [coin, setCoin] = useState([]);
    const {currency} = CryptoState();
    const fetchCoins = async () => {
        const res = await axios.get(CoinList(currency), {
            headers: {
                'Content-Type':'Application/json'
            }
        })
        setCoin(res.data);
    }

    useEffect(() => {
        fetchCoins();
    }, [currency])

    return (
        <>
            <div className='w-5/6 mx-auto md:h-full' >
                <div className='w-full bg-white'>
                    Opa
                </div>
            </div>
        </>
    )
}

export default CoinsTable