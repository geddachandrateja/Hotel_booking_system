# StayNest — Full-Stack Hotel Booking Application

StayNest is an end-to-end, production-ready hotel booking web application inspired by leading hospitality platforms (Booking.com, Goibibo). Built with modern full-stack best practices, clean architecture, and responsive UX.

---

## 🌟 Key Features (Architecture Roadmap)

- **Frontend (`client/`)**: Modern React with Vite, modular UI components, responsive layout, date range selection, and dynamic search filters.
- **Backend (`server/`)**: Node.js & Express.js REST API with clean MVC layering (Routes, Controllers, Middleware, Models, Services).
- **Database**: MongoDB with Mongoose ODM (data validation, indexing, and transactional booking concurrency).
- **Security**: JWT authentication, bcrypt password hashing, HTTP-only cookie support, CORS configuration, and role-based access control (User vs. Admin).
- **Integrations**: Cloudinary image management, Nodemailer booking confirmation emails, and payment verification flow.

---

## 🏗️ Project Architecture

```
staynest-hotel-booking/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── assets/        # Static assets
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page views
│   │   ├── App.jsx        # Root component
│   │   └── main.jsx       # Client entry point
│   ├── vite.config.js     # Vite configuration & backend proxy
│   └── package.json
├── server/                 # Express REST API (Node.js)
│   ├── src/
│   │   ├── config/        # Environment and DB config
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Auth, validation, error handlers
│   │   ├── models/        # Mongoose data schemas
│   │   ├── routes/        # Modular API routes
│   │   ├── app.js         # Express app configuration
│   │   └── server.js      # Server entry point
│   ├── .env.example       # Documented environment variables
│   └── package.json
├── .gitignore
├── README.md
└── package.json            # Root orchestration scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18+ (tested with v24 LTS)
- **npm**: v9+

### Installation

1. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

2. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

3. Configure Environment Variables:
   - Copy `server/.env.example` to `server/.env` and update the values.

### Running the Application

- **Backend API**:
  ```bash
  cd server
  npm run dev
  ```
  Runs at: `http://localhost:5000`

- **Frontend Client**:
  ```bash
  cd client
  npm run dev
  ```
  Runs at: `http://localhost:5173`

- **Health Check Endpoint**:
  Access `http://localhost:5000/api/health` or via Vite proxy `http://localhost:5173/api/health`.

---

## 📅 Development Milestones

- [x] **Milestone 1**: Environment setup, project scaffolding, Git repository initialization, Express backend baseline with health check, Vite proxy integration.
- [ ] **Milestone 2**: Premium landing page UI, hero section, destination & date pickers, hotel cards.
- [ ] **Milestone 3**: Backend database models & MongoDB Atlas connection.
- [ ] **Milestone 4**: JWT authentication & authorization middleware.
- [ ] **Milestone 5**: Hotel search, filters, and detail pages.
- [ ] **Milestone 6**: Booking engine, availability checking, and concurrency control.
- [ ] **Milestone 7**: Admin dashboard & management interfaces.
- [ ] **Milestone 8**: External integrations (Cloudinary, email notifications, payment checkout).
