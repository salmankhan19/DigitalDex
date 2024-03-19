import React, { useEffect as UseEffect, useState as UseState} from 'react';
import {useNavigate as UseNavigate} from 'react-router-dom';
import { CryptoState } from '../pages/cryptoContext';
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { makeStyles } from 'tss-react/mui';
import { numberWithCommas } from './banner/carousel';

const coinstable = () => {
    const [search, setSearch] = UseState("");
    const  {currency, symbol, coins,loading, fetchCoins} = CryptoState();
    const [page, setPage] = UseState(1);
    
    const navigate = UseNavigate();

    const UseStyles = makeStyles()(() => {
      return (
        {row:{
          backgroundColor: "#16171a",
          cursor: "pointer",
          "&:hover":{
            backgroundColor: "#131111",
          },
          fontFamily: "Montserrat",
        },
        pagination: {
          "& .MuiPaginationItem-root": {
            color: "gold",
          },
        }
      });
    });

    const {classes} = UseStyles();

    
    
    //to render the fetch function
    UseEffect(() => {
        fetchCoins();
        
    }, [currency])
    //Search coins
    const handleSearch = () => {
      return coins.filter(
        (coin) => 
        coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
      );
    };
  return (
    <Container style={{textAlign: "center"}}>
      <Typography variant='h4' style={{margin:18,fontFamily:"Montserrat"}}>Cryptocurrency Prices By Market Cap</Typography>
      <TextField variant="outlined" label="Search For a Crypto Currency..." 
      style={{marginBottom: 20, width: "100%"}}
      onChange={(e) => setSearch(e.target.value)}></TextField>
      <TableContainer>
        {
          loading ? (
            <LinearProgress style={{backgroundColor: "gold"}} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D"}}>
                <TableRow>
                  {["Coin","Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{color: "black", fontWeight: "700", fontFamily: "Montserrat",}}
                      key={head}
                      align={head==="Coin" ? "" : "right"}
                    >
                      {head}

                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  // slice function here is use for pagination of 10 items per page
                  handleSearch().slice((page-1)*10, (page - 1)*10 +10).map(row=>{
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow onClick={() => navigate(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{display: "flex", gap: 15}}
                        >
                          <img src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{marginBottom: 10}}
                          />
                          <div style={{display: "flex", flexDirection: "column"}}> 
                            <span style={{textTransform: "uppercase", fontSize: 22}}>
                              {row.symbol}
                            </span>
                            <span style={{color: "darkgrey"}}>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                        align="right"
                        style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,}}>
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.market_cap.toString().slice(0,-6))}M 
                          {/* M is for million cause slice(0, -6) will remove last 6 didits and right million (M) */}
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          )
        }
      </TableContainer>
      <Stack>
        <Pagination 
          count={(handleSearch()?.length/10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
          classes={{ ul: classes.pagination}}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0,450);
          }}
        />
      </Stack>
      
    </Container>
  )
}

export default coinstable
