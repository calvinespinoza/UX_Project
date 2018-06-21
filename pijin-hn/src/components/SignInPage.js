import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


import * as firebase from 'firebase';
import 'firebase/auth';
import * as routes from '../constants/routes';




const SignInPage = ({ history }) =>
    <div >
        <h1>
            ¡BIENVENIDO A MI PROYECTO!
    </h1>
        <h1>SignIn</h1>
        <SignInForm history={history} />

    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onClick = (event) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;
        //auth.signInWithEmailAndPassword(email,password);

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';


        return (

            <div className="container">

                <div className="form-signin">
                    <label for="inputEmail" class="sr-only">Email address</label>
                    <input value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="Email Address" />
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input value={password}
                        onChange={event => this.setState(byPropKey('password', event.target.value))}
                        type="password"
                        placeholder="Password" />
                    <button disabled={isInvalid} type="submit" onClick={this.onClick}>
                        Sign In
        </button>

                </div>
                {error && <p>{error.message}</p>}
            </div>
        );
    }
}

export default withRouter(SignInPage);

export {
    SignInForm,
};