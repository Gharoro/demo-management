# Enif Landing Page & Demo Request Assessment

## Backend Service

A production-ready Node.js API built with TypeScript, Express, and MongoDB.

**Key Features:**

- **Authentication & Authorization:**
  - User registration with email verification (OTP).
  - Secure JWT-based authentication (Access Tokens).
  - Role-Based Access Control (RBAC) for Users and Admins.
- **Demo Request Management (CRUD):**
  - Complete lifecycle management for demo requests (Create, Read, Update, Delete).
  - Filtering and pagination for listing requests.
- **Admin Dashboard Capabilities:**
  - Admin-only routes for managing all demo requests.
  - Status updates for tracking request progress (Pending, Contacted, Scheduled, Completed).
- **Security & Compliance:**
  - **Audit Logging:** Comprehensive tracking of all critical actions (failed logins, demo status changes, demo deletions) for accountability.
  - Request validation using Zod.
  - Secure headers (Helmet) and CORS configuration.

## Frontend Application

A modern, responsive landing page built with React, Vite, TypeScript, and Tailwind CSS.

**Key Features:**

- **UI/UX:**
  - Pixel-perfect, responsive implementation of the provided design.
  - Custom components (Hero, Features, Integrations, Toast, Alerts).
- **Interactive Forms:**
  - **Demo Request Form:** Multi-step logic with email verification.
  - **Debounced Validation:** Checks email existence without excessive API calls.
  - **Auto-Auth:** Automatically logs users in upon verification to streamline submission.
- **State Management:**
  - Leveraged React Query for efficient server state handling.
