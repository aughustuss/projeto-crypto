import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../Config/Api'
import { CryptoState } from '../Contexts/Context';
import axios from 'axios';
import { Line } from 'react-chartjs-2'

const CoinInfo = ({ coin }) => {

  const [loading, setLoading] = useState(true);
  const [historicalData, setHistoricalData] = useState([]);
  const [day, setDay] = useState(1);
  const { currency } = CryptoState();

  const fetchData = async () => {
    try {
      const res = await axios.get(HistoricalChart(coin.id, day, currency));
      console.log(res.data.prices);
      setHistoricalData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(historicalData)

  useEffect(() => {
    fetchData();
  },
    [currency, day])
  return (
    <>
      
        {!loading ? (
          <Line
            data={{
              labels: historicalData.map((item) => {
                let date = new Date(item[0]);
                let time = `${(date.getHours() + 24) % 24}:${date.getMinutes()}`;
                return day === 1 ? time : date.toLocaleDateString();
              }),
            }}
          />
        ) : (
          <div>
            Carregando
          </div>
        )}
      
    </>
  )
}

export default CoinInfo