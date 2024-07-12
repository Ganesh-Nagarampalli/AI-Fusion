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
    const { prompt } = JSON.parse(event.body);
    if(!prompt){
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
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
            body: JSON.stringify({ translatedText: text }),
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
}
