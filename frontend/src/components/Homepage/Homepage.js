import './styles/HomePage.css'; // Assuming you have some CSS for styling
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./HeaderClient";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getAllProducts();
    }, []);

    function getAllProducts() {
        axios.get(`http://localhost:8070/products/getAllImages`)
            .then((res) => {
                setProducts(res.data.products);
            }).catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="home-page-client">
            <Header setSearch={setSearch} />

            <main className="main-content-client">
                

                <div className="container-client">
                    {products.filter((product) => {
                        return search.toLowerCase() === '' ? product
                            : product.name.toLowerCase().includes(search);
                    }).map((product) => (
                        <div className="card-client" key={product._id}>
                            <div className="card-image-client">
                                {product.image && (
                                    <img src={`data:image;base64,${product.image}`} alt="product" className="product-image-client" />
                                )}
                            </div>
                            <div className="card-content-client">
                                <h2>{product.name.toUpperCase()}</h2>
                                <TruncatedDescription description={product.description} />
                                <p className="price-client">Rs.{product.rentalPrice.toFixed(2)} per day</p>
                            </div>
                            <div className="card-actions-client">
                            <Link to={`/SingleProductClient/${product._id}`} className="button link-button update">View</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="footer-client">
                <p>&copy; 2024 Rent-A-Wear. All rights reserved.</p>
                <p>Follow us on:</p>
                <ul className="social-links-client">
                    <li><a href="#facebook">Facebook</a></li>
                    <li><a href="#instagram">Instagram</a></li>
                    <li><a href="#twitter">Twitter</a></li>
                </ul>
            </footer>
        </div>
    );
}

function TruncatedDescription({ description }) {
    const [isTruncated, setIsTruncated] = useState(true);
    const words = description.split(' ');
    const shortDescription = words.slice(0, 30).join(' ');
    const remainingDescription = words.slice(30).join(' ');

    return (
        <div>
            <p>
                {isTruncated ? shortDescription : description}
                {remainingDescription && (
                    <span>
                        {isTruncated ? '...' : ''}
                        <button 
                            className="show-more-button-client" 
                            onClick={() => setIsTruncated(!isTruncated)}
                        >
                            {isTruncated ? 'Show More' : 'Show Less'}
                        </button>
                    </span>
                )}
            </p>
        </div>
    );
}
