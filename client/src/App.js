import './App.css';
import Home from './pages/Home';
import { DataContextProvider } from './context/DataContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Subjectstore from './components/Subjectstore';
import Subjectview from './components/Subjectview';
import QuestionStore from './components/QuestionStore';
import Subjectflash from './components/Subjectflash';
import { useContext, useEffect, useState } from 'react';
import Subjectlist from './components/Subjectlist';
import Subject from './pages/Subject';
import Navbar from './components/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Authenticate from './pages/Authenticate';
import { db } from './firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from './context/AuthContext';
import DataContext from './context/DataContext';


function App() {

  const {currentUser, logout} = useAuth()
  const {userData} = useContext(DataContext) 
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');


  return (

    <div className="App">



      <Router>
          <Navbar />

          <Routes>
          <Route path="/" element={<><Authenticate /></>} />






            <Route path="/home" element={<Home />} />
            <Route path="/subject" element={<Subject />} />
          </Routes>

          <Home/>
          <Subject/>
      </Router>
        
            
      
      
    </div>
  );
}

export default App;
