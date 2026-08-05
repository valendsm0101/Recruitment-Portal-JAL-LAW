# JAL LAW — Portal de Reclutamiento

Guía paso a paso para publicar este portal como un sitio web real, con URL
pública y (opcionalmente) un dominio propio como `careers.jalgroup.law`.

---

## 0. Antes de empezar

Necesitas:

- **Node.js** instalado en tu computadora (versión 18 o superior).
  Descárgalo de [nodejs.org](https://nodejs.org) si no lo tienes.
- Una cuenta de **GitHub** (gratis) — [github.com](https://github.com)
- Una cuenta de **Vercel** (gratis) — [vercel.com](https://vercel.com)
  (puedes crearla usando tu cuenta de GitHub, es un clic)

No necesitas saber programar para seguir estos pasos, solo copiar y pegar
comandos en la Terminal (Mac) o en PowerShell/CMD (Windows).

---

## 1. Probar el sitio en tu computadora (opcional pero recomendado)

1. Descomprime esta carpeta (`jal-law-portal`) en tu computadora.
2. Abre una Terminal dentro de esa carpeta.
3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Levanta el sitio en modo local:

   ```bash
   npm run dev
   ```

5. Abre en tu navegador la URL que aparece (normalmente
   `http://localhost:5173`). Deberías ver el portal funcionando igual que en
   el Artifact de Claude.

Presiona `Ctrl + C` en la Terminal para detenerlo cuando termines de probar.

---

## 2. Conectar la Hoja de Google (antes de publicar)

1. Sigue las instrucciones dentro de `src/App.jsx` (busca el comentario
   `GOOGLE SHEETS SYNC`) y del archivo `google-apps-script-sync.gs` que te
   compartí antes, para desplegar el Apps Script y obtener tu URL de Web
   App (`https://script.google.com/macros/s/.../exec`).
2. Abre `src/App.jsx`, busca esta línea cerca del principio:

   ```js
   const GOOGLE_SHEETS_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```

3. Reemplázala con tu URL real. Guarda el archivo.
4. Vuelve a correr `npm run dev` y llena el formulario de prueba — revisa
   que la fila aparezca en tu Google Sheet en segundos.

---

## 3. Subir el proyecto a GitHub

1. En GitHub, crea un repositorio nuevo (botón verde "New"). Puedes
   llamarlo `jal-law-recruitment-portal`. Déjalo en **Private** si prefieres
   que no sea público.
2. En la Terminal, dentro de la carpeta del proyecto:

   ```bash
   git init
   git add .
   git commit -m "Portal de reclutamiento JAL LAW"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/jal-law-recruitment-portal.git
   git push -u origin main
   ```

   (Reemplaza `TU-USUARIO` por tu usuario de GitHub — la URL exacta te la
   da GitHub al crear el repositorio, solo cópiala de ahí.)

---

## 4. Desplegar en Vercel

1. Entra a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
2. Haz clic en **"Add New..." → "Project"**.
3. Selecciona el repositorio `jal-law-recruitment-portal` que acabas de
   subir.
4. Vercel detecta automáticamente que es un proyecto **Vite** — no
   necesitas cambiar ninguna configuración. Haz clic en **"Deploy"**.
5. En 1-2 minutos tendrás una URL pública como:

   ```
   https://jal-law-recruitment-portal.vercel.app
   ```

   Esa URL ya es real y accesible por cualquier persona.

Cada vez que hagas cambios y los subas a GitHub (`git push`), Vercel
vuelve a publicar el sitio automáticamente.

---

## 5. Conectar tu propio dominio (ej. careers.jalgroup.law)

1. En el proyecto dentro de Vercel, ve a **Settings → Domains**.
2. Escribe el dominio o subdominio que quieras usar, por ejemplo
   `careers.jalgroup.law`, y haz clic en **Add**.
3. Vercel te mostrará un registro DNS que debes agregar (normalmente un
   **CNAME** apuntando a `cname.vercel-dns.com`).
4. Entra al panel de administración DNS de tu dominio `jalgroup.law`
   (donde lo hayan comprado/registrado) y agrega ese registro.
5. Espera unos minutos a que se propague (a veces hasta 24 horas) — Vercel
   te avisa en su panel cuando el dominio queda verificado y con HTTPS
   activo automáticamente.

---

## 6. Que Google lo indexe

1. Entra a [Google Search Console](https://search.google.com/search-console).
2. Agrega tu dominio (`careers.jalgroup.law` o el que hayas usado).
3. Verifica la propiedad (Google te da varias opciones: registro DNS, o
   subir un archivo HTML — Vercel permite ambas fácilmente).
4. Una vez verificado, usa **"Inspeccionar URL"** y pide indexación de tu
   página principal.
5. Esto no la posiciona instantáneamente en Google, pero asegura que el
   sitio quede registrado y empiece a aparecer en resultados de búsqueda
   en los días/semanas siguientes.

---

## Resumen del flujo completo

```
Tu código (App.jsx)  →  GitHub (repositorio)  →  Vercel (hosting + URL pública)
                                                        │
                                                        └─► Dominio propio (opcional)
                                                        └─► Google Search Console (indexación)

Candidato llena el formulario  →  Google Apps Script  →  Tu Google Sheet
```

Si en algún paso te trabas, dime exactamente en cuál y qué mensaje de
error ves, y seguimos desde ahí.
