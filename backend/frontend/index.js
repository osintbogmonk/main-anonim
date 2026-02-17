async function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  console.log(data);

  if (data.error) alert(data.error);
  else {
    localStorage.setItem("token", data.token);
    alert("Вход успешен!");
  }
}
