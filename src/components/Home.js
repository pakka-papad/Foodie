import React from 'react'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {

  const history = useHistory()
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth=>{
      if(userAuth){
        
      }else{
        history.push("/")
      }
    })
    return unsubscribe;
  }, [])

  return (
    <div>
      <h1>WELCOME USER</h1>
      <p><button onClick={async()=>{
        await auth.signOut()
        history.push("/")
      }}>LogOut</button></p>
    </div>
  )
}

export default Home;
