import React from 'react'

import {AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
   InputLabel,
  ThemeProvider, 
  createTheme,
  useMediaQuery 
} from '@mui/material'

import{ useNavigate} from 'react-router-dom'


import { CryptoState } from '../CryptoContext';



function Header() {

  const navigate = useNavigate();

  const {currency, setCurrency} = CryptoState();

  console.log(currency);

  const isMobile = useMediaQuery('(max-width: 512px)');


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        
      },
    },
  });

  return (

    <ThemeProvider theme={darkTheme}>
    <AppBar color='primary' position='static' >
        <Container style={{
          width: "full",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          padding:"5px",
          // backgroundColor:"#141414",
         

          }}>
          
          <div style={{
            width:"70%",
            backgroundColor:"#1B1B1B",
            // border:"2px solid black",
            borderRadius:"50px",
            
            
            }}>
            <Toolbar style={{
              
              display: 'flex',
              flexDirection: isMobile? 'column':'row',
              gap:"4px",
              padding:"10px",
              

              }}
              >


                <Typography  
                onClick={()=> navigate("/")}
                style={{
                  fontSize:"20px",
                  marginLeft:"10px"
                  }}
                >
                Crypto-Nexus
                </Typography>




                <div style={{
                  display:'flex',
                 alignItems: 'center',
                 gap: '4px',
                 marginLeft: 'auto',
                 }}>
                 
                <InputLabel id="label">CURRENCY</InputLabel>
                <Select
                 
                 variant='outlined'
                 style={{
                  width: 100,
                  height: 30,
                  marginRight:"10px"

                 }}

                 value = {currency}
                
                 onChange={(e)=>setCurrency(e.target.value)}
                 
                 >
                  <MenuItem value={"USD"}>USD</MenuItem>
                  <MenuItem value={"INR"}>INR</MenuItem>
                </Select>


                </div>



                 

            </Toolbar>

           </div> 

        </Container>
    </AppBar>

    </ThemeProvider>
  )
}

export default Header
