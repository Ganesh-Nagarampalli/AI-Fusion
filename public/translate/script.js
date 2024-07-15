document.addEventListener('DOMContentLoaded', () => {
    const translateButton = document.getElementById('translate-btn');

    translateButton.addEventListener('click', async () => {
        const text = document.getElementById('source-text').value;
        const originalLanguage = document.getElementById('original-language').value;
        const targetLanguage = document.getElementById('target-language').value;
        const prompt = `Do not give any extra text just give translated text, Translate text from ${originalLanguage} to ${targetLanguage}: ${text}`;

        try {
            const response = await fetch('/.netlify/functions/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error(`Error translating text: ${response.statusText}`);
            }

            const data = await response.json();
            document.getElementById('translated-text').textContent = data.translatedText;  
        } catch (error) {
            console.error(error);
            document.getElementById('translated-text').textContent = 'An error occurred while translating the text';
        }
    });
});
