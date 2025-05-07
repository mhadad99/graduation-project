# 💼 Tanfeez – Freelancing Platform

Tanfeez is a full-stack freelancer marketplace web app where **clients** post projects and **freelancers** offer services or apply for jobs. The platform supports user roles, authentication, dynamic dashboards, and proposal systems.

![Database Schema](./docs/db-schema.png)

---

## 🧱 Tech Stack

**Backend:**

- 🐍 Python Django REST Framework
- 🛡️ JWT Authentication (CustomUser Model)
- 🐘 PostgreSQL
- 🗃️ Feature-based Project Structure

**Frontend:**

- ⚛️ React
- 🎨 Bootstrap
- 🔄 Redux

---

## 🔐 Authentication

- Custom `CustomUser` model (with `freelancer` / `client` roles)
- JWT-based login/register
- Endpoints for profile photo & password updates
- Role-based permission handling

---

## 🧑‍💻 Core Features

### 👤 Users

- Register/Login
- Edit profile (photo, bio, address, password)
- Role selection: `client` or `freelancer`

### 🧑‍🎨 Freelancers

- Create and manage profile (title, job type, qualities)
- Upload CV, education, and certifications
- View and apply to projects
- Create services and get service proposals

### 🧑‍💼 Clients

- Post projects
- View freelancer proposals and approve
- Send service requests
- Rate freelancers

---

## 📁 Folder Structure

backend/
├── user/ # User registration, login, profile
├── freelancer/ # Freelancer details, update
├── client/ # Client info, rating
├── project/ # Project CRUD and approval
├── proposal/ # Project and service proposals
└── utils/ # JWT, permissions, helpers

frontend/
├── pages/
│ ├── Home
│ ├── Login/Register
│ ├── ProjectDetails / ServiceDetails
│ └── Dashboards (Admin, Client, Freelancer)
└── redux/ # Redux slices for auth, services, etc.

---

## 📡 API Endpoints

### User Endpoints 🧩

```http
POST   /api/user/register/
POST   /api/user/login/
GET    /api/user/user-profile/
PUT    /api/user/update/
PUT    /api/user/password/update/
PUT    /api/user/photo/update/

### Freelancer Endpoints 🧩

POST   /api/freelancers/create/
GET    /api/freelancers/all/
PUT    /api/freelancers/update/
DELETE /api/freelancers/delete/

### Projects Endpoints 🧩

GET    /api/projects/
POST   /api/projects/create/
PUT    /api/projects/update/<id>/
POST   /api/projects/complete/<id>/
GET    /api/projects/my-projects/

### Service Endpoints 🧩

GET     /api/services/                         # List all services
POST    /api/services/create/                  # Create new service
GET     /api/services/<id>/                    # Retrieve service details
PUT     /api/services/update/<id>/             # Update service
DELETE  /api/services/delete/<id>/             # Delete service

GET     /api/services/by-tag/?tag=design       # Services filtered by tag
GET     /api/services/personal-services/       # Services by logged-in freelancer
GET     /api/services/user/<user_id>/          # Services by freelancer user ID

### Project Proposals Endpoints 🧩

POST   /api/proposals/apply/
GET    /api/proposals/my-proposals/
POST   /api/proposals/approve/<id>/

### Service Proposal Endpoints 🧩

GET     /api/service-proposals/all/                    # List all service proposals
POST    /api/service-proposals/apply/                  # Submit a new service proposal
GET     /api/service-proposals/my-proposals/           # Client’s received proposals
GET     /api/service-proposals/all-proposals-by-serviceId/<id>/  # Proposals for a specific service
POST    /api/service-proposals/approve/<id>/           # Approve a proposal
PUT     /api/service-proposals/update/<id>/            # Update own proposal
DELETE  /api/service-proposals/delete/<id>/            # Delete own proposal

📊 Database Design
	•	User (CustomUser)
	•	Freelancer / Client (1-to-1 with User)
	•	Project / Service (Posted by client / freelancer)
	•	ProjectProposal / ServiceProposal
	•	Skills & FreelancerSkills
	•	Ratings (client ↔ freelancer)

View full schema in the image above ☝️
```
