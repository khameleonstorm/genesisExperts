import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// importing pages
import Home from './pages/home/Home';
import About from './pages/about/About';
import Plans from './pages/plans/Plans';
import SignUp from './pages/signUp/SignUp';
import Login from './pages/login/Login';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Admin from './pages/admin/Admin';
import RentHome from './pages/rentHome/RentHome';
import Shipment from './pages/shipment/Shipment';
import TrackOrder from './pages/trackOrder/TrackOrder';
import BuyHome from './pages/buyHome/BuyHome';
import HomeDetails from './pages/homeDetails/HomeDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/track-order/:id" element={<TrackOrder />} />
          <Route path="/shipment" element={<Shipment />} />
          <Route path="/rent-home/:id" element={<HomeDetails />} />
          <Route path="/rent-home" element={<RentHome />} />
          <Route path="/buy-home/:id" element={<HomeDetails />} />
          <Route path="/buy-home" element={<BuyHome />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:page" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
