# Instagram Clone - Full Stack Social Media Application

A full-stack Instagram-like social media application built with **Node.js**, **Express**, **MongoDB**, and **React**. This project demonstrates modern web development practices including JWT authentication, RESTful API design, and component-based frontend architecture.

## ✨ Features

### 🔐 Authentication & User Management
- User registration and login with JWT authentication
- HTTP-only cookie storage for secure token management
- Password hashing with bcryptjs
- Protected routes via authentication middleware

### 📸 Posts & Media
- Create posts with image uploads via ImageKit CDN
- View posts feed with user information
- Get individual post details

### 👥 Social Features
- Follow/unfollow users
- Follow request management (send, accept, reject)
- Like/unlike posts
- User profile with bio and profile picture

### 🎨 Frontend
- React SPA with feature-based architecture
- Context API for global state management
- Custom hooks (useAuth)
- Service layer for API communication
- Responsive design with SCSS
- React Router navigation

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js v5.2.1
- **Database:** MongoDB (via Mongoose v9.2.1)
- **Authentication:** JSON Web Tokens (jsonwebtoken v9.0.3)
- **Password Hashing:** bcryptjs v3.0.3
- **Image Upload:** ImageKit (@imagekit/nodejs v7.3.0)
- **File Handling:** Multer v2.0.2
- **Environment Variables:** dotenv v17.3.1
- **Middleware:** cookie-parser v1.4.7

### Frontend
- **Framework:** React v19.1.1
- **Build Tool:** Vite v7.1.7
- **Routing:** React Router DOM v7.13.0
- **State Management:** Context API
- **Styling:** SCSS
- **HTTP Client:** Fetch API

## Architecture Patterns

### Backend Architecture
- **MVC Pattern:** Separation of concerns with Models, Controllers, and Routes
- **Middleware Pattern:** Authentication and request processing
- **Service Layer:** ImageKit integration for file uploads
- **Repository Pattern:** Mongoose models for data access

### Frontend Architecture
- **Feature-based Structure:** Code organized by features (auth, posts, etc.)
- **Service Layer Pattern:** API calls separated into service modules
- **Context API:** Global state management for authentication
- **Custom Hooks:** Reusable logic (useAuth)
- **Component-based Architecture:** Modular and reusable React components

## Key Features Explained

### Authentication Flow
1. **Registration:** User creates account → Password hashed with bcrypt → JWT token generated → Token stored in HTTP-only cookie
2. **Login:** User authenticates → Credentials verified → JWT token issued → Cookie set with 1-day expiration
3. **Protected Routes:** Middleware verifies JWT token from cookies → User data attached to request → Access granted or denied

### Follow System
- **Follow Request:** User sends follow request → Status set to "pending"
- **Accept Request:** Recipient accepts → Status updates to "accepted" → Both users connected
- **Reject Request:** Request deleted from database
- **Unfollow:** Accepted follow relationship removed

### Post & Like System
- **Post Creation:** Image uploaded to ImageKit CDN → Post document created with image URL
- **Like Toggle:** Check if like exists → If yes, remove like → If no, add like
- **Post Feed:** Retrieves all posts with populated user information

## Project Structure

```
.
├── backend/
│   ├── server.js                      # Entry point
│   ├── package.json                   # Backend dependencies
│   └── src/
│       ├── app.js                     # Express app configuration
│       ├── config/
│       │   └── db.js                  # Database connection
│       ├── controllers/
│       │   ├── auth.controller.js     # Authentication logic
│       │   ├── post.controller.js     # Post management
│       │   └── user.controller.js     # User actions (follow/like)
│       ├── middlewares/
│       │   └── auth.middleware.js     # JWT verification middleware
│       ├── models/
│       │   ├── user.model.js          # User schema
│       │   ├── post.model.js          # Post schema
│       │   ├── like.model.js          # Like schema
│       │   └── follow.model.js        # Follow schema
│       └── routes/
│           ├── auth.routes.js         # Auth endpoints
│           ├── post.routes.js         # Post endpoints
│           └── user.routes.js         # User endpoints
├── frontend/
│   ├── index.html                     # HTML entry
│   ├── package.json                   # Frontend dependencies
│   ├── vite.config.js                 # Vite configuration
│   ├── eslint.config.js               # ESLint configuration
│   └── src/
│       ├── App.jsx                    # Main App component
│       ├── AppRoutes.jsx              # Route configuration
│       ├── main.jsx                   # React entry point
│       ├── style.scss                 # Global styles
│       ├── assets/                    # Static assets
│       └── features/
│           └── auth/
│               ├── auth.context.jsx   # Auth context provider
│               ├── hooks/
│               │   └── useAuth.js     # Auth custom hook
│               ├── pages/
│               │   ├── Login.jsx      # Login page
│               │   └── Register.jsx   # Registration page
│               ├── services/
│               │   └── auth.api.js    # Auth API service layer
│               └── styles/
│                   └── forms.scss     # Auth form styles
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- ImageKit account (for image uploads)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hrithik852/instaclone-fullStackMiniProject01-.git
   cd day8/backend
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_ID=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```

