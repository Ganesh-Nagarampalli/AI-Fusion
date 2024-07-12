document.getElementById('generate-btn').addEventListener('click', async () => {
    const input = document.getElementById('text-input');
    const text = input.value.trim();

    if (text) {
        try {
            const response = await fetch('/.netlify/functions/image-generator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            if (!response.ok) {
                throw new Error(`Error generating image: ${response.statusText}`);
            }

            const data = await response.json();
            const base64Image = data.image;

            // Update the image preview
            const imgPreview = document.getElementById('generated-image');
            imgPreview.src = `data:image/jpeg;base64,${base64Image}`;
            imgPreview.alt = 'Generated Image';

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while generating the image. Please try again.');
        }
    } else {
        alert('Please enter some text to generate an image.');
    }
});
