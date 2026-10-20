# Task WorkFlow

A modern task and workflow management web app built with React 19, TypeScript, and Supabase.

🔗 **Live demo:** [task-work-flow.vercel.app](https://task-work-flow.vercel.app)

---

## ✨ Features

- 🔐 Full authentication flow: sign up, log in, forgot password (with OTP), and user profile
- ✅ Create, organize, and track tasks through your workflow
- 🌍 Multi-language support (i18n)
- 🌗 Theme switching via a theme context
- 🔔 Global toast notifications
- 📝 Validated forms with clear error feedback
- 🎞️ Smooth animations and micro-interactions
- 🧱 Clean architecture with a feature-based folder structure

> Edit this list to match exactly what your app does.

## 🛠️ Tech Stack

| Category | Tools |
| --- | --- |
| Framework | React 19, TypeScript, Vite |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| Data fetching | TanStack Query, Axios |
| Backend / Auth | Supabase |
| Forms & validation | React Hook Form, Zod |
| Animation | Framer Motion, GSAP, Lottie |
| i18n | i18next, react-i18next |
| OTP input | input-otp, react-otp-input |
| Icons | Lucide React, React Icons |
| Tooling | ESLint, React Compiler (Babel) |

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm
- A [Supabase](https://supabase.com) project

### Installation

```bash
# Clone the repository
git clone https://github.com/Aya921/Task_WorkFlow.git
cd Task_WorkFlow

# Install dependencies
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Never commit your `.env` file. It is already covered by `.gitignore`.

### Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

The project follows a **feature-based clean architecture**: each feature is split into API, data, domain, and presentation layers.

```
src/
├── animations/          # Lottie / animation assets
├── assets/              # Images, icons, static files
├── constants/           # App-wide constants
├── context/             # React contexts
│   ├── auth_context/    #   Auth context + provider
│   ├── theme_context/   #   Light / dark theme
│   └── toast_context/   #   Toast notifications
├── core/
│   ├── api/             #   Axios instance, endpoints, API types
│   └── supabase/        #   Supabase client setup
├── di/                  # Dependency injection
├── features/
│   ├── auth/
│   │   ├── api/         #   client, data_source, dtos, mappers
│   │   ├── data/        #   dataSources, repo implementations
│   │   ├── domain/      #   entity, repo contracts, usecases
│   │   └── presentation/#   login, signup, forget_password, profile, utils
│   └── home/
├── hooks/               # use_auth, use_theme, use_toast
├── i18n/                # Translations and i18n config
└── layout/              # Shared layout components
```

### Architecture overview

| Layer | Responsibility |
| --- | --- |
| **api** | Talks to the backend: clients, data sources, DTOs, and mappers that convert DTOs to domain entities |
| **data** | Repository implementations that use the API layer |
| **domain** | Pure business logic: entities, repository interfaces, and use cases |
| **presentation** | UI: pages, components, and helpers for each screen |

Data flows from **presentation → usecase → repo → data source → API**, and back through mappers into entities.

## 🌐 Deployment

The app is deployed on [Vercel](https://vercel.com). To deploy your own copy:

1. Push the repo to GitHub
2. Import it in Vercel
3. Add the environment variables above
4. Deploy

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

## 👩‍💻 Author

**Aya** — [@Aya921](https://github.com/Aya921)