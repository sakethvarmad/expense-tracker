# 💰 Expense Tracker (MERN)

A full-stack web app to record, edit, filter and summarise personal expenses.

**Live app:** https://expense-tracker-app-pi-hazel.vercel.app
**API:** https://expense-tracker-api-sigma.vercel.app

## Problem statement
People lose track of daily spending. This app lets a user log expenses by category,
see the total and a per-category breakdown, and manage entries (create, view, update, delete).

## Tech stack
| Layer | Technology |
|---|---|
| Frontend | HTML, CSS (responsive, media queries), JavaScript, ReactJS (Vite) |
| Backend | NodeJS, ExpressJS (REST API) |
| Database | MongoDB Atlas via Mongoose |
| Hosting | Vercel (frontend + backend), GitHub |

## Features
- Full CRUD on expenses (MongoDB)
- Category filter and live summary with bar chart
- Validation on client and server
- Responsive layout (desktop + mobile)

## REST API
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/expenses` | List all (optional `?category=Food`) |
| GET | `/api/expenses/summary` | Total per category |
| GET | `/api/expenses/:id` | Get one |
| POST | `/api/expenses` | Create |
| PUT | `/api/expenses/:id` | Update |
| DELETE | `/api/expenses/:id` | Delete |

## Project structure
```
expense-tracker/
├── client/   # React app (Vite)
└── server/   # Express API + Mongoose model
```

## Run locally
1. Create a free MongoDB Atlas cluster and copy the connection string.
2. Backend:
   ```bash
   cd server
   cp .env.example .env     # put your MONGODB_URI in .env
   npm install
   npm run dev
   ```
3. Frontend (new terminal):
   ```bash
   cd client
   cp .env.example .env
   npm install
   npm run dev
   ```
4. Open http://localhost:5173

## Deployment (Vercel)
Deploy two projects from the same repo:
- **Backend:** Root Directory `server`, env var `MONGODB_URI`.
- **Frontend:** Root Directory `client`, env var `VITE_API_URL=https://<backend-url>/api`.

In MongoDB Atlas → Network Access, allow `0.0.0.0/0` so Vercel can connect.

## Author
D. Saketh Varma (2024015963)
