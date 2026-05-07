// ===================== LOADS.JS =====================
// 1) Lista de invitados (ejemplo)
const guests = [
  { id: "1", name: "Familia Aguilar", passes: 4 },
  // { id: "2", name: "María López", passes: 1 },
];

// Helper: leer parámetros ?id=1
function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

document.addEventListener("DOMContentLoaded", () => {
  const guestId = getQueryParam("id");

  // Si no hay id, no marcamos error: solo no hay invitado
  if (!guestId) {
    window.currentGuest = null;
    return;
  }

  const guest = guests.find((g) => String(g.id) === String(guestId));

  if (guest) {
    window.currentGuest = guest;

    // Si tienes estos elementos en alguna parte, los llena (opcional)
    const guestNameEl = document.getElementById("guest-name");
    const passesEl = document.getElementById("passes");

    if (guestNameEl) guestNameEl.textContent = guest.name;
    if (passesEl) {
      const p = Number(guest.passes || 1);
      passesEl.textContent = `${p} ${p === 1 ? "pase" : "pases"}`;
    }
  } else {
    window.currentGuest = null;

    const guestNameEl = document.getElementById("guest-name");
    if (guestNameEl) guestNameEl.textContent = "Invitado no encontrado";
  }
});