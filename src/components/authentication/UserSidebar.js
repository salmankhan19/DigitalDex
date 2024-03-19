import React from 'react';
import { useState as UseState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { CryptoState } from '../../pages/cryptoContext';
import { Avatar } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { numberWithCommas } from '../banner/carousel';
import {AiFillDelete} from 'react-icons/ai';
import { doc, setDoc } from 'firebase/firestore';

const UseStyles = makeStyles()(() => {
    return ({
    container: {
        width: 350,
        padding: 25,
        height:"100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace"
      },
      profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        gap:"20px",
        height: "92%"
      },
      picture:{
        width: 200,
        height:200,
        cursor: "pointer",
        backgroundColor: "#EEBC1D",
        objectFit: "contain",
      },
      logout: {
        height: "8%",
        width: "100%",
        backgroundColor: "#EEBC1D",
        marginTop: 20,
      },
      watchlist:{
        flex: 1,
        width: "100%",
        backgroundColor: "grey",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        OverflowY: "scroll"
      },
      coin: {
        padding: 10,
        borderRadius: 5,
        color: "black",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#EEBC1D",
        boxShadow: "0 0 3px black"
      }
    });
  });
 

export default function UserSidebar() {
  const [state, setState] = UseState({
    right: false,
  });

  const {user, setAlert, watchlist, coins, symbol} = CryptoState();
  const {classes} = UseStyles();
 

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

   //log out function
   const logOut =() => {
    signOut(auth);
    setAlert({
        open: true,
        type: "success",
        message: "Logout Successful !"

    });
    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
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
  };

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
          onClick={toggleDrawer(anchor, true)}
          style={{
            height: 38,
            width: 38,
            marginLeft: 15,
            cursor: "pointer",
            backgroundColor: "#EEBC1D",
          }}
          src={user.photoURL}
          alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container} >
                <div className={classes.profile}>
                    <Avatar
                     className={classes.picture}
                     src={user.photoURL}
                     alt={user.displayName || user.email}/>
                     <span style={{
                        width: "100%",
                        fontSize:25, 
                        textAlign: "center",
                        fontWeight: "bolder",
                        wordWrap: "break-word",
                     }}>
                        {user.displayName || user.email}
                     </span>
                     <div className={classes.watchlist}>
                        <span style={{fontSize: 15, textShadow: "0 0 5px black"}}>
                            WatchList
                        </span>
                        {/* take coins and map a single coin */}
                        {/* // eslint-disable-next-line */}
                        {coins.map((coin) => {
                          if(watchlist.includes(coin.id))
                            return (
                            <div className={classes.coin}>
                              <span>{coin.name}</span>
                              <span style={{display: "flex", gap: 8}}>
                                {symbol}
                                {numberWithCommas(coin.current_price.toFixed(2))}
                              </span>
                              <AiFillDelete 
                              style={{cursor: "pointer"}}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                              />
                            </div>
                            )
                        })}
                     </div>
                </div>
                <Button 
                variant="contained"
                className={classes.logout}
                onClick={logOut}>Log Out</Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

