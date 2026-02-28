# MERN Real Estate App

A full-stack Real Estate application built using **MongoDB, Express, React, Node.js** with:
- User registration and login (JWT authentication)
- Property listing feed
- Protected routes for authenticated users
- Add property interface
- User dashboard showing own listings

## Project Structure

- `backend/`: Express + MongoDB API
- `frontend/`: React (Vite) client

## Backend Setup

1. Open terminal in `backend`.
2. Install dependencies:
   - `npm install`
3. Copy `.env.example` to `.env` and update values.
4. Start backend:
   - Development: `npm run dev`
   - Production: `npm start`

The API runs on `http://localhost:5000` by default.

## Frontend Setup

1. Open terminal in `frontend`.
2. Install dependencies:
   - `npm install`
3. Copy `.env.example` to `.env` (optional if using default API URL).
4. Start frontend:
   - `npm run dev`

The app runs on `http://localhost:5173`.

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/properties`
- `POST /api/properties` (protected)
- `PUT /api/properties/:id` (protected, owner only)
- `DELETE /api/properties/:id` (protected, owner only)

## Notes

- Make sure MongoDB is running locally or provide a valid MongoDB Atlas URI.
- Use a strong `JWT_SECRET` in production.

## Make It Public (Not Only Localhost)

Deploy backend and frontend separately:

1. Backend on Render (or Railway):
   - Push this project to GitHub.
   - Create a new Web Service from `backend` folder.
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variables:
     - `MONGO_URI` = your MongoDB Atlas URI
     - `JWT_SECRET` = strong random secret
     - `PORT` = `10000` (or leave default from platform)
     - `FRONTEND_URL` = your frontend public URL (example: `https://your-app.vercel.app`)

2. Frontend on Vercel (or Netlify):
   - Import the same repo.
   - Set root directory to `frontend`.
   - Build command: `npm run build`
   - Output directory: `dist`
   - Add env variable:
     - `VITE_API_BASE_URL` = your backend public API URL + `/api`
       Example: `https://your-backend.onrender.com/api`

3. CORS:
   - Backend now uses `FRONTEND_URL` for allowed origins.
   - If you have multiple frontend URLs, use comma-separated values:
     - `FRONTEND_URL=https://app1.vercel.app,https://app2.netlify.app`

4. After deploy:
   - Open frontend public URL.
   - Test register, login, add property, and property list.
