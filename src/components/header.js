import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import React from 'react';
import {useNavigate as UseNavigate} from 'react-router-dom';
import { CryptoState } from '../pages/cryptoContext';
import AuthModal from './authentication/authModal';
import UserSidebar from './authentication/UserSidebar';

const UseStyles = makeStyles()(() => {
  return ({
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
  });
});

function header() {
  const {classes} = UseStyles();
  const navigate = UseNavigate();
  const handleClick = () => {
    // 👇️ navigate programmatically
    navigate('/');
  };

  const {currency, setCurrency, user} = CryptoState();

  return (
    <>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography onClick={handleClick} className={classes.title}>
              DIGITALDEX
            </Typography>
            <Select variant="outlined"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{
              width: 100,
              height:40,
              marginLeft: 15,
            }} value={currency} onChange={(e)=>setCurrency(e.target.value)}>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"PKR"}>PKR</MenuItem>

            </Select>
            {user? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </>
    
  )
}

export default header;
