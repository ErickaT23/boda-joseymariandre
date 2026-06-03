// ===================== ADMIN DASHBOARD =====================
document.addEventListener("DOMContentLoaded", () => {
  const firebaseApi = window.eventFirebase;
  const localGuests = window.guests || [];
  const status = document.getElementById("adminStatus");
  const configAlert = document.getElementById("adminConfigAlert");
  const rows = document.getElementById("adminRsvpRows");
  const wishesEl = document.getElementById("adminWishes");
  const search = document.getElementById("adminSearch");
  const btnRefresh = document.getElementById("btnRefreshAdmin");
  const btnSeed = document.getElementById("btnSeedGuestsAdmin");
  let dashboardRows = [];

  const stats = {
    guests: document.getElementById("statGuests"),
    passes: document.getElementById("statPasses"),
    yes: document.getElementById("statYes"),
    no: document.getElementById("statNo"),
    pending: document.getElementById("statPending"),
    confirmedPasses: document.getElementById("statConfirmedPasses"),
    wishCount: document.getElementById("wishCount"),
  };

  function setText(el, text) {
    if (el) el.textContent = text;
  }

  function formatDate(value) {
    if (!value) return "-";
    if (typeof value?.toDate === "function") return value.toDate().toLocaleString("es-GT");
    if (typeof value === "number") return new Date(value).toLocaleString("es-GT");
    return new Date(value).toLocaleString("es-GT");
  }

  function answerLabel(answer) {
    if (answer === "yes") return "Sí asiste";
    if (answer === "no") return "No asiste";
    return "Pendiente";
  }

  function renderRows() {
    const term = (search?.value || "").trim().toLowerCase();
    const filteredRows = term
      ? dashboardRows.filter((row) => row.name.toLowerCase().includes(term) || row.id.includes(term))
      : dashboardRows;

    rows.innerHTML = "";

    filteredRows.forEach((row) => {
      const tr = document.createElement("tr");
      tr.className = `admin-row-${row.answer || "pending"}`;
      tr.innerHTML = `
        <td>${row.id}</td>
        <td>${row.name}</td>
        <td>${row.passes}</td>
        <td>${answerLabel(row.answer)}</td>
        <td>${row.confirmedGuests}</td>
        <td>${formatDate(row.date)}</td>
      `;
      rows.appendChild(tr);
    });
  }

  function renderWishes(wishes) {
    wishesEl.innerHTML = "";
    setText(stats.wishCount, `${wishes.length} mensajes`);

    if (!wishes.length) {
      const empty = document.createElement("p");
      empty.className = "wish-empty";
      empty.textContent = "Aún no hay buenos deseos.";
      wishesEl.appendChild(empty);
      return;
    }

    wishes.forEach((wish) => {
      const item = document.createElement("article");
      item.className = "admin-wish";

      const title = document.createElement("strong");
      title.textContent = wish.name || "Invitado";

      const message = document.createElement("p");
      message.textContent = wish.message || "";

      const date = document.createElement("small");
      date.textContent = formatDate(wish.createdAt || wish.createdAtLocal);

      item.append(title, message, date);
      wishesEl.appendChild(item);
    });
  }

  async function loadDashboard() {
    setText(status, "Cargando información del evento...");
    if (configAlert) configAlert.hidden = Boolean(firebaseApi?.enabled);

    const firebaseGuests = firebaseApi?.enabled ? await firebaseApi.getGuests() : [];
    const guests = firebaseGuests.length ? firebaseGuests : localGuests;
    const rsvps = firebaseApi?.enabled ? await firebaseApi.getRsvps() : [];
    const wishes = firebaseApi?.enabled ? await firebaseApi.getWishes() : [];
    const rsvpByGuest = new Map(rsvps.map((rsvp) => [String(rsvp.guestId || rsvp.id), rsvp]));

    dashboardRows = guests
      .slice()
      .sort((a, b) => Number(a.id) - Number(b.id))
      .map((guest) => {
        const rsvp = rsvpByGuest.get(String(guest.id));
        return {
          id: String(guest.id),
          name: guest.name,
          passes: Number(guest.passes || 0),
          answer: rsvp?.answer || "pending",
          confirmedGuests: rsvp?.answer === "yes" ? Number(rsvp.guests || 0) : 0,
          date: rsvp?.updatedAt || rsvp?.atLocal || rsvp?.at,
        };
      });

    const yes = dashboardRows.filter((row) => row.answer === "yes").length;
    const no = dashboardRows.filter((row) => row.answer === "no").length;
    const confirmedPasses = dashboardRows.reduce((sum, row) => sum + row.confirmedGuests, 0);

    setText(stats.guests, String(guests.length));
    setText(stats.passes, String(guests.reduce((sum, guest) => sum + Number(guest.passes || 0), 0)));
    setText(stats.yes, String(yes));
    setText(stats.no, String(no));
    setText(stats.pending, String(Math.max(guests.length - yes - no, 0)));
    setText(stats.confirmedPasses, String(confirmedPasses));
    setText(status, firebaseApi?.enabled ? "Firebase activo. Datos cargados desde Firestore." : "Vista local. Falta configurar Firebase.");

    renderRows();
    renderWishes(wishes);
  }

  btnRefresh?.addEventListener("click", () => loadDashboard().catch(console.error));
  btnSeed?.addEventListener("click", async () => {
    setText(status, "Creando invitados en Firebase...");
    await window.seedEventGuestsToFirebase?.();
    await loadDashboard();
  });
  search?.addEventListener("input", renderRows);

  loadDashboard().catch((error) => {
    console.error(error);
    setText(status, "No se pudo cargar el dashboard. Revisa Firebase config y reglas.");
  });
});
