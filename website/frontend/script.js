document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const sendButton = document.getElementById('send-button'); // Changed from chatForm
    const clearChatButton = document.getElementById('clear-chat');
    const loadingIndicator = document.getElementById('loading-indicator');
    const chatInputContainer = document.querySelector('.chat-input-container'); // Get the container for event delegation

    const appendMessage = (sender, text) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
    };

    const showLoadingIndicator = () => {
        loadingIndicator.classList.add('visible');
    };

    const hideLoadingIndicator = () => {
        loadingIndicator.classList.remove('visible');
    };

    const sendMessage = async () => {
        const query = userInput.value.trim();
        if (query) {
            appendMessage('user', query);
            userInput.value = ''; // Clear input field
            showLoadingIndicator(); // Show loading indicator

            // Send query to backend
            try {
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query: query }),
                });

                if (response.ok) {
                    const data = await response.json();
                    appendMessage('bot', data.response);
                } else {
                    const errorData = await response.json();
                    appendMessage('bot', `Error: ${errorData.message || response.statusText}`);
                }
            } catch (error) {
                console.error('Network or server error:', error);
                appendMessage('bot', 'Error: Could not connect to the server.');
            } finally {
                hideLoadingIndicator(); // Hide loading indicator
            }
        }
    };

    // Event listener for the send button
    sendButton.addEventListener('click', sendMessage);

    // Event listener for the input field to allow sending with Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission if any
            sendMessage();
        }
    });

    // Event listener for clearing chat
    clearChatButton.addEventListener('click', () => {
        chatBox.innerHTML = `
            <div class="message bot-message">
                Hello! Ask me anything about Physical AI.
            </div>
        `;
        userInput.value = '';
    });
});

