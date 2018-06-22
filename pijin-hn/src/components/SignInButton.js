import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';
import * as firebase from 'firebase';

const SignInButton = () =>

    <Link to={routes.SIGN_IN}>
        <button className="w3-button w3-round-xxlarge" id="bt-login">SIGN IN</button>
    </Link>


const SignOutButton = () =>

    <Link to={routes.LANDING}>
        <button className="w3-button w3-round-xxlarge" id="bt-logout" onClick={() => {firebase.auth().signOut()}}>
        LOG OUT
        </button>
    </Link>


export default SignInButton;

export {
    SignOutButton
};