# Instagram Clone - Full Stack Social Media Application

A full-stack Instagram-like social media application built with Node.js, Express, MongoDB, and React. Features include user authentication, post creation with image uploads, follow/unfollow system, like functionality, and follow request management.

## Features

### Backend Features
- ✅ User Registration & Login
- ✅ JWT Authentication with Cookie Storage
- ✅ Secure Password Hashing (bcryptjs)
- ✅ User Profile Management (bio, profile picture)
- ✅ Post Creation with Image Upload (ImageKit)
- ✅ Posts Feed
- ✅ Post Details
- ✅ Follow/Unfollow Users
- ✅ Follow Request Management (Accept/Reject)
- ✅ Like/Unlike Posts
- ✅ Protected Routes with Auth Middleware

### Frontend Features
- ✅ React-based SPA
- ✅ User Authentication UI (Login/Register)
- ✅ Posts Management Interface
- ✅ Responsive Design
- ✅ React Router for Navigation

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
- **Styling:** CSS

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
│   └── src/
│       ├── App.jsx                    # Main App component
│       ├── main.jsx                   # React entry point
│       ├── routes.jsx                 # Route configuration
│       └── features/
│           ├── auth/
│           │   ├── Login.jsx          # Login page
│           │   └── Register.jsx       # Registration page
│           └── posts/                 # Post components
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

1. **Password Hashing:** Uses bcryptjs with salt rounds for secure password hashing ✓
2. **JWT Secret:** Use a strong, randomly generated secret in production
3. **HTTPS:** Always use HTTPS in production to protect cookies and tokens
4. **Cookie Security:** Consider adding `httpOnly`, `secure`, and `sameSite` flags to cookies in production
5. **Environment Variables:** Never commit `.env` files to version control
6. **Input Validation:** Implement proper input validation and sanitization
7. **Rate Limiting:** Add rate limiting to prevent abuse
8. **Image Upload:** ImageKit handles secure image storage and CDN delivery
9. **Authentication Middleware:** Protected routes require valid JWT tokens

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

- [ ] Comments on posts
- [ ] Stories functionality
- [ ] Direct messaging
- [ ] Notifications system
- [ ] Search functionality
- [ ] User profiles page
- [ ] Edit profile
- [ ] Delete posts
- [ ] Image filters
- [ ] Hashtags support

## Repository

GitHub: [instaclone-fullStackMiniProject01](https://github.com/Hrithik852/instaclone-fullStackMiniProject01-)

## License

ISC

---

**Note:** This is a full-stack learning project featuring a complete Instagram-like social media platform with authentication, posts, follows, and likes functionality.
