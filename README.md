# ⚡ Vite + React Chrome Extension Template

A modern, highly-opinionated template for building Chrome Extensions (Manifest V3) using React. It provides advanced tooling, file-based routing, real-time local databases, and a strictly typed messaging system to speed up your extension development workflow.

## ✨ Features

- **React 19 & Vite**: Ultra-fast development server (HMR) and optimized production builds using the `vite-plugin-web-extension`.
- **Manifest V3 Ready**: Fully compatible with the latest Chrome extension APIs and strict security policies.
- **TanStack Router**: Type-safe, file-based routing configured seamlessly for extension interfaces like Popups, Options pages, and Side Panels.
- **Local-First Database (RxDB + TanStack DB)**: Real-time, reactive local database using IndexedDB (via Dexie). State magically syncs across different extension contexts (e.g., Background Scripts and Popups) out of the box using `multiInstance: true`.
- **Strictly Typed Chrome Messaging**: Say goodbye to `any` payloads. Features a custom wrapper (`chromeService`) around `chrome.runtime.sendMessage` and `chrome.runtime.onMessage` to ensure complete type safety and intellisense during cross-script communication.
- **Tailwind CSS v4 & Shadcn UI**: Ready-to-use, highly customizable, and accessible UI components with modern styling utility classes.
- **Development Tooling**: Pre-configured with ESLint, Prettier, Husky (Git hooks), and `standard-version` for automated semantic versioning.

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- `npm`, `yarn`, or `pnpm`

### Installation

Clone the repository and install the dependencies:
```bash
npm install
```

### Development

To start the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
*Tip: Load your specific extension dev-folder into Chrome via `chrome://extensions` using "Load unpacked" while running the dev server.*

### Building for Production

To build the extension for the Chrome Web Store (this compiles TypeScript, generates TanStack routes, and creates the optimized production bundle):
```bash
npm run build
```
The final compiled extension will be output to the `dist` folder. 

## 📁 Project Structure

```text
src/
├── db/                 # RxDB instance, schemas, and TanStack DB React hooks
├── extension-core/     # Background Service Workers and Content Scripts
├── routes/             # TanStack Router file-based pages (Popup, Options, UI)
└── shared/             # Reusable UI components (Shadcn), hooks, and utilities
    └── services/       # Typed Chrome service wrappers (chromeService)
```

## 🛠️ Technologies
- **Bundler**: [Vite](https://vitejs.dev/)
- **Framework**: [React 19](https://react.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Database**: [RxDB](https://rxdb.info/) / [TanStack DB](https://tanstack.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) / [Shadcn UI](https://ui.shadcn.com/)
- **API**: Chrome Manifest V3

## 📝 Available Scripts
- `npm run dev`: Start development server.
- `npm run build`: Build production assets.
- `npm run generate-routes`: Manually regenerate TanStack routing tree.
- `npm run lint`: Run ESLint.
- `npm run release`: Update changelog and tag a new release using `standard-version`.
