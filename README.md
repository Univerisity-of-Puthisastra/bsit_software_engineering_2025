# Article Management System

A full-stack web application for creating, managing, and viewing articles with user authentication.

## Project Overview

This project is an Article Management System built with a React frontend and a Node.js/Express backend, using PostgreSQL as the database (via Prisma ORM). The application allows users to:

- Register and login to the system
- View a list of articles on the home page
- Create new articles (authenticated users only)
- View individual article details
- Navigate through different sections via a header menu

## Project Structure

The project is divided into two main parts:

```
├── web-frontend/          # React frontend application
└── web-backend/           # Express.js backend API
```

## Technologies Used

### Frontend
- React 18
- React Router v6 for navigation
- React Bootstrap for UI components
- Axios for API requests
- SCSS for styling
- JWT for authentication

### Backend
- Node.js with Express
- Prisma ORM
- PostgreSQL database
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing

## Frontend Structure

```
web-frontend/
├── public/                # Static files
└── src/
    ├── components/        # Reusable UI components
    │   ├── Header/        # Navigation header component
    │   └── Protected/     # Authentication wrapper component
    ├── context/           # React context providers
    │   └── user-token.js  # Authentication context
    ├── pages/             # Application pages
    │   ├── AboutUs/
    │   ├── Home/          # Article listing page
    │   ├── Login/
    │   ├── PostArticle/   # New article creation page
    │   ├── Registration/
    │   └── ViewArticle/   # Individual article page
    ├── index.js           # Application entry point
    └── Routes.js          # Application routing
```

## Backend Structure

```
web-backend/
├── middleware/            # Express middleware
│   └── auth.js            # JWT authentication middleware
├── prisma/                # Prisma ORM configuration
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
├── routers/               # API route handlers
│   ├── articles.js        # Article-related endpoints
│   ├── auths.js           # Authentication endpoints
│   └── users.js           # User-related endpoints
├── utils/                 # Utility functions
│   └── jwt.js             # JWT token generation and verification
└── server.js              # Express server setup
```

## Database Schema

The application uses PostgreSQL with the following schema:

### User Model
- id: Int (Primary Key, auto-incremented)
- name: String
- password: String (hashed)
- articles: One-to-many relation to Article

### Article Model
- id: Int (Primary Key, auto-incremented)
- title: String
- description: Text
- imageUrl: String
- authorId: Int (Foreign Key to User)
- author: Relation to User

## API Endpoints

### Authentication
- `POST /login` - Authenticate a user and return a JWT token
- `POST /protected` - Test endpoint for authenticated routes

### Users
- `GET /users` - Get current user (authenticated)
- `GET /users/:userId` - Get a specific user by ID
- `POST /users/register` - Register a new user

### Articles
- `GET /articles` - Get all articles
- `GET /articles/:articleId` - Get a specific article by ID
- `POST /articles` - Create a new article (authenticated)

## Frontend Routes

- `/` - Home page (article list)
- `/home` - Home page (article list)
- `/about-us` - About Us page
- `/login` - User login page
- `/register` - User registration page
- `/post-article` - Create new article (protected)
- `/view-article/:id` - View specific article

## Authentication Flow

1. User registers via `/register` endpoint
2. User logs in via `/login` endpoint and receives JWT token
3. Token is stored in localStorage
4. Protected routes check for valid token
5. Token is sent in Authorization header for authenticated API requests

## Installation and Setup

### Prerequisites
- Node.js (v14+)
- PostgreSQL
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd web-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the environment variables:
   - Create a `.env` file based on `.env.example`
   - Configure your PostgreSQL connection string in `DATABASE_URL`

4. Run database migrations:
   ```
   npx prisma migrate dev
   ```

5. Start the server:
   ```
   npm start
   ```
   The server will run on http://localhost:8080 by default.

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd web-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the environment variables:
   - Create a `.env` file with:
   ```
   REACT_APP_BACKEND_API=http://localhost:8080
   ```

4. Start the development server:
   ```
   npm start
   ```
   The application will be available at http://localhost:3000.

## Development Guidelines

### Code Style
- Follow the existing patterns for components and API integration
- Use functional components with hooks for new React components
- Implement proper error handling for API requests

### Adding New Features
1. For new API endpoints, create appropriate routes in the backend
2. Update the Prisma schema if additional database models are needed
3. Create new React components in the appropriate directories
4. Update the routing in `Routes.js` for new pages

## Deployment

### Backend
1. Configure production environment variables
2. Run database migrations on the production database
3. Build and deploy the application to your hosting provider

### Frontend
1. Set the production backend API URL in environment variables
2. Build the production bundle:
   ```
   npm run build
   ```
3. Deploy the contents of the `build` directory to your web server

## Contributing
1. Create a feature branch from main
2. Make your changes
3. Submit a pull request