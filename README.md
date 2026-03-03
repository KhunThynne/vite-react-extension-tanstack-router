# Vite React Web Extension Boilerplate

This project is a modern boilerplate for building **Browser Extensions (Manifest V3)** using **Vite**, **React**, **Tailwind CSS v4**, and **Shadcn UI**. It comes pre-configured with essential tools for rapid extension development, routing, and form management.

## 🚀 Tech Stack & Features

- **[Vite](https://vitejs.dev/) & [vite-plugin-web-extension](https://vite-plugin-web-extension.aklinker1.io/)**: Blazing fast frontend tooling tailored for browser extension development with hot-module reloading (HMR).
- **[React 19](https://react.dev/)**: The latest version of the popular UI library.
- **[Chrome Extensions API (Manifest V3)](https://developer.chrome.com/docs/extensions/mv3/intro/)**: Up-to-date extension architecture.
- **[Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)**: Beautifully designed, accessible components.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI styling.
- **[TanStack Router](https://tanstack.com/router)**: Type-safe, file-based routing for React single-page applications (useful for Extension popups, options pages, or full-page overrides).
- **[TanStack Form](https://tanstack.com/form) & [Zod](https://zod.dev/)**: Powerful type-safe form state management and schema validation.
- **[i18next](https://www.i18next.com/)**: Internationalization framework setup out-of-the-box.

## 📂 Project Structure

```text
├── manifest.config.ts        # Manifest V3 configuration file
├── src/
│   ├── extension-core/       # Chrome Extension specific entry points
│   │   ├── background/       # Background service workers
│   │   └── content_scripts/  # Scripts injected into web pages
│   ├── routes/               # TanStack Router file-based route definitions
│   ├── shared/               # Shared code and components
│   │   ├── components/       # UI Components (Shadcn UI & custom)
│   │   ├── contexts/         # React Context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── libs/             # Utility libraries and helpers
│   │   ├── services/         # API or background communication services
│   │   └── types/            # TypeScript type definitions
│   ├── assets/               # Static assets (images, icons)
│   ├── main.tsx              # Main React entry point
│   └── provider.tsx          # Global React providers
├── vite.config.ts            # Vite configuration and plugins
└── package.json              # Project dependencies and scripts
```

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## 👨‍💻 Development

Start the development server with Hot Module Replacement (HMR) for your extension:

```bash
npm run dev
```

This will run Vite in watch mode. 

**To load the extension into your browser during development:**
1. Open your Chromium-based browser (Chrome, Edge, Brave, etc.).
2. Navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the `dist` folder generated in your project root.
*(Note: `vite-plugin-web-extension` might also automatically open a fresh browser instance loaded with your extension depending on your config!).*

## 🏗️ Building for Production

To create an optimized production build of your extension, run:

```bash
npm run build
```

This will run type checking, generate TanStack routes, and bundle the final extension into the `dist` directory. You can then zip the `dist` folder to publish to the Chrome Web Store.

## 🚦 Other Available Commands

- `npm run generate-routes`: Manually trigger TanStack router generation.
- `npm run watch-routes`: Watch for route changes and regenerate TanStack router files.
- `npm run lint`: Run ESLint across the project.
- `npm run release`: Generate a new release version tag using `standard-version`.

## 🎨 UI Components

This project integrates [Shadcn UI](https://ui.shadcn.com/). 
Installed components are located in `src/shared/components/ui`. You can add more components using the Shadcn CLI as per their official documentation.

## 📄 License

This project is licensed under the MIT License.
