// --- Preloader & Animations ---
gsap.to(".progress-bar", {
    width: "100%",
    duration: 2,
    ease: "power2.out",
    onComplete: () => {
        gsap.to(".preloader", {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            delay: 0.5,
            onComplete: () => {
                document.querySelector(".preloader").style.display = "none";
                document.querySelector(".main-content").classList.add("visible");
                initAnimations();
            }
        });
    }
});

function initAnimations() {
    gsap.from(".hero h1", { opacity: 0, y: 50, duration: 1, delay: 0.3 });
    gsap.from(".hero p", { opacity: 0, y: 30, duration: 1, delay: 0.6 });
    gsap.from(".hero-button", { opacity: 0, y: 30, duration: 1, delay: 0.9, ease: "back.out(1.7)" });

    gsap.from(".feature-card", {
        scrollTrigger: {
            trigger: ".features-grid",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.2)"
    });

    document.querySelectorAll('.cta-button, .feature-card').forEach(element => {
        element.addEventListener('mouseenter', () => gsap.to(element, { scale: 1.05, duration: 0.3 }));
        element.addEventListener('mouseleave', () => gsap.to(element, { scale: 1, duration: 0.3 }));
    });

    document.querySelectorAll('.card-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            gsap.to(card, {
                rotateX: (y - centerY) / 20,
                rotateY: (centerX - x) / 20,
                duration: 0.5
            });
        });
        card.addEventListener('mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5 }));
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('mouseenter', () => gsap.to(link, { color: '#a29bfe', duration: 0.3 }));
        link.addEventListener('mouseleave', () => gsap.to(link, { color: '#f5f6fa', duration: 0.3 }));
    });
}

// --- Chatbot Logic ---
const chatWindow = document.getElementById("chat-window");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// Add a message to chat
function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.classList.add("chat-message");
    msg.classList.add(sender); // "user" or "bot"
    msg.innerHTML = `<p>${text}</p>`;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Send message
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user's message
    addMessage("user", message);
    chatInput.value = "";

    // Show thinking animation
    const thinkingMsg = document.createElement("div");
    thinkingMsg.classList.add("chat-message", "bot");
    thinkingMsg.innerHTML = `<p>Thinking... 🤔</p>`;
    chatWindow.appendChild(thinkingMsg);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Fetch from Flask API
    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    })
    .then(res => res.json())
    .then(data => {
        thinkingMsg.innerHTML = `<p>${data.reply}</p>`;
        chatWindow.scrollTop = chatWindow.scrollHeight;
    })
    .catch(err => {
        thinkingMsg.innerHTML = `<p>Error: Could not connect to server.</p>`;
        console.error(err);
    });
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});
