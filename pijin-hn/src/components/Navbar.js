import React, { Component } from 'react';
import './Navbar.css'

export class Navbar extends Component {
    render() {
        const strings = ['Home', 'Explore', 'Map', 'Profile'];
        const listItems = strings.map(string => (
            <li className="nav-item">
                <a className="nav-link" href="#">{string}</a>
            </li>
        ));
        return (
            <nav id="navBar" className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" id="navbar-brand" href="#">Pijin</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0">
                        <ul className="navbar-nav mr-auto" id="nav-items">
                            {listItems}
                        </ul >
                    </form>
                </div>
            </nav>
        );
    }
}