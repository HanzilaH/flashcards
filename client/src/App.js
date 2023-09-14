import './App.css';
import Home from './pages/Home';
import { DataContextProvider } from './context/DataContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Subjectstore from './components/Subjectstore';
import Flash from './pages/Flash';
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

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const userDocs = await getDocs(usersCollectionRef);

  //     const usersData = [];
  //     for (const userDoc of userDocs.docs) {
  //       const userData = userDoc.data();
  //       const subjectsCollectionRef = collection(userDoc.ref, 'subjects');
  //       const subjectsDocs = await getDocs(subjectsCollectionRef);
  //       const subjectsData = subjectsDocs.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id
  //       }));
  //       userData.subjects = subjectsData;
  //       usersData.push({ ...userData, id: userDoc.id });
  //     }

  //     setUsers(usersData);
  //   }

  //   getUsers();
  // }, []);

  return (

    <div className="App">
          {
            userData? console.log(userData): null
          }

      {currentUser? users.map((user) => (
        <div key={user.id}>
          <h2>User: {user.displayName}</h2>
          <h3>Subjects:</h3>
          <ul>
            {user.subjects.map((subject) => {
              return (<>{subject.questions}</>)
            
            })}
          </ul>
        </div>
      )) : 'sign in to see users'}

{}

      {console.log(users)}


      <Router>
          <Navbar />
          <Routes>
          <Route path="/" element={<><Authenticate /><Home></Home></>} />





            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/subject" element={<Subject />} />
          </Routes>
      </Router>
        
            
      
      
    </div>
  );
}

export default App;
