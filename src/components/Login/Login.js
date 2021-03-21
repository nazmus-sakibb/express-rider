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
    const [loggedInUser, setLoggedInUser, signedInUser, setSignedInUser] = useContext(UserContext);
    const [user, setUser] = useState({});
    const [newUser, setNewUser] = useState(true);


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
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setSignedInUser(newUserInfo);
                    history.replace(from);
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

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            // console.log('Username updated successfully')
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="text-center">
            <div className="form-field">
                <h2>{newUser ? 'Create an account' : 'Login'}</h2>
                <h3>Email: {signedInUser.email}</h3>
                <form onSubmit={handleSubmit}>
                    {newUser && <input onBlur={handleBlur} name="name" type="text" placeholder="Name" required />}
                    <br />
                    <input onBlur={handleBlur} name="email" type="text" placeholder="Username or Email" required />
                    <br />
                    <input onBlur={handleBlur} type="password" name="password" id="" placeholder="Password" required />
                    <br />
                    {/* <input type="password" name="password" id="" placeholder="Confirm Password" required />
                    <br/> */}
                    <input type="submit" value={newUser ? 'Create an account' : 'Login'} />
                </form>
                <label for="newUser">{newUser ? "Already have an account?" : "Dont't have an account?"}</label>
                <span onClick={() => setNewUser(!newUser)} className="toggle-form">{newUser ? 'Login' : 'Create an account'}</span>
                <p style={{ color: 'red' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>}
            </div>
            <hr />
            <button onClick={handleGoogleSignIn}>Continue with Google</button>
        </div>
    );
};

export default Login;