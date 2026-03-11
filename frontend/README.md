# NAVIT Logistics Chat Frontend

React + Vite + Tailwind CSS chat UI for the NAVIT Logistics Agent.

## Tech Stack

- **React 18** – UI components
- **TypeScript** – type safety
- **Vite** – fast dev server and build
- **Tailwind CSS** – utility-first styling

## Project Structure

```
frontend/
├── src/
│   ├── api/           # API client (chatApi.ts)
│   ├── components/    # React components
│   │   ├── ChatHeader.tsx
│   │   ├── ChatInput.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── MessageList.tsx
│   │   └── StatusBar.tsx
│   ├── App.tsx        # Main app + state
│   ├── main.tsx
│   ├── index.css      # Tailwind imports
│   └── types.ts
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start Vite dev server (port 5173) |
| `npm run build` | Build for production → `dist/` |
| `npm run preview` | Preview production build |

## Making Changes

- **Layout / styling**: Edit `App.tsx`, `tailwind.config.js`, or component files
- **Colors / theme**: `tailwind.config.js` → `theme.extend.colors.navit`
- **API**: `src/api/chatApi.ts` – uses `/chat` (proxied to Flask → FastAPI)
- **New components**: Add under `src/components/` and import in `App.tsx`
