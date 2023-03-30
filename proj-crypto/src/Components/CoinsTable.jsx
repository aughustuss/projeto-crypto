import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CryptoState } from '../Contexts/Context'
import { CoinList } from '../Config/Api'
import { LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider } from '@mui/material'

const CoinsTable = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true)
    const [coin, setCoin] = useState([]);
    const { currency, dark, theme, StyledTextField } = CryptoState();
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
    console.log(coin);
    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const filteredSearch = search.length > 0 ? coin.filter(item => item.name.includes(search)) : [];

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className='w-5/6 mx-auto md:h-full' >
                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex flex-col gap-4'>
                            <p className={`${dark ? 'text-black' : 'text-white'} text-6xl text-center`}>OPA</p>
                            <StyledTextField
                                label='Pesquise por uma moeda'
                                fullWidth
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>
                        <TableContainer>
                            {loading ? (
                                <LinearProgress />
                            ) : (
                                <Table>
                                    <TableHead className='bg-purple-800 ' >
                                        <TableRow>
                                            {['Moeda', 'Preço', 'Mudança em 24h', 'Valor de Mercado'].map((item) => {
                                                return (
                                                    <TableCell
                                                        style={{
                                                            color: (dark ? 'black' : 'white'),
                                                            fontWeight: '600'
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
                                    <TableBody>
                                        {search.length > 0 ? (
                                            <TableRow>
                                                {filteredSearch.map((row) => {
                                                    return (
                                                        <TableCell key={row.name} >{row.name}</TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        ) : (
                                            <TableRow>
                                                {coin.map((row) => {
                                                    return (
                                                        <TableCell key={coin.name} >{coin.name}</TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                        </TableContainer>
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}

export default CoinsTable