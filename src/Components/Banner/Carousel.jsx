import React  from 'react'

import { makeStyles } from '@mui/styles'
import { CryptoState } from '../../CryptoContext';
import { useEffect, useState } from 'react'
import axios from 'axios';

import {TrendingCoins} from '../../config/api'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';



const useStyles = makeStyles(()=>({
    carousel :{

        
        height: '50%', // Full viewport height
        display:'flex',
        
        
        alignItems:"center",
        justifyContent: 'center',
        color:'black',
        
    },

    carouselItem: {

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    color: 'black',
    margin: '0 10px',   
    
  },

  price:{
    color:'white',
    fontSize:24,
    
    
  },


  priceChange:{

    
  }

    

   
}))

export function addCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function Carousel() {
    const classes = useStyles();

    const [trending, setTrending] = useState([]);

    const {currency, symbol} = CryptoState();

    const fetchTrendingCoins = async () => {
        try {
          const { data } = await axios.get(TrendingCoins(currency));
          setTrending(data);
        } catch (error) {
          console.error('Error fetching trending coins:', error);
        }
      };

    console.log(trending);


    useEffect(() => {
      
        fetchTrendingCoins();
    
    }, [currency])

      

    


   const items = trending.map((coin)=>{

    const priceChangeColor = coin.price_change_24h >= 0 ? '#4caf50' : '#f44336';

    let profit = coin.price_change_24h >= 0 ;

    

    return(
      <Link className={classes.carouselItem}to={'/coins/${coin.id}'}>
          
          <img 
          src={coin?.image} 
          alt={coin.name}

          height="80"

          style={{marginBottom: 10}}
          />

          <span style={{color:'white',fontSize: 22}}>
            {coin?.symbol}
            &nbsp;
          </span>

          



          <div className={classes.priceChange}
          style={{color:priceChangeColor}}
          >
          {profit && "+"}{addCommas(coin.price_change_24h.toFixed(3))}&nbsp;  
           ({profit && "+"}{coin?.price_change_percentage_24h.toFixed(2)}%)
          </div>

          <div className={classes.price}>  {symbol} {addCommas(coin.current_price)}</div>



      </Link>
    )

   })


    const responsive = {
      0:{

        items: 2,

      },

      512:{
         items: 3,
      },

      780:{
        items: 4,
     },
    };



       


  return (
    <div className={classes.carousel} >

    <AliceCarousel
     mouseTracking
     infinite
     autoPlayInterval={1000}
     animationDuration={1500}
     disableDotsControls
     responsive={responsive}
     autoPlay
     items ={items}
     disableButtonsControls={true}
     

    />
      
      
    </div>
  )
}



export default Carousel
