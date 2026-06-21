# CM Agent

Agente de community manager con IA para LinkedIn: genera, itera y programa contenido para Detecta Security mediante un flujo conversacional de varias fases, con aprendizaje silencioso de preferencias editoriales.

## Cómo funciona

```
Analista (chat)
     │
     ▼
Claude (Anthropic, con Web Search nativo)
     │
     ├─► Fase 1: propuesta de temas (evergreen + actualidad con fecha verificada)
     ├─► Fase 2: ángulo sugerido (gancho, por qué ahora, emoción objetivo)
     ├─► Fase 3: 2 versiones A/B por formato (Copy, Copy + imagen, Carrusel, PDF, Video)
     └─► Fase 4: confirmación + ajustes iterativos
     │
     ▼
Panel editable (titulares, copy, hashtags) ──► Calendario / Borradores (localStorage)
```

Cada elección del analista (versión, formato, titular) se registra como memoria silenciosa que el agente usa en conversaciones futuras para acercarse al estilo preferido del equipo, sin que el analista tenga que configurar nada manualmente.

## Features

- *Flujo en 4 fases* — temas, ángulo, versiones A/B, confirmación e iteración
- *Feed de noticias en vivo* — RSS de medios de logística en México + búsqueda web, con caché diaria
- *Calendario de contenido* — borradores, programados y publicados, con sección de publicados en el sidebar
- *Memoria silenciosa* — aprende formato, versión y estilo de titular preferidos con el uso
- *Configuración editable* — contexto de marca, tono y temas prioritarios desde la propia app
- *Sesión persistente* — login con JWT de 30 días

## Setup

```bash
cp .env.example .env.local   # completa tus credenciales
npm install
npm run dev
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `ANTHROPIC_API_KEY` | API key de Anthropic |
| `APP_USERNAME` / `APP_PASSWORD` | Credenciales de acceso del analista |
| `JWT_SECRET` | Secreto para firmar la sesión (genera un string aleatorio largo) |
| `CRON_SECRET` | Protege el endpoint de refresco diario del feed de noticias |

## Tech stack

- **Next.js (App Router)** — frontend y API routes
- **Anthropic Claude (Sonnet 4.6)** — agente conversacional con Web Search nativo
- **RSS + web scraping** — feed de noticias de logística en México
- **Railway** — deploy + cron del feed de noticias
- **localStorage** — persistencia de chats, calendario, memoria y configuración (sin base de datos)
