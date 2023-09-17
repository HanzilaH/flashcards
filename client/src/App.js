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
