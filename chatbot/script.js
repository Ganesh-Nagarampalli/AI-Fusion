document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('user-message');
    const prompt = input.value;

    if (prompt) {
        displayResponse(prompt, "sent");

        try {
            const api = '/.netlify/functions/chatbot';
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error(`Error converting code: ${response.statusText}`);
            }

            const data = await response.json();
            displayResponse(data.text, "received");
        } catch (error) {
            console.error(error);
            displayResponse('An error occurred while processing your request', "error");
        }
    }

    // Clear the input field after sending the message
    input.value = '';
});

function displayResponse(text, messageType) {
    // Create a new div for the message
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", messageType);

    // Create a paragraph element for the message text
    const messageParagraph = document.createElement("p");
    messageParagraph.textContent = text;

    // Append the paragraph to the message div
    messageDiv.appendChild(messageParagraph);

    // Append the message div to the chat box
    document.getElementById("chat-box").appendChild(messageDiv);

    // Optionally, scroll to the bottom of the chat box to show the new message
    document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight;
}
