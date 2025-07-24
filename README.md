# TomeTalk 

A modern, full-stack book review platform built with the MERN stack. TomeTalk provides a sleek interface for book enthusiasts to discover, review, and discuss their favorite books with a passionate community of readers.

##  Features

### Core Features
- **Book Management**: Add, edit, delete, and browse books with comprehensive metadata
- **Review System**: Write, edit, and delete reviews with 5-star rating system
- **User Authentication**: Secure JWT-based authentication with signup/login
- **Search & Filter**: Advanced search and filtering by genre, author, ratingW
- **User Profiles**: Personal dashboards to manage books and reviews
- **Responsive Design**: Mobile-first responsive UI with modern animations

### Advanced Features
- **Real-time Rating Calculations**: Automatic average rating updates using MongoDB aggregation
- **Pagination**: Efficient data loading with paginated API responses
- **Form Validation**: Client and server-side validation with detailed error messages
- **Protected Routes**: Role-based access control for authenticated features
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Rate Limiting**: API protection against abuse with express-rate-limit
- **Security**: Helmet.js for security headers, CORS configuration

##  Tech Stack

### Backend
- **Runtime**: Node.js (ES6+ modules)
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB with Mongoose ODM 8.0.3
- **Authentication**: JWT (jsonwebtoken 9.0.2) + bcryptjs 2.4.3
- **Validation**: express-validator 7.0.1
- **Security**: 
  - helmet 7.1.0 (security headers)
  - express-rate-limit 7.1.5 (rate limiting)
  - cors 2.8.5 (CORS handling)
- **Environment**: dotenv 16.3.1
- **Development**: nodemon 3.0.2

### Frontend
- **Framework**: React 18.3.1 with TypeScript 5.5.3
- **Build Tool**: Vite 5.4.1 with SWC plugin
- **Routing**: React Router DOM 6.26.2
- **State Management**: TanStack Query 5.56.2 (react-query)
- **HTTP Client**: Axios 1.10.0
- **Styling**: 
  - Tailwind CSS 3.4.11
  - Tailwind Typography plugin
  - Custom CSS animations
- **UI Components**: 
  - Radix UI primitives (30+ components)
  - Custom component library with shadcn/ui architecture
  - Framer Motion 12.23.0 for animations
- **Forms**: React Hook Form 7.53.0 with Hookform Resolvers
- **Icons**: 
  - Lucide React 0.462.0
  - Tabler Icons React 3.34.1
  - React Icons 5.5.0
- **Notifications**: Sonner (toast notifications)
- **Development**: 
  - ESLint 9.9.0 with TypeScript rules
  - PostCSS 8.4.47
  - Autoprefixer 10.4.20

### Database Schema
- **Users**: Name, email, hashed password with bcrypt
- **Books**: Title, author, genre, description, cover URL, ratings, creator reference
- **Reviews**: Review text, rating (1-5), book/user references, timestamps

### Deployment & DevOps
- **Containerization**: Docker support with multi-stage builds
- **Frontend Deployment**: Vercel-ready configuration
- **Backend Deployment**: Dockerized with health checks
- **Environment Management**: Separate configs for development/production

##  Architecture

### Project Structure
```
tomeTalk/
├── backend/               # Express.js API server
│   ├── config/            # Database configuration
│   ├── controllers/       # Business logic (Auth, Books, Reviews)
│   ├── middleware/        # Auth, validation, error handling
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API route definitions
│   ├── utils/             # Helper functions
│   ├── Dockerfile         # Container configuration
│   └── server.js          # Express app entry point
├── frontend/              # React TypeScript app
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ui/        # Base UI primitives
│   │   │   ├── profile/   # Profile-specific components
│   │   │   ├── books/     # Book-related components
│   │   │   └── landing/   # Landing page components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Route components
│   │   ├── services/      # API client configuration
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Helper functions
│   ├── public/            # Static assets
│   └── vite.config.ts     # Build configuration
└── README.md              
```

### Design Patterns & Principles

#### Backend Architecture
- **MVC Pattern**: Clean separation of concerns with Models, Views (JSON responses), Controllers
- **Middleware Chain**: Modular request processing (auth, validation, error handling)
- **Repository Pattern**: Mongoose models abstract database operations
- **Error-First Callbacks**: Consistent error handling throughout the application

#### Frontend Architecture
- **Component Composition**: Reusable UI components with props interface
- **Custom Hooks**: Business logic abstraction 
- **Context Pattern**: Global state management for authentication
- **Query Invalidation**: Optimistic updates with TanStack Query
- **Type Safety**: TypeScript interfaces for all data structures

#### API Design
- **RESTful Endpoints**: Standard HTTP methods and status codes
- **Consistent Response Format**: Unified JSON structure with success/error states
- **Pagination**: Cursor-based pagination for efficient data loading
- **Input Validation**: Server-side validation with detailed error messages
- **Authentication**: Bearer token authorization with JWT

##  Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- MongoDB 4.4+ (local or MongoDB Atlas)
- Git

### Environment Variables
Create `.env` files in both backend and frontend directories:

#### Backend `.env`
```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/tometalk
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tometalk

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex_at_least_32_chars
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:8080
```

