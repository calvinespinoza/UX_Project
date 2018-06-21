import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import * as firebase from 'firebase';

const Navbar = ({ authUser }) =>
    <div>
        {authUser
            ? <NavAuth authUser={authUser} />
            : <NavNonAuth />
        }
    </div>

/*export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: this.props.authUser
        }
        this.handleName = this.handleName.bind(this);
    }

    componentDidMount()
    {
        this.handleName();
        
    }

    handleName() {
        var user = this.props.authUser;
        console.log(user);
        console.log("hola");
        if (user) {
            console.log(user);
            var ref = firebase.database().ref().child("Usuarios").child(user.uid);
            var nom = ref.child("Nombre").val;
            console.log(nom);
            this.setState({
                name: nom
            })
        }
    }

    render() {
        return(
            <div>
            {this.props.authUser
                ? <NavAuth nombre={this.state.name} />
                : <NavNonAuth />
            }
        </div>
        )
    }
}*/

const NavNonAuth = () =>
    <div>
        <nav id="navBar" className="navbar navbar-expand-lg navbar-dark bg-dark" >
            <a className="navbar-brand" id="navbar-brand" >Pijin</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">

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
                </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="form-inline my-2 my-lg-0">
                    <ul className="navbar-nav mr-auto" id="nav-items">
                        <li className="nav-item">
                            <Link to={routes.SIGN_UP} className="nav-link">SIGN IN</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={routes.SIGN_IN} className="nav-link">SIGN UP</Link>
                        </li>
                    </ul>
                </form>
            </div>
        </nav>
    </div>

const NavAuth = ({ authUser }) => (

    <div>

        <nav id="navBar" className="navbar navbar-expand-lg navbar-dark bg-dark" >
            <a className="navbar-brand" id="navbar-brand" >Pijin</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">

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
                </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="form-inline my-2 my-lg-0">
                    <ul className="navbar-nav mr-auto" id="nav-items">
                        <li className="nav-item">
                            <Link to={routes.ACCOUNT} className="nav-link">{authUser.uid}</Link>
                        </li>
                    </ul>
                </form>
            </div>
        </nav>
    </div>
)

export default Navbar;