import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useState as UseState } from 'react';
import { CryptoState } from '../../pages/cryptoContext';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const signup = ({handleClose}) => {
    const [email, setEmail] = UseState("");
    const [password, setPassword] = UseState("");
    const [confirmPassword, setConfirmPassword] = UseState("");
    const {setAlert} = CryptoState();
    const handleSubmit = async() => {
        if (password !== confirmPassword){
            setAlert({
                open: true,
                message: "Passwords Do Not Match",
                type: "error"
            });
            console.log("alert")
            return;
        }
        try {
            const result = await createUserWithEmailAndPassword(auth,email,password);
            setAlert({
                open: true,
                message: `Sign Up Successful. Welcome ${result.user.email}`
            });
            handleClose();
        } catch (error) {
            setAlert({
                open: true,
                message:error.message,
                type: "error"
            });
            return;
        }
    }

  return ( 
    <Box p={3}
    style={{display: "flex", flexDirection: "column", gap: "20px"}}>
        <TextField variant='outlined'
        type='email'
        label="Enter Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        fullWidth/>
        <TextField variant='outlined'
        type='password'
        label="Enter Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        fullWidth/>
        <TextField variant='outlined'
        type='password'
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        fullWidth/>
        <Button variant="contained"
        size="large"
        style={{backgroundColor: "#EEBC1D"}}
        onClick={handleSubmit}>Sign Up</Button>
    </Box>
  )
}

export default signup
