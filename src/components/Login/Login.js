import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from "../../App";
import { useHistory, useLocation } from 'react-router';
import './Login.css';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({});
    

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email };
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
            });
    }

    const handleSubmit = () => {

    }

    const handleBlur = (e) => {
        let isFormValid = true;
        if(e.target.name === 'email'){
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if(isFormValid){
            const newUser = {...user};
            newUser[e.target.name] = e.target.value;
            console.log(newUser);
            setUser(newUser);
        }
    }

    return (
        <div className="text-center">
            <div className="form-field">
                <h2>Create an account</h2>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Password: {user.password}</p>
                <form onSubmit={handleSubmit}>
                    <input onBlur={handleBlur} name="name" type="text" placeholder="Name" required />
                    <br />
                    <input onBlur={handleBlur} name="email" type="text" placeholder="Username or Email" required />
                    <br />
                    <input onBlur={handleBlur} type="password" name="password" id="" placeholder="Password" required />
                    <br />
                    {/* <input type="password" name="password" id="" placeholder="Confirm Password" required />
                    <br/> */}
                    <input type="submit" value="Create an account"/>
                </form>
            </div>
            <hr/>
            <button onClick={handleGoogleSignIn}>Continue with Google</button>
        </div>
    );
};

export default Login;