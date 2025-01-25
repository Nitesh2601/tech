import { useState } from 'react'

import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'


import { makeStyles } from '@mui/styles';

import './App.css'
import Header from './Components/Header'
import Homepage from './Pages/Homepage'
import Coinpage from './Pages/Coinpage'
import CryptoContext from './CryptoContext';


const useStyles = makeStyles({
  App: {
    background: '#141414',
    
    color: 'white',
    innerHeight:"100vh",
  },
});

function App() {

  

  const classes = useStyles();

  return (

    
    <>

    <CryptoContext>
      <Router>

      <div className={classes.App}>
        <Header/>
        <Routes>
           <Route path="/" element={<Homepage/>} exact /> 
           <Route path="/coins/:id" element={<Coinpage/>}/>  
        </Routes>
      </div>
      </Router>
      </CryptoContext>
    </>

    
  )
}

export default App
  