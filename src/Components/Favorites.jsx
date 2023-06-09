import React from 'react'
import { CryptoState, price } from '../Contexts/Context'
import { IoMdTrash } from 'react-icons/io'

const Favorites = () => {
    const { isOpen, currency, symbol, handleDelete } = CryptoState();
    const favorites = JSON.parse(localStorage.getItem("favoriteCoins"));
    
    return (
        <>
            <div className={`${isOpen ? 'right-0' : '-right-full'} transition-all p-2 duration-200 overflow-auto bg-primary text-offwhite w-full md:w-2/4 lg:w-1/3 xl:w-1/3 shadow-md h-full z-30 fixed flex flex-col justify-between top-0`}>
                <div className='pt-20 px-2 flex flex-col gap-y-4'>
                    <p className='font-oswald text-center text-3xl font-semibold'>Veja aqui as suas moedas favoritadas</p>
                    <div className='flex flex-col gap-y-2'>
                        {favorites && favorites.map((coin) => {
                            let profit = coin.price_change_percentage_24h >= 0;
                            return (
                                <div className='w-full p-2 flex flex-col justify-between items-center font-poppins border hover:bg-secondary shadow-md transition duration-200 cursor-pointer border-secondary rounded-md min-h-[70px]'>
                                    <p className='text-xl font-oswald font-semibold'>{coin?.name}</p>
                                    <div className='flex flex-row items-center gap-x-2 h-full w-full text-xs'>
                                        <img className=' object-cover w-[50px]' src={coin?.image?.small} />
                                        <div className='flex flex-col flex-1'>
                                            <div className='flex flex-col justify-between  '>
                                                <p>Preço atual - {symbol}{" "}{price(coin?.market_data?.current_price[currency.toLowerCase()])}</p>
                                                <p className='tracking-wide text-xs flex flex-row items-center gap-x-1' >
                                                    Variação do mercado: <span className={`${profit && profit ? 'text-green-600 ' : 'text-red-500'} font-semibold`}>{profit && '+ '}{coin.market_data?.price_change_percentage_24h?.toFixed(2)}%</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col flex-1'>
                                            <p>Colocação: {coin?.market_cap_rank}</p>
                                            <p>Última atualização: {new Date(coin?.last_updated).toLocaleDateString()}</p>
                                        </div>
                                        <button onClick={()=> handleDelete(coin)} title='Excluir item' className='hover:bg-primary rounded-md p-2'>
                                            <IoMdTrash size={24} />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <button onClick={() => {localStorage.removeItem("favoriteCoins")}} title="Excluir todos os itens" className='w-full p-2 rounded-md border mt-2 border-secondary hover:bg-secondary transition duration-200'>
                    Remover tudo
                </button>
            </div>
        </>
    )
}

export default Favorites