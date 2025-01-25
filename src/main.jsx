import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import CryptoContext from './CryptoContext.jsx'
import 'pure-react-carousel/dist/react-carousel.es.css';
import AliceCarousel from 'react-alice-carousel';


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <CryptoContext>
      <App />
    </CryptoContext>

  </StrictMode>,
)
