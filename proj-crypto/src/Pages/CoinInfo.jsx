import React, { useEffect, useState } from 'react'
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

Chart.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement
)

const CoinInfo = ({ coin }) => {

  const [loading, setLoading] = useState(true);
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const [selected, setSelected] = useState();
  const { currency, theme } = CryptoState();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricalData(data.prices);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [days, currency])

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className='flex'>
          {!loading && historicalData.length > 1 ? (
            <div className='flex w-full h-full flex-col'>
              <Line
                data={{
                  labels: historicalData.map((item) => {
                    let date = new Date(item[0]);
                    let time = `${(date.getHours() + 24) % 24}:${date.getMinutes()}`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),
                  datasets: [
                    {
                      label: 'Preço',
                      data: historicalData.map((coin) => coin[1]),
                      borderColor: "rgb(126, 34, 206)",
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
                        color: 'rgb(126, 34, 206)'
                      }
                    }
                  },
                }}
              />
              <div className='flex w-full justify-between mt-8 p-2 gap-8'>
                {chartDays.map((day) => {
                  return (
                    <button
                      key={day.value}
                      onClick={() => {
                        setDays(day.value);
                        setSelected(day.value);
                      }}
                      value={day.value}
                      className={`${selected === day.value ? 'border-purple-900 bg-purple-900 font-semibold ' : 'border-purple-600'} border-2 w-full rounded-sm p-2 hover:bg-purple-600 transition duration-500`}>{day.label}</button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className='flex text-center items-center justify-center w-full h-full flex-col'>
              <p className='flex w-full' >Carregando...</p>
              <LinearProgress />
            </div>
          )}
        </div>
      </ThemeProvider>
    </>
  )
}

export default CoinInfo