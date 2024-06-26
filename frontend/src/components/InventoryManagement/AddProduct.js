import React, { useState, useEffect } from "react";
import axios from "axios";

import './styles/Inventory.css'
import Header from './Header';
import NavBar from './NavBar';

export default function AddProduct() {
    const [name, setName] = useState("");
    const [pid, setPID] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [rentalPrice, setRentalPrice] = useState("");
    const [image, setImage] = useState(null); // State to store selected image
    const [categorys, setCategorys] = useState([]);

    useEffect(() => {

        getcategorys();


    }, []);

    function getcategorys() {

        axios.get("http://localhost:8070/categorys/").then((res) => {
            setCategorys(res.data);
        }).catch((err) => {
            alert(err)
        })

    }


    function sendData(e) {
        e.preventDefault();

        if (!name || !pid || !category || !description || !rentalPrice || !image) {
            alert("Please fill in all fields");
            return;
        }

        // Check if quantity and rental price are less than 0
        if (pid <= 0) {
            alert("Quantity cannot be less than 0");
            return;
        }
        if (rentalPrice <= 0) {
            alert("Rental price cannot be less than 0");
            return;
        }

        // Check if a product with the same name already exists
        axios.get(`http://localhost:8070/products/check/${name}`).then((res) => {
            if (res.data.exists) {
                alert("Product with this name already exists");
            } else {
                const formData = new FormData();
                formData.append("name", name);
                formData.append("pid", pid);
                formData.append("category", category);
                formData.append("description", description);
                formData.append("rentalPrice", rentalPrice);
                formData.append("image", image); // Append selected image to form data

                axios
                    .post("http://localhost:8070/products/add", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then(() => {
                        alert("Product Added!");
                    })
                    .catch((err) => {
                        alert(err);
                    });
            }
        }).catch((err) => {
            alert(err);
        });
    }

    // Function to handle image selection
    function handleImageChange(e) {
        setImage(e.target.files[0]);
    }

    return (
        <div>
            <Header />
            <div class="containerApp">

                <div class="nav-container">
                    <NavBar />
                </div>

                <div class="content-container">
                    <div>
                        <h1> Inventory Management System </h1>
                        <hr className="big" />
                        <div className="containerFrom">

                            <div class="form-container">

                                <h2> Add New Product </h2>

                                <form onSubmit={sendData}>
                                    <div className="mb-3">
                                        <label htmlFor="name">Product Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter Product Name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    {/* Add file input field for image */}
                                    <div className="mb-3">
                                        <label htmlFor="image">Product Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="pid">Product Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="pid"
                                            placeholder="Enter Product QTY"
                                            onChange={(e) => setPID(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description">Product Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            placeholder="Enter Product description"
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="rentalPrice">Product Rental Price</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="rentalPrice"
                                            placeholder="Enter Product rentalPrice"
                                            onChange={(e) => setRentalPrice(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label for="radio" >Product Category</label>


                                        {categorys.map((category) => (
                                            <div className="form-check" key={category._id}>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="exampleRadios"
                                                    id={`exampleRadios-${category._id}`}
                                                    value={category.name}
                                                    onChange={(e) => {
                                                        setCategory(e.target.value);
                                                    }}
                                                />
                                                <label className="form-check-label" htmlFor={`exampleRadios-${category._id}`}>
                                                    {category.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>

                                    <button type="submit" className="btn btn-primary">
                                        Add Product
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
