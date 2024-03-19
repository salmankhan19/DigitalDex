import React, { useEffect as UseEffect, useState as UseState } from 'react';
import axios from "axios";
import { makeStyles } from 'tss-react/mui';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../pages/cryptoContext';
import AliceCarousel from "react-alice-carousel";
import { Link } from 'react-router-dom';

const UseStyles = makeStyles()((theme) => {
    return ({
      carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
      },
      carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
        textDecoration: 'none'
      },
    });
  });

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const carousel = () => {
    //object of makeStyle
    const {classes} = UseStyles();

    //for the trending value
    const [trending, setTrending] = UseState([]);

    //get currency amd symbol from crypto context
    const {currency, symbol} = CryptoState();
    //fetching Data From Api
    const fetchTrendingCoins = async () => {
        const {data} = await axios.get(TrendingCoins(currency))
        setTrending(data);
    };
    
    //to render the fetch function
    UseEffect(() => {
        fetchTrendingCoins();
        
    }, [currency])

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return(
            <Link
                className={classes.carouselItem} to={`/coins/${coin.id}`}>
                    <img 
                        src={coin?.image}
                        alt={coin.name}
                        height="88"
                        style={{marginBottom: 10}}
                    />
                    <div style={{display:"flex", flexDirection: "row", textDecoration: 'none'}}>
                      <span>{coin?.symbol}&nbsp;</span>
                      <span style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                          }}>{profit && "+" } {coin?.price_change_percentage_24h?.toFixed(2)}%</span>
                    </div>
                    
                    <span style={{fontSize: 22, fontWeight: 500 }}>{symbol} {numberWithCommas(coin?.current_price.toFixed(2))}</span>
                </Link>
        )
    })

    //responsive carousel
    const responsive = {
        0: {
          items: 2,
        },
        512: {
          items: 4,
        },
      };
    
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  )
}

export default carousel
