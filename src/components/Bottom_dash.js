import React, { useState } from 'react'
import "../assets/Bottom_dash.css"
import { auth } from "../config/firebase";

import { signOut } from 'firebase/auth';
export default function Bottom_dash(props) {
  const [signin,setSignin]=useState(false);
  async function signout(){
    try{
      await signOut(auth).then(
        props.sign_in_call_back(false)
      )
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div id="bottom_dash_container">
        <div id="home_dash" onClick={props.change_page_stock}>Home</div>
        <div id="search_dash" onClick={props.change_page_search}>Searched</div>
        <div id="signout" onClick={()=>{signout();}}>Sign Out</div>
    </div>
  )
}
