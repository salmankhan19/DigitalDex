import { Container, Typography } from '@mui/material';
import React from 'react'
import { makeStyles } from 'tss-react/mui';
// import { styled } from "@mui/system";
import Image from "./b2.jpg"
import Carousel from './carousel';
// const imageURL = "https://cdn.pixabay.com/photo/2023/05/20/20/39/european-roller-8007340__340.jpg";
// const Background = styled("div")({
//   position: "absolute",
//   width: "100%",
//   height: 400,
//   backgroundImage: `url(${imageURL})`,
//   backgroundPosition: "center",
//   backgroundSize: "cover",
//   backgroundRepeat: "no-repeat",
// });


const UseStyles = makeStyles()(() => {
    return ({
        banner: {
            backgroundImage: `url(${Image})`,
        },
      bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },

    });
  });

const banner = () => {
    const {classes} = UseStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
            <Typography 
            variant="h2" 
            style={{
                fontWeight: "bold",
                marginBottom: 15,
                fontFamily: "montserrat",
            }}>
                DIGITALDEX
            </Typography>
            <Typography variant='subtitle2'
            style={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "montserrat",
            }}>
                Get All The Info Regrading Your Favorite Crypto Currency
            </Typography>
        </div>
        <Carousel />

    </Container>

    </div>
    
  )
}

export default banner
