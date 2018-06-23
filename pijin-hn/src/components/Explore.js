import React, { Component } from 'react';
import ReactModal from 'react-modal';
import ReactDOM from 'react-dom';
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

    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
  componentDidMount() {
    this.handleEvents();
  }

  handleEvents() {
    var eventRef = firebase.database().ref().child("Eventos proximos");
    var exp = document.getElementById("explore-div");

    eventRef.on("child_added", snap => {
      var nombre = snap.child("Nombre").val();
      var lugar = snap.child("Lugar").val();

      var event = document.createElement('div');
      event.className = "w3-button w3-round-xlarge zoom";
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
      event.onclick = this.handleOpenModal;
      exp.appendChild(event);
    })
  }

  render() {
    return (
      <div id="explore-div">
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example">
          <button onClick={this.handleCloseModal}>Close Modal</button>

        </ReactModal>
      </div>
    );
  }
}

class ExampleApp extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    );
  }
}

export default Explore;

export {
  ExampleApp,
};