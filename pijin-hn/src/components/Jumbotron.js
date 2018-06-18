import React, { Component } from 'react';
import './Jumbotron.css';
import * as firebase from 'firebase';

export class Jumbotron extends Component {
    constructor(props)
    {
        super(props);
        this.writingDB = this.writingDB.bind(this);
    }

    writingDB() {
        const rootRef = firebase.database().ref();

        rootRef.push().set({
            name: "HOLA"
        });
    }

    render() {
        return (
            <div id="jumbotron" class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4" id="mainTitle">¿Quieres unirte al pijin?</h1>
                    <p class="lead" id="subTitle">Hazte una cuenta</p>
                </div>
                <div id="authButtons">
                    <button class="w3-button w3-round-xxlarge" onClick={this.props.event} id="bt-login">SIGN UP</button>
                    <button class="w3-button w3-round-xxlarge" id="bt-login">LOG IN</button>
                </div>
            </div>
        );
    }
}