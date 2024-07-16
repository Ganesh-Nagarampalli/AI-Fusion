const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

exports.handler = async function(event, context) {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
            body: '',
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
            body: 'Method Not Allowed',
        };
    }

    const { prompt, image } = JSON.parse(event.body);
    if (!prompt || !image) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
            body: 'Invalid request payload',
        };
    }

    try {
        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Convert the base64 image to a format acceptable by the API
        const imagePart = {
            inlineData: {
                data: image,
                mimeType: "image/png" // Change this if your image is of another type
            }
        };

        const result = await model.generateContent([prompt, imagePart]);  // Adjust this to match your model's expected input
        const response = await result.response;
        const description = await response.text();

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
            body: JSON.stringify({ description }),
        };
    } catch (error) {
        console.error("Error running the generative AI model:", error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
            body: 'Error processing the request',
        };
    }
};
