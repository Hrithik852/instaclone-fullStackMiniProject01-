# Instagram Clone - Full Stack Social Media Application

A full-stack Instagram-like social media application built with **Node.js**, **Express**, **MongoDB**, and **React**. This project demonstrates modern web development practices including JWT authentication, RESTful API design, and component-based frontend architecture.

- **Repository:** [GitHub](https://github.com/Hrithik852/instaclone-fullStackMiniProject01-)
- **Author:** [Hrithik852](https://github.com/Hrithik852)
- **License:** ISC License

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

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Backend** | Express.js 5.2.1 | Web application framework |
| | MongoDB + Mongoose 9.2.1 | Database and ODM |
| | JWT + bcryptjs | Authentication & password security |
| | ImageKit + Multer | Image upload & storage |
| | cookie-parser | Cookie handling |
| **Frontend** | React 19.1.1 | UI library |
| | Vite 7.1.7 | Build tool & dev server |
| | React Router 7.13.0 | Client-side routing |
| | Axios 1.13.5 | HTTP client |
| | SCSS | Styling |

## 🏗️ Architecture

### Backend (MVC Pattern)
- **Models:** Mongoose schemas for User, Post, Like, Follow
- **Controllers:** Business logic for auth, posts, and user actions
- **Routes:** RESTful API endpoints
- **Middlewares:** JWT authentication, request validation
- **Services:** ImageKit integration for file uploads

### Frontend (Feature-based)
- **Feature modules:** Self-contained features (auth, posts, etc.)
- **Context API:** Global authentication state
- **Custom hooks:** Reusable logic (useAuth)
- **Service layer:** API communication abstraction
- **Component-based:** Modular React components

### Key Flows

**Authentication:**
```
Register → Hash Password → Generate JWT → Set HTTP-only Cookie → Redirect
Login → Verify Credentials → Generate JWT → Set Cookie → Access Protected Routes
Protected Route → Verify JWT Middleware → Attach User to Request → Proceed
```

**Social Interactions:**
```
Follow → Create pending request → Accept/Reject → Update relationship
Like → Check existence → Toggle like → Update count
Post → Upload to ImageKit → Save URL to MongoDB → Display in feed
```

## 📁 Project Structure

```
day8/
├── backend/
│   ├── server.js                          # Application entry point
│   ├── package.json
│   └── src/
│       ├── app.js                         # Express app setup & middleware
│       ├── config/
│       │   └── db.js                      # MongoDB connection
│       ├── controllers/
│       │   ├── auth.controller.js         # Registration, login, logout
│       │   ├── post.controller.js         # CRUD operations for posts
│       │   └── user.controller.js         # Follow/unfollow, like/unlike
│       ├── middlewares/
│       │   └── auth.middleware.js         # JWT token verification
│       ├── models/
│       │   ├── user.model.js              # User schema & methods
│       │   ├── post.model.js              # Post schema
│       │   ├── like.model.js              # Like relationships
│       │   └── follow.model.js            # Follow/request relationships
│       └── routes/
│           ├── auth.routes.js             # /api/auth endpoints
│           ├── post.routes.js             # /api/posts endpoints
│           └── user.routes.js             # /api/users endpoints
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx                        # Root component
│       ├── app.routes.jsx                 # Route definitions
│       ├── main.jsx                       # React entry point
│       └── features/
│           └── auth/
│               ├── auth.context.jsx       # Auth state & provider
│               ├── hooks/
│               │   └── useAuth.js         # Auth hook
│               ├── pages/
│               │   ├── Login.jsx          # Login form
│               │   └── Register.jsx       # Registration form
│               ├── services/
│               │   └── auth.api.js        # Auth API calls
│               └── styles/
│                   └── forms.scss         # Form styling
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 14+ ([Download](https://nodejs.org/))
- **MongoDB** ([Local install](https://www.mongodb.com/try/download/community) or [Atlas account](https://www.mongodb.com/cloud/atlas))
- **ImageKit account** ([Sign up](https://imagekit.io/))

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the `backend` directory:
   ```env
   MONGO_ID=mongodb://localhost:27017/instagram_clone
   # or use MongoDB Atlas connection string
   
   JWT_SECRET=your_super_secure_random_jwt_secret_key
   
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
   ```

4. **Start the server:**
   ```bash
   npm run dev        # Development with nodemon
   # or
   node server.js     # Production
   ```
   
   Backend runs at **http://localhost:3000**

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   Frontend runs at **http://localhost:5173**

### Quick Start (Both Servers)
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

## 📡 API Endpoints

**Base URL:** `http://localhost:3000/api`

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | Login user | ❌ |
| POST | `/logout` | Logout user | ✅ |

### Posts (`/api/posts`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all posts | ✅ |
| GET | `/:id` | Get post by ID | ✅ |
| POST | `/` | Create new post | ✅ |

### Users (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/follow/:userId` | Follow user | ✅ |
| DELETE | `/unfollow/:userId` | Unfollow user | ✅ |
| POST | `/accept/:requestId` | Accept follow request | ✅ |
| DELETE | `/reject/:requestId` | Reject follow request | ✅ |
| POST | `/like/:postId` | Like/unlike post | ✅ |

### Example Requests

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Create Post (with authentication cookie):**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Cookie: token=<your_jwt_token>" \
  -F "caption=Beautiful sunset!" \
  -F "image=@/path/to/image.jpg"
```
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
  "message": "user registered successfully",
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
- Sets JWT token in HTTP-only cookies

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
  "message": "user logged in successfully",
  "user": {
    "username": "johndoe",
    "email": "john@example.com",
    "bio": "Software Developer",
    "pfp": "https://example.com/profile.jpg"
  }
}
```

**Notes:**
- Sets JWT token in HTTP-only cookies
- Can login with username or email

#### 3. Logout User
**POST** `/api/auth/logout`

Logs out the current user by clearing the authentication token.

**Response (200 OK):**
```json
{
  "message": "user logged out successfully"
}
```

## 🗄️ Database Models

### User
```javascript
{
  username: String,     // Unique, required
  email: String,        // Unique, required
  password: String,     // Hashed with bcrypt
  bio: String,          // Optional
  pfp: String          // Profile picture URL
}
```

### Post
```javascript
{
  caption: String,      // Optional
  ImageUrl: String,     // ImageKit CDN URL
  user: ObjectId        // Reference to User
}
```

### Like
```javascript
{
  user: ObjectId,       // Reference to User
  post: ObjectId        // Reference to Post
}
```

### Follow
```javascript
{
  follower: ObjectId,   // User who follows
  following: ObjectId,  // User being followed
  status: String        // 'accepted' or 'pending'
}
```

## 🔒 Security

### Implemented
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT authentication with HTTP-only cookies
- ✅ Protected routes via authentication middleware
- ✅ Secure file uploads via ImageKit CDN

### Production Recommendations
- 🔐 Use strong JWT secrets (32+ characters, random)
- 🔐 Enable HTTPS and secure cookie flags (`secure: true, sameSite: 'strict'`)
- 🔐 Add rate limiting (express-rate-limit)
- 🔐 Implement input validation (Joi or express-validator)
- 🔐 Use security headers (helmet.js)
- 🔐 Configure CORS properly for your domain
- 🔐 Validate file uploads (type, size, malware scanning)
- 🔐 Add environment-specific configurations
- 🔐 Enable MongoDB authentication in production

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
npm run dev      # Development with nodemon
node server.js   # Production server
```

**Frontend:**
```bash
npm run dev      # Vite dev server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # ESLint check
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Backend won't start** | • Verify MongoDB is running<br>• Check if port 3000 is in use (`lsof -i :3000`)<br>• Ensure all `.env` variables are set |
| **Authentication not working** | • Clear browser cookies<br>• Verify JWT_SECRET is set<br>• Check token hasn't expired |
| **Image upload fails** | • Verify ImageKit credentials<br>• Check file size limits<br>• Ensure supported file type (jpg, png, etc.) |
| **CORS errors** | Configure CORS in `app.js`:<br>`cors({ origin: 'http://localhost:5173', credentials: true })` |
| **MongoDB connection errors** | • Check MongoDB Atlas IP whitelist<br>• Verify connection string format<br>• Ensure database user has correct permissions |
| **Context not working** | • Verify component is wrapped in Provider<br>• Check context is properly exported<br>• Ensure hooks have error handling |

## 🤝 Contributing

Contributions are welcome! This is a learning project, so feel free to:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add YourFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/YourFeature
   ```
5. **Open a Pull Request**

## 📄 License

This project is licensed under the **ISC License** - free to use for learning and educational purposes.

---

<div align="center">

**Built with ❤️ as a learning project**

This Instagram clone demonstrates modern web development practices including RESTful API design, JWT authentication, file uploads, and a React-based frontend with feature-driven architecture.

Perfect for learning full-stack development!

</div>