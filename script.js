// Smooth scroll navigation
function scrollToSection(event, sectionId) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Back to Top functionality
window.onscroll = function() {
    const btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks && window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });
});

// Initialize EmailJS with Public Key
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("LX_caWw2Qsa3e8CIy");
    }
})();

// Handle Contact Form Submission
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    if (!name || !email || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    const templateParams = {
        from_name: name,
        from_email: email,
        to_email: 'theuniquedawg29@gmail.com',
        message: message,
        title: "New Quant-Elite Inquiry"
    };

    emailjs.send('service_jeir34e', 'template_zoxrq4d', templateParams)
        .then(function(response) {
            showFormMessage('Message sent successfully! Santosh will get back to you soon.', 'success');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, function(error) {
            console.error('FAILED...', error);
            showFormMessage('Oops! Something went wrong. Please try again.', 'error');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}

// Handle Newsletter Submission
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    const messageDisplay = document.getElementById('newsletterMessage');

    if (email) {
        messageDisplay.textContent = "Welcome to the family! Check your inbox soon.";
        messageDisplay.style.color = "#10b981";
        event.target.reset();

        setTimeout(() => {
            messageDisplay.textContent = "";
        }, 5000);
    }
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.opacity = '0';
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
                formMessage.style.opacity = '1';
            }, 500);
        }, 5000);
    }
}

// Chatbot Logic
function toggleChatbot() {
    const chatWindow = document.getElementById('chatbot-window');
    const chatToggle = document.getElementById('chatbot-toggle');

    if (!chatWindow || !chatToggle) return;

    // Use computed style if inline style is not set
    const currentDisplay = chatWindow.style.display || window.getComputedStyle(chatWindow).display;

    if (currentDisplay === 'none') {
        chatWindow.style.display = 'flex';
        chatToggle.style.display = 'none';

        // Auto-focus input when opening
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            setTimeout(() => chatInput.focus(), 300);
        }
    } else {
        chatWindow.style.display = 'none';
        chatToggle.style.display = 'flex';
    }
}

function handleChatKey(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const container = document.getElementById('chat-messages');
    const text = input.value.trim();

    if (!text) return;

    const userDiv = document.createElement('div');
    userDiv.className = 'message user-msg';
    userDiv.textContent = text;
    container.appendChild(userDiv);

    input.value = '';
    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'message bot-msg';
        botDiv.innerHTML = getBotResponse(text);
        container.appendChild(botDiv);
        container.scrollTop = container.scrollHeight;
    }, 600);
}

function sendSuggestedMessage(topic) {
    let message = "";
    if (topic === 'About Quant-Elite') message = "Tell me about Quant-Elite Features";
    if (topic === 'How to Download') message = "How can I install the Beta?";
    if (topic === 'Quiz Clash') message = "What is the Quiz Clash Arena?";
    if (topic === 'AI Mentor') message = "Tell me about Ganitacharya AI";
    if (topic === 'Certificates') message = "How do I get Mastery Certificates?";
    if (topic === 'Contact Support') message = "I need help with something";
    if (topic === 'Services') message = "What services do you offer?";
    if (topic === 'Santosh') message = "Who created this?";

    const input = document.getElementById('chat-input');
    input.value = message;
    sendChatMessage();
}

