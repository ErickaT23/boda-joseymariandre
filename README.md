# boda-joseymariandre

## Firebase

La invitación está preparada para usar la sombrilla:

- `events/joseandres-mariandrea-2026`
- `events/joseandres-mariandrea-2026/guests`
- `events/joseandres-mariandrea-2026/rsvps`
- `events/joseandres-mariandrea-2026/wishes`

Para activar Firebase, pega la configuración web real en `firebase.js` dentro de `firebaseConfig`.

Después de publicar o abrir la invitación con Firebase activo, entra una vez a:

```text
index.html?seedGuests=1
```

Eso creará/actualizará el config del evento y los 92 invitados en Firestore.

El dashboard administrativo está en:

```text
admin.html
```
