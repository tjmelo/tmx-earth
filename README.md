<div align="center">

# 🌍 TMX Earth

### Explore comprehensive data about any country in the world in a fast, accessible SPA built with specification- and AI-driven engineering.

[![Release](https://img.shields.io/github/release-date/tjmelo/tmx-earth?label=Release&color=brightgreen)](https://github.com/tjmelo/tmx-earth/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/State-Redux%20Toolkit-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](#docker)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

**[🔗 View live demo](https://tjmelo.github.io/tmx-earth/)** · **[🐞 Report a bug](https://github.com/tjmelo/tmx-earth/issues)** · **[📖 Full documentation](DOCS.md)**

</div>

---

<a id="table-of-contents"></a>
## 📌 Table of Contents

- [🔭 Overview](#overview)
- [🖼️ Demo](#demo)
- [✨ Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [🤖 AI-Driven Engineering — SDD & AIDD](#sdd-aidd)
- [🏗️ Architecture & Project Structure](#architecture)
- [🚀 Getting Started](#getting-started)
- [🐳 Docker](#docker)
- [📜 Available Scripts](#scripts)
- [🧪 Testing & Quality](#testing)
- [📦 Build & Deploy](#build-deploy)
- [📖 Documentation](#documentation)
- [🗺️ Roadmap](#roadmap)
- [🤝 Contributing](#contributing)
- [📄 License](#license)
- [🙏 Acknowledgments](#acknowledgments)
- [📊 Project Info](#project-info)

---

<a id="overview"></a>
## 🔭 Overview

**TMX Earth** is a Single Page Application that lets you search, filter, and view detailed information — population, area, languages, currencies, time zones, flags, and more — about any country in the world.

The project started as a case study built on the **REST Countries API v3.1**, but it evolved into a showcase of **integration resilience**: when the primary data source became unstable, the fetching flow was migrated to the `countries.dev` endpoint, with a normalization layer that handles incomplete payloads and explicit loading/error states — keeping the browsing experience stable even when the external provider fails.

Beyond being a data-lookup app, this repository is a showcase of **how a modern front-end project can be driven by Specification-Driven Development (SDD) and supported by AI agents (AIDD)** — see the dedicated section below.

**[⬆ back to top](#table-of-contents)**

---

<a id="demo"></a>
## 🖼️ Demo

👉 **[Check out the live preview on GitHub Pages](https://tjmelo.github.io/tmx-earth/)**

<div align="center">
<img src="./public/select-country1.png" alt="Country list with search and filter" width="45%" />
<img src="./public/select-country2.png" alt="Detail screen for a selected country" width="45%" />
</div>

**[⬆ back to top](#table-of-contents)**

---

<a id="features"></a>
## ✨ Features

| | Feature | What was built |
|---|---|---|
| 🔍 | **Search & Filter** | Instantly find any country in the full list |
| 📊 | **Rich country data** | Population, area, languages, currencies, time zones, flags, and continents |
| 🎨 | **Responsive design** | Layout adapted for desktop, tablet, and mobile |
| ⚡ | **Performance** | Optimized build with Webpack 5 and Core Web Vitals monitoring |
| 🧪 | **Test coverage** | Jest + React Testing Library suite, coverage enabled by default |
| 📡 | **Data resilience** | Migration to the `countries.dev` endpoint, normalization of incomplete payloads, and clear loading/error feedback |
| 🌐 | **Continuous deployment** | Automated publishing to GitHub Pages via `gh-pages` |

**[⬆ back to top](#table-of-contents)**

---

<a id="tech-stack"></a>
## 🛠️ Tech Stack

The actual stack, pulled directly from the project's `package.json`:

| Layer | Technology | Role in the project |
|---|---|---|
| **UI** | React 18.3 + React DOM | Core component library |
| **Language** | TypeScript 5.4 (`strict` mode enforced via `overrides`) | Static typing across the entire codebase |
| **Global state** | Redux Toolkit 2 + React Redux 9 | Application state management (`country` feature) |
| **Remote data** | React Query (TanStack Query v3) + Axios | Fetching, caching, and revalidation of country data |
| **Styling** | SCSS/Sass, `@emotion/css`, Bootstrap 5 | Theme, design tokens, and responsive grid |
| **Style quality** | Stylelint (`stylelint-config-standard`) | SCSS linting |
| **Build** | Webpack 5 (`webpack-cli`, `webpack-dev-server`, `webpack-merge`, `html-webpack-plugin`) | Configuration split across `config/webpack.common|dev|prod.ts` |
| **Testing** | Jest (via `react-scripts`) + React Testing Library + `jest-dom` | Unit and component tests, coverage by default |
| **Code linting** | ESLint (`react-app` / `react-app/jest`) | Code standards |
| **Performance** | `web-vitals` | Real in-browser performance metrics |
| **Deploy** | `gh-pages` + `serve` | GitHub Pages publishing and local build preview |
| **Containers** | Docker + Docker Compose | Isolated development and runtime environments |

> 💡 The current visual theme is a custom layer inspired by Material Design (SCSS + `@emotion/css` + Bootstrap). A migration to the **official Material Design 3 library** is already specified — see the concrete example in the SDD section right below.

**[⬆ back to top](#table-of-contents)**

---

<a id="sdd-aidd"></a>
## 🤖 AI-Driven Engineering — SDD & AIDD

This is what sets TMX Earth apart: the project isn't just *coded with the help of AI* — it's **structured** for it, combining two complementary practices that are becoming industry standard for teams that work with AI agents on a daily basis.

### 🧭 SDD — Specification-Driven Development

The repository follows the **Spec Kit** model (evidenced by the `.specify/` folder), where no meaningful feature ships without first going through a formal flow:

```
Constitution  →  Specification  →  Plan  →  Tasks  →  Implementation  →  Validation
 (.specify)        (spec.md)      (plan.md)  (tasks.md)     (AI + dev)    (quickstart.md)
```

What's concretely in place in the project:

- **`.specify/memory/constitution.md`** — an engineering constitution laying out non-negotiable principles for any contribution, human or AI-generated: consistent React architecture, strict typing, scalable component organization, UX/accessibility consistency, and mandatory automated tests before merging.
- **`specs/<NNN-feature-name>/`** — every meaningful feature gets its own folder with `spec.md` (user stories, acceptance criteria, and a clarifications log), `plan.md`, and `tasks.md`.
- **A real, in-progress example — `specs/003-material-design-m3`**: a spec currently in *Draft* status that defines the adoption of the official **Material Design 3** library as the single source of visual truth, replacing the custom theme layer. It ships with a `quickstart.md` manual validation checklist — app smoke test, light/dark theme toggle and persistence, keyboard navigation, color contrast, and production build verification — that must pass before merging.

### ⚡ AIDD — AI-Driven Design & Development

While SDD guarantees the *what* and the *why*, AIDD speeds up the *how*:

- **`.cursor/skills/`** — reusable skills packaged for AI agents (Cursor), standardizing how AI should prototype, review, and generate code within the project's conventions.
- **`docs/.instructions.md`** — an instructions file dedicated to AI agents, referenced in the documentation hub as the entry point for any assistant (Copilot, Cursor, Claude Code, etc.) to understand the project's context before generating code.
- **Practical use** — rapid prototyping of UI ideas, theme token suggestions, support in accessibility reviews, and drafting documentation/changelogs, always with **mandatory human review** before any output is merged into the code.

> In practice: AI proposes and accelerates; the project's specification and constitution define the boundaries; human review decides what lands on `main`.

**[⬆ back to top](#table-of-contents)**

---

<a id="architecture"></a>
## 🏗️ Architecture & Project Structure

```
tmx-earth/
├── .specify/                 # Constitution, templates, and the SDD flow engine (Spec Kit)
├── .cursor/skills/           # Reusable AI skills (AIDD)
├── .github/                  # Repository configuration and automation
├── specs/                    # Per-feature specifications (spec.md, plan.md, tasks.md)
├── docs/                     # Strategic documentation (architecture, guidelines, AI agent guide)
├── config/                   # Webpack configuration (common/dev/prod)
├── public/                   # Static assets
├── src/
│   ├── components/           # React components
│   │   ├── Countries/        # Country display
│   │   ├── Load/              # Loading states
│   │   ├── Mount/             # List mounting logic
│   │   ├── Skeleton/          # Skeleton loaders
│   │   └── ListCountries.tsx  # Main list component
│   ├── feature/country/       # Redux slice for the "country" domain
│   ├── service/request.ts     # HTTP client (Axios)
│   ├── store/                 # Redux store configuration
│   ├── styles/                # Global theme, tokens, and SCSS
│   ├── utils/                 # Utility functions
│   ├── interfaces/            # TypeScript types
│   ├── constants/             # Application constants
│   └── App.tsx                # Root component
├── build/                    # Production build output
├── Dockerfile / compose.yml  # Containerization
├── DOCS.md                   # Documentation hub
└── package.json
```

**[⬆ back to top](#table-of-contents)**

---

<a id="getting-started"></a>
## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 LTS or higher (recommended for the current toolchain)
- **npm** or **yarn**
- **Git**

### 1️⃣ Clone the repository

```bash
git clone https://github.com/tjmelo/tmx-earth.git
cd tmx-earth
```

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Start the development server

```bash
npm start
```

The app opens automatically at `http://localhost:8080`.

**[⬆ back to top](#table-of-contents)**

---

<a id="docker"></a>
## 🐳 Docker

### Option 1 — Build locally with Docker Compose

```bash
git clone https://github.com/tjmelo/tmx-earth.git
cd tmx-earth
docker-compose up --build
```

### Option 2 — Use the published Docker Hub image

```bash
docker pull tjmelo/tmx-earth:latest
docker run -p 8080:8080 tjmelo/tmx-earth:latest
```

Or a specific version:

```bash
docker pull tjmelo/tmx-earth:1.3.0
docker run -p 8080:8080 tjmelo/tmx-earth:1.3.0
```

The app will be available at `http://localhost:8080`.

**[⬆ back to top](#table-of-contents)**

---

<a id="scripts"></a>
## 📜 Available Scripts

| Script | Command | What it does |
|---|---|---|
| Development | `npm start` | Starts the dev server with hot reload (`webpack.dev.ts`) |
| Tests | `npm test` | Runs the Jest suite with coverage enabled |
| Style linting | `npm run stylelint` | Validates `.scss` files |
| Build | `npm run build` | Generates the production build (`webpack.prod.ts`) |
| Build preview | `npm run serve` | Serves the `build/` folder locally |
| Deploy | `npm run deploy` | Builds (`predeploy`) and publishes to GitHub Pages via `gh-pages` |

**[⬆ back to top](#table-of-contents)**

---

<a id="testing"></a>
## 🧪 Testing & Quality

```bash
# Runs the full suite with coverage (already enabled by default in the script)
npm test
```

- **Framework:** Jest, run via `react-scripts test`, with `--collect-coverage` already baked into the script.
- **Component tests:** React Testing Library + `@testing-library/jest-dom`.
- **Key test files:**
  - `src/components/__tests__/` — component tests
  - `src/service/request.spec.ts` — API service tests
- **Code linting:** ESLint (`react-app`, `react-app/jest`)
- **Style linting:** Stylelint with `stylelint-config-standard`

**[⬆ back to top](#table-of-contents)**

---

<a id="build-deploy"></a>
## 📦 Build & Deploy

```bash
# Production build
npm run build

# Test the build locally
npm run serve
# → http://localhost:3000

# Publish to GitHub Pages
npm run deploy
```

The build is generated by Webpack 5 into the `build/` folder and published to `https://tjmelo.github.io/tmx-earth/` via the `gh-pages` package, triggered by the `deploy` script (which runs `predeploy` → `build` automatically before publishing).

**[⬆ back to top](#table-of-contents)**

---

<a id="documentation"></a>
## 📖 Documentation

The project maintains a dedicated documentation hub, starting at [`DOCS.md`](DOCS.md):

| Document | Purpose |
|---|---|
| **[docs/INDEX.md](docs/INDEX.md)** | Navigation hub — start here |
| **[docs/PROJECT_ANALYSIS.md](docs/PROJECT_ANALYSIS.md)** | Architecture and design patterns |
| **[docs/.instructions.md](docs/.instructions.md)** | Context guide for AI agents |
| **[docs/DEVELOPMENT_GUIDELINES.md](docs/DEVELOPMENT_GUIDELINES.md)** | Coding standards and best practices |
| **[docs/ARCHITECTURE_PATTERNS.md](docs/ARCHITECTURE_PATTERNS.md)** | Features and technical roadmap |
| **[docs/QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md)** | Commands and file locations |
| **[docs/DOCUMENTATION_HUB.md](docs/DOCUMENTATION_HUB.md)** | Complete documentation index |
| **[specs/](specs/)** | Source of truth for the SDD flow — specs, plans, and tasks per feature |

**[⬆ back to top](#table-of-contents)**

---

<a id="roadmap"></a>
## 🗺️ Roadmap

- [ ] **E2E tests** (Cypress / Playwright) covering search, selection, and the detail screen
- [ ] **Accessibility audit** with automated checks (axe) in CI + manual WCAG review
- [ ] **Internationalization (i18n)** — extract UI strings and support multiple locales
- [ ] **PWA & offline cache** for offline country browsing
- [ ] **Visual regression tests** to catch unintended style regressions
- [ ] **Centralized design tokens** — evolve into a standalone design system package
- [ ] **Performance budgets** with Lighthouse/CI monitoring
- [ ] **Full TypeScript `strict` mode** — close remaining type gaps
- [ ] **CI pipeline** parallelizing lint/test/build and publishing coverage reports
- [ ] **Storybook** for an isolated component catalog
- [ ] **API resilience** — retry/backoff and local fallback layers
- [ ] **Adopt the official Material Design 3 library** — already specified in [`specs/003-material-design-m3`](specs/003-material-design-m3)

**[⬆ back to top](#table-of-contents)**

---

<a id="contributing"></a>
## 🤝 Contributing

Contributions are welcome! The recommended flow follows both market best practices and the project's SDD process:

1. **For larger features**, start by creating or updating the specification under `specs/` before writing code — that's how the project documents intent and acceptance criteria.
2. **Create a branch** off `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Follow Conventional Commits**:

   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug"
   git commit -m "docs: update documentation"
   ```

4. **Code standards:**
   - Use TypeScript for all new code
   - Follow the existing style and the guidelines in `docs/DEVELOPMENT_GUIDELINES.md`
   - Write tests for new features
   - Update relevant documentation
   - Make sure all tests pass before opening a PR

5. **Push your branch and open a Pull Request:**

   ```bash
   git push origin feature/your-feature-name
   ```

**[⬆ back to top](#table-of-contents)**

---

<a id="license"></a>
## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

**[⬆ back to top](#table-of-contents)**

---

<a id="acknowledgments"></a>
## 🙏 Acknowledgments

- 🔁 **`countries.dev`** — data endpoint adopted during the resilience migration
- ⚛️ **[React](https://react.dev/)** — UI framework
- 🧭 **[Spec Kit](https://github.com/github/spec-kit)** — the SDD methodology behind the `.specify/` flow

**[⬆ back to top](#table-of-contents)**

---

<a id="project-info"></a>
## 📊 Project Info

| Info | Detail |
|---|---|
| **Version** | 2.0.0 |
| **Type** | React SPA |
| **Data API** | REST Countries v3.1, with a resilience migration to `countries.dev` |
| **Hosting** | GitHub Pages |
| **Publishing** | `gh-pages` (CLI), triggered by `npm run deploy` |
| **Methodology** | SDD (Spec Kit) + AIDD |

---

<div align="center">

**🔥 Happy coding! Feel free to contribute and make this project even better.**

[⬆ Back to top](#-tmx-earth)

</div>
