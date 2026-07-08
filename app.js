document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }
    });

    // --- AI Widget Logic ---
    const aiToggleBtn = document.getElementById('ai-toggle');
    const aiCloseBtn = document.getElementById('ai-close');
    const aiWindow = document.getElementById('ai-window');
    const aiMessagesContainer = document.getElementById('ai-messages');
    const aiInput = document.getElementById('ai-input');
    const aiSendBtn = document.getElementById('ai-send');

    // Toggle window
    aiToggleBtn.addEventListener('click', () => {
        aiWindow.classList.toggle('active');
        if(aiWindow.classList.contains('active')) {
            setTimeout(() => aiInput.focus(), 300);
        }
    });

    aiCloseBtn.addEventListener('click', () => {
        aiWindow.classList.remove('active');
    });

    // Handle sending message
    const sendMessage = () => {
        const text = aiInput.value.trim();
        if (text === '') return;

        // Add User Message
        appendMessage(text, 'user-message');
        aiInput.value = '';

        // Simulate AI Thinking
        showTypingIndicator();

        // Simulate AI Response (Sales Pitch style)
        setTimeout(() => {
            removeTypingIndicator();
            const response = "Thank you for the details. I understand you need assistance with this matter. Our legal team will conduct a preliminary review. Could you please provide your full name and phone number so one of our specialist solicitors can contact you directly?";
            appendMessage(response, 'ai-message');
        }, 2000);
    };

    aiSendBtn.addEventListener('click', sendMessage);
    
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function appendMessage(text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        
        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';
        bubble.textContent = text;
        
        msgDiv.appendChild(bubble);
        aiMessagesContainer.appendChild(msgDiv);
        
        // Auto scroll to bottom
        aiMessagesContainer.scrollTop = aiMessagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ai-message typing-container`;
        msgDiv.id = 'typing-indicator';
        
        const bubble = document.createElement('div');
        bubble.className = 'typing-indicator';
        
        for(let i=0; i<3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            bubble.appendChild(dot);
        }
        
        msgDiv.appendChild(bubble);
        aiMessagesContainer.appendChild(msgDiv);
        aiMessagesContainer.scrollTop = aiMessagesContainer.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
});
