import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult('');

        try {
            const res = await axios.post('http://localhost:5001/flames', { name1, name2 });
            const relationshipEmojis = {
                'Friends': '👥',
                'Love': '❤️',
                'Affection': '🤗',
                'Marriage': '💑',
                'Enemy': '😠',
                'Siblings': '👨‍👦'
            };
            const relationship = res.data.result;
            const emoji = relationshipEmojis[relationship] || '';
            setResult(`${relationship} ${emoji}`);
            
            // Play sound effect based on relationship
            try {
                const audio = new Audio(`/sounds/${relationship.toLowerCase()}.mp3`);
                await audio.play();
            } catch (error) {
                console.error('Error playing sound:', error);
                // Continue with the app flow even if sound fails
            }
        } catch (err) {
            console.error('API Error:', err);
            setError('Failed to calculate result. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="title">FLAMES Game</h1>
            <p className="subtitle">Find your relationship status!</p>

            <form onSubmit={handleSubmit} className="form">
                <div className="input-group">
                    <input
                        type="text"
                        value={name1}
                        onChange={(e) => setName1(e.target.value)}
                        placeholder="Enter first name"
                        className="input"
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                        placeholder="Enter second name"
                        className="input"
                        required
                    />
                </div>
                <button type="submit" className="button" disabled={loading}>
                    {loading ? 'Calculating...' : 'Calculate Relationship'}
                </button>
            </form>

            {error && <p className="error">{error}</p>}
            {result && (
                <div className="result">
                    <h2>Result:</h2>
                    <p className="result-text">{result}</p>
                </div>
            )}
        </div>
    );
}




export default App;
