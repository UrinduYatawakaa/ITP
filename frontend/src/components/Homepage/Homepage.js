import './styles/HomePage.css'; // Assuming you have some CSS for styling
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default function HomePage() {

    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');


    useEffect(() => {
        getAllCategory();
    }, []);

    function getAllCategory() {
        axios.get(`http://localhost:8070/categorys/getAllImages`)
            .then((res) => {
                setCategories(res.data.category);
            }).catch((err) => {
                console.error(err);
            });
    }


    return (
        <div className="home-page">
            <header className="header">
                <h1>Welcome to Rent-A-Wear</h1>
                <nav>
                    <ul className="nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#rentals">Rentals</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
                <form class="searchBar" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
                </form>
            </header>

            <main className="main-content">
                <section className="hero">
                    <h2>Discover Fashion. Rent with Ease.</h2>
                    <p>Explore our vast collection of clothing and rent your favorite pieces for any occasion.</p>
                    <button className="cta-button">Browse Rentals</button>
                </section>

                <section className="features">
                    <h3>Why Choose Rent-A-Wear?</h3>
                    <ul className="features-list">
                        <li>Wide Range of Styles</li>
                        <li>Affordable Prices</li>
                        <li>Flexible Rental Periods</li>
                        <li>Easy Returns</li>
                    </ul>
                </section>

                <div className="container">
                    {categories.filter((category) => {
                        return search.toLowerCase() == '' ? category
                            : category.name.toLowerCase().includes(search)
                            ;
                    }).map((category) => (
                        <div className="card" key={category._id}>
                            <div className="card-image">
                                {category.image && (
                                    <img src={`data:image;base64,${category.image}`} alt="category" className="category-image" />
                                )}
                            </div>
                            <div className="card-content">
                                <h2>{category.name.toUpperCase()}</h2>                        <p>{category.description}</p>
                            </div>
                            <div className="card-actions">
                                <Link to={`/CategoryWise/${category.name}`} className="button">View Details</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="footer">
                <p>&copy; 2024 Rent-A-Wear. All rights reserved.</p>
                <p>Follow us on:</p>
                <ul className="social-links">
                    <li><a href="#facebook">Facebook</a></li>
                    <li><a href="#instagram">Instagram</a></li>
                    <li><a href="#twitter">Twitter</a></li>
                </ul>
            </footer>
        </div>
    );
}

