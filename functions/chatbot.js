const {GoogleGenerativeAI} = require("@google/generative-ai");

require('dotenv').config();

const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

exports.handler = async (event, context) => {
    try {
        const { prompt } = JSON.parse(event.body);
        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const response = (await model.generateContent(prompt)).response;
        
        return {
            statusCode: 200,
            body: JSON.stringify({ text: response.choices[0].text }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};


