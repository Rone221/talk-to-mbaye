async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const chatbox = document.getElementById('chatbox');

    if (userInput.trim() === '') return; // Avoid empty messages

    // Add user's message to the chatbox
    chatbox.innerHTML += `<div class="mb-4"><strong>You:</strong> ${userInput}</div>`;

    // Clear the input field
    document.getElementById('userInput').value = '';

    // Send the user's message to the ChatGPT API
    const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo-0125',
            messages: [{ role: 'user', content: userInput }],
        })
    });

    const responseData = await apiResponse.json();
    const botMessage = responseData.choices[0].message.content;

    // Add ChatGPT's response to the chatbox
    chatbox.innerHTML += `<div class="mb-4"><strong>Mbaye Ndiaye:</strong> ${botMessage}</div>`;

    // Scroll to the bottom of the chatbox
    chatbox.scrollTop = chatbox.scrollHeight;
}
