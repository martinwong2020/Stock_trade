import React, { Component, useState } from 'react'
import {auth, google_auth} from "../config/firebase";
import { createUserWithEmailAndPassword,signInWithPopup ,signOut} from 'firebase/auth';

import "../assets/Auth.css"
import sign_in_image from "../images/sign_in.jpeg"
import google_img from "../images/google_image.png"

function Auth(){

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    async function signIn(){
        try{
            await createUserWithEmailAndPassword(auth,email,password);
        }
        catch(err){
            console.error("sign in error");
        }
        
    }
    async function signInGoogle(){
        try{
            await signInWithPopup(auth,google_auth);
        }
        catch(err){
            console.error("sign in google error.");
        }
    }
    async function logout(){
        try{
            signOut(auth);
        }
        catch(error){
            console.error("sign out error");
        }
    }
    return (
        <div className='auth_parent'>
            <div className="auth_container">
                <img src={sign_in_image} className='sign_in_image'/>
                <div className='log_in_container'>
                    <h2 className="log_in">Log In</h2>
                    <hr className="border"/>
                    <button className="google_sign_in" onClick={signInGoogle}> 
                        <span className='red'>
                            G
                        </span>
                        <span className='yellow'>
                            oo
                        </span>
                        <span className='red'>
                            g
                        </span>
                        <span className='blue'>
                            l
                        </span>
                        <span className='green'>
                            e
                        </span>
                        {/* <img className="google_image" src={google_img}/>
                        Google */}
                    </button>
                    <hr className="border"/>
                    <input className="auth_input User_email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}></input>
                    <input className="auth_input User_password" placeholder='Password' type="password" onChange={(e)=>setPassword(e.target.value)}></input>
                    <button className="auth_button auth_input sign_in" onClick={signIn}>Sign In</button>
                    
                    <button className="auth_button sign_out" onClick={logout}>Sign out</button>
                </div>
            </div>
        </div>
    )
}
export default Auth