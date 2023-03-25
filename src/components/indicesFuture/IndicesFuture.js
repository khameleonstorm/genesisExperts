import styles from './IndicesFuture.module.css';
import { useEffect } from 'react';

export default function IndicesFuture() {

  useEffect(() => {
    const script = document.createElement('script')
    const chartDiv = document.getElementById('future')
    
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
    script.type = 'text/javascript'
    script.async = true
    
    const loadscript =  {
      "width": "100%",
      "height": "100%",
      "symbolsGroups": [
        {
          "name": "Indices",
          "originalName": "Indices",
          "symbols": [
            {
              "name": "FOREXCOM:SPXUSD",
              "displayName": "S&P 500"
            },
            {
              "name": "FOREXCOM:NSXUSD",
              "displayName": "US 100"
            },
            {
              "name": "FOREXCOM:DJI",
              "displayName": "Dow 30"
            },
            {
              "name": "INDEX:NKY",
              "displayName": "Nikkei 225"
            },
            {
              "name": "INDEX:DEU40",
              "displayName": "DAX Index"
            },
            {
              "name": "FOREXCOM:UKXGBP",
              "displayName": "UK 100"
            }
          ]
        },
        {
          "name": "Futures",
          "originalName": "Futures",
          "symbols": [
            {
              "name": "CME_MINI:ES1!",
              "displayName": "S&P 500"
            },
            {
              "name": "CME:6E1!",
              "displayName": "Euro"
            },
            {
              "name": "COMEX:GC1!",
              "displayName": "Gold"
            },
            {
              "name": "NYMEX:CL1!",
              "displayName": "Crude Oil"
            },
            {
              "name": "NYMEX:NG1!",
              "displayName": "Natural Gas"
            },
            {
              "name": "CBOT:ZC1!",
              "displayName": "Corn"
            }
          ]
        },
        {
          "name": "Bonds",
          "originalName": "Bonds",
          "symbols": [
            {
              "name": "CME:GE1!",
              "displayName": "Eurodollar"
            },
            {
              "name": "CBOT:ZB1!",
              "displayName": "T-Bond"
            },
            {
              "name": "CBOT:UB1!",
              "displayName": "Ultra T-Bond"
            },
            {
              "name": "EUREX:FGBL1!",
              "displayName": "Euro Bund"
            },
            {
              "name": "EUREX:FBTP1!",
              "displayName": "Euro BTP"
            },
            {
              "name": "EUREX:FGBM1!",
              "displayName": "Euro BOBL"
            }
          ]
        },
        {
          "name": "Forex",
          "originalName": "Forex",
          "symbols": [
            {
              "name": "FX:EURUSD",
              "displayName": "EUR/USD"
            },
            {
              "name": "FX:GBPUSD",
              "displayName": "GBP/USD"
            },
            {
              "name": "FX:USDJPY",
              "displayName": "USD/JPY"
            },
            {
              "name": "FX:USDCHF",
              "displayName": "USD/CHF"
            },
            {
              "name": "FX:AUDUSD",
              "displayName": "AUD/USD"
            },
            {
              "name": "FX:USDCAD",
              "displayName": "USD/CAD"
            }
          ]
        }
      ],
      "showSymbolLogo": true,
      "colorTheme": "light",
      "isTransparent": true,
      "locale": "en"
    }
    
    script.innerHTML = JSON.stringify(loadscript)
    chartDiv.appendChild(script)
  }, [])



  return (
    <div className={styles.container}>
      <div className={`${styles.tvcontainer}     tradingview-widget-container__widget`} id="future">
      </div>
    </div>
  )
}