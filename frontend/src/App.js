import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import LandingPage from './pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Tabz from './components/Tabz/Tabz';
import Profile from './pages/Profile/Profile';
import SingleCampaign from './pages/SingleCampaign/SingleCampaign';


function App() {

  return (
    <>
    <Router>
    <div className="App">
      <Routes>

      {/* <Route path ='/' element={<Header/>} /> */}
      <Route path ='/' element={<LandingPage />} />
      <Route path ='/campaign' element={<Tabz />} />
        <Route path ='/profile' element={<Profile />} />
        <Route path ='/singlecampagin/:id' element={<SingleCampaign />} />

      </Routes>
    </div>
    </Router>
      <ToastContainer />
    </>
  );
}

export default App;
