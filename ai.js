// --- ai.js (Frontend Logic) ---

// ✅ Nayi API Key Update kar di hai
const GROQ_API_KEY = "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"; 
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// --- CHATBOT FUNCTION ---
async function sendMessage() {
    const input = document.getElementById('userInput');
    if(!input) return; // Safety check
    
    const text = input.value.trim();
    if(!text) return;
    
    const body = document.getElementById('chatBody');
    const userDiv = document.createElement('div');
    userDiv.className = 'msg user-msg';
    userDiv.innerText = text;
    body.appendChild(userDiv);
    input.value = '';
    
    const botDiv = document.createElement('div');
    botDiv.className = 'msg bot-msg';
    botDiv.innerText = 'Soch raha hoon...';
    body.appendChild(botDiv);
    body.scrollTop = body.scrollHeight;

    try {
        const res = await fetch(GROQ_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // ✅ Best Available Model (Llama 3.3 70B) - Smart & Fast
                model: "llama-3.3-70b-versatile", 
                messages: [
                    { 
                        role: "system", 
                        // Friendly, Delhi Style Vibe + Islamic Knowledge
                        content: "Tum ek friendly aur knowledgeable Islamic AI assistant ho. Tumhara naam 'Quran 50M AI' hai. Tum Hinglish (Hindi+English mix) mein baat karte ho, jaise ek acha dost samjhata hai. Jawab short, respectful aur helpful hone chahiye." 
                    },
                    { role: "user", content: text }
                ],
                temperature: 0.7,
                max_tokens: 300
            })
        });
        
        const data = await res.json();
        
        if (data.choices && data.choices[0]) {
            const ans = data.choices[0].message.content;
            botDiv.innerText = ans;
            speakAnswer(ans); // Auto Speak
        } else {
            botDiv.innerText = "Maaf karna, main samajh nahi paya.";
        }
    } catch(e) {
        console.error(e);
        botDiv.innerText = "Internet Error.";
    }
}

// --- VOICE (SPEAK) - Best Hindi Voice Finder ---
window.speakAnswer = function(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    // Emojis aur special chars hatana
    const cleanText = text.replace(/[*#]/g, "").replace(/[\u{1F600}-\u{1F64F}]/gu, ""); 
    const speech = new SpeechSynthesisUtterance(cleanText);
    
    // Hindi Voice Dhoondna (Agar device mein hai)
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IND'));
    if (hindiVoice) speech.voice = hindiVoice;
    
    speech.lang = 'hi-IN';
    window.speechSynthesis.speak(speech);
};

// --- MIC (LISTEN) ---
window.startListening = function() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert("Mic not supported"); return; }

    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    
    const micBtn = document.getElementById("micBtn");
    micBtn.innerText = "👂";
    recognition.start();

    recognition.onresult = function (event) {
        const text = event.results[0][0].transcript;
        document.getElementById("userInput").value = text;
        micBtn.innerText = "🎙️";
        sendMessage();
    };
};

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');

    if(sendBtn) sendBtn.addEventListener('click', sendMessage);
    if(userInput) {
        userInput.addEventListener('keypress', (e) => { 
            if(e.key === 'Enter') sendMessage(); 
        });
    }
});

// Force load voices
if(window.speechSynthesis) window.speechSynthesis.getVoices();
