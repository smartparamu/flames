const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// FLAMES Logic Function
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

// API Route
app.post('/flames', (req, res) => {
    const { name1, name2 } = req.body;
    if (!name1 || !name2) {
        return res.status(400).json({ error: "Both names are required" });
    }

    const result = flamesResult(name1, name2);
    res.json({ result });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
