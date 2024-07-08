const button = document.getElementById('send-btn');
button.addEventListener('click', () => {
  const input = document.getElementById('input');
  const prompt = input.value;

  try{
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
  }
  
});