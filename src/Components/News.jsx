import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_SOME_KEY;
const News = () => {

    const [news, setNews] = useState([]);
    const getCryptoNews = async () => {
        try {
            const news = await axios.get(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${API_KEY}`);
            setNews(news.data.Data);
        } catch (error) {
            console.log(error);
        };
    };
    useEffect(() => { getCryptoNews() }, []);
    return (
        <>
            <section className='w-full py-4 lg:px-0 flex flex-col gap-y-2 text-gray font-poppins'>
                <div className='flex flex-col justify-center lg:justify-start gap-y'>
                    <p className='text-sm lg:text-xl '>Fique por Dentro</p>
                    <p className='font-oswald font-semibold text-3xl lg:text-5xl text-primary'>Aqui você encontra também todas as novidades do mundo das Criptomoedas</p>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 py-2 place-items-center'>
                    {news?.slice(0, 10).map((news) => {
                        return (
                            <div key={news.id} className='bg-secondary min-h-[130px] w-full rounded-md hover:bg-primary transition duration-200 p-2'>
                                <div className='flex flex-row  gap-2'>
                                    <img src={news.imageurl} className='h-full w-full max-w-[120px] rounded-md object-cover' />
                                    <div className='flex flex-col justify-between gap-y-1'>
                                        <div className='flex flex-col gap-y-2'>
                                            <p className='text-xs md:text-sm line-clamp-2 text-offwhite'>{news.title}</p>
                                            <p className=' text-[10px] md:text-xs line-clamp-3 text-offwhite'>{news.body}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className='text-gray text-[10px] flex flex-wrap'>Categorias: {news.categories}</p>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default News