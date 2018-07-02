import React, { Component } from 'react';
import ReactModal from 'react-modal';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import './Friends.css';




const Friends = () =>
  <div id="explore">
    <h1 id="main-title">Friends</h1>
    <FriendFeed />
  </div>

export class FriendFeed extends Component {
  constructor() {

    super()

  }
  componentDidMount() {

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var id = user.uid;
        console.log(user.uid);
        var friendRef = firebase.database().ref().child("Usuarios").child(id).child("Amigos");
        var exp = document.getElementById("explore-div");

        friendRef.on("value", snap => {
          var friends = snap.val();

          var keys = Object.keys(friends);
          console.log(keys);
          for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var friendKey = friends[k];
            console.log(friendKey);
            var friendRef = firebase.database().ref().child("Usuarios").child(friendKey);
            friendRef.on("value", snap => {
              var userInfo = snap.val();
              if (userInfo) {
                var nombre = snap.child("Nombre").val();
                var boxfr = document.createElement('div');
                var add = document.createElement("button");
                var friend = document.createElement('div');
                friend.className = "w3-button w3-round-xlarge zoom";
                friend.setAttribute("id", "bt-friend");
                boxfr.setAttribute("id", "box-friend");
                var name = document.createElement('p');
                name.setAttribute("id", "friend-name");
                name.id = "friend-name";

                var t1 = document.createTextNode(nombre);
                var t2 = document.createTextNode("INVITE TO PARTY");
                add.appendChild(t2);
                name.appendChild(t1);
                name.appendChild(add);

                boxfr.appendChild(name);
                friend.appendChild(boxfr);
                document.getElementById("friend-div").appendChild(friend);
              }

              console.log(userInfo);
            })
          }



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



export default Friends;

