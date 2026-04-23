# Colby Cooper | Technical Problem-Solver & Developer

🔗 [https://www.colbyc.com/](https://www.colbyc.com)

A full-stack, responsive personal portfolio built with Next.js and TypeScript. This application serves a dual purpose: it acts as a public-facing interactive resume and a secure, private administrative portal for managing inbound contact leads via a custom SQLite database.

I treat every operational bottleneck, data discrepancy, and software bug like an investigation. This repository demonstrates my ability to translate corporate compliance, risk mitigation, and analytical problem-solving into secure, scalable IT infrastructure and software architecture.

## 🚀 Key Features

### Public Portfolio & UI/UX
* **Component-Driven Architecture:** Built with React and Chakra UI, utilizing modular, reusable components (like a global `<ResumeCTA />`) to maintain a DRY codebase and seamless UX.
* **Dynamic Content:** Server-rendered pages for Employment, Education, and Code Samples (featuring custom Java Hash Table implementations and advanced data structures).
* **Responsive Design:** Fully responsive layout optimized for mobile and desktop, including integrated dark/light mode functionality.
* **Contact Gateway:** Inbound contact form protected by Cloudflare Turnstile to eliminate automated bot submissions prior to server execution.

### Secure Admin Portal (`/admin/leads`)
* **Zero-Trust MFA Gateway:** A custom-built 2FA login flow requiring both a cryptographically hashed master password (`bcrypt`) and a 30-second rolling TOTP code (`otpauth`, SHA-1). Bypasses the need for third-party auth providers.
* **Edge-Native Middleware:** Route protection powered by Next.js Middleware, utilizing `jose` for Edge-compatible JWT verification.
* **XSS & CSRF Mitigation:** Complete reliance on strict, HTTP-Only `Set-Cookie` headers for session management, ensuring authentication tokens are completely invisible to client-side JavaScript.
* **Database Integration:** SQLite database managed via Prisma ORM for reading, tracking, and updating inbound leads seamlessly.

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router, Server Actions)
* **Language:** TypeScript
* **Styling:** Chakra UI
* **Database & ORM:** SQLite, Prisma
* **Security & Crypto:** `bcrypt`, `jose` (JWT), `otpauth` (TOTP), Cloudflare Turnstile

## 💻 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables

Create a .env file in the root directory. You must configure the following keys for the database and authentication gateway to function properly.

*Important Note*: Next.js aggressively parses .env files. If your `HASHED_ADMIN_PASSWORD` contains dollar signs (`$`), you must escape them with backslashes (e.g., `\$2b\$12\$...`) and wrap the string in double quotes to prevent silent variable truncation.

```sh
# Database
DATABASE_URL="file:./dev.db"

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY="your_site_key"
TURNSTILE_SECRET_KEY="your_secret_key"

# Authentication & JWT
JWT_SECRET="your_secure_random_string"
SESSION_SECRET="your_session_secret"

# Admin Credentials
ADMIN_EMAIL="admin@yourdomain.com"
HASHED_ADMIN_PASSWORD="\$2b\$12\$your_escaped_bcrypt_hash"
ADMIN_TOTP_SECRET="your_base32_totp_secret"
```

### 4. Database Setup
Push the Prisma schema to your local SQLite database and generate the client:
```bash
npx prisma db push
npx prisma generate
```

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the public portfolio. Navigate to `/auth` to access the secure admin gateway.
