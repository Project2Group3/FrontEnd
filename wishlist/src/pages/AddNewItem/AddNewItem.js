import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './AddNewItem.css';

const AddNewItem = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const listId = queryParams.get('listId');
    const user = JSON.parse(Cookies.get('user') || '{}');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        url: '',
        image: ''
    });

    useEffect(() => {
        console.log('List ID from URL:', listId);
        if (!listId) {
            console.error('No list ID provided');
            setError('No list specified');
        }
    }, [listId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log('Form field changed:', name, value);
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        console.log('Submitting form data:', formData);

        try {
            // First create the item
            console.log('Creating new item');
            const itemResponse = await axios.post(
                'https://publish-0341c21de65c.herokuapp.com/items/create/',
                {
                    name: formData.name,
                    price: parseFloat(formData.price) || 0,
                    description: formData.description,
                    url: formData.url,
                    image: formData.image
                }
            );

            console.log('Item created successfully:', itemResponse.data);

            // Then add the item to the list
            console.log('Adding item to list:', listId);
            const entryResponse = await axios.post(
                `https://publish-0341c21de65c.herokuapp.com/user_item_list/${listId}/add-item`,
                {
                    item: itemResponse.data.item_id
                }
            );

            console.log('Item added to list successfully:', entryResponse.data);

            // Navigate back to the lists page
            navigate('/lists');
        } catch (error) {
            console.error('Error adding item:', error.response || error);
            setError(error.response?.data?.message || 'Failed to add item');
        } finally {
            setLoading(false);
        }
    };

    if (!listId) {
        return (
            <div className="add-item-container">
                <div className="error-message">No list specified. Please select a list first.</div>
                <Link to="/lists" className="back-button">Back to Lists</Link>
            </div>
        );
    }

    return (
        <div>
            <nav className="nav-container">
    <div className="nav-content">
        <Link to="/" className="nav-brand">
            Wishlist API
        </Link>
        <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/Lists" className="nav-link">Lists</Link>
            <Link to="/UpdateUserInfo" className="nav-link">Update UserInfo</Link>
            {user.is_admin && <Link to="/Admin" className="nav-link">Admin</Link>}
        </div>
    </div>
</nav>

            <div className="add-item-container">
                <h2>Add New Item to Your Wishlist</h2>
                {error && <div className="error-message">{error}</div>}
                <form id="addItemForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input 
                            type="number" 
                            id="price" 
                            name="price" 
                            step="0.01" 
                            min="0"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea 
                            id="description" 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">URL:</label>
                        <input 
                            type="url" 
                            id="url" 
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL:</label>
                        <input 
                            type="url" 
                            id="image" 
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Adding...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNewItem;