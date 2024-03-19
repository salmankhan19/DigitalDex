import React, { useContext, createContext, useEffect as UseEffect, useState as UseState } from 'react'
import { CoinList } from '../config/api';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Crypto = createContext();
const cryptoContext = ( {children}) => {
    const [currency, setCurrency] = UseState("PKR");
    const [symbol, setSymbol] = UseState("Rs");
    const [coins, setCoins] = UseState([]);

    //watchlist
    const [watchlist, setWatchlist] = UseState([]);
    const [loading, setLoading] = UseState(false);
    //for login and sign up
    const [user, setUser] = UseState(null);
    //Alert Message
    const [alert, setAlert] = UseState({
      open: false,
      message: '',
      type: "Success",
    });

    //setting watchlist & unsub onces watchlist is updated
    UseEffect(() => {
      if (user){
        const coinRef = doc(db, "watchlist", user.uid);
        const unsubscribe = onSnapshot(coinRef, (coin) => {
          if (coin.exists()){
            setWatchlist(coin.data().coins);

          }else{
            console.log("No Items in Watchlist");
          }
        });
        return () => {
          unsubscribe();
        };
      }
     
    }, [user]);
    //check if user is there or not 
    UseEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) setUser(user);
        else setUser(null);
      })
    },[]);

    const fetchCoins = async () => {
      // Loading screen till the coins are fetched from API
      setLoading(true);
      const {data} = await axios.get(CoinList(currency));
      setCoins(data);
      // Once coins re displayed than loading will stop
      setLoading(false);
  };
  console.log(coins);

    UseEffect(()=>{
        if (currency === "PKR") setSymbol("Rs");
        else if (currency=== "USD") setSymbol("$");
    },[currency])
  return (
    <Crypto.Provider value={{currency, 
      setCurrency, 
      symbol, 
      coins, 
      loading, 
      fetchCoins, 
      alert, 
      setAlert, 
      user,
      watchlist}}>
        {children}
    </Crypto.Provider>
  )
}

export default cryptoContext

export const CryptoState= ()=> {
    return useContext(Crypto);
};