#### Frontend `.env` (optional)
```env
VITE_API_URL=http://localhost:8000
```

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/tomeTalk.git
cd tomeTalk
```

#### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file (or use the provided script)
cp .env.example .env  # Edit with your values

# Start development server
npm run dev
# OR use the convenience script
./start-dev.sh    # Linux/Mac
start-dev.bat     # Windows
```

The backend will start on `http://localhost:8000`

#### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:8080`

#### 4. Database Setup
- **Local MongoDB**: Ensure MongoDB is running locally
- **MongoDB Atlas**: Update the MONGODB_URI in your .env file
- The application will automatically create the database and collections

### Production Build

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm run preview
```

### Docker Deployment

#### Backend Docker
```bash
cd backend
docker build -t tometalk-backend .
docker run -p 8000:8000 --env-file .env tometalk-backend
```

### API Testing
The backend includes these test endpoints:
- `GET /health` - Health check
- `GET /` - API information

##  API Documentation

### Authentication Endpoints
```
POST /api/auth/signup    # User registration
POST /api/auth/login     # User login
GET  /api/auth/me        # Get current user (protected)
```

### Books Endpoints
```
GET    /api/books              # Get all books (with pagination/filtering)
POST   /api/books              # Create book (protected)
GET    /api/books/genres       # Get available genres
GET    /api/books/my-books     # Get user's books (protected)
GET    /api/books/:id          # Get book by ID
PUT    /api/books/:id          # Update book (protected, owner only)
DELETE /api/books/:id          # Delete book (protected, owner only)
```

### Reviews Endpoints
```
GET    /api/reviews/:bookId           # Get reviews for book
POST   /api/reviews/:bookId           # Create review (protected)
GET    /api/reviews/my-reviews        # Get user's reviews (protected)
GET    /api/reviews/single/:id        # Get single review
PUT    /api/reviews/single/:id        # Update review (protected, owner only)
DELETE /api/reviews/single/:id        # Delete review (protected, owner only)
```

### Request/Response Examples

#### Create Book Request
```json
POST /api/books
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Literary Fiction",
  "description": "A classic American novel...",
  "coverUrl": "https://example.com/cover.jpg"
}
```

#### API Response Format
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Literary Fiction",
    "averageRating": 4.2,
    "totalReviews": 15,
    "createdBy": {
      "_id": "64a1b2c3d4e5f678901234",
      "name": "John Doe"
    },
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

##  UI/UX Design

### Design System : Neo-Brutalist
- **Color Scheme**: Dark theme with custom color palette
  - Primary: Charcoal (#353C53)
  - Accent: Charm Pink (#FF5582)
  - Secondary: Violet Blue (#6F67CB)
  - Text: White/Slate variations
- **Typography**: Custom font hierarchy with responsive scaling
- **Components**: Consistent design language across all components
- **Animations**: Smooth transitions with Framer Motion
- **Responsive**: Mobile-first design with Tailwind breakpoints

### Key UI Components
- **BentoGrid**: Modern grid layout for content organization
- **DockNav**: Floating navigation dock with smooth animations
- **StarRating**: Interactive star rating component
- **BookCard**: Elegant book display cards with hover effects
- **Modal Dialogs**: Accessible modal system for forms and confirmations

##  Security Features

### Backend Security
- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure authentication with expiration
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: express-validator for all user inputs
- **CORS Configuration**: Restricted cross-origin requests
- **Security Headers**: Helmet.js for security best practices
- **Error Handling**: No sensitive information in error responses

### Frontend Security
- **Input Sanitization**: XSS prevention in user inputs
- **Protected Routes**: Authentication required for sensitive pages
- **Token Management**: Secure token storage and automatic refresh
- **Form Validation**: Client-side validation with server-side verification

##  Performance Optimizations

### Backend Optimizations
- **Database Indexing**: MongoDB indexes on frequently queried fields
- **Aggregation**: Efficient rating calculations
- **Pagination**: Cursor-based pagination for large datasets

### Frontend Optimizations
- **Query Caching**: TanStack Query intelligent caching
- **Memoization**: React.memo and useMemo for expensive operations

## Known Limitations

### Current Limitations
1. **File Upload**: No direct image upload - uses external URLs for book covers
2. **Search**: Basic text search - no full-text search
3. **Social Features**: No user following, comments on reviews, or social interactions
4. **Book Metadata**: No ISBN lookup or external book API integration
5. **Analytics**: No user analytics or reading statistics

## Future Roadmap

### Phase 1: Core Enhancements
-  File upload system for book covers
-  Advanced search with Elasticsearch
-  User profile customization
-  Book recommendations algorithm

### Phase 2: Social Features
-  User following system
-  Comments on reviews
-  Book clubs and discussions
-  Reading lists and wishlists
-  Social sharing integration

### Phase 3: Advanced Features
-  Real-time chat and discussions
-  Book reading progress tracking
-  Integration with external book APIs
-  Analytics dashboard

## Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards
- **Backend**: ESLint configuration with Node.js best practices
- **Frontend**: ESLint with TypeScript and React rules
- **Commits**: Conventional commit messages

### Issue Reporting
Please use the GitHub issue tracker to report bugs or request features. Include:
- Environment details (OS, Node version, browser)
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Prateek Mohapatra**
- GitHub: [@ezahpizza](https://github.com/ezahpizza)
- Project Repository: [tomeTalk](https://github.com/ezahpizza/tomeTalk)



