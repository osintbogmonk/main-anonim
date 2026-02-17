let currentChatId = null;
let userId = "test-user-123"; // временно

// Загружаем список чатов
async function loadChats() {
  const res = await fetch("http://localhost:3000/chat/list");
  const chats = await res.json();

  const chatList = document.getElementById("chatList");
  chatList.innerHTML = "";

  chats.forEach(chat => {
    const div = document.createElement("div");
    div.className = "chat-item";
    div.innerText = chat.name;
    div.onclick = () => openChat(chat.id);
    chatList.appendChild(div);
  });
}

// Открыть чат
async function openChat(chatId) {
  currentChatId = chatId;

  const res = await fetch(`http://localhost:3000/chat/${chatId}/messages`);
  const messages = await res.json();

  const messageList = document.getElementById("messageList");
  messageList.innerHTML = "";

  messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "msg";
    div.innerText = msg.text;
    messageList.appendChild(div);
  });

  messageList.scrollTop = messageList.scrollHeight;
}

// Отправить сообщение
async function sendMessage() {
  if (!currentChatId) return alert("Выберите чат!");

  const text = document.getElementById("msgInput").value;
  if (!text.trim()) return;

  await fetch(`http://localhost:3000/chat/${currentChatId}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      text
    })
  });

  document.getElementById("msgInput").value = "";
  openChat(currentChatId);
}

loadChats();
