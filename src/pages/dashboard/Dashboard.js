import styles from './Dashboard.module.css';
import useAuth from '../../hooks/useAuth';
import useCollection from '../../hooks/useCollection';

// importing components
import SideNav from '../../components/sideNav/SideNav';
import BalCard from '../../components/balCard/BalCard';
import Charts from '../../components/charts/Charts';
import Funding from '../../components/funding/Funding';
import InvestmentCard from '../../components/investmentCard/InvestmentCard';
import ReferralText from '../../components/referralText/ReferralText';
import BuiltWith from '../../components/builtWith/BuiltWith';
import Profile from '../../components/profile/Profile';
import MiningOverview from '../../components/miningOverview/MiningOverview';
import CryptoChart from '../../components/cryptoChart/CryptoChart';
import MarketPower from '../../components/marketPower/MarketPower';
import Indices from '../../components/indices/Indices';
import CrossRates from '../../components/crossRates/CrossRates';
import IndicesFuture from '../../components/indicesFuture/IndicesFuture'
import HeatMap from '../../components/heatMap/HeatMap';

// importing router functions
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

// importing plans
import { investment } from '../../utils/investText';



export default function Dashboard() {
  const { document: doc, isPending } = useCollection('profile', false, true);
  const { authIsReady, user } = useAuth()
  const { page } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const chatDiv = document.getElementById('tidio-chat')
    if(chatDiv){
      chatDiv.style.display = 'none';
    }

    if(authIsReady){
      if(user.email === "help@genesis-experts.com"){
        navigate('/admin')
      }
      if(!user){
        navigate('/login')
      }
    }

    return () => {
      if(chatDiv){
        chatDiv.style.display = 'block';
      }
    }

  }, [authIsReady, user, navigate])



  if(isPending){
    return (
      <div className="spinnerContainer">
        <div className="spinner">
          <MoonLoader color="#27b74e" />
        </div>
      </div>
    )
  }




  return ((authIsReady && user?.email !== "help@genesis-experts.com" && doc) &&
    <div className={styles.container}>
      <div className={styles.side}>
        <SideNav />
      </div>
      {(page === undefined || page === 'home') &&
      <div className={styles.main}>
        <BalCard />
        <ReferralText />
        <BuiltWith />
        <MiningOverview />
        <CryptoChart />
      </div>
      }


      {page === 'fund' &&
      <div className={styles.main}>
        <Funding />
      </div>
      }


      {page === 'invest' &&
      <div className={styles.main}>
        <InvestmentCard title={investment.title2} subtitle={investment.subtitle2} plans={investment.plans} dashboard={true}/>
      </div>
      }


      {page === 'profile' &&
      <div className={styles.main}>
        <Profile document={doc}/>
      </div>
      }

      {page === 'chart' &&
      <div className={styles.main}>
        <Charts />
        <MarketPower />
        <Indices />
        <CrossRates />
        <IndicesFuture />
        <CryptoChart />
        <HeatMap />
      </div>
      }
      
    </div>
  )
}
