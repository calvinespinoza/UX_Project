import React, { Component } from 'react';
import * as firebase from 'firebase';
import './Home.css';
import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';

const NewEvent = ({ history }) =>
    <div id="event">
        <div id="main-title">Create Event</div>
        <NewEventForm history={history} />
    </div>

const INITIAL_STATE = {
    eventname: '',
    locationname: '',
    fechainicio: '',
    horainicio: '',
    fechafinal: '',
    horafinal: '',

    fiesta: false,
    comida: false,
    envivo: false,
    gaming: false,
    musicon: false,
    bares: false,
    airelibre: false,
    deportes: false,
    arte: false,

    error: null,
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class NewEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = { INITIAL_STATE };

        this.addEvent = this.addEvent.bind(this);
    }

    addEvent() {
        /*
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var userId = user.uid;*/
        var eventRef = firebase.database().ref().child("Eventos proximos");
        var userRef = firebase.database().ref().child("Usuarios");
        var uid = "";
        //var hostname = userRef.child(userId).child("Nombre");
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                uid = firebase.auth().currentUser.uid;
                var key = eventRef.push().getKey();

                eventRef.child(key).set({
                    "Nombre": this.state.eventname,
                    "Lugar": this.state.locationname,
                    "Fecha Inicio": this.state.fechainicio,
                    "Fecha Final": this.state.fechafinal,
                    "Hora Inicio": this.state.horainicio,
                    "Hora Final": this.state.horafinal,
                    "Llave": key,
                    "CreatorId": uid,

                    "Categorias": {
                        "Fiesta": (this.state.fiesta !== null ? (this.state.fiesta ? true : false) : false),
                        "Comida": (this.state.comida !== null ? (this.state.comida ? true : false) : false),
                        "En Vivo":(this.state.envivo !== null ? (this.state.envivo ? true : false) : false),
                        "Gaming": (this.state.gaming !== null ? (this.state.gaming ? true : false) : false),
                        "Musicon": (this.state.musicon !== null ? (this.state.musicon ? true : false) : false),
                        "Bares": (this.state.bares != null ? (this.state.bares ? true : false) : false),
                        "Aire Libre": (this.state.airelibre !== null ? (this.state.airelibre ? true : false) : false),
                        "Deportes": (this.state.deportes !== null ? (this.state.deportes ? true : false) : false),
                        "Arte": (this.state.arte !== null ? (this.state.arte ? true : false) : false),
                    }

                    /*
                    "Host": {
                        "Nombre": hostname,
                        "Llave": userId
                    }*/
                });
            }
        })

        /*
                    }
                });*/


    }

    onClick = (event) => {
        const {
            eventname,
            locationname,
            fechainicio,
            horainicio,
            fechafinal,
            horafinal,

            fiesta,
            comida,
            envivo,
            gaming,
            musicon,
            bares,
            airelibre,
            deportes,
            arte,

            error,
        } = this.state;
        const {
            history,
        } = this.props;

        { this.addEvent() }

        //{ history.push(routes.HOME) }
        event.preventDefault();
    }


    render() {
        const {
            eventname,
            locationname,
            fechainicio,
            horainicio,
            fechafinal,
            horafinal,

            fiesta,
            comida,
            envivo,
            gaming,
            musicon,
            bares,
            airelibre,
            deportes,
            arte,

            error,
        } = this.state;

        const isInvalid =
            eventname === '' ||
            locationname === '' ||
            fechafinal === '' ||
            fechainicio === '' ||
            horainicio === '';

        return (
            <div onSubmit={this.onSubmit}>
                <form id="input-list" className="uk-grid-small">
                    <div id="input-list-item">
                        <input id="new-event-input"
                            className="uk-input"

                            value={eventname}
                            onChange={event => this.setState(byPropKey('eventname', event.target.value))}
                            type="text"
                            placeholder="Event name"
                        />
                    </div>
                    <div id="input-list-item">
                        <input id="new-event-input"
                            className="uk-input"
                            value={locationname}
                            onChange={event => this.setState(byPropKey('locationname', event.target.value))}
                            type="text"
                            placeholder="Location"
                        />
                    </div>
                    <div id="input-list-item">
                        <input id="new-event-input"
                            className="uk-input"

                            value={fechainicio}
                            onChange={event => this.setState(byPropKey('fechainicio', event.target.value))}
                            type="date"
                        />
                    </div>
                    <div id="input-list-item">
                        <input id="new-event-input"
                            className="uk-input"

                            value={horainicio}
                            onChange={event => this.setState(byPropKey('horainicio', event.target.value))}
                            type="text"
                            placeholder="Hora Inicio"
                        />
                    </div>
                    <div id="input-list-item" >
                        <input id="new-event-input"
                            className="uk-input"
                            value={fechafinal}
                            onChange={event => this.setState(byPropKey('fechafinal', event.target.value))}
                            type="date"
                            placeholder="Fecha Final"
                        />
                    </div>
                    <div id="input-list-item" >
                        <input id="new-event-input"
                            className="uk-input"
                            value={horafinal}
                            onChange={event => this.setState(byPropKey('horafinal', event.target.value))}
                            type="text"
                            placeholder="Hora final"
                        />
                    </div>
                    <div id="min-title">Categorias</div>
                    <ul class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                        <label class="uk-width-1-3">
                            <input class="uk-checkbox" name="options" type="checkbox"
                                onChange={event => this.setState(byPropKey('fiesta', event.target.checked))}
                            /> Fiesta
                        </label>
                        <label class="uk-width-1-3">
                            <input class="uk-checkbox" name="options" type="checkbox"
                                onChange={event => this.setState(byPropKey('comida', event.target.checked))}
                            /> Comida
                        </label>
                        <label class="uk-width-1-3">
                            <input class="uk-checkbox" name="options" type="checkbox"
                                onChange={event => this.setState(byPropKey('envivo', event.target.checked))}
                            /> En Vivo
                        </label>
                        <label class="uk-width-1-3">
                            <input class="uk-checkbox" name="options" type="checkbox"
                                onChange={event => this.setState(byPropKey('musicon', event.target.checked))}
                            /> Musicon
                        </label>
                        <label class="uk-width-1-3">
                            <input class="uk-checkbox" name="options" type="checkbox"
                                onChange={event => this.setState(byPropKey('gaming', event.target.checked))}
                            /> Gaming
                        </label>
                        <label class="uk-width-1-3">
                            <input class="uk-checkbox" name="options" type="checkbox"
                                onChange={event => this.setState(byPropKey('bares', event.target.checked))}
                            /> Bares
                        </label>
                        <label class="uk-width-1-3">
                            <input class="uk-checkbox" name="options" type="checkbox"
                                onChange={event => this.setState(byPropKey('airelibre', event.target.checked))}
                            /> Aire Libre
                        </label>
                        <label class="uk-width-1-3">
                            <input class="uk-checkbox" name="options" type="checkbox"
                                onChange={event => this.setState(byPropKey('deportes', event.target.checked))}
                            /> Deportes
                        </label>
                        <label class="uk-width-1-3">
                            <input class="uk-checkbox" name="options" type="checkbox"
                                onChange={event => this.setState(byPropKey('arte', event.target.checked))}
                            /> Arte
                        </label>
                    </ul>
                </form>
                <button id="bt-signup" className="w3-button w3-round-xxlarge" disabled={isInvalid} onClick={this.onClick}>
                    Create        </button>

                {error && <p>{error.message}</p>}
            </div>
        );
    }
}

export default NewEvent;