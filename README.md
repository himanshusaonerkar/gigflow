**GigFlow – Mini Freelance Marketplace**
GigFlow is a full-stack freelance marketplace where users can post jobs (Gigs) and other users can apply by submitting bids. Clients can review bids and hire exactly one freelancer per gig. This project demonstrates secure authentication, role-agnostic users, complex database relationships, and atomic hiring logic.

**Tech Stack :**
**1. Frontend**
   a. React.js (Vite)
   b. Tailwind CSS
   c. Redux Toolkit
   d. Axios
   e. React Router

**2. Backend**
	a. Node.js
	b. Express.js
	c. MongoDB (Mongoose)
	d. JWT Authentication (HttpOnly Cookies)

**Features**
1. Authentication
2. User registration & login
3. JWT stored in HttpOnly cookies
4. Secure protected routes

**Gig Management**
1. Create gigs (title, description, budget)
2. View all open gigs
3. Gig status: open → assigned

**Bidding System**
1. Freelancers can submit bids on gigs
2. Bids include message and proposed price
3. Bid status: pending, hired, rejected

**Hiring Logic (Core Feature)**
1. Only the gig owner can hire
2. Only one freelancer can be hired
3. All other bids are automatically rejected
4. Prevents rehiring on already assigned gigs

**Project Structure**

Gig Flow/

├── gigflow-server/
│   ├── controllers/
│   │    ├── auth.controller.js
│   │    ├── bid.controller.js
│ 	│    └── gig.controller.js
│   ├── models/
│   │    ├── bid.js
│   │    ├── gig.js
│ 	│    └── user.js
│   ├── routes/
│   │    ├── auth.routes.js
│   │    ├── bid.routes.js
│ 	│    └── gig.routes.js
│   ├── middleware/
│ 	│    └── auth.middleware.js
│   ├── index.js
│   ├── .env
│   └── package.json
│
└── gigflow-client/

	├── src/
	│   ├── components/
	│	│   │    ├── BidCard.jsx
	│	│   │    ├── ErrorMessage.jsx
	│	│   │    ├── Loader.jsx
	│	│   │    ├── Navbar.jsx
	│	│   │    └── ProtectedRoute.jsx
    │   ├── pages/
	│	│   │    ├── CreateGig.jsx
	│	│   │    ├── Dashboard.jsx
	│	│   │    ├── GigDetails.jsx
	│	│   │    ├── Login.jsx
	│	│   │    └── ProtectedRoute.jsx── Register.jsx
    │   ├── redux/
	│	│   │    ├── authSlice.js
	│	│   │    └── store.js
    │   ├── services/
	│	│   │    └── api.js
    │   ├── App.jsx
	│	│   ├── App.css
	│	│   ├── index.css
    │   └── main.jsx
    └── package.json

**API Endpoints**
**1. Auth**
├── Register
│   ├── POST
│   ├── /api/auth/register
│   └── Register new user
└── Login
    ├── POST
    ├── /api/auth/login
    └── Login & set JWT cookie

**2. Gigs**
├── Fetching gigs
│   ├── GET
│   ├── /api/gigs
│   └── Fetch all open gigs
└── Creating gigs
    ├── POST
    ├── /api/gigs
    └── Create a new gig

**3. Bids**
├── Bid Submit
│   ├── POST
│   ├── /api/bids
│   └── Submit a bid
├── Get bids
│   ├── GET
│   ├── /api/bids/:gigId
│   └── Get bids for a gig
└── Hire
	├── PATCH
    ├── /api/bids/:bidId/hire
    └── Hire a freelancer

**Environment Setup**
Backend .env

**Create a .env file inside gigflow-server/**
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/gigflow
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173

**How to Run**
**1. Backend**
cd gigflow-server
npm install
npm run dev

**2. Frontend**
cd gigflow-client
npm install
npm run dev

**Open in browser:**
http://localhost:5173

**How to Test Hire Flow API using Postman**
1. Login as Client → create a gig
2. Login as Freelancer → submit a bid
3. Login again as Client
4. Fetch bids using GET /api/bids/:gigId
5. Hire freelancer using PATCH /api/bids/:bidId/hire

**Atomic Hiring Logic**
MongoDB transactions require a replica set, which is not available in local standalone MongoDB. To handle this, the project uses a safe sequential update strategy:
1. Checks gig ownership and status
2. Updates selected bid to hired
3. Rejects all other bids
4. Marks gig as assigned
