async function loadChats() {
  const token = localStorage.getItem("token");

  const res = await fetch("https://main-anonim.onrender.com/chat", {
    headers: { Authorization: "Bearer " + token }
  });

  const data = await res.json();

  const container = document.getElementById("chats");

  if (!res.ok) {
    container.innerHTML = "Ошибка загрузки чатов";
    return;
  }

  container.innerHTML = data.length
    ? data.map(c => `<p>Чат: ${c._id}</p>`).join("")
    : "Чатов нет";
}

loadChats();
