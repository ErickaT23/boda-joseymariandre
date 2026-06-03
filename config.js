const config = {
    event: {
        defaultEventId: "joseandres-mariandrea-2026",
        eventIdParam: "eventId",
        legacyFallback: {
            read: false,
            write: false,
            subscribe: false
        }
    },

    admin: {
        adminKey: "twodesign123",
        keyParam: "key",
        legacyKeyParam: "admin"
    },

    seo: {
        titulo: "José Andrés & Mariandrea | Boda 2026",
        descripcion: "Boda de José Andrés Alvarizaes Morales y Mariandrea Muralles Zamora - 7 de noviembre de 2026",
        autor: "Two Design"
    },

    pareja: {
        nombres: "José Andrés & Mariandrea",
        fecha: "07-11-2026",
        fechaVisible: "07.11.2026"
    },

    musica: {
        titulo: "Nuestra Canción",
        archivo: "music.mp3"
    },

    evento: {
        ceremonia: {
            titulo: "Ceremonia",
            lugar: "Capilla Inmaculada Concepción",
            hora: "4:00 PM",
            direccion: "CAES KM 16",
            ubicacionUrl: "https://maps.app.goo.gl/7hsNg6XYGpHXbU599"
        },
        recepcion: {
            titulo: "Recepción",
            lugar: "Jardín El Cerro",
            hora: "6:00 PM",
            direccion: "Km. 22.4 carretera a Fraijanes, Fraijanes",
            ubicacionUrl: "https://maps.app.goo.gl/QNPAZHChxPJNHVjR8"
        }
    },

    textos: {
        mensajeInvitado: "Eres muy especial para nosotros",
        mensajePases: "Hemos reservado para ti {pases} lugares especiales"
    },

    footer: {
        hashtag: "#JoseAndresYMariandrea",
        instagramUrl: "https://www.instagram.com/thetwodesign",
        facebookUrl: "https://www.facebook.com/thetwodesign",
        marcaTexto: "Diseño",
        marcaNombre: "Two Design",
        marcaUrl: "https://twodesign.com"
    }
};

window.config = config;
