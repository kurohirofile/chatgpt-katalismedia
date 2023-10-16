import React from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import logo from "../assets/logo.png";
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Navbar = () => {
    const history = useHistory();

    const Logout = async () => {
        try {
            await axios.delete('https://api-katalismedia.vercel.app/logout');
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                <a href='/dashboard'>
                <img className="logo-image" src={logo}  width="112" height="28" alt="logo CV Katalis Indonesia" />
                </a>
                    {/* <a className="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
                    </a> */}

                    <a href="/" role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    {/* <div className="navbar-start">
                        <a href="#" className="navbar-item">
                            Home
                        </a>
                    </div> */}

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={Logout} className="button is-light">
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
