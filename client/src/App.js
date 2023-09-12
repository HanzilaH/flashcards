import './App.css';
import Home from './pages/Home';
import { DataContextProvider } from './DataContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Subjectstore from './components/Subjectstore';
import Flash from './pages/Flash';
import Subjectview from './components/Subjectview';
import QuestionStore from './components/QuestionStore';
import Subjectflash from './components/Subjectflash';
import { useState } from 'react';
import Subjectlist from './components/Subjectlist';
import Subject from './pages/Subject';
import Navbar from './components/Navbar';

function App() {


  

  return (

    <div className="App">

      <DataContextProvider>

      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subject" element={<Subject />} />
          </Routes>
      </Router>
        
      </DataContextProvider>
      
      
    </div>
  );
}

export default App;
