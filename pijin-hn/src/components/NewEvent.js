import React, { Component } from 'react';
import * as firebase from 'firebase';
import './Home.css';
import * as routes from '../constants/routes';

const NewEvent = () =>
    <div id="event">
        <div id="main-title">Create Event</div>
        <NewEventForm />
    </div>

const INITIAL_STATE = {
    eventname: '',
    locationname: '',
    fechainicio: '',
    horainicio: '',
    fechafinal: '',
    horafinal: '',
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

        //var hostname = userRef.child(userId).child("Nombre");

        var key = eventRef.push().getKey();

        eventRef.child(key).set({
            "Nombre": this.state.eventname,
            "Lugar": this.state.locationname,
            "Fecha Inicio": this.state.fechainicio,
            "Fecha Final": this.state.fechafinal,
            "Hora Inicio": this.state.horainicio,
            "Hora Final": this.state.horafinal,
            "Llave": key,
            /*
            "Host": {
                "Nombre": hostname,
                "Llave": userId
            }*/
        });
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
            error,
        } = this.state;
        const {
            history,
        } = this.props;

        { this.addEvent() }


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
                <ul id="input-list">
                    <li id="input-list-item">
                        <input id="new-event-input"
                            value={eventname}
                            onChange={event => this.setState(byPropKey('eventname', event.target.value))}
                            type="text"
                            placeholder="Event name"
                        />
                    </li>
                    <li id="input-list-item">
                        <input id="new-event-input"
                            value={locationname}
                            onChange={event => this.setState(byPropKey('locationname', event.target.value))}
                            type="text"
                            placeholder="Location"
                        />
                    </li>
                    <li id="input-list-item">
                        <input id="new-event-input"
                            value={fechainicio}
                            onChange={event => this.setState(byPropKey('fechainicio', event.target.value))}
                            type="date"
                        />
                    </li>
                    <li id="input-list-item">
                        <input id="new-event-input"
                            value={horainicio}
                            onChange={event => this.setState(byPropKey('horainicio', event.target.value))}
                            type="text"
                            placeholder="Hora Inicio"
                        />
                    </li>
                    <li id="input-list-item">
                        <input id="new-event-input"
                            value={fechafinal}
                            onChange={event => this.setState(byPropKey('fechafinal', event.target.value))}
                            type="date"
                            placeholder="Fecha Final"
                        />
                    </li>
                    <li id="input-list-item">
                        <input id="new-event-input"
                            value={horafinal}
                            onChange={event => this.setState(byPropKey('horafinal', event.target.value))}
                            type="text"
                            placeholder="Hora final"
                        />
                    </li>
                </ul>
                <button id="bt-signup" className="w3-button w3-round-xxlarge" disabled={isInvalid} onClick={this.onClick}>
                    Create        </button>

                {error && <p>{error.message}</p>}
            </div>
        );
    }
}

export default NewEvent;