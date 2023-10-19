import './App.css';

import React from 'react';
import { Route, Routes} from "react-router-dom";

import BreachData from './pages/BreachData'
import NewsPage from './pages/News'
import NotFound from './pages/NotFound'


import Header from './components/Header.js'
import Footer from './components/Footer.js'

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route exact path="/" element={<BreachData/>} />
        <Route exact path="/news" element={<NewsPage/>} />
        
        {/* Route Not Found */}
        <Route path="*" element={<NotFound/>} status={404}/>
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
