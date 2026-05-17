# DriveFleet — Premium Car Rental Platform

**Live Site:** [https://drivefleet.vercel.app](https://drivefleet.vercel.app)

DriveFleet is a full-stack car rental platform where users can explore available vehicles, view car details, make bookings, and manage their listings — all with a modern, responsive interface.

---

## Features

- **Browse & Search** — Explore the full fleet with search by car name and filter by car type (SUV, Sedan, Hatchback, Luxury, etc.)
- **Secure Authentication** — Email/password and Google login powered by Firebase Auth, with JWT tokens stored in HTTPOnly cookies for maximum security
- **Instant Booking** — Book any available car with a single click, add special notes, and choose whether a driver is needed
- **Car Management** — Authenticated users can add, update, and delete their own car listings with full CRUD operations
- **My Bookings Dashboard** — Track all bookings in one place, with booking date, total price, and car details
- **Dark / Light Theme** — Toggle between dark and light mode with your preference persisted across sessions
- **Smooth Animations** — Framer Motion page transitions and micro-interactions throughout the UI

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS |
| Routing | React Router v6 |
| Auth | Firebase Authentication |
| Animations | Framer Motion |
| HTTP | Axios |
| Notifications | React Hot Toast |
| Backend | Node.js, Express |
| Database | MongoDB |
| Auth Tokens | JWT (HTTPOnly Cookies) |
| Deployment | Vercel (Client), Render (Server) |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project
- A running instance of [drivefleet-server](https://github.com/your-username/drivefleet-server)

### Installation

```bash
git clone https://github.com/your-username/drivefleet-client.git
cd drivefleet-client
npm install
```

### Environment Variables

Create a `.env` file in the root (use `.env.example` as reference):

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_API_BASE_URL=http://localhost:5000
```

### Run Locally

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## Pages

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Home with hero, available cars, and static sections |
| `/explore` | Public | Full car listing with search and filter |
| `/cars/:id` | Public | Full car detail with Book Now |
| `/login` | Public | Login with email or Google |
| `/register` | Public | Register a new account |
| `/add-car` | Private | Add a new car listing |
| `/my-bookings` | Private | View all personal bookings |
| `/my-added-cars` | Private | Manage own car listings |

---

*Built as part of Programming Hero Web Development Course — Assignment CAT_05*
