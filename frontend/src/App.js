import React, { useState } from 'react';
import './App.css';

function App() {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const flamesResult = (name1, name2) => {
        let str = name1 + name2;
        let uniqueChars = str.replace(/[^a-zA-Z]/g, '').toLowerCase().split('');
        
        let flames = ['F', 'L', 'A', 'M', 'E', 'S'];
        let count = uniqueChars.length;

        while (flames.length > 1) {
            let index = (count % flames.length) - 1;
            if (index >= 0) {
                flames.splice(index, 1);
            } else {
                flames.splice(flames.length - 1, 1);
            }
        }

        const results = {
            "F": "Friends",
            "L": "Love",
            "A": "Affection",
            "M": "Marriage",
            "E": "Enemy",
            "S": "Siblings"
        };

        return results[flames[0]];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult('');

        try {
            const relationship = flamesResult(name1, name2);
            const relationshipEmojis = {
                'Friends': '👥',
                'Love': '❤️',
                'Affection': '🤗',
                'Marriage': '💑',
                'Enemy': '😠',
                'Siblings': '👨‍👦'
            };
            const emoji = relationshipEmojis[relationship] || '';
            setResult(`${relationship} ${emoji}`);
            
            try {
                const audio = new Audio(`/sounds/${relationship.toLowerCase()}.mp3`);
                await audio.play();
            } catch (error) {
                console.error('Error playing sound:', error);
            }
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
