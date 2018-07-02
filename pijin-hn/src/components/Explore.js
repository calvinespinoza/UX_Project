import React, { Component } from 'react';
import ReactModal from 'react-modal';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import './Explore.css';

const Explore = () =>
  <div id="explore">
    <h1 id="main-title">Explore</h1>
    <ExampleApp />
    <ExploreFeed />
  </div>

export class ExploreFeed extends Component {

  constructor(props) {
    super(props);
    this.handleEvents = this.handleEvents.bind(this);
    this.render = this.render.bind(this);

    this.state = {
      showModal: false,
      currentEvent: "",
      eventName: "",
      location: "",
      fechaInicio: "",
      horaInicio: "",
      horaFinal: ""
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
    var key = this.state.currentEvent;
    var eventRef = firebase.database().ref().child("Eventos proximos").child(key)
    var nombre;
    var locName;
    var fInicio;
    var hInicio;
    var hFinal;
    eventRef.on("value", function (snapshot) {
      nombre = snapshot.child("Nombre").val();
      locName = snapshot.child("Lugar").val();
      fInicio = snapshot.child("Fecha Inicio").val();
      hInicio = snapshot.child("Hora Inicio").val();
      hFinal = snapshot.child("Hora Final").val();
    })
    this.setState(
      {
        "eventName": nombre,
        "location": locName,
        "fechaInicio": fInicio,
        "horaInicio": hInicio,
        "horaFinal": hFinal
      });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
  componentDidMount() {
    this.handleEvents();
  }

  getContent() {
    firebase.database().ref().child("Eventos proximos").child("authUser.uid")
      .child("Nombre").on("value", function (snapshot) {
        console.log(snapshot.val());
        var nom = document.createTextNode(snapshot.val());
        document.getElementById("navbarDropdown").innerHTML = "";
        document.getElementById("navbarDropdown").appendChild(nom);
      })
  }

  handleEvents() {
    var eventRef = firebase.database().ref().child("Eventos proximos");
    var exp = document.getElementById("explore-div");

    eventRef.on("child_added", snap => {
      var nombre = snap.child("Nombre").val();
      var lugar = snap.child("Lugar").val();
      var id = snap.child("Llave").val();

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

      event.onmouseover = () => {
        console.log("hi");
        this.setState({ "currentEvent": id })
        console.log(this.state.currentEvent);
      };
      exp.appendChild(event);
    })
  }


  render() {
    return (
      <div id="explore-div">
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          <div id="heading-modal">
            <div id="modal-detail"></div>
            <div id="event-title">{this.state.fechaInicio}</div>
            <div id="event-name-modal">{this.state.eventName}</div>
            <div id="event-loc-modal">{this.state.location}</div>
            <div id="event-title"> </div>
            <div id="event-title"><b>Hora Inicio:</b> {this.state.horaInicio}</div>
            <div id="event-title"><b>Hora Final:</b> {this.state.horaFinal}</div>

          </div>
          <button id="close-button" onClick={this.handleCloseModal}><span uk-icon="close"></span></button>
        </ReactModal>
      </div>
    );
  }
}

class ExampleApp extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      filter: '',
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.filter = this.filter.bind(this);
    this.filterFiesta = this.filterFiesta.bind(this);
    this.filterComida = this.filterComida.bind(this);
    this.filterEnVivo = this.filterEnVivo.bind(this);
    this.filterGaming = this.filterGaming.bind(this);
    this.filterMusicon = this.filterMusicon.bind(this);
    this.filterBares = this.filterBares.bind(this);
    this.filterAireLibre = this.filterAireLibre.bind(this);
    this.filterDeportes = this.filterDeportes.bind(this);
    this.filterArte = this.filterArte.bind(this);

  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  filter() {
    document.getElementById("explore-div").innerHTML = "";
    var eventRef = firebase.database().ref().child("Eventos proximos");
    var exp = document.getElementById("explore-div");

    eventRef.on("child_added", snap => {
      if (snap.child("Categorias").child(this.state.filter).val()) {
        var nombre = snap.child("Nombre").val();
        var lugar = snap.child("Lugar").val();
        var id = snap.child("Llave").val();

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

        event.onmouseover = () => {
          console.log("hi");
          this.setState({ "currentEvent": id })
          console.log(this.state.currentEvent);
        };
        exp.appendChild(event);
      }
    })
  }

  filterFiesta()
  {
    this.setState({
      filter: "Fiesta"
    })
    console.log(this.state.filter);
  }
  filterComida()
  {
    this.setState({
      filter: "Comida"
    })
    console.log(this.state.filter);
  }

  filterEnVivo()
  {
    this.setState({
      filter: "En Vivo"
    })
    console.log(this.state.filter);
  }

  filterGaming()
  {
    this.setState({
      filter: "Gaming"
    })
    console.log(this.state.filter);
  }


  filterMusicon()
  {
    this.setState({
      filter: "Musicon"
    })
    console.log(this.state.filter);
  }


  filterBares()
  {
    this.setState({
      filter: "Bares"
    })
    console.log(this.state.filter);
  }


  filterAireLibre()
  {
    this.setState({
      filter: "Aire Libre"
    })
    console.log(this.state.filter);
  }


  filterDeportes()
  {
    this.setState({
      filter: "Deportes"
    })
    console.log(this.state.filter);
  }


  filterArte()
  {
    this.setState({
      filter: "Arte"
    })
    console.log(this.state.filter);
  }

  render() {
    return (
      <div id="categories">
              <div id="sub-title">Categories</div>

        <button className="bt-category" onMouseOver={this.filterFiesta} onClick={this.filter}>Fiesta</button>
        <button className="bt-category" onMouseOver={this.filterComida} onClick={this.filter}>Comida</button>
        <button className="bt-category" onMouseOver={this.filterEnVivo} onClick={this.filter}>En Vivo</button>
        <button className="bt-category" onMouseOver={this.filterGaming} onClick={this.filter}>Gaming</button>
        <button className="bt-category" onMouseOver={this.filterMusicon} onClick={this.filter}>Musicon</button>
        <button className="bt-category" onMouseOver={this.filterBares} onClick={this.filter}>Bares</button>
        <button className="bt-category" onMouseOver={this.filterAireLibre} onClick={this.filter}>Libre</button>
        <button className="bt-category" onMouseOver={this.filterDeportes} onClick={this.filter}>Deportes</button>
        <button className="bt-category" onMouseOver={this.filterArte} onClick={this.filter}>Arte</button>


      </div>
    );
  }
}

export default Explore;

export {
  ExampleApp
};