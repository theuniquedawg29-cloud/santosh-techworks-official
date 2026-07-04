// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNavClose = document.getElementById('mobile-nav-close');
const mobileNav = document.getElementById('mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

function toggleMobileNav() {
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileNav);
if (mobileNavClose) mobileNavClose.addEventListener('click', toggleMobileNav);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Form Submission Logic
async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    const msg = document.getElementById('formMessage');

    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            msg.textContent = 'Message sent successfully! Santosh will receive your email instantly.';
            msg.style.color = '#10b981';
            form.reset();
        } else {
            msg.textContent = 'Oops! There was a problem sending your message.';
            msg.style.color = '#ef4444';
        }
    } catch (error) {
        msg.textContent = 'Oops! There was a problem sending your message.';
        msg.style.color = '#ef4444';
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
        setTimeout(() => msg.textContent = '', 6000);
    }
}

// Chatbot Logic
function toggleChatbot() {
    const chatWindow = document.getElementById('chatbot-window');
    const chatToggle = document.getElementById('chatbot-toggle');
    const isVisible = chatWindow.style.display === 'flex';

    chatWindow.style.display = isVisible ? 'none' : 'flex';
    chatToggle.style.display = isVisible ? 'flex' : 'none';
}

function handleChatKey(event) {
    if (event.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const container = document.getElementById('chat-messages');
    const text = input.value.trim();

    if (!text) return;

    appendMessage('user', text);
    input.value = '';

    setTimeout(() => {
        appendMessage('bot', "I'm Siddhant, the AI Manager. I'm currently processing your request. How else can I help you today?");
    }, 1000);
}

function appendMessage(sender, text) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `message ${sender}-msg`;
    div.innerHTML = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}
