import React from 'react'

import { useNavigate } from 'react-router-dom';

import { addCommas } from './Banner/Carousel';

import { makeStyles } from '@mui/styles';




import {ThemeProvider,
  createTheme,
  Container,
  Typography,
   TextField,
   TableContainer,
   LinearProgress,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
   Pagination,
   useMediaQuery
   
  } from "@mui/material"

 
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { CoinList } from '../config/api';

import{useEffect,useState} from 'react'

const useStyles = makeStyles(()=>({
    
   row :{
      
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover":{
      backgroundColor: "#131111"
    }
   },

   Pagination:{
    "& .MuiPaginationItem-root": {

      color: "green",

    },
   }

    

   
}))



const CoinsTable = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const {currency,symbol} = CryptoState();

    const [page, setpage] = useState(1);

    const navigate = useNavigate();

    const fetchCoins = async () =>{

        try {

            setLoading(true);

            const {data} = await axios.get(CoinList(currency));
  
            setCoins(data);
            setLoading(false);

            
            
        } catch (error) {
            
            console.error('Error fetching Table coins:', error)
        }

        
    };

    console.log("coinslist data :",coins);


     useEffect(() => {

        fetchCoins();

     }, [currency])


     useEffect(() => {
      setpage(1); // Reset page when the search query changes
    }, [search]);
     

     const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });
    
    const handleSearch = () =>{

      return coins.filter(

        (coin) =>

          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())

      );
    };

    const classes = useStyles();

    const filteredCoins = handleSearch(); // Filter the coins based on the search query
   const coinsToDisplay = filteredCoins.slice((page - 1) * 10, page * 10); // Apply pagination
    
   const isMobile = useMediaQuery('(max-width: 512px)');
    
     
    

  return (

    
    
      <ThemeProvider theme={darkTheme}>

      

      <Container style = {{
        textAlign: "center",
        backgroundColor:"#191C23",
        width:"full",
        padding:"20px",
        marginTop:"50px",
        }}>

      <Typography 
        variant='h4'
        style={{
          margin:18,
          
          }}
      >
        Cryptocurrency Price by Market Cap

      </Typography>

      <TextField label="Search for Crypto Currency.."  variant='outlined'
        style={{ width: '100%',marginBottom: 20}}
        onChange={(e)=>setSearch(e.target.value)}
      />



      <TableContainer>
        {
          loading?(
            <LinearProgress />
          ) :(
            <Table>

            <TableHead>
              <TableRow>
                {["Coin",...(isMobile?["24h Change"]:["Price","24h Change","Market Cap"])].map((head)=>(
                  <TableCell
                  style={{
                    color: 'white',
                    fontSize: "20px",
                    fontWeight: "bold"
                  }}

                  key={head}

                  align = {head === "Coin"? "left" : "right"}
                  >

                    {head}
                  </TableCell>
                ))}
              </TableRow>

            </TableHead>



        


            <TableBody>
            
              {coinsToDisplay.map((row)=>{

                const profit = row.price_change_percentage_24h > 0;

                return(

                  <TableRow
                        onClick={()=> navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                  >

                        <TableCell              //image cell
                            component= "th"
                            scope='row'
                            style={{

                              display: "flex",
                              gap: 15,
                            }}
                        >

                            <img src={row?.image} alt={row.name}
                            height='50'
                            style={{marginBottom: 10}}
                            />

                        <div
                            style={{ display:"flex", flexDirection: "column"}}               
                        >

                          <span
                              style={{

                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                          >{row.symbol}</span>

                          <span

                            style={{color: "darkgray"}}
                          >{row.name}</span>

                        </div>

                        </TableCell>





                        <TableCell align='right'>    

                        {symbol}&nbsp;      
                        {addCommas(row.current_price.toFixed(2) )} 

                        {isMobile && (
                          <>
                            <br />
                            <span
                              style={{
                                color: profit > 0 ? '#4caf50' : '#f44336',
                              }}
                            >
                              {profit && '+'}
                              {row.price_change_24h.toFixed(3)} ({profit && '+'}
                              {row.price_change_percentage_24h.toFixed(2)}%)
                            </span>
                          </>
                        )}
                        

                        </TableCell>







                        <TableCell
                        align='right'
                        style={{

                          color: profit>0? '#4caf50' : '#f44336',
                          
                        }}
                        >
                        {profit && "+"}
                        
                        {row.price_change_24h.toFixed(3)} <br />


                      ({profit && "+"}
                        
                        {row.price_change_percentage_24h.toFixed(2)}%)

                        </TableCell>


                        <TableCell
                        align='right'                       
                        >

                        {symbol}&nbsp;
                        {addCommas(
                          row.market_cap.toString().slice(0,-6)
                          )} M

                        </TableCell>


                        


                  </TableRow>

                ); 
                

              })}
            </TableBody>


            </Table>
          )
        }
      </TableContainer>

      <Pagination
      style={{

        padding:20,
        width:"100%",
        display:"flex",
        justifyContent: "center"

      }}
      classes={{ul: classes.Pagination}}
       count={Math.ceil(filteredCoins.length / 10)}

      onChange={(_,value)=>{

        setpage(value);
        window.scroll(0,450);
      }}
      />
          

          

      


      </Container>

      
      </ThemeProvider>
  )
}

export default CoinsTable
