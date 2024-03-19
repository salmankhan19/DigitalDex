import React from 'react'
import { CryptoState } from '../pages/cryptoContext';
import { Alert, Snackbar } from '@mui/material';

const alert = () => {
    const {alert, setAlert} = CryptoState();

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setAlert({open: false});
    };
  return (
    <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} 
        severity={alert.type}
        elevation={10}
        variant='filled'>
            {alert.message}
        </Alert>
      </Snackbar>
  )
}

export default alert
