import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://euzmecqnozwwrjiaqggt.supabase.co",
  "sb_publishable_wQpw5zl350Zoj4AtkK5waA_s-I50Wbl"
);

let currentChatId = null;
let userId = "test-user-123";
let subscription = null;

// Загружаем список чатов
async function loadChats() {
  const { data: chats } = await supabase
    .from("chats")
    .select("*")
    .order("created_at", { ascending: false });

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

  if (subscription) {
    supabase.removeChannel(subscription);
  }

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  const messageList = document.getElementById("messageList");
  messageList.innerHTML = "";

  messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "msg";
    div.innerText = msg.text;
    messageList.appendChild(div);
  });

  messageList.scrollTop = messageList.scrollHeight;

  // Real-time
  subscription = supabase
    .channel("messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `chat_id=eq.${chatId}`
      },
      (payload) => {
        const msg = payload.new;

        const div = document.createElement("div");
        div.className = "msg";
        div.innerText = msg.text;

        messageList.appendChild(div);
        messageList.scrollTop = messageList.scrollHeight;
      }
    )
    .subscribe();
}

// Отправить сообщение
async function sendMessage() {
  if (!currentChatId) return alert("Выберите чат!");

  const text = document.getElementById("msgInput").value;
  if (!text.trim()) return;

  await supabase.from("messages").insert([
    {
      chat_id: currentChatId,
      user_id: userId,
      text
    }
  ]);

  document.getElementById("msgInput").value = "";
}

loadChats();
