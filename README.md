# ExpenseRegister | Personal Budget Manager - Frontend

---

## 🧩 Project Overview

This application performs CRUD operations on the browser's Web Storage, allowing users to register and query personal expenses organized by date, category, and description.

## 🏗 Architecture

The project follows a component-based architecture with Angular 21 standalone components:

- **Models** — TypeScript interfaces for data structures (`expense.model.ts`)
- **Services** — Business logic and localStorage persistence with signals (`expense.service.ts`)
- **Components** — Standalone UI components for registration and querying
- **Routing** — Angular Router with two main routes (`/register`, `/query`)

## 🛠 Technologies Used

The project incorporates a modern stack for front-end development:

[![Skills](https://skillicons.dev/icons?i=ts,angular,html,css,bootstrap,git,github,md&theme=light)](https://skillicons.dev)

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- Angular CLI 21

### Installation

```bash
npm install
```

### Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload on source changes.

### Build

```bash
ng build
```

Build artifacts are stored in the `dist/` directory.
