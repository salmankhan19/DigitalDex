import React, { useEffect as UseEffect, useState as UseState } from 'react';
import axios from "axios";
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../pages/cryptoContext';
import { makeStyles } from 'tss-react/mui';
import { theme } from '../theme';
import { CircularProgress } from '@mui/material';
import {Line} from "react-chartjs-2";
import { chartDays } from '../config/data';
import SelectButton from './selectButtons';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  


const CoinInfo = ({coin}) => {

    const [historicalData, setHistoricalData] = UseState();
    const [days,setDays] = UseState(1);
    const {currency} = CryptoState();
    const fetchHistoricalData = async () => {
        const {data} = await axios.get(HistoricalChart(coin.id, days, currency))
        setHistoricalData(data.prices);
    };
    
    UseEffect(() => {
        fetchHistoricalData();
    },[days])
    const UseStyles = makeStyles(theme)(() => {
        return ({
          container: {
            width: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 25,
            padding:40,
            [theme.breakpoints.down("md")]: {
                width: "90%",
                marginTop: 0,
                padding: 20,
                paddingTop: 0,
            }
          },
        });
      });
      const {classes} = UseStyles();

    //   const delay = ms => new Promise(
    //     resolve => setTimeout(resolve, ms)
    //   );
    //   const handleClick = async (dayValue) => {
    //     console.log('before');
    //     console.log(dayValue)
    //     setDays(dayValue);
    //     console.log('After setting');
    //     await delay(100);
    //     console.log(days);
    //   };

  return (
    <div className={classes.container}>
    {
        !historicalData ? (
            <CircularProgress style={{color: "gold"}} size={250} thickness={1}/>
        ):(
            <>
            <Line style={{color: "gold"}}
              data={{
                labels: historicalData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time = date.getHours() > 12 
                    ? `${date.getHours() - 12}:${date.getMinutes()}`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days===1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                    {
                        data: historicalData.map((coin) => coin[1]),
                        label: `Price ( Past ${days} Days) in ${currency}`,
                        borderColor: "#EEBC1D",
                    },
                ]
              }}
              options={{
                elements: {
                    point: {
                        radius: 1,
                    },
                },
              }}
            />
            <div style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
            }}>
                {chartDays.map((day) => (
                <SelectButton
                key={day.value}
                onClick={()=>{setDays(day.value)}}
                selected={day.value === days}
                
                >{day.label}</SelectButton>
            ))}</div>
            </>
        )
    }
    </div>
  )
}

export default CoinInfo
