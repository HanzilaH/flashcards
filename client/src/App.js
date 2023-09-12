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

function App() {


  

  return (

    <div className="App">

      <DataContextProvider>
        <Subject></Subject>
        
      </DataContextProvider>
      
      
    </div>
  );
}

export default App;
