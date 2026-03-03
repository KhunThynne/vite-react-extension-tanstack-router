# Vite + React + Shadcn UI Template

This project is a modern boilerplate for building web applications using **Vite**, **React**, and **Shadcn UI**. It comes pre-configured with essential tools for development, styling, routing, and form management.

## 🚀 Features

- **[Vite](https://vite.dev/)**: Blazing fast frontend tooling.
- **[React 19](https://react.dev/)**: The latest version of the popular UI library.
- **[Shadcn UI](https://ui.shadcn.com/)**: Beautifully designed components built with Radix UI and Tailwind CSS.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[TanStack Router](https://tanstack.com/router)**: Type-safe routing for React applications.
- **[TanStack Form](https://tanstack.com/form)**: Powerful and type-safe form state management.
- **[Zod](https://zod.dev/)**: TypeScript-first schema declaration and validation.
- **[i18next](https://www.i18next.com/)**: Internationalization framework.

## 🛠️ Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

## 🏗️ Building for Production

To create a production build, run:

```bash
npm run build
```

This will generate the optimized files in the `dist` directory.

## 📂 Project Structure

- `src/App.tsx`: The main entry component, showcasing Shadcn UI integration.
- `src/shared/components/ui`: directory containing your installed Shadcn UI components.
- `src/shared/libs`: Utility libraries and configurations.
- `vite.config.ts`: Vite configuration with path aliases (`@`, `@/shared/components`).

## 🎨 UI Components

This project uses [Shadcn UI](https://ui.shadcn.com/). To add more components, you can use the CLI or manually copy them into `src/shared/components/ui`.

## 📄 License

This project is licensed under the MIT License.
