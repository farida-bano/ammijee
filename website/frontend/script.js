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

    const sendMessage = async (useStreaming = false) => {
        const query = userInput.value.trim();
        if (query) {
            appendMessage('user', query);
            userInput.value = ''; // Clear input field
            showLoadingIndicator(); // Show loading indicator

            if (useStreaming) {
                // Use streaming endpoint
                try {
                    const response = await fetch('/chat-stream', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ query: query }),
                    });

                    if (response.ok && response.body) {
                        const reader = response.body.getReader();
                        const decoder = new TextDecoder();
                        let buffer = '';
                        let botMessageElement = null;

                        while (true) {
                            const { done, value } = await reader.read();
                            if (done) break;

                            buffer += decoder.decode(value, { stream: true });
                            const lines = buffer.split('\n');
                            buffer = lines.pop(); // Keep last incomplete line in buffer

                            for (const line of lines) {
                                if (line.trim() === '') continue;
                                try {
                                    const data = JSON.parse(line);

                                    if (data.token !== undefined) {
                                        // Create or update bot message element for streaming
                                        if (!botMessageElement) {
                                            botMessageElement = document.createElement('div');
                                            botMessageElement.classList.add('message', 'bot-message');
                                            chatBox.appendChild(botMessageElement);
                                        }
                                        botMessageElement.textContent += data.token;
                                        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
                                    } else if (data.done) {
                                        // Final response received
                                        break;
                                    }
                                } catch (e) {
                                    console.error('Error parsing streaming response:', e);
                                }
                            }
                        }

                        // Ensure we scroll to the bottom when done
                        chatBox.scrollTop = chatBox.scrollHeight;
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
            } else {
                // Use regular endpoint (existing functionality)
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
        }
    };

    // Event listener for the send button - using streaming
    sendButton.addEventListener('click', () => sendMessage(true));

    // Event listener for the input field to allow sending with Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission if any
            sendMessage(true); // Use streaming
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

