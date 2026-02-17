import { createClient } from "https://esm.sh/@supabase/supabase-js";

export const supabase = createClient(
  "https://euzmecqnozwwrjiaqggt.supabase.co",
  "sb_publishable_wQpw5zl350Zoj4AtkK5waA_s-I50Wbl"
);

let currentChatId = null;
let userId = "test-user-123"; // временно
let subscription = null;

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

  // Если была старая подписка — отключаем
  if (subscription) {
    supabase.removeChannel(subscription);
  }

  // Загружаем историю сообщений
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

  // ⚡ REAL-TIME ПОДПИСКА НА НОВЫЕ СООБЩЕНИЯ
