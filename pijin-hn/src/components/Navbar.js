import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

export class Navbar extends Component {
    render() {
        //const strings = ['Home', 'Explore', 'Map', 'Profile'];
        /*const listItems = strings.map(string => (
            <li className="nav-item">
                <a className="nav-link" href="#">{string}</a>
            </li>
        ));*/
        return (
            <nav id="navBar" className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" id="navbar-brand" >Pijin</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0">
                        <ul className="navbar-nav mr-auto" id="nav-items">
                            <li className="nav-item">
                                <Link to={routes.LANDING} className="nav-link">LANDING</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={routes.HOME} className="nav-link">HOME</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={routes.MAP} className="nav-link">MAP</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={routes.EXPLORE} className="nav-link">EXPLORE</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={routes.ACCOUNT} className="nav-link">ACCOUNT</Link>
                            </li>
                        </ul >
                    </form>
                </div>
            </nav>
        );
    }
}