import './styles/Header-client.css';
import React from 'react';
import { Link } from "react-router-dom";

export default function Header({ setSearch }) {
    return (
        <header className="header-client">
            <div className="header-content-client">
                <h1 className="logo-client">Rent-A-Wear</h1>
                <nav>
                    <ul className="nav-links-client">
                        <li><Link to="/HomePage"> Home</Link></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#rentals">Rentals</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
                <form className="searchBar-client" role="search">
                    <input
                        className="form-control-client"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            </div>
        </header>
    );
}
