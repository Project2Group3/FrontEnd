import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EditItem.css';

const EditItem = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        itemPrice: '',
        itemDescription: '',
        itemUrl: '',
        itemImage: '',
        priority: '0'
    });

    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('id'); // 'id' or 'term'
    const [currentItem, setCurrentItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchItemById = async (itemId) => {
        setLoading(true);
        setError('');
        try {
            // In a real app, this would be an API call like:
            // const response = await fetch(`/items?itemID=${itemId}`);
            // const data = await response.json();
            
            // Simulated API response
            const dummyData = {
                id: itemId,
                itemName: `Item ${itemId}`,
                itemPrice: '99.99',
                itemDescription: 'This is an example item description.',
                itemUrl: 'https://example.com/item',
                itemImage: 'https://example.com/image.jpg',
                priority: '3'
            };

            setCurrentItem(dummyData);
            setFormData({
                itemName: dummyData.itemName,
                itemPrice: dummyData.itemPrice,
                itemDescription: dummyData.itemDescription,
                itemUrl: dummyData.itemUrl,
                itemImage: dummyData.itemImage,
                priority: dummyData.priority
            });
        } catch (error) {
            setError('Failed to fetch item. Please try again.');
            console.error('Error fetching item:', error);
        } finally {
            setLoading(false);
        }
    };

    const searchItemByTerm = async (searchTerm) => {
        setLoading(true);
        setError('');
        try {
            // In a real app, this would be an API call like:
            // const response = await fetch(`/items?search=${searchTerm}`);
            // const data = await response.json();
            
            // Simulated API response
            const dummyResult = {
                id: '123',
                itemName: `${searchTerm} Item`,
                itemPrice: '79.99',
                itemDescription: `Item matching search term: ${searchTerm}`,
                itemUrl: 'https://example.com/item',
                itemImage: 'https://example.com/image.jpg',
                priority: '4'
            };

            setCurrentItem(dummyResult);
            setFormData({
                itemName: dummyResult.itemName,
                itemPrice: dummyResult.itemPrice,
                itemDescription: dummyResult.itemDescription,
                itemUrl: dummyResult.itemUrl,
                itemImage: dummyResult.itemImage,
                priority: dummyResult.priority
            });
        } catch (error) {
            setError('Failed to search for item. Please try again.');
            console.error('Error searching item:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchInput.trim()) {
            setError('Please enter a search term or ID');
            return;
        }

        setError('');
        if (searchType === 'id') {
            await fetchItemById(searchInput);
        } else {
            await searchItemByTerm(searchInput);
        }
    };

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
            <nav className="nav-container">
    <div className="nav-content">
        <Link to="/" className="nav-brand">
            Wishlist API
        </Link>
        <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/Lists" className="nav-link">Lists</Link>
            <Link to="/UpdateUserInfo" className="nav-link">Update UserInfo</Link>
            {/* {user.is_admin && <Link to="/Admin" className="nav-link">Admin</Link>} */}
        </div>
    </div>
</nav>
            
            <div className="edit-item-container">
                <div className="search-section">
                    <h3>Find Specific Item</h3>
                    <form onSubmit={handleSearch} className="search-form">
                        <div className="search-group">
                            <select 
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value)}
                                className="search-type"
                            >
                                <option value="id">Search by ID</option>
                                <option value="term">Search by Term</option>
                            </select>
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder={searchType === 'id' ? "Enter item ID..." : "Enter search term..."}
                                className="search-input"
                            />
                            <button 
                                type="submit" 
                                className="search-button"
                                disabled={loading}
                            >
                                {loading ? 'Searching...' : 'Find Item'}
                            </button>
                        </div>
                    </form>
                    {error && <div className="error-message">{error}</div>}
                </div>

                {currentItem && (
                    <div>
                        <h2>Edit Item</h2>
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
                )}
            </div>
        </div>
    );
};

export default EditItem;