// ===================== LOADS.JS =====================
// 1) Lista de invitados
const guests = [
  { id: "1", name: "Sr Carlos Vitola y Sra", passes: 2 },
  { id: "2", name: "Sr Giancarlo Vitola y Sra", passes: 2 },
  { id: "3", name: "Angie Vitola", passes: 1 },
  { id: "4", name: "Sr Franco Vitola y Sra", passes: 2 },
  { id: "5", name: "Sr Mario Zamora y Sra", passes: 2 },
  { id: "6", name: "Sandra Varela", passes: 1 },
  { id: "7", name: "Sr Carlos Ramírez y Sra", passes: 2 },
  { id: "8", name: "Sr Pedro Lezana y Sra", passes: 2 },
  { id: "9", name: "Sr Byron Oliva y Sra", passes: 2 },
  { id: "10", name: "Sra Vanessa Lima y Sr", passes: 2 },
  { id: "11", name: "Sr Franklin Casco y Sra", passes: 2 },
  { id: "12", name: "Sr Alejandro Acuña y Sra", passes: 2 },
  { id: "13", name: "Sr Fernando Acevedo y Sra", passes: 2 },
  { id: "14", name: "Sr Luis Figueroa y familia", passes: 4 },
  { id: "15", name: "Sra Gabriela Valenzuela e hijo", passes: 2 },
  { id: "16", name: "José Javier Recinos+1", passes: 2 },
  { id: "17", name: "Daniel Campo +1", passes: 2 },
  { id: "18", name: "Alvaro Berganza", passes: 1 },
  { id: "19", name: "Sofia Ixen", passes: 1 },
  { id: "20", name: "Fatima Reyes", passes: 1 },
  { id: "21", name: "Luis Pedro Ramírez", passes: 1 },
  { id: "22", name: "Diana Martínez del Rosal", passes: 1 },
  { id: "23", name: "Dulce Méndez", passes: 1 },
  { id: "24", name: "Natalie Chang", passes: 1 },
  { id: "25", name: "Sr Miguel Juarez y Sra", passes: 2 },
  { id: "26", name: "José Wong +1", passes: 2 },
  { id: "27", name: "Sr Rudy Estuardo Solares y Sra", passes: 2 },
  { id: "28", name: "Sr Rudy Esteban Solares y Sra", passes: 2 },
  { id: "29", name: "Sr Luis Carlos Figueroa y Sra", passes: 2 },
  { id: "30", name: "Sr Herbert Alvarizaes y Sra", passes: 2 },
  { id: "31", name: "Sr Raul Flores y Sra +1", passes: 3 },
  { id: "32", name: "Familia de León Muralles", passes: 4 },
  { id: "33", name: "Sr Raul Muralles y Sra", passes: 2 },
  { id: "34", name: "Marilyn Zamora", passes: 1 },
  { id: "35", name: "Mariana Zamora", passes: 1 },
  { id: "36", name: "Sra Rocio Herrera e hija", passes: 2 },
  { id: "37", name: "Sr Sebastián Contreras y Sra", passes: 2 },
  { id: "38", name: "Omar Cruz", passes: 1 },
  { id: "39", name: "Sr Herlin Pineda y Sra", passes: 2 },
  { id: "40", name: "Sr Federico Jiménez y Sra", passes: 2 },
  { id: "41", name: "Sr Ronald Pineda y Sra", passes: 2 },
  { id: "42", name: "Sr José Orellana y Sra", passes: 2 },
  { id: "43", name: "Valeria Figueroa", passes: 1 },
  { id: "44", name: "José Ignacio Gonzales", passes: 1 },
  { id: "45", name: "Sr Roberto Rodríguez y Sra", passes: 2 },
  { id: "46", name: "José Gonzales +1", passes: 2 },
  { id: "47", name: "Sebastián Boussinot +1", passes: 2 },
  { id: "48", name: "Ignacio Solares", passes: 1 },
  { id: "49", name: "Sr Diego Luna y Sra", passes: 2 },
  { id: "50", name: "Sr Sergio Luna y Sra", passes: 2 },
  { id: "51", name: "Sr Alfonso Padilla y Sra", passes: 2 },
  { id: "52", name: "Sr Edwin Escobar y Sra", passes: 2 },
  { id: "53", name: "David Galvez +1", passes: 2 },
  { id: "54", name: "Sr Alejandro Pivaral y Sra", passes: 2 },
  { id: "55", name: "Humberto Dalponte", passes: 1 },
  { id: "56", name: "Daniela Paiz", passes: 1 },
  { id: "57", name: "Sr Alvaro Hurtarte y Sra", passes: 2 },
  { id: "58", name: "Sra Gladys Sempé", passes: 1 },
  { id: "59", name: "Sr Marvin Hernández y Sra", passes: 2 },
  { id: "60", name: "Rivka Benitez +1", passes: 2 },
  { id: "61", name: "Ayelet Benitez +1", passes: 2 },
  { id: "62", name: "Sra Ana Cristina Alvarizaes", passes: 1 },
  { id: "63", name: "Sr Henry Sempé y Sra", passes: 2 },
  { id: "64", name: "Familia Morales Cabrera", passes: 4 },
  { id: "65", name: "Familia Morales Morales", passes: 4 },
  { id: "66", name: "Sra Daisy Guzmán", passes: 1 },
  { id: "67", name: "Familia Morales Pinzon", passes: 5 },
  { id: "68", name: "Ana Cristina Morales +1", passes: 2 },
  { id: "69", name: "Juan Diego Morales", passes: 1 },
  { id: "70", name: "Darwin Orellana", passes: 1 },
  { id: "71", name: "Daniela López", passes: 1 },
  { id: "72", name: "María Rene López", passes: 1 },
  { id: "73", name: "Sr José Sagastume y Sra", passes: 2 },
  { id: "74", name: "Paulina Argueta", passes: 1 },
  { id: "75", name: "Mishelle Castañeda", passes: 1 },
  { id: "76", name: "Juan Daniel Quevedo", passes: 1 },
  { id: "77", name: "Freddy Massella", passes: 1 },
  { id: "78", name: "Giancarlo Guirola", passes: 1 },
  { id: "79", name: "Adriana Morales", passes: 1 },
  { id: "80", name: "Pedro Lezana +1", passes: 2 },
  { id: "81", name: "José Guillermo Diaz +1", passes: 2 },
  { id: "82", name: "Sr José García y Sra", passes: 2 },
  { id: "83", name: "Sr Mauricio Marroquin y Sra", passes: 2 },
  { id: "84", name: "Diego Mayen +1", passes: 2 },
  { id: "85", name: "Sr Juan Diego Chang y Sra", passes: 2 },
  { id: "86", name: "Fernando Casco", passes: 1 },
  { id: "87", name: "Diego Ponce", passes: 1 },
  { id: "88", name: "Samuel López +1", passes: 2 },
  { id: "89", name: "Sr Erwin Rubio y Sra", passes: 2 },
  { id: "90", name: "Luis Pedro Valdez", passes: 1 },
  { id: "91", name: "Sr Jorge Ramírez y Sra", passes: 2 },
  { id: "92", name: "Diego Mendoza", passes: 1 },
];

