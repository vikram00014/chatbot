// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const clearChatBtn = document.getElementById('clearChat');
const themeToggleBtn = document.getElementById('themeToggle');
const charCount = document.getElementById('charCount');
const suggestionsContainer = document.getElementById('suggestions');

// Message history for context
let conversationHistory = [];

// Get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

// Configure marked for better rendering
if (typeof marked !== 'undefined') {
    marked.setOptions({
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(code, { language: lang }).value;
                } catch (err) {}
            }
            return hljs.highlightAuto(code).value;
        },
        breaks: true,
        gfm: true
    });
}

// Add message to chat
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<div class="logo-small">N</div>';
    
    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'message-wrapper';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    // Parse markdown for bot messages
    if (!isUser && typeof marked !== 'undefined') {
        const htmlContent = marked.parse(content);
        messageContent.innerHTML = htmlContent;
        
        // Add copy buttons to code blocks
        messageContent.querySelectorAll('pre code').forEach((block, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';
            block.parentNode.parentNode.insertBefore(wrapper, block.parentNode);
            wrapper.appendChild(block.parentNode);
            
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-code-btn';
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            copyBtn.onclick = () => {
                const code = block.textContent;
                navigator.clipboard.writeText(code).then(() => {
                    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                });
            };
            wrapper.insertBefore(copyBtn, block.parentNode);
        });
    } else {
        messageContent.textContent = content;
    }
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = getCurrentTime();
    
    messageWrapper.appendChild(messageContent);
    messageWrapper.appendChild(messageTime);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageWrapper);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom with smooth animation
    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
    });
    
    // Hide suggestions after first message
    if (conversationHistory.length > 0) {
        suggestionsContainer.style.display = 'none';
    }
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = '<div class="logo-small">N</div>';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'typing-indicator-content';
    typingContent.innerHTML = '<span></span><span></span><span></span>';
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(typingContent);
    chatMessages.appendChild(typingDiv);
    
    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
    });
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Send message to Vercel serverless function
async function sendMessageToAPI(message) {
    try {
        // Add user message to conversation history
        conversationHistory.push({
            role: 'user',
            content: message
        });

        // Call Vercel serverless function
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                history: conversationHistory
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'API request failed');
        }

        const data = await response.json();
        const assistantMessage = data.message;

        // Add assistant response to conversation history
        conversationHistory.push({
            role: 'assistant',
            content: assistantMessage
        });

        return assistantMessage;
    } catch (error) {
        console.error('Error:', error);
        return `Sorry, I encountered an error: ${error.message}`;
    }
}

// Handle send message
async function handleSendMessage() {
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, true);
    
    // Clear input
    userInput.value = '';
    charCount.textContent = '0';
    
    // Disable input while processing
    userInput.disabled = true;
    sendButton.disabled = true;
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get response from API
    const response = await sendMessageToAPI(message);
    
    // Remove typing indicator
    removeTypingIndicator();
    
    // Add bot response to chat
    addMessage(response, false);
    
    // Re-enable input
    userInput.disabled = false;
    sendButton.disabled = false;
    userInput.focus();
}

// Event listeners
sendButton.addEventListener('click', handleSendMessage);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

// Character counter
userInput.addEventListener('input', () => {
    const count = userInput.value.length;
    charCount.textContent = count;
    
    if (count > 1800) {
        charCount.style.color = '#f5576c';
    } else {
        charCount.style.color = 'var(--text-secondary)';
    }
});

// Clear chat functionality
clearChatBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the chat?')) {
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <div class="logo-small">N</div>
                </div>
                <div class="message-wrapper">
                    <div class="message-content">
                        NEXUS initialized. Ready to assist.
                    </div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            </div>
        `;
        conversationHistory = [];
        suggestionsContainer.style.display = 'flex';
    }
});

// Theme toggle functionality (disabled - single theme only)
themeToggleBtn.style.display = 'none';

// Suggestion chips functionality
const suggestionChips = document.querySelectorAll('.suggestion-chip');
suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
        userInput.value = chip.textContent;
        userInput.focus();
        handleSendMessage();
    });
});

// Focus input on load
userInput.focus();

// Add initial timestamp to welcome message
document.addEventListener('DOMContentLoaded', () => {
    const firstMessage = document.querySelector('.message-time');
    if (firstMessage && !firstMessage.textContent) {
        firstMessage.textContent = getCurrentTime();
    }
});
