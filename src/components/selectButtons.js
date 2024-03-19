import React from 'react';
import { makeStyles } from 'tss-react/mui';


const selectButtons = ({children, selected,onClick}) => {
    const UseStyles = makeStyles()(() => {
        return ({
          selectButton:{
            border: "1px solid gold",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            margin: "10px",
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: selected ? "gold" : "",
            color: selected ? "black" : "",
            fontWeight: selected ? 700 : 500,
            "&:hover":{
                backgroundColor: "gold",
                color: "black",
            },
            width: "22%",
          },
        });
      });
      const {classes} = UseStyles();
  return (
    <span onClick={onClick} className={classes.selectButton}>
      {children}
    </span>
  )
}

export default selectButtons
