import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CryptoState } from '../Contexts/Context'
import { CoinList } from '../Config/Api'
import { LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider } from '@mui/material'

const CoinsTable = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true)
    const [coin, setCoin] = useState([]);
    const [page, setPage] = useState(1)
    const { currency, dark, theme, StyledTextField, symbol, price } = CryptoState();
    const navigate = useNavigate();

    const fetchCoins = async () => {
        try {
            const res = await axios.get(CoinList(currency), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setCoin(res.data);
            setLoading(false)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const filteredSearch = search.length > 0 ? coin.filter(item => item.name.toLowerCase().includes(search.toLowerCase())) : [];
    return (
        <>
            <ThemeProvider theme={theme}>
                <div className='w-5/6 mx-auto md:h-full ' >
                    <div className='w-full flex flex-col gap-4 pt-12'>
                        <div className='flex flex-col gap-4'>
                            <p className={`${dark ? 'text-black' : 'text-white'} text-4xl text-center`}>Veja todas as informações das suas Cripto Moedas preferidas!</p>
                            <StyledTextField
                                label='Pesquise por uma moeda'
                                fullWidth
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>
                        <TableContainer >
                            {loading ? (
                                <LinearProgress />
                            ) : (
                                <Table >
                                    <TableHead className='bg-purple-800 w-full flex' >
                                        <TableRow>
                                            {['Moeda', 'Preço', 'Mudança em 24h', 'Valor total do Mercado'].map((item) => {
                                                return (
                                                    <TableCell
                                                        style={{
                                                            color: (dark ? 'black' : 'white'),
                                                            fontWeight: '600',
                                                            fontSize: '90%'
                                                        }}
                                                        key={item}
                                                        align={item === 'Moeda' ? '' : 'right'}
                                                    >
                                                        {item}
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody  >
                                        {search.length > 0 ? (
                                            filteredSearch.map((row) => {
                                                let profit = row.price_change_percentage_24h >= 0;
                                                return (
                                                    <TableRow className={`hover:bg-neutral-500 transition duration-300 h-16 hover:cursor-pointer`} key={row.name} onClick={() => { navigate(`/coin/${row.name}`) }} >
                                                        <TableCell scope='row'>
                                                            <div className='flex items-center'>
                                                                <img src={row.image} alt={row.name} className='h-full lg:w-1/12 md:w-2/12 w-4/12' />
                                                                <div className={`${dark ? 'text-black' : 'text-white'} flex flex-col justify-center font-bold w-1/2 h-full ml-4`}>
                                                                    <span>{row.name}</span>
                                                                    <span className='uppercase'>{row.symbol}</span>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            <p className={`${dark ? 'text-black' : 'text-white'} font-bold`}>
                                                                {symbol}{" "}
                                                                {price(row.current_price.toFixed(2))}
                                                            </p>
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            <p className={`${profit && profit ? 'text-green-600 ' : 'text-red-600'} font-bold`} >
                                                                {profit && '+ '}{row.price_change_percentage_24h?.toFixed(2)}%
                                                            </p>
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            <p className={`${dark ? 'text-black' : 'text-white'} font-bold`}>
                                                                {symbol}{" "}{price(row.market_cap.toString().slice(0, -6))}M
                                                            </p>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        ) : (
                                            coin.slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                                                let profit = row.price_change_percentage_24h >= 0;
                                                return (
                                                    <TableRow className='hover:bg-neutral-500 transition duration-300 h-16 hover:cursor-pointer' key={row.name} onClick={() => { navigate(`/coin/${row.name}`) }}  >
                                                        <TableCell scope='row'>
                                                            <div className='flex items-center'>
                                                                <img src={row.image} alt={row.name} className='h-full lg:w-1/12 md:w-2/12 w-4/12' />
                                                                <div className={`${dark ? 'text-black' : 'text-white'} flex flex-col justify-center font-bold w-1/2 h-full ml-4`}>
                                                                    <span>{row.name}</span>
                                                                    <span className='uppercase'>{row.symbol}</span>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            <p className={`${dark ? 'text-black' : 'text-white'} font-bold`}>
                                                                {symbol}{" "}
                                                                {price(row.current_price.toFixed(2))}
                                                            </p>
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            <p className={`${profit && profit ? 'text-green-600 ' : 'text-red-600'} font-bold`} >
                                                                {profit && '+ '}{row.price_change_percentage_24h?.toFixed(2)}%
                                                            </p>
                                                        </TableCell>
                                                        <TableCell align='right'>
                                                            <p className={`${dark ? 'text-black' : 'text-white'} font-bold`}>
                                                                {symbol}{" "}{price(row.market_cap.toString().slice(0, -6))}M
                                                            </p>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                        </TableContainer>
                        <Pagination
                            count={(coin.length / 10).toFixed(2)}
                            style={{
                                justifyContent: 'center',
                                display: 'flex',
                                padding: '20',
                                width: '100%',

                            }}
                            onChange={(_, value) => {
                                setPage(value);
                            }}
                        />
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}

export default CoinsTable