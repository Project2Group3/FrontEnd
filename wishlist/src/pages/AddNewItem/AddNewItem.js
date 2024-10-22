import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './AddNewItem.css';

const AddNewItem = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        itemPrice: '',
        itemDescription: '',
        itemUrl: '',
        priority: '0'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', formData);
        // Add your API call logic here
    };

    return (
        <div>
            <div className="header">
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/AddNewItem">Add Item</Link>
                    <Link to="/EditItem">Edit List</Link>
                    <Link to="/Lists">Preview List</Link>
                    <Link to="/EditUser">User Settings</Link>
                    <Link to="/Admin">Admin</Link>
                </div>
                <Link to="/logout">Logout</Link>
            </div>

            <div className="add-item-container">
                <h2>Add New Item to Your Wishlist</h2>
                <form id="addItemForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="itemName">Name:</label>
                        <input 
                            type="text" 
                            id="itemName" 
                            name="itemName" 
                            value={formData.itemName}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemPrice">Price:</label>
                        <input 
                            type="number" 
                            id="itemPrice" 
                            name="itemPrice" 
                            step="0.01" 
                            min="0"
                            value={formData.itemPrice}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemDescription">Description:</label>
                        <textarea 
                            id="itemDescription" 
                            name="itemDescription"
                            value={formData.itemDescription}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemUrl">URL:</label>
                        <input 
                            type="url" 
                            id="itemUrl" 
                            name="itemUrl"
                            value={formData.itemUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Priority:</label>
                        <div className="star-rating">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <React.Fragment key={star}>
                                    <input
                                        type="radio"
                                        id={`star${star}`}
                                        name="priority"
                                        value={star}
                                        onChange={handleChange}
                                        checked={formData.priority === star.toString()}
                                    />
                                    <label htmlFor={`star${star}`}>&#9733;</label>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddNewItem;