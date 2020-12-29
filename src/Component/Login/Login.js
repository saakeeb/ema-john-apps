import React, { useState } from 'react';

import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, googleSignInUser, googleSignOutUser, handleFacebookUser, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';




const Login = () => {
    initializeLoginFramework();


    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn : false,
        name : '',
        email : '',
        photo : '',
        password: '',
        error: '',
        success: false
    })

    const handleResponse = (res, redirect)=>{
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
        
    }

    const googleSignIn = () =>{
        googleSignInUser()
        .then(res =>{
            handleResponse(res, true);
        })
    }
    const googleSignOut = () =>{
        googleSignOutUser()
        .then(res =>{
            handleResponse(res, false);
        })
    }
    const handleFacebook = ()=> {
        handleFacebookUser()
        .then(res =>{
            handleResponse(res, true);
        })
    }

    const handleClick =  (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        let isFieldValid = true;
        if(name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(value);
        }
        if(name === 'password'){
            const isValidLength = value.length >= 6;
            const isValidPass = /\d{1}/.test(value)
            isFieldValid = isValidLength && isValidPass;
        }
        if(isFieldValid){
            const userInfo = {...user}; 
            userInfo[name] = value;
            setUser(userInfo);
        }
    }

    const handleSubmit  = (e)=>{
        if(newUser && user.email && user.password){
            createUserWithEmailAndPassword(user.name, user.email, user.password)
            .then(res =>{
                handleResponse(res, true);
            })
        }
    
        if(!newUser && user.email && user.password ){
            signInWithEmailAndPassword(user.email, user.password)
            .then(res =>{
                handleResponse(res, true);
            })
        }
        e.target.reset();
        e.preventDefault();
    }

    return (
        <div style={{textAlign:'center'}}>
            {
                user.isSignIn  ? <button style={{backgroundColor:'lightGrey', border:'none', cursor:'pointer'}} onClick={googleSignOut}>Sign Out</button> :
                <button style={{backgroundColor:'lightGrey', border:'none', cursor:'pointer'}} onClick={googleSignIn}>Sign In</button>
            }
            <br/>
            {
                user.isSignIn && <div style={{display:'flex'}}>
                    <l1 style={{position:'relative'}}>Welcome, {user.name}</l1>
                    <img src={user.photo} alt="" style={{height:'38px', borderRadius:'50%'}}/> 
                </div>
            }
            <br/>
            <button type="submit" onClick={handleFacebook}>Login with Facebook</button>
            <br/><br/>

            <form onSubmit={handleSubmit}>
                {newUser &&
                    <input type="text" name="name" id="text" onBlur={handleClick} placeholder='Your Name' required/>
                }
                <br/>
                <input type="text" name="email" id="email" onBlur={handleClick} placeholder='Your Email' required/>
                <br/>
                <input type="password" name="password" id="password" onBlur={handleClick} placeholder='Your Password' title='6 character with 1 numeric value' required/>
                <br/>
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
            </form>
            
            <input type="checkbox" name="newUser" id="" onChange={()=> setNewUser(!newUser)}/>
            <label htmlFor="newUser">Sign up for new user</label>
            
            <p style={{color:'red'}}>{user.error}</p>
            {
                user.success && <p style={{color:'green'}}>Your account {newUser ? 'created' : 'logged in'} successfully</p>
            }
        </div>
    );
};

export default Login;