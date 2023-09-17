import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Authenticate from './pages/Authenticate';



function App() {

  

  useEffect(() => {
    // This code will run when the component mounts (i.e., when the app starts)

    // Display an alert or any other action you want to perform
    alert('Message from ur Fav person Hanzila:\n\nUse the email: \'flashcards@gmail.com\' and password: \'flashcard\'\n for testing \n \nAnd drop ur suggestions \n\nRegards, ');
  }, []);




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
