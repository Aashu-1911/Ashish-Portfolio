# Portfolio Backend (PostgreSQL + Prisma ORM + Resend API)

This is the production backend for the Portfolio Website, built with **Express.js**, **Node.js (ES Modules)**, **PostgreSQL (Neon)**, **Prisma ORM**, and **Resend Email API**.

---

## 📁 Project Structure

```text
backend/
├── controllers/
│   ├── emailController.js    # Contact form email handler via Resend SDK
│   └── projectController.js  # Project and Domain endpoints via Prisma
├── lib/
│   └── prisma.js             # Singleton PrismaClient instance
├── prisma/
│   ├── schema.prisma         # PostgreSQL schema & model definitions
│   └── migrations/           # Database migration SQL files
├── routes/
│   └── api.js                # Express API route declarations
├── scripts/
│   ├── seed.js               # Local database seed script
│   └── seedFromRemote.js     # Seed database from remote endpoint
├── utils/
│   └── serializeProject.js   # API response formatting helper
├── uploads/
│   └── projects_images/      # Static image uploads
├── .env.example              # Environment variables template
├── package.json              # Project dependencies & npm scripts
├── README.md                 # Setup & deployment documentation
└── server.js                 # Express server entry point
```

---

## 🛠️ Environment Configuration

Create a `.env` file in `backend/`:

```env
PORT=8000
DATABASE_URL="postgresql://user:password@host:5432/portfolio?sslmode=require"

# Resend Email Configuration
RESEND_API_KEY="re_123456789_your_key_here"
CONTACT_RECEIVER_EMAIL="ashishbiradar.1911@gmail.com"
EMAIL_FROM="Portfolio Contact <onboarding@resend.dev>"
```

---

## 🚀 Render Deployment Instructions

### Step 1: Set Up Resend
1. Sign up at [Resend.com](https://resend.com).
2. Create an **API Key** from the dashboard.
3. Save your key (starts with `re_...`).

### Step 2: Configure Environment Variables on Render
In Render Dashboard -> **Environment Variables**, add:
* `DATABASE_URL` = `<Your Neon PostgreSQL Connection String>`
* `RESEND_API_KEY` = `re_...`
* `CONTACT_RECEIVER_EMAIL` = `ashishbiradar.1911@gmail.com`
* `EMAIL_FROM` = `Portfolio Contact <onboarding@resend.dev>`
* `PORT` = `8000`
* `NODE_ENV` = `production`
* `FRONTEND_URL` = `https://your-frontend.vercel.app` (or `*`)

### Step 3: Configure Build & Start Commands
* **Build Command**: `npm install && npm run prisma:deploy`
* **Start Command**: `node server.js`
