document.addEventListener('DOMContentLoaded', () => {
    
    // --- Reveal on Scroll Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
    
    // Trigger the hero section immediately
    setTimeout(() => {
        document.querySelector('.hero-text-box').classList.add('active');
    }, 100);

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- AI Widget Logic ---
    const aiToggleBtn = document.getElementById('ai-toggle');
    const aiCloseBtn = document.getElementById('ai-close');
    const aiWindow = document.getElementById('ai-window');
    const aiMessagesContainer = document.getElementById('ai-messages');
    const aiInput = document.getElementById('ai-input');
    const aiSendBtn = document.getElementById('ai-send');

    aiToggleBtn.addEventListener('click', () => {
        aiWindow.classList.toggle('active');
        if(aiWindow.classList.contains('active')) {
            setTimeout(() => aiInput.focus(), 300);
        }
    });

    aiCloseBtn.addEventListener('click', () => {
        aiWindow.classList.remove('active');
    });

    const sendMessage = () => {
        const text = aiInput.value.trim();
        if (text === '') return;

        appendMessage(text, 'user-message');
        aiInput.value = '';

        showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator();
            const response = "Thank you for the details. I understand the sensitivity of this matter. Our legal team will conduct a preliminary review in strict confidence. Could you please provide your full name and phone number so one of our specialist solicitors can contact you directly?";
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