4. **Start the backend server**
   ```bash
   node server.js
   # or for development with auto-reload
   npm run dev
   ```

   The backend server will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

---

### Authentication Routes (`/api/auth`)

#### 1. Register User
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
- Password is hashed using bcrypt
- Sets JWT token in cookies

#### 2. Login User
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
- Sets JWT token in cookies
- Token expires in 1 day

---

### Post Routes (`/api/posts`)

#### 3. Create Post
**POST** `/api/posts`

Create a new post with an image.

**Request:** `multipart/form-data`
- `photo`: Image file (required)
- `caption`: Post caption (optional)

**Headers:**
- Requires authentication cookie

**Response (201 Created):**
```json
{
  "message": "Post created successfully",
  "post": {
    "_id": "post_id",
    "caption": "Beautiful sunset!",
    "ImageUrl": "https://ik.imagekit.io/...",
    "user": "user_id"
  }
}
```

#### 4. Get Posts Feed
**GET** `/api/posts`

Retrieve all posts for the feed.

**Headers:**
- Requires authentication cookie

**Response (200 OK):**
```json
{
  "posts": [
    {
      "_id": "post_id",
      "caption": "Beautiful sunset!",
      "ImageUrl": "https://ik.imagekit.io/...",
      "user": {
        "_id": "user_id",
        "username": "johndoe",
        "pfp": "https://..."
      }
    }
  ]
}
```

#### 5. Get Post Details
**GET** `/api/posts/details/:id`

Get detailed information about a specific post.

**Headers:**
- Requires authentication cookie

**Response (200 OK):**
```json
{
  "post": {
    "_id": "post_id",
    "caption": "Beautiful sunset!",
    "ImageUrl": "https://ik.imagekit.io/...",
    "user": {
      "_id": "user_id",
      "username": "johndoe",
      "pfp": "https://..."
    }
  }
}
```

---

### User Routes (`/api/users`)

#### 6. Follow User
**POST** `/api/users/follow/:username`

Send a follow request to a user.

**Headers:**
- Requires authentication cookie

**Response (200 OK):**
```json
{
  "message": "Follow request sent"
}
```

#### 7. Unfollow User
**POST** `/api/users/unfollow/:username`

Unfollow a user.

**Headers:**
- Requires authentication cookie

**Response (200 OK):**
```json
{
  "message": "Unfollowed successfully"
}
```

#### 8. Like Post
**POST** `/api/users/like/:postId`

Like or unlike a post.

**Headers:**
- Requires authentication cookie

**Response (200 OK):**
```json
{
  "message": "Post liked/unliked"
}
```

#### 9. Get Follow Requests
**GET** `/api/users/follow/requests`

Get all pending follow requests.

**Headers:**
- Requires authentication cookie

**Response (200 OK):**
```json
{
  "requests": [
    {
      "_id": "request_id",
      "from": "user_id",
      "status": "pending"
    }
  ]
}
```

#### 10. Accept Follow Request
**PATCH** `/api/users/follow/requests/:username/accept`

Accept a follow request from a user.

**Headers:**
- Requires authentication cookie

**Response (200 OK):**
```json
{
  "message": "Follow request accepted"
}
```

#### 11. Reject Follow Request
**DELETE** `/api/users/follow/requests/:username/reject`

Reject a follow request from a user.

**Headers:**
- Requires authentication cookie

**Response (200 OK):**
```json
{
  "message": "Follow request rejected"
}
```

---

## Error Responses

### Authentication Errors

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

### Authorization Errors

**401 Unauthorized** - No token provided or invalid token:
```json
{
  "message": "Unauthorized"
}
```

## Database Schema

### User Model

