# 📝 Task Manager App

A modern task management web app built with **React**, **TypeScript**, **React Router**, **Bootstrap**, and **Auth0** for authentication.

## Features

- Secure login and logout using Auth0
- Task state managed via React Context
- Create, edit, view, and delete tasks
- Organized routes: Home, Dashboard, Create, Edit, Profile
- Styled with Bootstrap and modern CSS

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/JVesci/TypeScript-App.git
cd task-manager-app

npm install react react-dom react-router-dom @auth0/auth0-react bootstrap react-bootstrap uuid
npm install --save-dev typescript @types/react @types/react-dom @types/react-router-dom @types/uuid

npm run dev

Go to http://localhost:5173 to view the app.
```
## Project Structure
```
src/
│
├── components/         # Reusable UI components (LoginButton, LogoutButton, etc.)
├── context/            # React Context for managing tasks
├── pages/              # Main pages (Home, Dashboard, CreateTask, EditTask, Profile)
├── App.tsx             # Root component and routes
├── main.tsx            # React entry point
├── App.css             # Global styling
└── auth/               # Auth0 callback handling
```

## Technologies Used

- React
- TypeScript
- React Router
- Auth0
- Bootstrap
- Vite

## AuthO Setup

To use Auth0 for authentication:

1. Go to Auth0 Dashboard
2. Create a new Single Page Application
3. In the Settings tab:

- Allowed Callback URLs:
http://localhost:5173/callback

- Allowed Logout URLs:
http://localhost:5173

- Allowed Web Origins:
http://localhost:5173

4. Use the domain and client ID directly in your Auth0Provider setup in main.tsx

## How to Use

1. Visit the homepage and click Login
2. You’ll be redirected to Auth0 for authentication
3. After logging in, you’ll land on the Dashboard
4. From there, you can create, edit, and view your tasks
5. Click Logout in the navigation bar to securely end your session

