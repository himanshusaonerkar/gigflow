🚀 GigFlow – Mini Freelance Marketplace

GigFlow is a full-stack freelance marketplace where users can post jobs (Gigs) and other users can apply by submitting bids. Clients can review bids and hire exactly one freelancer per gig.

This project demonstrates secure authentication, role-agnostic users, complex database relationships, and atomic hiring logic.

🛠 Tech Stack
Frontend

React.js (Vite)

Tailwind CSS

Redux Toolkit

Axios

React Router

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication (HttpOnly Cookies)

✨ Features
🔐 Authentication

User registration & login

JWT stored in HttpOnly cookies

Secure protected routes

📋 Gig Management

Create gigs (title, description, budget)

View all open gigs

Gig status: open → assigned

💬 Bidding System

Freelancers can submit bids on gigs

Bids include message and proposed price

Bid status: pending, hired, rejected

🤝 Hiring Logic (Core Feature)

Only the gig owner can hire

Only one freelancer can be hired

All other bids are automatically rejected

Prevents rehiring on already assigned gigs

📁 Project Structure
gigflow/
├── gigflow-server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── index.js
│   ├── .env.example
│   └── package.json
│
└── gigflow-client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── redux/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json

🔗 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login & set JWT cookie
Gigs
Method	Endpoint	Description
GET	/api/gigs	Fetch all open gigs
POST	/api/gigs	Create a new gig
Bids
Method	Endpoint	Description
POST	/api/bids	Submit a bid
GET	/api/bids/:gigId	Get bids for a gig
PATCH	/api/bids/:bidId/hire	Hire a freelancer
⚙️ Environment Setup
Backend .env

Create a .env file inside gigflow-server/

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/gigflow
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173

▶️ How to Run Locally
1️⃣ Backend
cd gigflow-server
npm install
npm run dev

2️⃣ Frontend
cd gigflow-client
npm install
npm run dev


Open in browser:

http://localhost:5173

🧪 How to Test Hire Flow (Postman)

Login as Client → create a gig

Login as Freelancer → submit a bid

Login again as Client

Fetch bids using GET /api/bids/:gigId

Hire freelancer using PATCH /api/bids/:bidId/hire

✅ Only one freelancer can be hired
✅ Gig status changes to assigned

🧠 Atomic Hiring Logic (Explanation)

MongoDB transactions require a replica set, which is not available in local standalone MongoDB.
To handle this, the project uses a safe sequential update strategy:

Checks gig ownership and status

Updates selected bid to hired

Rejects all other bids

Marks gig as assigned

This guarantees data consistency and prevents race conditions.

🎥 Demo Video

A 2-minute Loom video demonstrating:

Gig creation

Bid submission

Hiring flow
