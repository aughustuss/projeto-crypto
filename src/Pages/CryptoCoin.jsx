import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState, price } from '../Contexts/Context';
import CoinInfo from '../Components/CoinInfo';
import { Alert, Snackbar, ThemeProvider } from '@mui/material';
import { theme } from '../Config/Theme'
import axios from 'axios';

const CryptoCoin = () => {
    const { id } = useParams();
    const { currency, symbol, dark, handleFavoriteCoin, setAddedCoin, addedCoin, alreadyAdded, setAlreadyAdded } = CryptoState();
    const [singleCoin, setSingleCoin] = useState([]);
    const getSingleCoin = async () => {
        try {
            const singleCoin = await axios.get(`https://api.coingecko.com/api/v3/coins/${(id).toLowerCase()}`);
            setSingleCoin(singleCoin.data);
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        getSingleCoin();
    }, [id]);
    return (
        <>
            <ThemeProvider theme={theme}>
                <div className={` ${dark ? 'bg-slate-100' : 'bg-neutral-800'} text-gray  font-oswald h-full flex justify-center `}>
                    <div className='h-full text-gray mt-20 min-h-[700px] container mx-auto px-4 flex justify-center flex-col lg:flex-row gap-y-4' >
                        <div className={`${dark ? 'border-slate-300' : 'border-neutral-600'} justify-between flex-1 lg:max-w-sm flex flex-col lg:border-r p-2 gap-y-4 items-center`} >
                            <img src={singleCoin?.image?.large} alt={singleCoin?.name} className='lg:w-1/2' />
                            <p className='text-4xl font-bold capitalize'>{singleCoin?.name}</p>
                            <p className='text-center' dangerouslySetInnerHTML={{ __html: (singleCoin?.description?.en.split('. ')[0]) }}></p>
                            <div className='font-extrabold text-xl md:text-2xl items-start w-full flex flex-col gap-y-2 lg:pt-12' >
                                <p>Rank - {singleCoin?.market_cap_rank}</p>
                                <p>Preço atual - {symbol}{" "}{price(singleCoin?.market_data?.current_price[currency.toLowerCase()])}</p>
                                <p>Preço total do mercado - {symbol}{" "}{price(singleCoin?.market_data?.market_cap[currency?.toLowerCase()]?.toString()?.slice(0, -6))}M</p>
                            </div>
                            <button onClick={() => handleFavoriteCoin(singleCoin)} className='w-full border-2 border-secondary rounded-md p-2 hover:bg-secondary transition duration-200'>Adicionar aos Favoritos</button>
                        </div>
                        <div className='flex-1 flex flex-col w-full ' >
                            <CoinInfo/>
                        </div>
                    </div>
                    <Snackbar open={addedCoin} autoHideDuration={6000} onClose={() => setAddedCoin(false)}>
                        <Alert severity='success' variant='filled' onClose={() => setAddedCoin(false)}>Adicionado com sucesso.</Alert>
                    </Snackbar>
                    <Snackbar open={alreadyAdded} autoHideDuration={6000} onClose={() => setAlreadyAdded(false)}>
                        <Alert severity='error' variant='filled' onClose={() => setAlreadyAdded(false)} >Já foi adicionado.</Alert>
                    </Snackbar>
                    
                </div>
            </ThemeProvider>
        </>
    )
}

export default CryptoCoin