function getBotResponse(input) {
    const val = input.toLowerCase().trim();
    const isHindi = /[ऀ-ॿ]/.test(input) || val.includes('नमस्ते') || val.includes('संतोष');

    // More conversational responses with direct links and emails
    const personalResponses = {
        greet: isHindi
            ? `नमस्ते! मैं <strong>सिद्धांत</strong> हूँ, संतोष टेकवर्क्स का AI मैनेजर। 😊<br><br>
               मैं यहाँ आपकी सहायता के लिए हूँ। आप मुझसे <strong>Quant-Elite</strong> ऐप, हमारी <strong>वेबसाइट सेवाओं</strong>, या हमारे संस्थापक <strong>संतोष जी</strong> के बारे में पूछ सकते हैं।<br><br>
               आज मैं आपकी किस प्रकार मदद कर सकता हूँ?`
            : `Hello! I'm <strong>Siddhant</strong>, the AI Manager at Santosh TechWorks. 😊<br><br>
               I'm here to guide you through our ecosystem. You can ask me about the <strong>Quant-Elite</strong> app, our <strong>development services</strong>, or the vision of our founder, <strong>Santosh</strong>.<br><br>
               How can I assist you today?`,

        about: isHindi
            ? `<strong>Quant-Elite</strong> गणित सीखने का एक क्रांतिकारी प्लेटफॉर्म है:<br><br>
               • <strong>Ganitacharya AI Mentor:</strong> यह आपको आवाज़, टेक्स्ट या फोटो के ज़रिए सवालों के जवाब देगा।<br>
               • <strong>Quiz Clash:</strong> दोस्तों के साथ रियल-टाइम क्विज़ बैटल खेलें।<br>
               • <strong>Analytics:</strong> रडार चार्ट के ज़रिए अपनी प्रगति देखें।<br>
               • <strong>Certificates:</strong> अपनी परफॉरमेंस के आधार पर गोल्ड, सिल्वर या ब्रोंज सर्टिफिकेट जीतें।<br><br>
               क्या आप इसे आज़माना चाहेंगे? <a href="install-guide.html" style="color: #6366f1; font-weight: bold;">यहाँ क्लिक करें</a>`
            : `<strong>Quant-Elite</strong> is a revolutionary math learning platform designed for excellence:<br><br>
               • <strong>Ganitacharya AI Mentor:</strong> Personalized guidance using voice, text, or image analysis.<br>
               • <strong>Quiz Clash (Multiplayer):</strong> Live 2-4 player battles with private lobbies and smart bots.<br>
               • <strong>Advanced Analytics:</strong> Map your skills via radar charts and earn dynamic Mastery Certificates.<br>
               • <strong>The Learning Tree:</strong> Gamified path with LaTeX tutorials and diagrams.<br><br>
               Ready to start? <a href="install-guide.html" style="color: #6366f1; font-weight: bold;">Install the Beta Now</a>`,

        download: isHindi
            ? `निश्चित रूप से! आप <strong>Quant-Elite</strong> को इंस्टॉल करने के लिए हमारे **Installation Guide** का पालन करें:<br><br>
               🚀 <strong>Guide Link:</strong> <a href="install-guide.html" style="color: #6366f1;">यहाँ क्लिक करें</a><br><br>
               इसमें Google Group जॉइन करने और टेस्टर बनने के सारे स्टेप्स दिए गए हैं।`
            : `Absolutely! Please follow our <strong>Installation Guide</strong> to get the Quant-Elite Beta:<br><br>
               🚀 <strong>Guide Link:</strong> <a href="install-guide.html" style="color: #6366f1; font-weight: bold;">Open Installation Guide</a><br><br>
               This covers joining the Google Group and becoming an official beta tester.`,

        creator: isHindi
            ? `<strong>संतोष चौबे</strong> Santosh TechWorks के संस्थापक और मुख्य डेवलपर हैं। 👨‍💻<br><br>
               वे एक Full-Stack Architect और AI स्पेशलिस्ट हैं जो डिब्रूगढ़, असम से हैं। उनका मिशन उन्नत शिक्षा को AI के माध्यम से हर छात्र तक पहुँचाना है।<br><br>
               आप उन्हें सीधे यहाँ संपर्क कर सकते हैं: <a href="mailto:theuniquedawg29@gmail.com" style="color: #6366f1; font-weight: bold;">theuniquedawg29@gmail.com</a>`
            : `<strong>Santosh Choubey</strong> is the founder and lead developer of Santosh TechWorks. 👨‍💻<br><br>
               He is a Full-Stack Architect and AI Integration Specialist based in Dibrugarh, Assam. His mission is to democratize advanced education through personalized AI tutoring.<br><br>
               You can connect with him directly at: <a href="mailto:theuniquedawg29@gmail.com" style="color: #6366f1; font-weight: bold;">theuniquedawg29@gmail.com</a>`,

        support: isHindi
            ? `सहायता के लिए आप हमें कभी भी लिख सकते हैं! 🤝<br><br>
               📧 <strong>ईमेल:</strong> <a href="mailto:theuniquedawg29@gmail.com" style="color: #6366f1; font-weight: bold;">theuniquedawg29@gmail.com</a><br>
               हम आमतौर पर 24 घंटे के भीतर जवाब देते हैं। आप नीचे दिए गए 'Contact' फॉर्म का भी उपयोग कर सकते हैं।`
            : `I'm here to help! 🤝<br><br>
               📧 <strong>Email:</strong> <a href="mailto:theuniquedawg29@gmail.com" style="color: #6366f1; font-weight: bold;">theuniquedawg29@gmail.com</a><br>
               We typically respond within 24 hours. You can also use the 'Contact' form at the bottom of the page!`,

        whoAreYou: isHindi
            ? `मैं <strong>सिद्धांत</strong> हूँ, आपका डिजिटल साथी। संतोष टेकवर्क्स में मेरा काम आपकी मदद करना और हमारे ऐप्स के बारे में जानकारी देना है। मुझे संतोष जी ने अत्याधुनिक AI तकनीक से बनाया है। 😊`
            : `I'm <strong>Siddhant</strong>, your digital companion. My role at Santosh TechWorks is to assist you and provide information about our ecosystem. I was created by Santosh using advanced AI technologies. 😊`,

        services: isHindi
            ? `हम निम्नलिखित प्रीमियम डिजिटल सेवाएं प्रदान करते हैं:<br><br>
               • <strong>App Development:</strong> Flutter/Dart आधारित हाई-परफॉरमेंस ऐप्स।<br>
               • <strong>AI Integration:</strong> आपके बिजनेस में स्मार्ट बॉट्स और LLM जोड़ना।<br>
               • <strong>Web Architecture:</strong> स्केलेबल और सुरक्षित वेबसाइट्स।<br><br>
               चर्चा के लिए संपर्क करें: <a href="mailto:theuniquedawg29@gmail.com" style="color: #6366f1;">यहाँ लिखें</a>`
            : `We offer a suite of premium digital services:<br><br>
               • <strong>App Development:</strong> High-performance apps built with Flutter & Dart.<br>
               • <strong>AI Integration:</strong> Embedding smart agents and LLMs into workflows.<br>
               • <strong>Web Architecture:</strong> Scalable and secure web solutions.<br><br>
               Let's collaborate: <a href="mailto:theuniquedawg29@gmail.com" style="color: #6366f1; font-weight: bold;">Email us</a>`,

        fallback: isHindi
            ? `क्षमा करें, मैं पूरी तरह समझ नहीं पाया। 😅<br><br>
               आप मुझसे इनके बारे में पूछ सकते हैं:<br>
               • Quant-Elite क्या है?<br>
               • ऐप डाउनलोड कैसे करें?<br>
               • संतोष कौन है?<br>
               • सपोर्ट के लिए ईमेल क्या है?`
            : `I'm not sure I understood that correctly. 😅<br><br>
               Try asking about:<br>
               • What is Quant-Elite?<br>
               • How to download the app?<br>
               • Who is Santosh?<br>
               • What is your support email?`
    };

    if (val.includes('hello') || val.includes('hi') || val.includes('नमस्ते')) return personalResponses.greet;
    if (val.includes('who are you') || val.includes('तुम कौन') || val.includes('siddhant') || val.includes('सिद्धांत')) return personalResponses.whoAreYou;
    if (val.includes('clash') || val.includes('multiplayer') || val.includes('arena') || val.includes('battle')) return isHindi
        ? "<strong>Quiz Clash</strong> हमारा रियल-टाइम मल्टीप्लेयर एरिना है जहाँ आप दोस्तों या अनजान खिलाड़ियों के साथ क्विज़ खेल सकते हैं। इसमें स्मार्ट बॉट्स और प्राइवेट लॉबी की सुविधा भी है!"
        : "<strong>Quiz Clash</strong> is our real-time multiplayer arena where you can engage in 2-4 player quiz battles. It features matchmaking, private lobbies, and smart bots!";
    if (val.includes('ganitacharya') || val.includes('mentor') || val.includes('ai')) return isHindi
        ? "<strong>Ganitacharya AI Mentor</strong> आपका पर्सनल मैथ गाइड है। आप आवाज़, टेक्स्ट या फोटो भेजकर सवाल पूछ सकते हैं। यह आपको स्टेप-बाय-स्टेप गाइडेंस देगा।"
        : "<strong>Ganitacharya AI Mentor</strong> is your personalized math guide. You can ask doubts via voice, text, or images, and it provides conversational, step-by-step solutions.";
    if (val.includes('certificate') || val.includes('mastery') || val.includes('grade')) return isHindi
        ? "आप अपनी परफॉरमेंस के आधार पर गोल्ड, सिल्वर या ब्रोंज <strong>Mastery Certificates</strong> डाउनलोड और शेयर कर सकते हैं।"
        : "Based on your performance, you can earn and download dynamic <strong>Mastery Certificates</strong> (Gold, Silver, Bronze) directly from the app!";
    if (val.includes('santosh') || val.includes('creator') || val.includes('founder') || val.includes('संतोष') || val.includes('who made') || val.includes('कौन बनाया')) return personalResponses.creator;
    if (val.includes('download') || val.includes('डाउनलोड') || val.includes('link') || val.includes('app')) return personalResponses.download;
    if (val.includes('email') || val.includes('connect') || val.includes('contact') || val.includes('ईमेल') || val.includes('संपर्क') || val.includes('support') || val.includes('help')) return personalResponses.support;
    if (val.includes('quant-elite') || val.includes('about') || val.includes('क्या है')) return personalResponses.about;
    if (val.includes('services') || val.includes('offer') || val.includes('काम')) return personalResponses.services;

    return personalResponses.fallback;
}

// Fixed Scroll animations
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .project-card, .testimonial-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
