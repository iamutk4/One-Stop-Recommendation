import React, { useState } from 'react';
import './Main.css';

function Main() {
    const [category, setCategory] = useState('movies');
    const [input, setInput] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setInput(''); // Reset the input field
        setMessage(''); // Reset message on category change
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = async () => {
        if (category !== 'movies') {
            setMessage('This feature is still being implemented. Please check back later!');
            setRecommendations([]); // Clear any previous recommendations
            return; // Stop further execution
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:4000/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ movie_name: input })
            });
            const data = await response.json();
            setRecommendations(data);
        } catch (error) {
            console.error('Failed to fetch:', error);
            setMessage('Failed to fetch recommendations. Please try again later.');
        }
        setLoading(false);
    };

    return (
        <main className="main-content">
            <h2>Select a category to get started:</h2>
            <div className="form-group">
                <select value={category} onChange={handleCategoryChange}>
                    <option value="movies">Movies</option>
                    <option value="games">Games</option>
                    <option value="books">Books</option>
                    <option value="food">Food</option>
                </select>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter your favorite item"
                />
                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Loading...' : 'Get Recommendations'}
                </button>
            </div>
            {message && <p className="message">{message}</p>}
            {recommendations.length > 0 && (
                <div className="recommendations">
                    <h3>Recommendations:</h3>
                    <ul>
                        {recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                        ))}
                    </ul>
                </div>
            )}
        </main>
    );
}

export default Main;
