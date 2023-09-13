import React, { useEffect } from 'react'
import SignIn from '../components/auth/SignIn'
import SignUp from '../components/auth/SignUp'
import { useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'

const Authenticate = () => {

  const [signInPage, setSignInPage] = useState(true)
  const [authUser, setAuthUser] = useState(null)

  useEffect(()=>{
    const listen =   onAuthStateChanged(auth, (user)=>{
      if (user){
        setAuthUser(user)
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