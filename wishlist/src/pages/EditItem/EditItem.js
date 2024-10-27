import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditItem.css';

const EditItem = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const itemId = queryParams.get('itemId');

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        url: '',
        image: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!itemId) {
            setError('No item specified');
            setLoading(false);
            return;
        }
        fetchItem();
    }, [itemId]);

    const fetchItem = async () => {
        try {
            console.log('Fetching item details for ID:', itemId);
            const response = await axios.get(
                `https://publish-0341c21de65c.herokuapp.com/items/${itemId}`
            );
            console.log('Received item details:', response.data);
            
            setFormData({
                name: response.data.name,
                price: response.data.price,
                description: response.data.description || '',
                url: response.data.url,
                image: response.data.image || ''
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching item:', error);
            setError('Failed to fetch item details');
            setLoading(false);
        }
    };

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

        try {
            console.log('Updating item with data:', formData);
            const response = await axios.patch(
                `https://publish-0341c21de65c.herokuapp.com/items/${itemId}`,
                {
                    name: formData.name,
                    price: parseFloat(formData.price),
                    description: formData.description,
                    url: formData.url,
                    image: formData.image
                }
            );
            console.log('Item updated successfully:', response.data);
            
            // Navigate back to the lists page
            navigate('/lists');
        } catch (error) {
            console.error('Error updating item:', error);
            setError(error.response?.data?.message || 'Failed to update item');
        } finally {
            setLoading(false);
        }
    };

    if (!itemId) {
        return (
            <div className="edit-item-container">
                <div className="error-message">No item specified. Please select an item to edit.</div>
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
                    </div>
                </div>
            </nav>

            <div className="edit-item-container">
                <h2>Edit Item</h2>
                {error && <div className="error-message">{error}</div>}
                
                {loading ? (
                    <div className="loading">Loading item details...</div>
                ) : (
                    <form id="editItemForm" onSubmit={handleSubmit}>
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
                            {loading ? 'Updating...' : 'Update Item'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditItem;