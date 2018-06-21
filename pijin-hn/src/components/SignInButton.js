import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

const SignInButton = () =>
  
    <Link to={routes.SIGN_IN}>
        <button className="w3-button w3-round-xxlarge" id="bt-login">SIGN IN</button>
    </Link>
  

export default SignInButton;