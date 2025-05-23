# Eujim Graduate Engagement Platform Frontend

A modern, responsive, and accessible web application for the Eujim Graduate Engagement Platform, built with React, TypeScript, Vite, Tailwind CSS v4, and Lucide Icons. This platform connects graduates, employers, and administrators, providing dashboards, job search, profile management, and more.

## Features
- **Role-based Dashboards:** Separate layouts and navigation for graduates, employers, and admins.
- **Responsive & Accessible UI:** Built with Tailwind CSS v4 and a unified design system for a seamless experience on all devices.
- **Modern Tooling:** Uses Vite for fast development, TypeScript for type safety, and ESLint for code quality.
- **Component Library:** Reusable components (Card, Button, Header, etc.) for consistent UI/UX.
- **Mock Data & Placeholders:** Easily extendable with real backend integration.
- **Admin Tools:** Manage employers, graduates, analytics, and settings (with extensible placeholders).

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
npm install
# or
yarn install
```

### Development
```bash
npm run dev
# or
yarn dev
```
Visit [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production
```bash
npm run build
# or
yarn build
```

### Linting
```bash
npm run lint
# or
yarn lint
```

## Project Structure
```
src/
  components/      # Reusable UI components
  layouts/         # Role-based layout wrappers
  pages/           # Page components (admin, employer, graduate, auth, common)
  routes/          # Routing logic
  services/        # API service modules
  types/           # TypeScript type definitions
  utils/           # Utility functions
  context/         # React context providers
  hooks/           # Custom React hooks
  index.css        # Tailwind and global styles
```

## Design System
- **Colors:** Defined in `index.css` using Tailwind and custom CSS variables.
- **Typography & Spacing:** Consistent via Tailwind utility classes.
- **Icons:** [Lucide Icons](https://lucide.dev/icons/) for a modern look.

## ESLint & Code Quality
- ESLint is configured for React, TypeScript, and React Hooks best practices.
- See `eslint.config.js` for details and recommended extensions.

## Customization & Extensibility
- Placeholder pages and mock data are provided for rapid prototyping.
- Easily connect to real APIs by updating service modules in `src/services/`.
- Extend the design system by adding new components to `src/components/common/`.

## Contributing
Pull requests and issues are welcome! Please follow the existing code style and conventions.

## License
This project is for educational and demonstration purposes. Contact the project owner for licensing details.

---

**Eujim Graduate Engagement Platform** — Empowering graduates, connecting employers, enabling success.
