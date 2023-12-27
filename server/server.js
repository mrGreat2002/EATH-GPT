const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/askHistory', async (req, res) => {
    try {
        const response = await axios.post('https://api.cohere.ai/generate', {
            model: "command",
            prompt: `You are a knowledgeable historian. ${req.body.question}`,
            max_tokens: 50,
            temperature: 0.5,
        }, {
            headers: {
                'Authorization': `Bearer c1Y0uUcjGbsDUC1xBiy79w8haXYhE6f9P8Q02uY0`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error while querying Cohere:", error);
        res.status(500).json({
            message: "Error while querying Cohere",
            details: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
