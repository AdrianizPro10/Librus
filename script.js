// --- script.js ---
// Obsługa logowania i zapamiętywania użytkownika

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const login = document.getElementById("login").value;
      const password = document.getElementById("password").value;

      // Prosty login testowy
      if (login === "admin" && password === "root") {
        localStorage.setItem("loggedUser", login); // zapisz kto się zalogował
        window.location.href = "dashboard.html";
      } else {
        alert("Błędny login lub hasło!");
      }
    });
  }

  // --- Dashboard: wczytywanie użytkownika ---
  const userDisplay = document.getElementById("username");
  if (userDisplay) {
    const user = localStorage.getItem("loggedUser");
    if (user) {
      userDisplay.textContent = `Witaj, ${user} 👋`;
    } else {
      window.location.href = "login.html";
    }
  }

  // --- Obsługa wylogowania ---
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("loggedUser");
      window.location.href = "login.html";
    });
  }

  // --- Wiadomości ---
  const messageForm = document.getElementById("messageForm");
  const messageList = document.getElementById("messageList");

  if (messageForm && messageList) {
    const savedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    renderMessages(savedMessages);

    messageForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const text = document.getElementById("messageInput").value.trim();
      if (text !== "") {
        savedMessages.push(text);
        localStorage.setItem("messages", JSON.stringify(savedMessages));
        renderMessages(savedMessages);
        messageForm.reset();
      }
    });
  }

  function renderMessages(messages) {
    messageList.innerHTML = "";
    messages.forEach((msg, index) => {
      const li = document.createElement("li");
      li.textContent = msg;
      const delBtn = document.createElement("button");
      delBtn.textContent = "Usuń";
      delBtn.onclick = () => {
        messages.splice(index, 1);
        localStorage.setItem("messages", JSON.stringify(messages));
        renderMessages(messages);
      };
      li.appendChild(delBtn);
      messageList.appendChild(li);
    });
  }

  // --- Plan lekcji i oceny ---
  loadEditableList("planList", "planStorage");
  loadEditableList("gradesList", "gradesStorage");

  function loadEditableList(listId, storageKey) {
    const list = document.getElementById(listId);
    const input = document.getElementById(`${listId}Input`);
    const form = document.getElementById(`${listId}Form`);
    if (!list || !form) return;

    const items = JSON.parse(localStorage.getItem(storageKey) || "[]");
    renderList();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (text !== "") {
        items.push(text);
        localStorage.setItem(storageKey, JSON.stringify(items));
        renderList();
        form.reset();
      }
    });

    function renderList() {
      list.innerHTML = "";
      items.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;
        const btn = document.createElement("button");
        btn.textContent = "Usuń";
        btn.onclick = () => {
          items.splice(index, 1);
          localStorage.setItem(storageKey, JSON.stringify(items));
          renderList();
        };
        li.appendChild(btn);
        list.appendChild(li);
      });
    }
  }
});