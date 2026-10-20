# Task WorkFlow

A modern task and workflow management web app built with React 19, TypeScript, and Supabase.

🔗 **Live demo:** [task-work-flow.vercel.app](https://task-work-flow.vercel.app)

---

## ✨ Features

- 🔐 Authentication with email and OTP verification
- ✅ Create, organize, and track tasks through your workflow
- 🌍 Multi-language support (i18n)
- 📝 Validated forms with clear error feedback
- 🎞️ Smooth animations and micro-interactions
- 📱 Responsive design

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

```
Task_WorkFlow/
├── src/              # Application source code
├── index.html        # App entry HTML
├── vite.config.ts    # Vite configuration
├── eslint.config.js  # ESLint configuration
├── tsconfig*.json    # TypeScript configuration
└── package.json
```

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
