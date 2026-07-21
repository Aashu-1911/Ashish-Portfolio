# Portfolio Backend (PostgreSQL + Prisma ORM)

This is the production backend for the Portfolio Website, built with **Express.js**, **Node.js (ES Modules)**, **PostgreSQL**, and **Prisma ORM**.

---

## 📁 Project Structure

```text
backend/
├── config/
│   └── db.js                 # PrismaClient singleton instance
├── controllers/
│   ├── emailController.js    # Contact form email handler via Nodemailer
│   └── projectController.js  # Project and Domain data endpoints via Prisma
├── prisma/
│   ├── schema.prisma         # PostgreSQL models & database configuration
│   └── migrations/           # Database migrations history
├── routes/
│   └── api.js                # Express API routes
├── scripts/
│   ├── seed.js               # Local database seed script
│   └── seedFromRemote.js     # Seed database from remote endpoint
├── utils/
│   └── serializeProject.js   # API response formatting helper
├── uploads/
│   └── projects_images/      # Static image uploads
├── .env.example              # Environment variables template
├── package.json              # Project dependencies & scripts
├── README.md                 # Setup & deployment documentation
└── server.js                 # Express server entry point
```

---

## 🛠️ Local Setup & Commands

### Prerequisites
* Node.js (v18+)
* PostgreSQL server running locally or accessible via URL

### 1. Installation
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `backend/` root:
```env
PORT=8000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio?schema=public"

EMAIL_BACKEND=console
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
CONTACT_RECIPIENT=ashishbiradar.1911@gmail.com
```

### 3. Database Migration & Client Generation
Run migrations to create the PostgreSQL tables and generate the Prisma client:
```bash
npm run prisma:migrate
```
*(or `npx --no-install prisma migrate dev`)*

### 4. Seed the Database
Populate initial domains and project records:
```bash
npm run seed
```
*(Or import from remote API using `npm run seed:remote`)*

### 5. Start Development Server
```bash
npm run dev
```
Server runs at `http://localhost:8000`.

---

## 🚀 Render Deployment Instructions

Follow these exact steps to deploy the backend on **Render**:

### Step 1: Create PostgreSQL Database on Render
1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **PostgreSQL**.
3. Set Name to `portfolio-db` and select your region.
4. Click **Create Database**.
5. Once created, copy the **Internal Database URL** (if deploying backend on Render) or **External Database URL**.

### Step 2: Create Web Service for Backend
1. In Render Dashboard, click **New +** -> **Web Service**.
2. Connect your Git repository containing the backend.
3. Configure the service:
   * **Name**: `ashish-biradar-portfolio-backend`
   * **Environment**: `Node`
   * **Build Command**:
     ```bash
     npm install && npm run prisma:deploy
     ```
   * **Start Command**:
     ```bash
     node server.js
     ```

### Step 3: Configure Environment Variables on Render
Under **Environment Variables** in Render, add:
* `DATABASE_URL` = `<Render PostgreSQL Connection String>`
* `PORT` = `8000`
* `NODE_ENV` = `production`
* `FRONTEND_URL` = `https://your-frontend.vercel.app` (or `*`)
* `EMAIL_BACKEND` = `smtp` (or `console`)
* `EMAIL_HOST_USER` = `<your-email>`
* `EMAIL_HOST_PASSWORD` = `<your-app-password>`

### Step 4: Seed Production Database
To seed the database on Render after first deployment:
Option A: Execute command via Render Shell:
```bash
node scripts/seed.js
```
Option B: Run locally pointing `DATABASE_URL` to your Render Postgres database:
```bash
DATABASE_URL="<Render External Database URL>" node scripts/seed.js
```

---

## 🗑️ Removed MongoDB Files & Dependencies

As part of this complete migration:
* **Removed Dependency**: `mongoose`
* **Removed Files**: `backend/models/Domain.js`, `backend/models/Project.js`
* **Removed Connection Logic**: Mongoose `connectDB()` connection string and MongoDB driver code
* **Replaced**: `MONGODB_URI` environment variable replaced with `DATABASE_URL`
