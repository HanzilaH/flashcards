import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Authenticate from './pages/Authenticate';



function App() {

  





  return (

    <div className="App">



      <Router>

          <Routes>
          <Route path="/" element={<><Authenticate /></>} />






            <Route path="/home" element={<Home />} />
          </Routes>

      </Router>
        
            
      
      
    </div>
  );
}

export default App;
