async function sendMessage() {
    const prompt = document.getElementById('prompt').value;

    // Make sure the prompt is not empty
    if (prompt.trim() === '') {
        alert('Please enter a message!');
        return;
    }

    // Send the prompt to the AI API (Replace with your backend URL)
    const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    document.getElementById('response').innerText = data.response;
}
