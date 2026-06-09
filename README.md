# Gatherly CRM

A full-stack CRM (Customer Relationship Management) system for tracking leads, managing your sales pipeline, and visualising performance analytics.

Built with **React + Vite** on the frontend and **Node.js + Express + MongoDB** on the backend.

---

## ✨ Features

| Area | What you get |
|---|---|
| **Authentication** | JWT-based login & registration, persistent sessions, protected routes |
| **Lead Management** | Create, view, edit, and delete leads; filter by status, source, and search by name/company |
| **Pipeline Statuses** | `New → Contacted → Qualified → Proposal Sent → Negotiation → Converted / Lost` |
| **Analytics** | Revenue charts, conversion funnel, lead source breakdown, monthly trend graphs |
| **Activity Log** | Audit trail of every lead creation and status change |
| **Responsive UI** | Works on desktop and mobile; collapsible sidebar on small screens |

---

## 🗂 Project Structure

```
FUTURE_FS_02/
├── backend/               # Express API (Node.js)
│   ├── src/
│   │   ├── modules/       # auth, leads, activities, analytics, users, public
│   │   ├── middleware/    # JWT protect, validation, error handler
│   │   ├── config/        # DB, env, logger
│   │   └── utils/         # ApiResponse, ApiError, async handler
│   ├── seed.js            # One-shot DB seeder (demo user + 22 leads)
│   └── .env               # Backend environment variables
└── frontend/              # React + Vite SPA
    ├── src/
    │   ├── pages/         # LoginPage, RegisterPage, DashboardPage, LeadsPage, AnalyticsPage, ActivityPage
    │   ├── components/    # Layout (Sidebar, Topbar), UI primitives, Charts
    │   ├── context/       # AuthContext (JWT state management)
    │   ├── services/      # Axios service wrappers per module
    │   └── lib/api.js     # Axios instance with request/response interceptors
    └── .env               # Frontend environment variable (VITE_API_URL)
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | v18 or later |
| npm | v9 or later |
| MongoDB | Atlas account **or** a local MongoDB instance |

---

### 1 — Clone the repository

```bash
git clone https://github.com/aadarshantony/FUTURE_FS_02.git
cd FUTURE_FS_02
```

---

### 2 — Backend setup

```bash
cd backend
npm install
```

Create (or edit) `backend/.env`:

```env
NODE_ENV=development
PORT=5000

# Replace with your own MongoDB Atlas URI or local connection string
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/GatherlyCRM?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173
```

Start the dev server:

```bash
npm run dev
# API is now running on http://localhost:5000
```

---

### 3 — Seed the database (optional but recommended)

This creates a **demo admin account** and inserts **22 sample leads** with realistic data so you can explore all features immediately.

```bash
cd backend
node seed.js
```

Demo credentials created by the seeder:

| Field | Value |
|---|---|
| Email | `demo@gatherly.io` |
| Password | `demo1234` |

---

### 4 — Frontend setup

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
# App is now running on http://localhost:5173
```

The Vite dev server proxies all `/api` requests to `http://localhost:5000` automatically — no extra configuration needed.

---

### 5 — Open in your browser

Navigate to **[http://localhost:5173](http://localhost:5173)**

- If you ran the seeder, log in with `demo@gatherly.io` / `demo1234`
- Or click **Register Now** to create your own account

---

## 🔑 API Reference

Base URL: `http://localhost:5000/api`

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/v1/auth/register` | ❌ | Register a new user |
| `POST` | `/v1/auth/login` | ❌ | Login — returns JWT |
| `GET` | `/v1/auth/me` | ✅ Bearer | Get current user |

### Leads

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/v1/leads` | ✅ | List all leads (supports `?status=`, `?source=`, `?search=`) |
| `POST` | `/v1/leads` | ✅ | Create a lead |
| `GET` | `/v1/leads/:id` | ✅ | Get a single lead |
| `PATCH` | `/v1/leads/:id` | ✅ | Update a lead |
| `DELETE` | `/v1/leads/:id` | ✅ | Delete a lead |

### Analytics

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/v1/analytics/overview` | ✅ | Summary stats (total leads, revenue, conversion rate) |
| `GET` | `/v1/analytics/pipeline` | ✅ | Lead counts per pipeline stage |
| `GET` | `/v1/analytics/monthly` | ✅ | Monthly leads + revenue for the past 6 months |
| `GET` | `/v1/analytics/sources` | ✅ | Lead breakdown by source |

### Activity

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/v1/activities` | ✅ | Paginated activity log |

### Health

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/health` | ❌ | Server health check |

All protected routes require the header:
```
Authorization: Bearer <token>
```

---

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js (ESM)
- **Framework**: Express v5
- **Database**: MongoDB via Mongoose
- **Auth**: JSON Web Tokens (`jsonwebtoken`) + password hashing (`bcryptjs`)
- **Security**: `helmet`, `cors`, `express-rate-limit`, `compression`
- **Validation**: Zod schemas
- **Logging**: Winston + Morgan

### Frontend
- **Framework**: React 18 + Vite 5
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios (with request/response interceptors)
- **Charts**: Recharts
- **Icons**: Phosphor Icons

---

## 🧪 Testing the App

### Register a new account
1. Go to `http://localhost:5173/register`
2. Fill in your name, email, and password
3. You'll be redirected to the Dashboard automatically

### Or use the demo account (after running the seeder)
```
Email:    demo@gatherly.io
Password: demo1234
```

### Explore the features
- **Dashboard** — Overview stats and pipeline charts
- **Leads** — Browse the 22 seeded leads; try the status/source filters
- **Analytics** — Revenue trend, funnel, and source charts
- **Activity** — Full audit trail of every action
- **Add a lead** — Click the `+ Add Lead` button on the Leads page

### Logout
Click the **Sign out** button at the bottom of the sidebar.

---

## 🐛 Common Issues

### `ECONNREFUSED` when starting the frontend
The backend is not running. Make sure you ran `npm run dev` inside the `backend/` directory first.

### `MongoNetworkError` on backend startup
Your `MONGO_URI` in `backend/.env` is incorrect or the IP is not whitelisted in MongoDB Atlas. Add `0.0.0.0/0` to the Atlas Network Access list for local development.

### Login always fails
Double-check that the `MONGO_URI` is set and the backend started successfully (you should see `Server running on port 5000` and `MongoDB connected` in the terminal).

### Blank dashboard after login
The seeder has not been run. Either run `node seed.js` from the `backend/` directory or create leads manually on the Leads page.

---

## 📄 License

MIT
