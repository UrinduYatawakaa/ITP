import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import '../InventoryManagement/styles/displaySingle.css';

import { Link } from "react-router-dom";

import Header from "./HeaderClient";

export default function SingleProductClient() {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        getProduct();
    }, []);

    function getProduct() {
        axios.get(`http://localhost:8070/products/getImages/${id}`)
            .then((res) => {
                setProduct(res.data.product);
            }).catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="home-page-client">
            <Header  />

            <main className="main-content-client">
                        <div className="container">
                            <div className="product-details">
                                {product.image && (
                                    <div className="detail image-container">
                                        <h2>{product.name.toUpperCase()}</h2>
                                        <div className="image-frame">
                                            <img src={`data:image;base64,${product.image}`} alt="Product" className="product-image" />
                                        </div>
                                    </div>
                                )}
                                <hr></hr>
                                <div className="detailss">
                                    <div className="detail">
                                        <label>Name:</label>
                                        <span>{product.name}</span>
                                    </div>
                                    <div className="detail">
                                        <label>Quantity:</label>
                                        <span>{product.pid}</span>
                                    </div>
                                    <div className="detail">
                                        <label>Category:</label>
                                        <span>{product.category}</span>
                                    </div>
                                    <div className="detail">
                                        <label>Rental Price:</label>
                                        <span>{product.rentalPrice}</span>
                                    </div>
                                    <div className="detail">
                                        <label>Description:</label>
                                        <span>{product.description}</span>
                                    </div>

                                    <div className="button-container">
                                        <Link to={`/edit/${product._id}`} className="button link-button update">Add to Cart</Link>
                                        <Link to={`/AddDamageItems/${product._id}`} className="button link-button damage">Buy</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

            </main>
            </div>



    );
}
