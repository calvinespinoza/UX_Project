import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  Navbar  from './components/Navbar';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './components/Landing';
import HomePage from './components/Home';
import Map from './components/Map';
import Explore from './components/Explore';
import Account from './components/Account';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import NewEvent from './components/NewEvent';

import * as routes from './constants/routes';
import Friends from './components/Friends';
import AddFriend from './components/AddFriend';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
      authUser: null,
    }
    this.handleLoginGoogle = this.handleLoginGoogle.bind(this);
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(authUser => {
      authUser ? this.setState(()=>({authUser}))
              : this.setState(() => ({authUser: null}));
    });
  }

  handleLoginGoogle() {
    if (this.state.user) {
      firebase.auth().signOut()
        .then(result => console.log(`${result} ha salido`))
        .catch(err => console.log(err))
      this.setState({ user: null, google: "Google" })
    } else {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(res => {
          this.setState({
            user: res.user
          })
          console.log(this.state.user);
          var ref = firebase.database().ref().child("Usuarios").child(this.state.user.uid);
          ref.child("UID").set(this.state.user.uid);
          ref.child("Name").set(this.state.user.displayName);
          ref.child("Email").set(this.state.user.email);
          ref.child("Phone Number").set(this.state.user.phoneNumber);
          ref.child("Photo URL").set(this.state.user.photoURL);


          this.setState({ google: "Logout Google" })
        })
        .catch(err => console.log("error: " + err))

    }
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar authUser={this.state.authUser}/>
            <Route
              exact path={routes.LANDING}
              component={() => <LandingPage />}
            />


            <Route
              exact path={routes.SIGN_IN}
              component={() => <SignInPage />}
            />
            <Route
              exact path={routes.SIGN_UP}
              component={() => <SignUpPage />}
            />
            <Route
              exact path={routes.NEW_EVENT}
              component={() => <NewEvent />}
            />
            {/*
          <Route
            exact path={routes.SIGN_IN}
            component={() => <SignInPage />}
          />
          
           <Route
            exact path={routes.PASSWORD_FORGET}
            component={() => <PasswordForgetPage />}
          />
          */}
            <Route
              exact path={routes.EXPLORE}
              component={() => <Explore />}
            />
            <Route
              exact path={routes.MAP}
              component={() => <Map />}
            />

            <Route
              exact path={routes.HOME}
              component={() => <HomePage />}
            />
            <Route
              exact path={routes.ACCOUNT}
              component={() => <Account />}
            />
            <Route
              exact path={routes.FRIENDS}
              component={()=> <Friends />}
            />
            <Route
              exact path={routes.FRIENDSADD}
              component={()=> <AddFriend />}
            />
          </div>

        </Router>

        {/*        
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        </div>*/}
      </div>
    );
  }
}

export default App;
