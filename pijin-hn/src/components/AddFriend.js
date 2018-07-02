import React, { Component } from 'react';
import ReactModal from 'react-modal';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import './Friends.css';

const AddFriends = () =>
    <div id="explore">
        <h1 id="main-title">Friends</h1>
        <FriendFeed />
    </div>

export class FriendFeed extends Component {
    constructor() {

        super()
        this.state = {
            idF: "",

        };
        this.addF = this.addF.bind(this);
    }
    addF() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var fkey = this.state.idF;
                var id = user.uid;
                
                console.log(user.uid);
                var friendRef = firebase.database().ref().child("Usuarios").child(id).child("Amigos");
                
                var key = friendRef.push().getKey();

                
                friendRef.child(key).set({
                    [fkey]: fkey,
                });
            }
        })
    }
    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var id = user.uid;
                console.log(user.uid);
                var Ref = firebase.database().ref().child("Usuarios");
                //var exp = document.getElementById("explore-div");

                Ref.on("child_added", snap => {
                    var nombre = snap.child("Nombre").val();
                    var boxfr = document.createElement('div');
                    var add = document.createElement("button");
                    var friend = document.createElement('div');
                    var idT = snap.child("Llave").val();
                    friend.className = "w3-button w3-round-xlarge zoom";
                    friend.setAttribute("id", "bt-friend");
                    boxfr.setAttribute("id", "box-friend");
                    var name = document.createElement('p');
                    name.setAttribute("id", "friend-name");
                    name.id = "friend-name";

                    var t1 = document.createTextNode(nombre);
                    var t2 = document.createTextNode("Add Friend!");
                    add.onclick = this.addF;
                    friend.onmouseover = () => {
                        console.log("hi");
                        this.setState({ "idF": idT })
                        console.log(this.state.idF);
                    };
                    add.appendChild(t2);
                    name.appendChild(t1);
                    name.appendChild(add);

                    boxfr.appendChild(name);
                    friend.appendChild(boxfr);
                    document.getElementById("friend-div").appendChild(friend);
                })
                
            }
        })
    }


    render() {

        return (
            <div id="friend-div">

            </div>
        );
    }
}



export default AddFriends;

