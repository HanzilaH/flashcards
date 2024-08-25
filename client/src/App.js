import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Authenticate from './pages/Authenticate';
import Planner from './pages/Planner';



function App() {

  





  return (

    <div className="App">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet"/>
      </head>




      <Router>

          <Routes>
          <Route path="/" element={<><Authenticate /></>} />






            <Route path="/home" element={<Home />} />
            
            <Route path="/planner" element={<Planner />} />

          </Routes>

      </Router>
        
            
      
      
    </div>
  );
}

export default App;
