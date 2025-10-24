/* --- Chatbot Logic --- */

document.addEventListener('DOMContentLoaded', () => {

    const chatToggle = document.getElementById('chat-toggle');
    const chatWidget = document.getElementById('chat-widget');
    const chatMessages = document.getElementById('chat-messages');
    const chatInputField = document.getElementById('chat-input-field');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const openIcon = chatToggle ? chatToggle.querySelector('.open-icon') : null;
    const closeIcon = chatToggle ? chatToggle.querySelector('.close-icon') : null;

    if (chatToggle && chatWidget) {
        // Toggle Chat Visibility
        chatToggle.addEventListener('click', () => {
            const isOpen = chatWidget.classList.toggle('open');
            if (openIcon && closeIcon) {
                openIcon.style.display = isOpen ? 'none' : 'inline';
                closeIcon.style.display = isOpen ? 'inline' : 'none';
            }
            
            if (isOpen) {
                // Scroll to the bottom when opening
                chatMessages.scrollTop = chatMessages.scrollHeight;
                chatInputField.focus();
            }
        });

        // Handle User Input
        const handleUserInput = () => {
            const userText = chatInputField.value.trim();
            if (userText === '') return;

            // 1. Display User Message
            appendMessage(userText, 'user-message');

            // 2. Clear Input and Disable
            chatInputField.value = '';
            chatInputField.disabled = true;
            chatSendBtn.disabled = true;

            // 3. Get Bot Response (after a slight delay for realism)
            setTimeout(() => {
                const botResponse = getBotResponse(userText.toLowerCase());
                appendMessage(botResponse, 'bot-message');
                
                // Re-enable input
                chatInputField.disabled = false;
                chatSendBtn.disabled = false;
                chatInputField.focus();

            }, 800);
        };

        // Message Utility Function
        const appendMessage = (text, type) => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', type);
            // Replace markdown-style bold with actual bold HTML for better rendering
            let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // Replace line breaks
            messageDiv.innerHTML = formattedText.replace(/\n/g, '<br>');
            chatMessages.appendChild(messageDiv);
            // Auto-scroll to the latest message
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        // Simple Bot Response Logic (Centralized Knowledge Base)
        const getBotResponse = (input) => {
            if (input.includes('register') || input.includes('join') || input.includes('how to join')) {
                return "You can register on our dedicated page. Click the **'Register Now'** button, or visit the **Registration** link in the navigation menu! Teams should be 3-5 members.";
            }
            
            if (input.includes('theme') || input.includes('topics') || input.includes('key themes')) {
                return "Our key themes are: **AI in Education, Responsible AI, Combating Misinformation, AI for Well-being, and Digital Humanities.** All projects must relate to one of these areas.";
            }
            
            if (input.includes('date') || input.includes('timing') || input.includes('when') || input.includes('kick off')) {
                return "EduAIthon 2026 kicks off on **January 8, 2026, at 09:00:00**! The countdown on the homepage is the most accurate source.";
            }

            if (input.includes('prize') || input.includes('rewards') || input.includes('win')) {
                return "There is a significant prize pool, plus winners get international recognition and a chance to showcase their solution at the main IASF event. See the **Event** page for details.";
            }
            
            if (input.includes('hello') || input.includes('hi')) {
                return "Hello! I'm the EduAIthon Bot. I can help with quick questions. Try keywords like **Register**, **Themes**, or **Date**.";
            }
            
            if (input.includes('help desk') || input.includes('contact')) {
                return "Our full help desk has detailed contact information and a comprehensive FAQ. Please visit the **'Help Desk'** link in the navigation menu for more in-depth support.";
            }

            return "I couldn't find a direct answer to that. Please check our **FAQ** or visit the **Help Desk** page for detailed contact information. Good luck with your preparation!";
        };

        // Event Listeners for Send Button and Enter Key
        chatSendBtn.addEventListener('click', handleUserInput);
        chatInputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserInput();
            }
        });
    }
});