import React, { useContext, useEffect, useState } from 'react'
import { HistoricalChart } from '../Config/Api'
import { CryptoState } from '../Contexts/Context';
import axios from 'axios';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { chartDays } from '../Config/Data';
import { LinearProgress, ThemeProvider } from '@mui/material';
import { theme } from '../Config/Theme'
import { useParams } from 'react-router-dom';
Chart.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement
)

const CoinInfo = ({ coin }) => {

  const [selected, setSelected] = useState();
  const { currency, days, setDays } = CryptoState();
  const [historicalCoin, setHistoricalCoin] = useState([]);
  const { id } = useParams();

  const getHistoricalCoin = async () => {
    console.log(id);
    try {
      const historicalCoin = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
      setHistoricalCoin(historicalCoin.data);
    } catch (error) {
      console.log(error);
    };
  };

  console.log(historicalCoin);

  useEffect(() => {getHistoricalCoin()}, [days, currency]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className='flex h-full w-full'>

          <div className='flex w-full h-full justify-between flex-col'>
            <p className='text-center text-4xl'> {`Variação em ${days} ${days > 1 ? 'dias' : 'dia'}`}</p>
            <Line
              data={{
                labels: historicalCoin?.map((item) => {
                  let date = new Date(item[0]);
                  let time = `${(date.getHours() + 24) % 24}:${date.getMinutes()}`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    label: 'Preço',
                    data: historicalCoin?.prices?.map((cap) => cap[1]),
                    borderColor: "#065f46",
                    axis: 'y',
                    fill: false,
                    borderWidth: 2
                  }
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                    backgroundColor: 'white',
                    pointStyle: 'circle',
                    borderWidth: 1,
                    borderColor: '#fff'
                  }
                },
                responsive: true,
                scales: {
                  x: {
                    display: true,
                    title: {
                      display: true,
                      text: 'Tempo'
                    }
                  },
                  y: {
                    display: true,
                    title: {
                      display: true,
                      text: `Preço ( Últimos ${days} dias ) em ${currency}`,
                      color: '#065f46'
                    }
                  }
                },
              }}
            />
            <div className='flex lg:flex-row flex-col w-full justify-between mt-8 p-2 gap-2 lg:gap-8'>
              {chartDays.map((day) => {
                return (
                  <button
                    key={day.value}
                    onClick={() => {
                      setDays(day.value);
                      setSelected(day.value);
                    }}
                    value={day.value}
                    className={`${selected === day.value ? 'border-primary bg-primary font-semibold ' : 'border-secondary'} border-2 w-full rounded-md p-2 hover:bg-secondary transition duration-500`}>{day.label}</button>
                )
              })}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default CoinInfo