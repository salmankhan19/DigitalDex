import React, { useState as UseState, useEffect as UseEffect } from 'react';
import { useParams as UseParams } from 'react-router-dom';
import { CryptoState } from './cryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { makeStyles } from 'tss-react/mui';
import CoinInfo from '../components/CoinInfo';
import { Button, LinearProgress, Typography} from '@mui/material';
import { numberWithCommas } from '../components/banner/carousel';
import { theme } from '../theme';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
const coin = () => {
  const { id } = UseParams();
  const [coin, setCoin] = UseState();

  const {currency, symbol, user, watchlist, setAlert} = CryptoState();

  const fetchCoin = async ( ) => {
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
  }
console.log(coin)

UseEffect(()=>{
    fetchCoin();
  }, [])

  const UseStyles = makeStyles(theme)(() => {
    return ({
      container: {
        display: "flex",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          alignItems: "center",
        },
      },
      sidebar:{
        width: "30%",
        [theme.breakpoints.down("md")]: {
          width: "100%"
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey"
      },
      heading: {
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "Montserrat",
      },
      desc:{
        width: "92%",
        fontFamily: "Montserrat",
        padding: 15,
        paddingTop: 0,
        paddingBottom: 15,
        textAlign: "justify"
      },
      marketData:{
        alignSelf: "start",
        padding: 26,
        paddingTop: 10,
        width: "100%",
        [theme.breakpoints.down("md")]: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
          alignItems: "start",
        },
      }
    });
  });
  const inWatchlist = watchlist.includes(coin?.id);
  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef,
        {coins:watchlist?[...watchlist, coin?.id] : [coin?.id],});
        setAlert({
          open: true,
          message:`${coin.name} Added to the Watchlist !`,
          type: "success",
      });
    } catch (error) {
      setAlert({
          open: true,
          message:error.message,
          type: "error"
      });
      return;
    };
  };
  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef,
        {coins:watchlist.filter((watch) => watch !== coin?.id),}, 
        {merge: "true"});
        setAlert({
          open: true,
          message:`${coin.name} Remove From the Watchlist !`,
          type: "success",
      });
    } catch (error) {
      setAlert({
          open: true,
          message:error.message,
          type: "error"
      });
      return;
    };
  } 
  const {classes} = UseStyles();

  if (!coin) return <LinearProgress style={{backgroundColor: "gold"}} />
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
      <img 
      src={coin?.image.large}
      alt={coin?.name}
      height="200"
      style={{marginBottom: 20}}
      />
      <Typography variant="h3" className={classes.heading} >
        {coin?.name}
      </Typography>
      <Typography variant='subtitle1' className={classes.desc}>
        {coin?.description.en.split(". ")[0]}.
      </Typography>
        <div className={classes.marketData}>
          <span style={{display: "flex"}}>
            <Typography variant="h5" className={classes.heading} >Rank: </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{fontFamily: "Montserrat"}}>{coin?.market_cap_rank}</Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h5" className={classes.heading} >Price: </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{fontFamily: "Montserrat"}}>
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h5" className={classes.heading} >Market Cap: </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{fontFamily: "Montserrat"}}>
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M</Typography>
          </span>
          {user && (
            <Button variant='outlined'
            style={{
              width: "80%",
              height: 40,
              backgroundColor: inWatchlist? "#ff0000":"#EEBC1D",
              color: "black"
            }}
            onClick={inWatchlist? removeFromWatchlist : addToWatchlist}>
              {inWatchlist ? " Remove From WatchList" : "Add To WatchList"}
            </Button>
          )}
        </div>
      </div> 
      {/* Chart */}
      <CoinInfo coin={coin}/>
    </div>
  );
}

export default coin;
