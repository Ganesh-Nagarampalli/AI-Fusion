document.addEventListener('DOMContentLoaded', () => {
    const describeButton = document.getElementById('describe-btn');
    
    const imageToDisplay = document.getElementById('image-input');
    const imagePreview = document.getElementById('selected-image');
    imageToDisplay.addEventListener('change', () => {
        const file = imageToDisplay.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    describeButton.addEventListener('click', async () => {
        const textInput = document.getElementById('text-input').value;
        const imageInput = document.getElementById('image-input').files[0];
        const prompt = `Describe the image based on the following prompt: ${textInput}`;

        if (!imageInput) {
            document.getElementById('description-output').textContent = 'Please select an image.';
            return;
        }

        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Image = reader.result.split(',')[1]; // Get base64 string

                const response = await fetch('/.netlify/functions/image-descriptor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ prompt, image: base64Image }),
                });

                if (!response.ok) {
                    throw new Error(`Error describing image: ${response.statusText}`);
                }

                const data = await response.json();
                document.getElementById('description-output').textContent = data.description;
            };
            reader.readAsDataURL(imageInput); // Read the image file as a base64 string

        } catch (error) {
            console.error(error);
            document.getElementById('description-output').textContent = 'An error occurred while describing the image';
        }
    });
});
