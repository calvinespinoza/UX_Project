import React from 'react';
import './Home.css';

import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';

const Home = () =>
    <div id="home">
        <div id="main-title">PIJIN</div>
        <Link to={routes.NEW_EVENT}>
            <button className="w3-button w3-round-xxlarge" id="bt-new-event">New Event</button>
        </Link>

        
    </div>

export default Home;