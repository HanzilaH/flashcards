import React, { useEffect } from 'react'
import SignIn from '../components/auth/SignIn'
import SignUp from '../components/auth/SignUp'
import { useState, useContext } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { db } from '../firebase/firebaseConfig'
import { collection, doc } from 'firebase/firestore'
import DataContext from '../context/DataContext'

const Authenticate = () => {

  const [signInPage, setSignInPage] = useState(true)
  const [authUser, setAuthUser] = useState(null)
  const [questionList, setQuestionList] = useState(null)

  const {userData} = useContext(DataContext)

  useEffect(()=>{
    const listen =   onAuthStateChanged(auth, (user)=>{
      if (user){
        setAuthUser(user)

        try {
          // const subjectsCollectionRef = collection(db, 'users', doc(db, 'users', user.uid), 'subjects');
          console.log(db);
        } catch (error) {
          console.error('Error creating Firestore reference:', error);
        }
      }else{
        setAuthUser(null)
      }
  
    })

    return ()=>{
      listen()
    }

  }, []);


  const userSignOut = ()=>{
    signOut(auth).then(()=>{
      console.log('Signed out successfully');
    }).catch(err=>console.log(err))

  }


    
    
  const togglePage = ()=>{
    setSignInPage(!signInPage)
  }
  return (
    <>
    <div>
      
      {userData? <div>data is there</div>: <div>shithead</div>}

      {authUser? `Signed In ${authUser.email}`: 'Signed out'}
      {signInPage? <SignIn onSignUpButtonClick = {togglePage} />: <SignUp onSignInButtonClick = {togglePage} />}
        <button onClick={userSignOut}>
          Sign Out
        </button>
    </div>
    </>
  )
}

export default Authenticate