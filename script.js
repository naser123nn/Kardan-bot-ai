
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const languageSelect = document.getElementById("language");

function sendMessage() {
    const msg = userInput.value.trim();
    const lang = languageSelect.value;
    if (msg === "") return;

    appendMessage(msg, "user");
    userInput.value = "";
    chatbox.scrollTop = chatbox.scrollHeight;

    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_API_KEY_HERE"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: lang === "fa" ? "تو یک دستیار فارسی هستی." : "You are an English assistant." },
                { role: "user", content: msg }
            ]
        })
    })
    .then(res => res.json())
    .then(data => {
        const reply = data.choices[0].message.content;
        appendMessage(reply, "bot");
        chatbox.scrollTop = chatbox.scrollHeight;
    })
    .catch(err => {
        appendMessage("خطا در ارتباط با هوش مصنوعی / Error connecting to AI", "bot");
    });
}

function appendMessage(text, sender) {
    const div = document.createElement("div");
    div.className = "message " + sender;
    div.textContent = text;
    chatbox.appendChild(div);
}
