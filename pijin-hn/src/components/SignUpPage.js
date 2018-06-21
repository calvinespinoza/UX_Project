import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';
import './Jumbotron.css';

import * as routes from '../constants/routes';
import * as firebase from 'firebase';
import 'firebase/auth';

const SignUpPage = () =>
    <div id="sign-up-div">
        <div id="main-title">Sign Up</div>
        <SignUpForm history={history} />
    </div>

const INITIAL_STATE = {
    username: '',
    fullname: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
}
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});



class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = { INITIAL_STATE };

        this.addUser = this.addUser.bind(this);
    }

    addUser() {
        var ref = firebase.database().ref().child("Usuarios");

        var key = ref.push().getKey();

        ref.child(key).set({
            "Username": this.state.username,
            "Nombre Completo": this.state.fullname,
            "Email": this.state.email,
            "Password": this.state.passwordOne,
            "Llave": key
        });
    }

    onClick = (event) => {
        const {
            username,
            fullname,
            email,
            passwordOne,
        } = this.state;
        const {
            history,
        } = this.props;
        firebase.auth().createUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var userId = firebase.auth().currentUser.uid;
                var ref = firebase.database().ref().child("Usuarios");

                var key = ref.push().getKey();

                ref.child(userId).set({
                    "Username": username,
                    "Nombre Completo": fullname,
                    "Email": email,
                    "Password": passwordOne,
                    "Llave": userId
                });
            }
        });

        event.preventDefault();
    }


    render() {
        const {
            username,
            fullname,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <div onSubmit={this.onSubmit}>
                <ul id="input-list">
                    <li id="input-list-item">
                        <input id="sign-up-input"
                            value={username}
                            onChange={event => this.setState(byPropKey('username', event.target.value))}
                            type="text"
                            placeholder="Username"
                        />
                    </li>
                    <li id="input-list-item">
                        <input id="sign-up-input"
                            value={fullname}
                            onChange={event => this.setState(byPropKey('fullname', event.target.value))}
                            type="text"
                            placeholder="Full Name"
                        />
                    </li>
                    <li id="input-list-item">
                        <input id="sign-up-input"
                            value={email}
                            onChange={event => this.setState(byPropKey('email', event.target.value))}
                            type="text"
                            placeholder="Email Address"
                        />
                    </li>
                    <li id="input-list-item">
                        <input id="sign-up-input"
                            value={passwordOne}
                            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                            type="password"
                            placeholder="Password"
                        />
                    </li>
                    <li id="input-list-item">
                        <input id="sign-up-input"
                            value={passwordTwo}
                            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </li>
                </ul>
                <button id="bt-signup" className="w3-button w3-round-xxlarge" disabled={isInvalid} onClick={this.onClick}>
                    Sign Up
        </button>

                {error && <p>{error.message}</p>}
            </div>
        );
    }
}

const SignUpLink = () =>
    <p>
        Don't have an account?
    {' '}
        <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>

export default SignUpPage;

export {
    SignUpForm,
    SignUpLink,
};