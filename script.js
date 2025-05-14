
async function sendMessage() {
  const input = document.getElementById("user-input").value;
  const lang = document.getElementById("language").value;
  if (!input.trim()) return;

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<div><strong>شما:</strong> ${input}</div>`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: lang === "fa" ? "پاسخ‌ها را به زبان فارسی بده." : "Answer in English." },
        { role: "user", content: input }
      ]
    })
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "خطا در دریافت پاسخ";
  chatBox.innerHTML += `<div><strong>ربات:</strong> ${reply}</div>`;
  document.getElementById("user-input").value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}