window.guests = guests;
window.LocalGuestSeeds = {
  ...(window.LocalGuestSeeds || {}),
  "joseandres-mariandrea-2026": guests.reduce((acc, guest) => {
    acc[String(guest.id)] = {
      id: String(guest.id),
      nombre: guest.name,
      pases: Number(guest.passes || 1),
      activo: true,
    };
    return acc;
  }, {}),
};

window.seedEventGuestsToFirebase = async function seedEventGuestsToFirebase() {
  const eventId = window.config?.event?.defaultEventId || "joseandres-mariandrea-2026";
  const rsvpDB = window.RSVPDatabase;
  if (!rsvpDB?.migrateLocalGuestsToFirebase) {
    console.warn("RSVPDatabase no está disponible. Revisa que database.js esté cargado.");
    return { ok: false, guests: 0 };
  }

  await rsvpDB.seedEventConfigToFirebase?.(eventId, { force: true });
  const result = await rsvpDB.migrateLocalGuestsToFirebase(eventId, { force: true });
  console.log(`Invitados creados en Firebase: ${result.total || guests.length}`);
  return { ok: true, guests: result.total || guests.length };
};

// Helper: leer parámetros ?id=1
function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

document.addEventListener("DOMContentLoaded", () => {
  const guestId = getQueryParam("id");

  if (getQueryParam("seedGuests") === "1") {
    window.seedEventGuestsToFirebase();
  }

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
