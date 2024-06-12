import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/nilameLogo.png";


function Header() {

    return (
        <nav class="navbar bg-brown">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src={logo} alt="Bootstrap" height="24" />
                </a>
            </div>
        </nav>

    )
}

export default Header;