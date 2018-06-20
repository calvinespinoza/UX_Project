import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar';
import { Jumbotron } from './components/Jumbotron';
import * as firebase from 'firebase';
import { Map } from './Map';

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      user : null,
    }
    this.handleLoginGoogle = this.handleLoginGoogle.bind(this);
  }

  handleLoginGoogle(){
    if (this.state.user){
      firebase.auth().signOut()
        .then(result => console.log(`${result} ha salido`))
        .catch(err =>  console.log(err))
      this.setState({user : null, google: "Google"})
    }else {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(res => {
          this.setState({
            user : res.user
          })
          this.setState({google : "Logout Google"})
        })
        .catch(err=> console.log("error: "+err))
        
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Jumbotron event={this.handleLoginGoogle}/>
        <Map />
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        </div>
      </div>
    );
  }
}

export default App;