```javascript
{
  username: String,     // Required, Unique
  email: String,        // Required, Unique
  password: String,     // Required, bcrypt Hashed
  bio: String,          // Optional
  pfp: String          // Optional, Default: avatar URL
}
```

### Post Model

```javascript
{
  caption: String,                    // Optional, Default: ""
  ImageUrl: String,                   // Required
  user: ObjectId                      // Required, Reference to User
}
```

### Like Model

```javascript
{
  user: ObjectId,       // Reference to User
  post: ObjectId        // Reference to Post
}
```

### Follow Model

```javascript
{
  from: ObjectId,       // Reference to User (follower)
  to: ObjectId,         // Reference to User (following)
  status: String        // "pending" or "accepted"
}
```

## Environment Variables

### Backend (.env in backend/)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `MONGO_ID` | MongoDB connection string | `mongodb://localhost:27017/instagram` | Yes |
| `JWT_SECRET` | Secret key for JWT signing | `your-strong-secret-key` | Yes |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public API key | `public_xxx` | Yes |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private API key | `private_xxx` | Yes |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint | `https://ik.imagekit.io/your_id` | Yes |

## Security Considerations

⚠️ **Important Security Notes:**

### Implemented Security Features ✓
1. **Password Hashing:** bcryptjs with salt rounds for secure password storage
2. **JWT Authentication:** Token-based authentication with expiration
3. **Protected Routes:** Middleware-based route protection
4. **Secure File Upload:** ImageKit CDN for secure image storage

### Production Recommendations ⚠️
1. **JWT Secret:** Use a strong, randomly generated secret (min 32 characters)
2. **HTTPS:** Always use HTTPS in production to protect cookies and tokens
3. **Cookie Security:** Add `httpOnly`, `secure`, and `sameSite` flags:
   ```javascript
   res.cookie('token', token, {
     httpOnly: true,
     secure: process.env.NODE_ENV === 'production',
     sameSite: 'strict',
     maxAge: 86400000 // 1 day
   });
   ```
4. **Environment Variables:** Never commit `.env` files to version control
5. **Input Validation:** Implement validation with libraries like Joi or express-validator
6. **Rate Limiting:** Add rate limiting with express-rate-limit
7. **CORS Configuration:** Configure CORS properly for your domain
8. **Security Headers:** Use helmet.js for security headers
9. **MongoDB Injection:** Mongoose provides some protection, but sanitize inputs
10. **File Upload Validation:** Validate file types and sizes before upload

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with hot reload
```

## Scripts

### Backend Scripts
- `npm run dev` - Start development server with nodemon
- `node server.js` - Start production server

### Frontend Scripts
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features to Implement

### High Priority
- [ ] User profiles page with followers/following lists
- [ ] Edit profile functionality
- [ ] Delete posts
- [ ] Comments on posts
- [ ] Notifications system

### Medium Priority
- [ ] Search functionality (users and posts)
- [ ] Post feed algorithm (following users only)
- [ ] Direct messaging
- [ ] Stories functionality
- [ ] Image filters and editing

### Low Priority
- [ ] Hashtags support
- [ ] Saved posts
- [ ] Multiple images per post
- [ ] Video posts
- [ ] Explore page

## Contributing

Contributions are welcome! This is a learning project, so feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

**Backend won't start:**
- Verify MongoDB is running and connection string is correct
- Check if port 3000 is already in use
- Ensure all environment variables are set in `.env`

**Authentication not working:**
- Clear browser cookies
- Check JWT_SECRET is set correctly
- Verify token expiration hasn't passed

**Image upload fails:**
- Verify ImageKit credentials in `.env`
- Check file size (ImageKit may have limits)
- Ensure file type is supported

**CORS errors:**
- Configure CORS in `app.js` for your frontend URL
- In development: `cors({ origin: 'http://localhost:5173', credentials: true })`

**MongoDB connection errors:**
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure network access is configured

## Repository

GitHub: [instaclone-fullStackMiniProject01](https://github.com/Hrithik852/instaclone-fullStackMiniProject01-)

## Author

**Hrithik852**
- GitHub: [@Hrithik852](https://github.com/Hrithik852)

## License

This project is licensed under the ISC License - free to use for learning and educational purposes.

---

**Built with ❤️ as a full-stack learning project**

This Instagram clone demonstrates modern web development practices including RESTful API design, JWT authentication, file uploads, database relationships, and a React-based frontend with feature-driven architecture. Perfect for learning full-stack development concepts!
