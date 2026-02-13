# Authentication API

A RESTful authentication API built with Node.js, Express, and MongoDB. This project provides user registration and login functionality with JWT-based authentication.

## Features

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Cookie-based Token Storage
- ✅ Password Hashing (MD5)
- ✅ MongoDB Integration
- ✅ User Profile Management (bio, profile picture)

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5.2.1
- **Database:** MongoDB (via Mongoose v9.2.1)
- **Authentication:** JSON Web Tokens (jsonwebtoken v9.0.3)
- **Environment Variables:** dotenv v17.3.1
- **Middleware:** cookie-parser v1.4.7

## Project Structure

```
.
├── server.js                 # Entry point
├── package.json             # Dependencies and scripts
├── src/
│   ├── app.js              # Express app configuration
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── controllers/
│   │   └── auth.controller.js  # Authentication logic
│   ├── models/
│   │   └── user.model.js   # User schema
│   └── routes/
│       └── auth.routes.js  # API routes
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd day8
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGO_ID=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   node server.js
   ```

   The server will run on `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:3000/api/auth
```

### 1. Register User
**POST** `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword",
  "bio": "Software Developer",
  "pfp": "https://example.com/profile.jpg"
}
```

**Response (201 Created):**
```json
{
  "message": "user registered succesfully",
  "user": {
    "username": "johndoe",
    "email": "john@example.com",
    "bio": "Software Developer",
    "pfp": "https://example.com/profile.jpg"
  }
}
```

**Notes:**
- `bio` and `pfp` are optional
- Default profile picture is provided if not specified
- Sets a JWT token in cookies

### 2. Login User
**POST** `/api/auth/login`

Authenticate an existing user.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```
*Note: You can provide either `username` or `email` (or both)*

**Response (201 Created):**
```json
{
  "message": "user logged in succesfully",
  "user": {
    "username": "johndoe",
    "email": "john@example.com",
    "bio": "Software Developer",
    "pfp": "https://example.com/profile.jpg"
  }
}
```

**Notes:**
- Sets a JWT token in cookies
- Token expires in 1 day

## Error Responses

### Registration Errors

**409 Conflict** - Email already exists:
```json
{
  "message": "email already in use"
}
```

**409 Conflict** - Username already exists:
```json
{
  "message": "username taken"
}
```

### Login Errors

**409 Conflict** - User not found:
```json
{
  "message": "user not found"
}
```

**409 Conflict** - Invalid password:
```json
{
  "message": "invalid pass"
}
```

## Database Schema

### User Model

```javascript
{
  username: String,     // Required, Unique
  email: String,        // Required, Unique
  password: String,     // Required, MD5 Hashed
  bio: String,          // Optional
  pfp: String          // Optional, Default provided
}
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_ID` | MongoDB connection string | `mongodb://localhost:27017/mydb` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key-here` |

## Security Considerations

⚠️ **Important Security Notes:**

1. **Password Hashing:** Currently using MD5 hashing. For production, consider using bcrypt or argon2 for better security.
2. **JWT Secret:** Use a strong, randomly generated secret in production.
3. **HTTPS:** Always use HTTPS in production to protect cookies and tokens.
4. **Cookie Security:** Consider adding `httpOnly`, `secure`, and `sameSite` flags to cookies in production.

## Development

To start the development server:

```bash
node server.js
```

## License

ISC

## Author

[Your Name]

---

**Note:** This is a learning project (Day 8). For production use, implement additional security measures, input validation, and error handling.
