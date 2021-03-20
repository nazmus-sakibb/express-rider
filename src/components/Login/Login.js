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

    const handleSubmit = (e) => {
        // console.log(user.email, user.password);
        if (user.email && user.password) {
            console.log('submitting');
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    return (
        <div className="text-center">
            <div className="form-field">
                <h2>Create an account</h2>
                <form onSubmit={handleSubmit}>
                    <input onBlur={handleBlur} name="name" type="text" placeholder="Name" required />
                    <br />
                    <input onBlur={handleBlur} name="email" type="text" placeholder="Username or Email" required />
                    <br />
                    <input onBlur={handleBlur} type="password" name="password" id="" placeholder="Password" required />
                    <br />
                    {/* <input type="password" name="password" id="" placeholder="Confirm Password" required />
                    <br/> */}
                    <input type="submit" value="Create an account" />
                </form>
                <p style={{color: 'red'}}>{user.error}</p>
                {user.success && <p style={{color: 'green'}}>User created successfully</p>}
            </div>
            <hr />
            <button onClick={handleGoogleSignIn}>Continue with Google</button>
        </div>
    );
};

export default Login;