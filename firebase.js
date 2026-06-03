// ===================== FIREBASE EVENT CONFIG =====================
const EVENT_ID = "joseandres-mariandrea-2026";

// Pega aquí la configuración web de Firebase del proyecto real.
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const eventConfig = {
  eventId: EVENT_ID,
  couple: "José Andrés & Mariandrea",
  date: "2026-11-07",
  title: "Boda José Andrés & Mariandrea",
};

function hasFirebaseConfig(config) {
  return Boolean(
    config.apiKey &&
    config.authDomain &&
    config.projectId &&
    config.appId
  );
}

function localCreatedAt() {
  return new Date().toISOString();
}

const firebaseServices = {
  enabled: false,
  eventId: EVENT_ID,
  eventConfig,
  localCreatedAt,
  upsertEventConfig: async () => null,
  upsertGuest: async () => null,
  saveRsvp: async () => null,
  saveWish: async () => null,
  getGuests: async () => [],
  getRsvps: async () => [],
  getWishes: async () => [],
  listenWishes: () => () => {},
};

if (window.firebase && hasFirebaseConfig(firebaseConfig)) {
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const eventRef = db.collection("events").doc(EVENT_ID);
  const serverTimestamp = () => firebase.firestore.FieldValue.serverTimestamp();

  firebaseServices.enabled = true;
  firebaseServices.db = db;
  firebaseServices.eventRef = eventRef;
  firebaseServices.guestsRef = eventRef.collection("guests");
  firebaseServices.rsvpsRef = eventRef.collection("rsvps");
  firebaseServices.wishesRef = eventRef.collection("wishes");

  firebaseServices.upsertEventConfig = () => eventRef.set({
    ...eventConfig,
    updatedAt: serverTimestamp(),
  }, { merge: true });

  firebaseServices.upsertGuest = (guest) => {
    if (!guest || !guest.id) return Promise.resolve(null);

    return firebaseServices.guestsRef.doc(String(guest.id)).set({
      id: String(guest.id),
      name: guest.name,
      passes: Number(guest.passes || 1),
      updatedAt: serverTimestamp(),
    }, { merge: true });
  };

  firebaseServices.saveRsvp = (state) => {
    if (!state || !state.guestId) return Promise.resolve(null);

    return firebaseServices.rsvpsRef.doc(String(state.guestId)).set({
      ...state,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  };

  firebaseServices.saveWish = (wish) => firebaseServices.wishesRef.add({
    ...wish,
    createdAt: serverTimestamp(),
  });

  firebaseServices.getGuests = () => firebaseServices.guestsRef.get()
    .then((snapshot) => snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

  firebaseServices.getRsvps = () => firebaseServices.rsvpsRef.get()
    .then((snapshot) => snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

  firebaseServices.getWishes = () => firebaseServices.wishesRef
    .orderBy("createdAt", "desc")
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

  firebaseServices.listenWishes = (callback) => firebaseServices.wishesRef
    .orderBy("createdAt", "desc")
    .limit(20)
    .onSnapshot((snapshot) => {
      callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

  firebaseServices.upsertEventConfig().catch(console.error);
}

window.eventFirebase = firebaseServices;
