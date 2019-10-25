import React from 'react';


import ContentFrame from './components/pages/homepage/ContentFrame';
import Footer from './components/layout/Footer';
import HeaderMobile from './components/layout/HeaderMobile';
import HomeNavButtons from './components/pages/homepage/HomeNavButtons';
import Navbar from './components/layout/Navbar';



import './App.css';
import InsulinCalculation from './components/pages/calculation/InsulinCalculation';

const App = () => {
  return (
    <div className="App">
      <InsulinCalculation />
      <Navbar  />
      <Footer />
      <HeaderMobile />
      <HomeNavButtons />
      <ContentFrame />

    </div>
  );
}

export default App;
