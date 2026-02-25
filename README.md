# News API & Analytics Engine

A production-ready RESTful API for news management and engagement analytics, built with Node.js, TypeScript, and Prisma.

## 🚀 Features
- **Secure Authentication**: Role-Based Access Control (RBAC) for Authors and Readers using JWT and BCrypt.
- **Content Lifecycle**: Full CRUD for articles with Soft Deletion and draft/published status management.
- **High-Frequency Engagement Tracking**: Non-blocking read logs capturing user interactions.
- **Analytics Engine**: Daily aggregation of article views via a background job queue.
- **Robust Validation**: Centralized request validation using Zod.

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL / SQLite (via Prisma ORM)
- **Validation**: Zod
- **Security**: JWT, BCrypt
- **Queue System**: BullMQ / Redis (Planned)

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd backend-assignment

npm install

# configure your .env
DATABASE_URL="postgresql://user:password@localhost:5432/news?schema=public"
JWT_SECRET="your_secure_jwt_secret_here"
PORT=3000

# run migration and generate
npx prisma migrate dev --name init
npx prisma generate

# Run the app in development mode
npm run dev

# Production build
npm run build
npm start