// ===================== BUENOS DESEOS =====================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("wishForm");
  const nameInput = document.getElementById("wishName");
  const messageInput = document.getElementById("wishMessage");
  const list = document.getElementById("wishesList");
  const msg = document.getElementById("wishMsg");
  const firebaseApi = window.eventFirebase;
  const localKey = `wishes_${firebaseApi?.eventId || "local"}`;

  if (!form || !nameInput || !messageInput || !list || !msg) return;

  function setMessage(text, type) {
    msg.textContent = text;
    msg.className = `rsvp-msg ${type}`;
    msg.style.display = "block";
  }

  function getLocalWishes() {
    try {
      return JSON.parse(localStorage.getItem(localKey) || "[]");
    } catch {
      localStorage.removeItem(localKey);
      return [];
    }
  }

  function saveLocalWish(wish) {
    const wishes = getLocalWishes();
    wishes.unshift(wish);
    localStorage.setItem(localKey, JSON.stringify(wishes.slice(0, 20)));
  }

  function renderWishes(wishes) {
    list.innerHTML = "";

    if (!wishes.length) {
      const empty = document.createElement("p");
      empty.className = "wish-empty";
      empty.textContent = "Aún no hay buenos deseos.";
      list.appendChild(empty);
      return;
    }

    wishes.forEach((wish) => {
      const item = document.createElement("article");
      item.className = "wish-item";

      const author = document.createElement("strong");
      author.textContent = wish.name || "Invitado";

      const message = document.createElement("p");
      message.textContent = wish.message || "";

      item.append(author, message);
      list.appendChild(item);
    });
  }

  renderWishes(getLocalWishes());

  if (firebaseApi?.enabled) {
    firebaseApi.listenWishes(renderWishes);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
      setMessage("Por favor completa tu nombre y mensaje.", "error");
      return;
    }

    const wish = {
      name,
      message,
      eventId: firebaseApi?.eventId || "local",
      createdAtLocal: firebaseApi?.localCreatedAt?.() || new Date().toISOString(),
    };

    try {
      if (firebaseApi?.enabled) {
        await firebaseApi.saveWish(wish);
      } else {
        saveLocalWish(wish);
        renderWishes(getLocalWishes());
      }

      form.reset();
      setMessage("Gracias por enviar tu buen deseo.", "ok");
    } catch (error) {
      console.error(error);
      saveLocalWish(wish);
      renderWishes(getLocalWishes());
      setMessage("Guardamos tu deseo en este dispositivo. Revisa Firebase config.", "error");
    }
  });
});
