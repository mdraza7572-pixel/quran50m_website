// --- ai.js (AI & Voice Logic) ---

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
                model: "meta-llama/llama-4-maverick-17b-128e-instruct", // Smart Model
                messages: [
                    { 
                        role: "system", 
                        content: "Tum ek friendly aur funny knowledgeable Islamic AI assistant ho. Tumhara naam 'Ahmad' hai. Tum Hinglish (Hindi+English mix) mein baat karte ho. Jawab short, Tum ek calm, soft-spoken Islamic assistant ho. Tum jawab Quran & adab ke saath dete ho. Agar sawal Islamic na ho, tab bhi polite raho." 
                    },
                    { role: "user", content: text }
                ],
                temperature: 0.7,
                max_tokens: 200
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

// --- VOICE (SPEAK) ---
window.speakAnswer = function(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#]/g, "").replace(/[\u{1F600}-\u{1F64F}]/gu, ""); 
    const speech = new SpeechSynthesisUtterance(cleanText);
    
    // Find Hindi Voice
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

// --- SAFE EVENT LISTENERS ---
// Wait for DOM to load before attaching events
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
