import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Lists.css';

function Lists() {
    const navigate = useNavigate();
    const [lists, setLists] = useState([]);
    const [newListName, setNewListName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [error, setError] = useState('');
    const [expandedListId, setExpandedListId] = useState(null);
    const [listItems, setListItems] = useState({});
    const [loading, setLoading] = useState(true);

    // Get user data from cookies
    const user = JSON.parse(Cookies.get('user') || '{}');

    const fetchUserLists = useCallback( async () => {
        try {
            const response = await axios.get(
                `https://publish-0341c21de65c.herokuapp.com/users/${user.id}/lists`
            );
            console.log('Received lists:', response.data);
            setLists(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching lists:', error);
            setLoading(false);
        }
    }, [user.id]);

    useEffect(() => {
        if (!user.id) {
            navigate('/login');
            return;
        }
        fetchUserLists();
    }, [user.id, navigate, fetchUserLists]);


    const handleCreateList = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://publish-0341c21de65c.herokuapp.com/user_item_list/create/',
                {
                    user: user.id,
                    list_name: newListName,
                    is_public: isPublic
                }
            );
            setLists([...lists, response.data]);
            setNewListName('');
            setIsPublic(false);
            setError('');
        } catch (error) {
            console.error('Error creating list:', error);
            setError('Failed to create list');
        }
    };

    const handleDeleteList = async (listId) => {
        if (!window.confirm('Are you sure you want to delete this list?')) return;
        
        try {
            await axios.delete(
                `https://publish-0341c21de65c.herokuapp.com/user_item_list/${listId}`
            );
            setLists(lists.filter(list => list.list_id !== listId));
            setError('');
        } catch (error) {
            console.error('Error deleting list:', error);
            setError('Failed to delete list');
        }
    };

    const fetchListItems = async (listId) => {
        try {
            const response = await axios.get(
                `https://publish-0341c21de65c.herokuapp.com/user_item_list/${listId}/list-items`,
                {
                    headers:{
                        'User-Id': user.id,
                        'Is-Admin':user.is_admin 
                    }
                }
            );
            setListItems({
                ...listItems,
                [listId]: response.data
            });
        } catch (error) {
            console.error('Error fetching list items:', error);
        }
    };

    const toggleListExpansion = (listId) => {
        if (expandedListId === listId) {
            setExpandedListId(null);
        } else {
            setExpandedListId(listId);
            if (!listItems[listId]) {
                fetchListItems(listId);
            }
        }
    };

    return (
        <div className="lists-container">
            {/* Navigation Header */}
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

            <div className="lists-content">
                {/* Create New List Form */}
                <div className="create-list-section">
                    <h2>Create New List</h2>
                    <form onSubmit={handleCreateList} className="create-list-form">
                        <input
                            type="text"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            placeholder="Enter list name"
                            required
                        />
                        <div className="public-checkbox">
                            <input
                                type="checkbox"
                                id="isPublic"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                            />
                            <label htmlFor="isPublic">Make list public</label>
                        </div>
                        <button type="submit">Create List</button>
                    </form>
                </div>

                {/* Error Message */}
                {error && <div className="error-message">{error}</div>}

                {/* Lists Display */}
                <div className="lists-section">
                    {loading ? (
                        <div className="loading">Loading lists...</div>
                    ) : lists.length === 0 ? (
                        <div className="no-lists">No lists found. Create your first list above!</div>
                    ) : (
                        lists.map(list => (
                            <div key={list.list_id} className="list-card">
                                <div 
                                    className="list-header"
                                    onClick={() => toggleListExpansion(list.list_id)}
                                >
                                    <div className="list-info">
                                        <h3>{list.list_name}</h3>
                                        <span className={`visibility-badge ${list.is_public ? 'public' : 'private'}`}>
                                            {list.is_public ? 'Public' : 'Private'}
                                        </span>
                                    </div>
                                    <div className="list-actions">
                                        <button 
                                            className="delete-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteList(list.list_id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                        <span className="expand-icon">
                                            {expandedListId === list.list_id ? '▼' : '▶'}
                                        </span>
                                    </div>
                                </div>

                                {expandedListId === list.list_id && (
                                    <div className="list-items">
                                        <div className="items-header">
                                            <Link 
                                                to={`/AddNewItem?listId=${list.list_id}`}
                                                className="add-item-button"
                                            >
                                                Add New Item
                                            </Link>
                                        </div>
                                        {listItems[list.list_id] ? (
                                            listItems[list.list_id].length > 0 ? (
                                                <div className="items-grid">
                                                    {listItems[list.list_id].map(item => (
                                                        <div key={item.item_id} className="item-card">
                                                            {item.image && (
                                                                <img src={item.image} alt={item.name} />
                                                            )}
                                                            <div className="item-details">
                                                                <h4>{item.name}</h4>
                                                                <p className="item-price">${item.price}</p>
                                                                {item.description && (
                                                                    <p className="item-description">{item.description}</p>
                                                                )}
                                                                <div className="item-actions">
                                                                    <Link 
                                                                        to={`/EditItem?itemId=${item.item_id}`}
                                                                        className="edit-button"
                                                                    >
                                                                        Edit
                                                                    </Link>
                                                                    {item.url && (
                                                                        <a 
                                                                            href={item.url} 
                                                                            target="_blank" 
                                                                            rel="noopener noreferrer"
                                                                            className="view-button"
                                                                        >
                                                                            View Item
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="no-items">No items in this list yet</p>
                                            )
                                        ) : (
                                            <div className="loading">Loading items...</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Lists;