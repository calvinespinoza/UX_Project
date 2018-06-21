import React, { Component } from 'react';
import * as firebase from 'firebase';
import './Explore.css';

const Explore = () =>
  <div id="explore">
    <h1 id="main-title">Explore</h1>
    <ExploreFeed />
  </div>

class ExploreFeed extends Component {

  constructor(props) {
    super(props);
    this.handleEvents = this.handleEvents.bind(this);
    this.render = this.render.bind(this);
  }
  componentDidMount(){
    this.handleEvents();
  }
  handleEvents() {
    var eventRef = firebase.database().ref().child("Eventos proximos");
    var exp = document.getElementById("explore-div");
    console.log(exp);

    console.log(eventRef);
    eventRef.on("child_added", snap => {
      var nombre = snap.child("Nombre").val();
      var lugar = snap.child("Lugar").val();

      var event = document.createElement('div');
      event.className = "w3-button w3-round-xlarge";
      event.setAttribute("id", "bt-event");
      var boxev = document.createElement('div');
      boxev.setAttribute("id", "box-event");
      var name = document.createElement('p');
      name.setAttribute("id", "event-name");
      name.id = "event-name";
      var loc = document.createElement('p');
      loc.setAttribute("id", "event-location");

      var t1 = document.createTextNode(nombre);
      name.appendChild(t1);

      var t2 = document.createTextNode(lugar);
      loc.appendChild(t2);

      boxev.appendChild(name);
      boxev.appendChild(loc);

      event.appendChild(boxev);
      document.getElementById("explore-div").appendChild(event);
    })
  }

  render() {
    return (
      <div id="explore-div">
        
      </div>
    );
  }
}
export default Explore;