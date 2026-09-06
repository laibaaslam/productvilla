# ProductVilla

ProductVilla is a full-stack e-commerce store built with the MERN stack. Shoppers can browse products by category, view details, add items to a cart, and place orders. Admins can manage categories, products, and order status from a protected dashboard.

## Features

- User signup, login, and JWT-protected routes
- Product catalog with photos, categories, and pagination
- Shopping cart and checkout/payment flow
- User profile and order history
- Admin dashboard to create and update products and categories
- Admin order management and status updates

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React, React Router, Axios, Bootstrap, Ant Design |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| Auth | JSON Web Tokens and bcrypt |

## Project structure

```
.
├── server.js              # Express API entry point
├── config/                # Database connection
├── controllers/           # Auth, category, and product logic
├── models/                # MongoDB schemas
├── routes/                # REST API routes
├── middlewares/           # Login and admin checks
├── helpers/               # Auth helpers
└── frontend/              # React storefront
```

## Getting started

### Prerequisites

- Node.js 18 or later
- A MongoDB Atlas database (or a local MongoDB instance)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/productvilla.git
cd productvilla
```

### 2. Install dependencies

```bash
npm install
cd frontend
npm install
cd ..
```

### 3. Configure environment variables

Copy the example files and fill in your own values. Never commit real secrets.

```bash
copy .env.example .env
copy frontend\.env.example frontend\.env
```

Root `.env`:

```
PORT=8080
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Frontend `.env`:

```
REACT_APP_API=http://localhost:8080
```

### 4. Run the app

From the project root:

```bash
npm run dev
```

This starts the API on [http://localhost:8080](http://localhost:8080) and the React app on [http://localhost:3000](http://localhost:3000).

You can also run them separately:

```bash
npm run server
npm run client
```

## API overview

| Method | Path | Description |
| --- | --- | --- |
| POST | `/api/auth/signup` | Create a user account |
| POST | `/api/auth/login` | Log in and receive a token |
| PUT | `/api/auth/profile` | Update the signed-in user's profile |
| GET | `/api/auth/orders` | Get the signed-in user's orders |
| GET | `/api/product/get-product` | List products |
| GET | `/api/product/get-product/:slug` | Get one product |
| POST | `/api/product/create-product` | Create a product (admin) |
| GET | `/api/category` | Category routes |
| POST | `/api/product/payment` | Place an order |

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Run API and React together |
| `npm run server` | Run the Express API with nodemon |
| `npm run client` | Run the React storefront |
| `npm start` | Run the API once with Node |

## License

ISC
