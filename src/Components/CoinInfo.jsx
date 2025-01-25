import React from 'react'

import { useState,useEffect,useCallback } from 'react';


import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { ThemeProvider,createTheme } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { CircularProgress,useMediaQuery } from '@mui/material';

import { Line } from 'react-chartjs-2';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';


const useStyles = makeStyles(() => ({
  
  
  container:{
     
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
     marginTop: 25,
     padding: 40,
    //  overflowX: 'hidden', // Prevent horizontal scrolling
    // overflowY: 'auto',
    height:'100vh'
    

    //  [theme.breakpoints.down("md")]:{

    //   width: "100%",
    //   marginTop: 0,
    //   padding: 20,
    //   paddingTop:0,
    //  }

     
  },

  selectbutton:{

    marginTop: 20, // Add spacing above the button group
    display: 'flex',

    gap:'100px',
    
    width:"full",
    
    

    '@media (max-width: 780px)': {
       
      gap:'20px',
             
    },
    
  },

  chartContainer:{
      
   display:"flex",
   flexDirection:"column",
   justifyContent:"center",
   alignItems: "center",

   overflowX:"auto",  

  }

  

}));









const CoinInfo = ({coin}) => {

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1)

  const {currency} = CryptoState();


  
  


  const fetchhistoricData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      console.log("Full API response:", data); // Inspect the entire response
      setHistoricData(data.prices);
      console.log("Fetched data (prices):", data.prices);
    } catch (error) {
      console.error("Error fetching historic data:", error);
    }
  };
 
    
  const isTabletOrMobile = useMediaQuery('(max-width: 780px)'); // Define media query breakpoints
  const isMobile = useMediaQuery('(max-width: 512px)');

  // console.log("this are the prices",historicData);

  useEffect(() => {

    
    
    fetchhistoricData();

   

  }, [currency,days]);
  

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });


  


  const classes = useStyles();
   
   

  return (


    <ThemeProvider theme={darkTheme}>
      <div  className={classes.container}>
        {!historicData ? (
          <CircularProgress
            style={{ color:'#0C6CC9'}}
            size={250}
            thickness={1}
          />
        ) : (
          <div className={classes.chartContainer} >

                
                    <Line 

                    data={{
          
                      labels: historicData.map((coin)=>{
          
                        let date = new Date(coin[0]);
                        let time = 
                          date.getHours()>12
                          ? `${date.getHours()-12}: ${date.getMinutes()}PM`
                          : `${date.getHours()}: ${date.getMinutes()}AM`;
          
                          return days === 1? time : date.toLocaleDateString();
                          
                      }),
          
                      datasets: [
          
                        {
                          data: historicData.map((coin) =>coin[1]),
                          label: `price (past ${days} Days) in ${currency}`,
                          borderColor: "#0C6CC9",
                        }
                      ],
          
                    }}  
          
                    options={{

                      

                      elements:{
                        point:{
          
                          radius: 1,
                        },
                      },
                    }}

                    height={isMobile ? 200 : isTabletOrMobile ? 300 : 400} // Adjust height
                    width={isMobile ? 300 : isTabletOrMobile ? 600 : 800} // Adjust width
          
                    />

                


             

                <div className={classes.selectbutton}>

                  {chartDays.map((day) =>(
                    <SelectButton
                    key={day.value}
                    onClick={()=> setDays(day.value)}
                    selected={day.value === days}
                    >
                      {day.label}
                    </SelectButton>
                  ))}

                </div>


              
            

          </div>
        )}
      </div>
    </ThemeProvider>
      

  )
}

export default CoinInfo
