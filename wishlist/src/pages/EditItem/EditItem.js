import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EditItem.css'; 

const EditItem = ({ itemId }) => {
    const [formData, setFormData] = useState({
        itemName: '',
        itemPrice: '',
        itemDescription: '',
        itemUrl: '',
        itemImage: '',
        priority: '0'
    });

    useEffect(() => {
        // Simulating fetching item data from an API
        const fetchItemData = async () => {
            // In a real application, you would fetch the data from your API
            // For this example, we'll use dummy data
            const dummyData = {
                itemName: 'Example Item',
                itemPrice: '99.99',
                itemDescription: 'This is an example item description.',
                itemUrl: 'https://example.com/item',
                itemImage: 'https://example.com/image.jpg',
                priority: '3'
            };
            setFormData(dummyData);
        };

        fetchItemData();
    }, [itemId]);

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
        // Add your API call logic here to update the item
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
            
            <div className="edit-item-container">
                <h2>Edit Item in Your Wishlist</h2>
                <form id="editItemForm" onSubmit={handleSubmit}>
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
                        <label htmlFor="itemImage">Image URL:</label>
                        <input 
                            type="url" 
                            id="itemImage" 
                            name="itemImage"
                            value={formData.itemImage}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Priority:</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
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
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditItem;