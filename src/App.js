import './assets/App.css';
import Auth from "./components/Auth";
import Home from './components/Home';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

import {auth, google_auth} from "./config/firebase";
import {useNavigate} from "react-router-dom";
function App() {
  const [signedin,setSignedin]=useState(false);
  
  // const [googlesignedin,setGooglesignedin]=useState(false);
  // const [signinstatus,setSigninstatus]=useState(false);
  onAuthStateChanged(auth,(user) =>{
    if(user){
      setSignedin(true);
    }
  })
  // auth.onAuthStateChanged(async (user)=>{
  //   if(user){
  //     setSignedin(true);
  //   }
  // })
  function sign_in_call_back(state){
    setSignedin(state);
  }

  if(signedin){
    return <Home sign_in_call_back={sign_in_call_back} />
  }
  return (
    <>
      <Auth />
    </>
  );
  // return(
  //   <>
  //   {signedin ? <Home sign_in_call_back={sign_in_call_back} /> : <Auth /> }
  //   </>
  // )
}

export default App;
