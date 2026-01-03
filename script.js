
const API_KEY = "AIzaSyDfUVUwvfdhkRYJPdBZrVzoe4GPEv6FLDA"; //
const MODEL = "gemini-2.0-flash"; // Актуальная модель на 2026 год

const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const messagesDiv = document.getElementById('messages');

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage('user', text);
    userInput.value = '';

    try {
        const response = await fetch(`generativelanguage.googleapis.com{MODEL}:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text }] }]
            })
        });

        const data = await response.json();
        const botResponse = data.candidates[0].content.parts[0].text;
        appendMessage('bot', botResponse);
    } catch (error) {
        appendMessage('bot', "Ошибка: не удалось получить ответ.");
        console.error(error);
    }
}

function appendMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = msg ${role};
    msgDiv.innerText = text;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

sendBtn.onclick = sendMessage;
userInput.onkeypress = (e) => { if(e.key === 'Enter') sendMessage(); };