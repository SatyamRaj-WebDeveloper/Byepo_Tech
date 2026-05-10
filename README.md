# Multi-Tenant Feature Flag Management System

A lightweight, multi-tenant SaaS application built to manage feature flags across isolated organizations. This project was developed as a technical assessment, focusing on API design, custom role-based authentication, and practical engineering trade-offs.

## 🚀 Features & Architecture

The system is divided into a single Express backend and three distinct, role-based frontends:

1. **Super Admin Portal (`/super-admin.html`)**
   - Secured via hardcoded configuration credentials.
   - Allows the software host to provision new client Organizations.
2. **Organization Admin Portal (`/admin.html`)**
   - Secured via Custom JWT Authentication.
   - Allows client admins to register under their specific Organization ID.
   - Full CRUD operations to create, enable, and disable feature flags scoped strictly to their organization.
3. **End User Portal (`/user.html`)**
   - A public-facing interface.
   - Allows users to query the real-time status (Enabled/Disabled) of a specific feature key within an organization.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** Custom JWT (`jsonwebtoken`) & `bcrypt` (No third-party providers used)
- **Frontend:** Vanilla HTML, JavaScript (Fetch API), and Tailwind CSS (via CDN)

## ⚙️ Local Setup Instructions

### Prerequisites
- Node.js installed (v16+ recommended)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Installation
Clone the repository and install the backend dependencies:
```bash
git clone <https://github.com/SatyamRaj-WebDeveloper/Byepo_Tech/tree/main>
cd byepo-feature-flags
npm install
