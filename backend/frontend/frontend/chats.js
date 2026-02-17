async function loadChats() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Вы не авторизованы");
    window.location.href = "index.html";
    return;
  }

  const res = await fetch("https://main-anonim.onrender.com/chat", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();

  const container = document.getElementById("chats");

  if (!res.ok) {
    container.innerHTML = "Ошибка загрузки чатов";
    return;
  }

  if (data.length === 0) {
    container.innerHTML = "Чатов пока нет";
    return;
  }

  container.innerHTML = data
    .map(chat => `<p>Чат ID: ${chat._id}</p>`)
    .join("");
}

loadChats();
