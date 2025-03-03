# Jobs API

A RESTful API built with Node.js and Express for a job search and management system. This project implements complete user authentication and job CRUD operations, integrated with multiple security protection mechanisms.

## Project Overview

This API allows users to register, login, and manage their job applications. Each user can create, view, update, and delete their own job records. The system implements JWT-based authentication to ensure users can only access their own data.

## Tech Stack

- **Backend Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Security**:
  - Helmet (HTTP headers security)
  - CORS
  - XSS Protection
  - Rate Limiting
  - Password Hashing (bcryptjs)

## API Features

- Complete user authentication system (registration/login)
- Role-based access control
- Job CRUD operations
- Custom error handling
- Data validation
- API rate limiting

## Data Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
```

### Job Model
```javascript
{
  company: String,
  position: String,
  status: String (enum: ['interview', 'declined', 'pending']),
  createdBy: ObjectId (reference to User model)
}
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Register a new user |
| POST | /api/v1/auth/login | User login |

### Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/jobs | Create a new job |
| GET | /api/v1/jobs | Get all jobs |
| GET | /api/v1/jobs/:id | Get a specific job |
| PATCH | /api/v1/jobs/:id | Update a job |
| DELETE | /api/v1/jobs/:id | Delete a job |

## Security Mechanisms

- **JWT Authentication**: All job-related endpoints are protected by JWT tokens
- **Password Security**: Using bcryptjs for password hashing
- **Input Validation**: Using Mongoose schema validation
- **Error Handling**: Custom error handling middleware
- **HTTP Security**: Using Helmet to protect HTTP headers
- **Rate Limiting**: Prevention of brute force attacks and DoS attacks

## Error Handling

The API uses custom error classes for consistent error responses:

- `BadRequestError`: 400 errors (invalid input)
- `UnauthenticatedError`: 401 errors (authentication failure)
- `NotFoundError`: 404 errors (resource not found)
- Includes custom error messages and appropriate status codes

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file and set the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=30d
```

### 3. Start the Server

```bash
npm start
```

The server will start at `http://localhost:3000`

## Development Tools

- Nodemon (automatic server restart)

## Future Enhancements

- Implement advanced job search and filtering functionality
- Add job application status tracking
- Integrate email notification system
- Add user profile page and avatar upload functionality
- Implement OAuth login options (Google, LinkedIn, etc.)

## License

MIT
