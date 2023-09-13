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
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Authenticate from './pages/Authenticate';

function App() {


  

  return (

    <div className="App">

      <DataContextProvider>

      <Router>
          <Navbar />
          <Routes>
          <Route path="/" element={<Authenticate />} />

            {/* <Route path="/" element={<Home />} />
            <Route path="/subject" element={<Subject />} /> */}
          </Routes>
      </Router>
        
      </DataContextProvider>
            
      
      
    </div>
  );
}

export default App;
