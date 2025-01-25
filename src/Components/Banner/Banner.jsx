import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import React from 'react'
import Carousel from './Carousel';



const useStyles = makeStyles(()=>({
    banner :{

        // backgroundImage: "url(/bitcoin.jpg)",
        // backgroundSize: 'cover',
        height: '100vh', // Full viewport height
        width: '100%',
        position:'relative',
        // backgroundColor:"#191C23",

        backgroundColor: "#2b4162",
        backgroundImage:"linear-gradient(315deg, #2b4162 0%, #12100e 74%)"
        
        
    },

    bannerContent:{

        height: '100%',
        display:'flex',
        flexDirection:"column",
        paddingTop:'25',
        justifyContent: "space-around",
        position:'absolute',
        zIndex:2,

        
        

    },

    tagline: {

      display:'flex',
      height:'40%',
      flexDirection:'column',
      justifyContent:'center',
      textAlign:'center',
      
    },

    carouselPostion: {

    position: 'absolute',
    bottom: '15%', // Place near the bottom of the banner
    width: '100%',
    zIndex: 2,

    },

    
}))

function Banner() {

    const classes = useStyles();
  return (
    <div className={classes.banner}>

      <img src="" alt="" />

     <Container className={classes.bannerContent}>

     <div className={classes.tagline}>

     <Typography
     variant='h2'
     style={{

      fontWeight: "bold",
      marginBottom:15,
      marginTop:-300,
      color:"#0C6CC9",

      
      
     }}
     >

      Crypto-Nexus

     </Typography>

     <Typography
     variant='subtitle2'
     style={{
      color: "white",
      textTransform: "capitalize",
      fontSize:"15px"
     }}
     >

       {/* Discover everything you need to know about your favorite cryptocurrency! */}
       Your go-to source for concise and relevant cryptocurrency knowledge
     </Typography>

     </div>

    </Container>
     
     <div className={classes.carouselPostion}>
        <Carousel/>
     </div>
    
      
    </div>
  )
}

export default Banner
