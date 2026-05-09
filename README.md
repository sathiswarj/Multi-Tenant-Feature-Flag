# 🚩 TenantFlag: Multi-Tenant Feature Flag Platform

A state-of-the-art, high-performance, and secure **Multi-Tenant Feature Flag Management Platform** built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) and configured with cryptographically secure **v4 UUIDs** for tenant isolation.

---

## 🚀 Key Highlights

*   **🔒 Complete Role-Based Access Control (RBAC)**:
    *   **Super Admin**: Full control to onboard organizations, monitor tenant health, view organization administrators, active feature flag counts, and tenant integration statuses.
    *   **Org Admin**: Manage, create, edit, toggle, and delete scoped feature flags for their organization.
    *   **End User**: A clean, public-facing portal allowing end-users to select their organization and check in real-time whether a feature flag is enabled for their tenant.
*   **🏢 Scalable Multi-Tenant Architecture**: Robust data isolation utilizing v4 UUID strings as primary keys across all MongoDB collections, powered by composite index keys on feature flags (`orgId` + `key`)

---

## 🛠️ Technology Stack

*   **Frontend**: React (v18), Tailwind CSS, Lucide Icons, Google Fonts (`Plus Jakarta Sans` & `JetBrains Mono`).
*   **Backend**: Node.js, Express.js, Mongoose (MongoDB ODM), Cors, Dotenv.
*   **Database**: MongoDB (Local or Atlas) utilizing native UUID-v4 keys.

---

## 📁 Repository Structure

```text
├── backend/
│   ├── src/
│   │   ├── controllers/      # Route controllers (authController, orgController, superController)
│   │   ├── models/           # Mongoose schemas (Organization, User, FeatureFlag)
│   │   └── routes/           # API endpoints routing definitions
│   ├── server.js             # Express entry point & MongoDB connection
│   └── .env                  # Port & database configurations
│
└── admin/
    ├── src/
    │   ├── components/       # Reusable components (Sidebar, Topbar, Toast, FlagModal)
    │   ├── pages/            # View pages (LoginPage, SignupPage, SuperDashboard, OrgDashboard, EndUserPage)
    │   ├── service/          # Decoupled API service request layer
    │   ├── App.js            # Core page rendering, routing, and viewport modal portal
    │   ├── index.css         # Tailwind directives & global typography definitions
    │   └── App.css           # Styling utilities & micro-animations
```

---

## 💾 Database Schemas (Mongoose)

### 1. `Organization`
Stores onboarded tenant organizations.
*   `_id` (String, default: UUID v4): Unique Tenant ID.
*   `name` (String, unique): Organization name.
*   `createdAt` (Date): Creation timestamp.

### 2. `User`
Stores system accounts with specific RBAC roles.
*   `_id` (String, default: UUID v4): Unique User ID.
*   `email` (String, unique): User email.
*   `password` (String): Secure password.
*   `role` (String): `'super_admin'` or `'org_admin'`.
*   `orgId` (String, optional): Refers to the Organization `_id`.

### 3. `FeatureFlag`
Stores scoped feature flags with composite index keys for blazing-fast multi-tenant queries.
*   `_id` (String, default: UUID v4): Unique Flag ID.
*   `orgId` (String): Refers to the Organization `_id`.
*   `key` (String): Unique string key (e.g. `beta_billing_v2`).
*   `name` (String): User-friendly display name.
*   `description` (String): Purpose of the flag.
*   `isEnabled` (Boolean): Current toggle status.

---

## ⚡ Setup & Installation

### Prerequisites
*   Node.js (v16 or higher)
*   NPM
*   MongoDB running locally (`mongodb://localhost:27017/featureflag`) or a remote MongoDB Atlas URI.

### 1. Run the Backend Server
```bash
cd backend
npm install
npm run dev
```
*Creates server on `http://localhost:5000` and automatically connects to MongoDB.*

### 2. Run the React Admin Dashboard
```bash
cd admin
npm install
npm run dev
```
*Launches dashboard on `http://localhost:3000`.*

---

## 🔑 Default Credentials

### Super Admin
*   **Email**: `superadmin@featureflag.com`
*   **Password**: `superpassword123`

---
