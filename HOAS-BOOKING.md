# 🏠 HOAS Booking App

## 📌 Project Overview
The **HOAS Booking App** is a full-stack web application designed to help tenants of HOAS (Helsinki Student Housing) manage their daily needs. The app allows tenants to **book shared facilities**, **buy and sell items in a marketplace**, and provides administrators with tools to manage users, facilities, and announcements.

---

## 👥 Team Members
- Juan Valenzuela
- Eemeli Hämäläinen
- Nooa Vainio-Mattila
- Amir Noori
---

## 🎯 Target Users & Stakeholders
- **Tenants:** Students living in HOAS apartments who need to book facilities and access the marketplace.  
- **Administrators:** HOAS staff responsible for managing facilities, users, and announcements.  
- **Stakeholders:** HOAS organization, tenants, and developers maintaining the system.

---

## 🛠 Technology Stack
- **Frontend:** React, React Router, Context API, CSS Modules  
- **Backend:** Node.js, Express.js, MongoDB  
- **Authentication:** JWT (JSON Web Token), role-based access control  
- **Testing:** Postman, Jest, Supertest  
- **Deployment:** Deployed frontend and backend separately. 
- **Design Tools:** Figma, Draw.io for prototypes  

---

## ⚙️ Core Functionalities

### 🔑 User Authentication
- User registration and login system.  
- JWT-based authentication for secure communication.  
- Role-based access control (Tenant, Admin).  
- Password update functionality.  

### 🧺 Booking System
- Tenants can book shared facilities:  
  - Laundry room  
  - Dryer  
  - Club room  
- Dynamic booking schedule connected to backend.  
- Prevents double-booking and validates time slots.  

### 🛒 Marketplace
- Tenants can list items for sale.  
- Buyers can filter items by category (electronics, furniture, clothing).  
- Price filtering with maximum price input.  
- Simple and intuitive UI for browsing and posting items.  

### 🛠 Admin Panel
- **User Management:** Add, edit, or remove users.  
- **Facility Management:** Manage building facilities and booking rules.  
- **Marketplace Management:** Moderate marketplace listings.  
- **Announcements:** Post announcements for tenants.  
- **Reports:** View and manage tenant reports.  

### 🔔 Toast Notifications & Modals
- Toasts for success/error messages (e.g., login success, booking error).  
- User modal for creating and editing users with validation.  

### 📱 Responsive Design & Routing
- Fully responsive UI for desktop and mobile.  
- Protected routes for authenticated users.  
- Separate layouts for tenant and admin views.  

---

## 📸 UI Descriptions
- **Login Page:** Secure login with error handling.  
- **Home Page:** Overview of available features.  
- **Booking Page:** Calendar-like interface for reserving facilities.  
- **Marketplace:** Item listings with filters and search.  
- **Admin Dashboard:** Sidebar navigation with user, facility, and report management.  

---

## 🚀 Deployment
- **Backend:** Deployed with database integration (MongoDB).  
- **Frontend:** Deployed React app connected to backend API.  
- **Testing:** Integration tests run before deployment to ensure stability.  

---

## 📊 Lessons Learned
- **Scrum Process:** Regular ceremonies (Daily Scrum, Sprint Review, Retrospective) improved collaboration and delivery.  
- **Frontend/Backend Integration:** Clear API contracts were essential for smooth integration.  
- **Testing:** Automated testing reduced bugs and improved confidence in deployments.  
- **Accessibility & UX:** Early focus on responsive design and user-friendly UI improved stakeholder satisfaction.  
- **Team Collaboration:** Git workflow and code reviews ensured maintainability and consistency.  

---

## ✅ Final Outcome
The HOAS Booking App was successfully delivered after **three sprints**, with all core functionalities implemented:
- Authentication  
- Facility booking  
- Marketplace  
- Admin panel  
- Responsive design and deployment  

The project demonstrates strong **technical execution**, **Scrum adherence**, and **team collaboration**, making it a portfolio-ready showcase of full-stack development skills.


