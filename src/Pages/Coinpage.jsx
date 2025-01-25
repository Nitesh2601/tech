import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinInfo from '../Components/CoinInfo';

import {makeStyles} from '@mui/styles'
import { Typography,LinearProgress } from '@mui/material';
import { addCommas } from '../Components/Banner/Carousel';
import ReactHtmlParser from 'react-html-parser';








const useStyles = makeStyles((theme)=> ({

    container: {
      display: 'flex',
      // [theme.breakpoints.down("md")]:{
      //   flexDirection: 'column',
      //   alignItems: 'center',
      // },

      // height:'100vh',

      '@media (max-width: 780px)': {
       
        flexDirection: 'column',
        alignItems: 'center',
    },

    overflowX: 'hidden', // Prevent horizontal scrolling
    overflowY: 'auto',

      

      
    },

     sidebar:{
       
       width: "30%",
      //  [theme.breakpoints.down("md")]:{
        
      //    width:"100%",
      // },

      '@media (max-width: 780px)': {
       

        width:"100%",
        
    },

      display: "flex",
       flexDirection: "column",
      alignItems: "center",
       marginTop: 25,

       borderRight: "2px solid grey",
       
     },

     heading:{
      fontWeight: "bold",
      padding:"10px"
     },

     description:{

      width: "100%",
      padding: 25,
      paddingBottom: 15,
      paddingTop:10,
      textAlign: "justify"
     },

     imgContainer:{

      height:"250px",
      width:"250px",
      backgroundColor:"#1D1D1D",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:"40px"

     },

     marketData:{
      marginBottom:"40px"
     }

     

     

   }));


   

function Coinpage() {
   
  const {id}= useParams();
  const [coin, setCoin] = useState({})

  const {currency,symbol} = CryptoState();

  

  const fetchCoin = async()=>{


    try {

       const {data} = await axios.get(SingleCoin(id));

       setCoin(data);

      
    } catch (error) {
      
      console.error('Error fetching coin data:',error)
    }
    
  }

  // console.log("hello",coin);

  useEffect(() => {

      fetchCoin();
  }, [id,currency])

  
  const classes = useStyles();

  if(!coin) return <LinearProgress />;


  return (
      
      
        <div className={classes.container}>

          <div className={classes.sidebar} >

            <div className={classes.imgContainer}>

            <img src={coin?.image?.large} alt={coin?.name} 
            height="200"
            style={{marginBottom: 20}}
          />

            
            </div>
          

          <Typography variant='h3' className={classes.heading}>
            {coin?.name}
          </Typography>



          <Typography variant='subtitle1' className={classes.description}>
              {coin?.description?.en

              ?`${ReactHtmlParser(coin?.description?.en.split('.')[0])}.`
              :  'No description available.'}
          </Typography>



          <div className={classes.marketData}> 

            <span style={{
              display: "flex",
              flexDirection:"column",
              gap: 4,
              
              }}>
                  
                  <Typography variant='h5'>
                    Rank: {coin?.market_cap_rank}
                  </Typography>



                  <Typography variant='h5' >
                    Current Price: {symbol} {" "} 

                    {coin?.market_data?.current_price?.[currency.toLowerCase()]
                  ? addCommas(coin.market_data.current_price[currency.toLowerCase()].toFixed(2))
                    : 'N/A'}
                    
                  </Typography>


                  

                  <Typography variant='h5' >
                    Market Cap: {symbol} {" "} 

                    {coin?.market_data?.market_cap?.[currency.toLowerCase()]
                    ? addCommas(
                  coin.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                    )
                  : 'N/A'}{" "}M

                    
                  </Typography>
              
            </span>

          </div>
          

          </div>

          {/* {chart} */}

          <CoinInfo coin={coin}/>

        </div>
       
  )  
      
}

export default Coinpage
