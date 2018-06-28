import React from 'react';
import './Home.css';
import test from './test.jpg';
import {ExploreFeed} from './Explore'

import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';

const Home = () =>
    <div id="home">
        <div id="main-title">Home</div>
        <Link to={routes.NEW_EVENT}>
            <button className="uk-button uk-button-default" id="bt-new-event">New Event</button>
        </Link>
        <div id="sub-title">For You</div>
        
        <ExploreFeed />
        <div id="sub-title">Categories</div>
        <Categories />
        

    </div>

/*
var backStyle = {
background-image : "linear-gradient( rgba(255, 215, 15, 0.5),rgba(255, 215, 15, 0.5)),url()"
};
*/

const Categories = () =>
    <div>
        <div className="w3-button w3-round-xlarge" id="bt-category">
            <div className="zoom-category" id="box-category">
                <img src="https://goo.gl/huRfGp" />
            </div>
            <div id="ctg-name">Fiesta</div>
        </div>
       
        <div className="w3-button w3-round-xlarge" id="bt-category">
            <div className="zoom-category" id="box-category">
                <img src="https://goo.gl/8UBW4E" id="category-img" />
            </div>
            <div id="ctg-name">Comida</div>
        </div>
        <div className="w3-button w3-round-xlarge" id="bt-category">
            <div className="zoom-category" id="box-category">
                <img src="https://goo.gl/eupi1b" />
            </div>
            <div id="ctg-name">En vivo</div>
        </div>
        <div className="w3-button w3-round-xlarge" id="bt-category">
            <div className="zoom-category" id="box-category">
                <img src="https://goo.gl/NN8CE1" />
            </div>
            <div id="ctg-name">Gaming</div>
        </div>
        <div className="w3-button w3-round-xlarge" id="bt-category">
            <div className="zoom-category" id="box-category">
                <img src="https://goo.gl/FzNGMU" id="category-img" />
            </div>
            <div id="ctg-name">Musicon</div>
        </div>
        <div className="w3-button w3-round-xlarge" id="bt-category">
            <div className="zoom-category" id="box-category">
                <img src="https://goo.gl/AFe58n" />
            </div>
            <div id="ctg-name">Alcohol</div>
        </div>
        <div className="w3-button w3-round-xlarge" id="bt-category">
            <div className="zoom-category" id="box-category">
                <img src="https://goo.gl/eB7Kui" />
            </div>
            <div id="ctg-name">Aire Libre</div>
        </div>
        <div className="w3-button w3-round-xlarge" id="bt-category">
            <div className="zoom-category" id="box-category">
                <img src="https://goo.gl/xz7M1o" />
            </div>
            <div id="ctg-name">Deportes</div>
        </div>
        <div className="w3-button w3-round-xlarge" id="bt-category">
            <div className="zoom-category" id="box-category">
                <img src="https://goo.gl/8UBW4E" id="category-img" />
            </div>
            <div id="ctg-name">Comida</div>
        </div>
    </div>


export default Home;