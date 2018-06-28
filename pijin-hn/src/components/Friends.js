import React, { Component } from 'react';
import ReactModal from 'react-modal';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import './Explore.css';

const Friends = () =>
  <div id="explore">
    <h1 id="main-title">Hola</h1>
    <FriendFeed />
  </div>

export class FriendFeed extends Component {
  constructor(){
    super()
    this.getFriend = this.getFriend.bind(this);
  }
  componentDidMount() {
    
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var id = user.uid;
        console.log(user.uid);
        var friendRef = firebase.database().ref().child("Usuarios").child(id).child("Amigos").child("Llave");
        var exp = document.getElementById("explore-div");

        friendRef.on("value", snap => {
          var userInfo = snap.val();
          /*if (userInfo) {
            var keys = Object.keys(userInfo);
            for(var i=0; i<keys.length;i++){
              var k = keys[i];
              var friendId = userInfo[k].Llave;
              console.log(friendId);
              //
            }
            console.log(keys);
          }*/
          //getFriend(userInfo);
          console.log("hola");
          console.log(userInfo);
        })
      }
    })
  }

  getFriend(friendId) {
    var friendRef = firebase.database().ref().child("Usuarios").child(friendId);
    friendRef.on("value", snap => {
      var userInfo = snap.val();
      if (userInfo) {
        var nombre = snap.child("Nombre").val();
        var boxfr = document.createElement('div');
        boxfr.setAttribute("id", "box-friend");
        var name = document.createElement('p');
        name.setAttribute("id", "friend-name");
        name.id = "friend-name";

        var t1 = document.createTextNode(nombre);
        name.appendChild(t1);


        boxfr.appendChild(name);
        document.getElementById("friend-div").appendChild(boxfr);
      }

      console.log(userInfo);
    })
  }
  render() {

    return (
      <div id="friend-div">

      </div>
    );
  }
}



export default Friends;

