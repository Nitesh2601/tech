const CoinInfo = ({coin}) => {

    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1)
  
    const {currency} = CryptoState();
  
    
  
     const fetchhistoricalData = async () => {
  
      console.log('Fetching data for coin:', coin?.id);
      if (!coin?.id) {
      console.log('Coin ID is missing');
  
      };
  
      if (coin?.id) {
        try {
          const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
          console.log('API Response:', data); // Log the response
          setHistoricalData(data?.prices || []); // Set empty array if no data is returned
        } catch (error) {
          console.error('Error fetching historical data:', error);
        }
      } else {
        console.log('Coin ID is undefined');
      }  
      
     }
     
  
  
  
  
    useEffect(() => {
  
      if (coin?.id) {
        fetchhistoricalData();
      }
      
     }, [currency,days])
  
  
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });
  
    const useStyles = makeStyles(() => ({
  
  
      container:{
         
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
         marginTop: 25,
         padding: 40,
  
        //  [theme.breakpoints.down("md")]:{
  
        //   width: "100%",
        //   marginTop: 0,
        //   padding: 20,
        //   paddingTop:0,
        //  }
  
         
      },
  
  
    }));
  
    const classes = useStyles();
    
  
    return (
      
      <ThemeProvider theme={darkTheme}>
      <div >
        {!historicalData ? (
          <CircularProgress
            style={{ color:'gold'}}
            size={250}
            thickness={1}
          />
        ) : (
          <div>
            <Line
  
            data={{
  
              labels: historicalData.map((coin)=>{
  
                let date = new Date(coin[0]);
                let time = 
                  date.getHours()>12
                  ? `${date.getHours()-12}: ${date.getMinutes()}PM`
                  : `${date.getHours()}: ${date.getMinutes()}AM`;
  
                  return days === 1? time : date.toLocaleDateString();
                   
              }),
  
              datasets: [
  
                {
                  data: historicalData.map((coin) =>coin[1]),
                  label: `price (past ${days} Days) in ${currency}`,
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
  
            />
          </div>
        )}
      </div>
    </ThemeProvider>
      
  
    )
  }
  
  export default CoinInfo
  