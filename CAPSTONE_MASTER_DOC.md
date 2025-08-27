# Capstone Project Master Document

## Table of Contents

1. [Executive Summary & Vision](#executive-summary--vision)
2. [User Personas & Target Audience](#user-personas--target-audience)
3. [Product Requirements (MVP & Future)](#product-requirements-mvp--future)
4. [Technical Architecture & Stack](#technical-architecture--stack)
5. [Database Schema & API Endpoints](#database-schema--api-endpoints)
6. [Development Guidelines & Rules](#development-guidelines--rules)
7. [Key Decisions & Lessons Learned](#key-decisions--lessons-learned)
8. [Next Steps](#next-steps)

---

## Executive Summary & Vision

A beginner-friendly financial decision-making web application that helps users find the right credit card based on their financial goals, income, and credit situation. The platform provides personalized recommendations through an intuitive interface, making complex financial decisions accessible to everyone.

**Problem:** Users struggle to find credit cards that match their financial situation and goals due to overwhelming options, complex terminology, and lack of personalized guidance.

**Solution:**

- Guides users through goal-setting and financial profile creation
- Provides curated credit card options with clear explanations
- Offers personalized recommendations based on user data
- Simplifies complex financial information into digestible content

---

## User Personas & Target Audience

**Primary Users:**

- Financial Beginners (18-25): Building credit history
- Rewards Optimizers (25-40): Maximizing benefits
- Debt Managers (30-50): Consolidating or transferring debt
- Travelers (18-50): Seeking travel rewards and benefits

**Personas:**

- **Sarah (22, College Student):** Wants to build credit, overwhelmed by options, tech-savvy
- **Marcus (28, Professional):** Wants cash back, optimize spending, has some debt, tech-savvy
- **Jennifer (35, Associate Degree):** Wants to transfer debt, improve credit, confused by terms, less tech-savvy
- **Alex (30, Frequent Traveler):** Seeks travel rewards, values airport lounge access and no foreign transaction fees, motivated by maximizing travel perks, challenges include understanding travel card benefits and annual fees, tech-savvy

---

## Product Requirements (MVP & Future)

### Must-Have Features (MVP)

- Secure user registration, login, and profile management
- Set and update financial goals (goal type, income, credit score, spending)
- Browse/search credit cards with key details
- View detailed card information (rates, fees, requirements)
- Receive basic recommendations based on user goals

### Nice-to-Have/Future Features

- Save favorite cards (watchlist)
- Compare cards side-by-side
- Update goals and see new recommendations
- Access educational content
- Advanced filtering (no annual fee, rewards, etc.)
- Dynamic recommendations, usage tracking, personalized dashboard

---

## Technical Architecture & Stack

### Frontend Architecture (React 18.2.0 + Vite)

**Core Framework & Build Tools:**

- **React 18.2.0** with modern hooks (useState, useEffect, useContext, useReducer)
- **Vite** for ultra-fast development and optimized production builds
- **React Router DOM v6** for client-side routing with protected routes
- **Tailwind CSS** for rapid UI development with utility-first approach

**Component Architecture:**

- **Atomic Design Pattern:** Atoms → Molecules → Organisms → Templates → Pages
- **Smart/Dumb Component Separation:** Container components handle logic, presentational components handle UI
- **Custom Hooks:** Extract reusable logic (useAuth, useCreditCards, useRecommendations)
- **Context API:** Global state management for user authentication and preferences

**State Management Strategy:**

- **React Context** for global auth state and user preferences
- **Local State** for component-specific data (forms, UI toggles)
- **Custom Hooks** for API calls and data fetching with loading/error states
- **Optimistic Updates** for immediate UI feedback during API operations

**Performance Optimizations:**

- **React.memo()** for expensive components
- **useMemo/useCallback** for expensive calculations and event handlers
- **Code Splitting** with React.lazy() for route-based chunks
- **Virtual Scrolling** for large credit card lists (if needed)

**UI/UX Framework:**

- **Tailwind CSS** with custom design system
- **Responsive Design** with mobile-first approach
- **Accessibility** (ARIA labels, keyboard navigation, screen reader support)
- **Dark/Light Mode** toggle capability
- **Loading States** and skeleton screens for better perceived performance

### Backend Architecture (Node.js + Express + PostgreSQL)

**Server Framework & Runtime:**

- **Node.js** with latest LTS version for stability and performance
- **Express 4.18.2** with middleware-based architecture
- **PM2** or similar process manager for production deployment
- **CORS** configuration for frontend integration

**Database Layer:**

- **PostgreSQL** with connection pooling for concurrent requests
- **Knex.js** as query builder with migrations and seeding
- **Database Transactions** for data integrity (user registration, goal updates)
- **Connection Pooling** with configurable pool size and timeout
- **Database Indexing** on frequently queried columns (user_id, card_type, rewards_type)

**Authentication & Security:**

- **bcrypt** for password hashing with configurable salt rounds
- **express-session** with secure cookie configuration
- **CSRF Protection** for state-changing operations
- **Rate Limiting** with express-rate-limit for API endpoints
- **Input Validation** with Joi or express-validator
- **SQL Injection Prevention** through parameterized queries with Knex.js

**API Architecture:**

- **RESTful Design** with consistent endpoint patterns
- **Middleware Chain** for authentication, validation, and error handling
- **Response Standardization** with consistent success/error formats
- **API Versioning** strategy for future compatibility
- **Request/Response Logging** for debugging and monitoring

**Performance & Scalability:**

- **Database Query Optimization** with proper indexing and query analysis
- **Response Caching** for static credit card data
- **Compression** with express-compression for large responses
- **Request Validation** early in middleware chain to fail fast
- **Async/Await** pattern for non-blocking operations

**Error Handling & Monitoring:**

- **Centralized Error Handler** with proper HTTP status codes
- **Request Logging** with unique request IDs for tracing
- **Performance Monitoring** with response time tracking
- **Graceful Degradation** for non-critical service failures

### Development & Deployment Infrastructure

**Development Environment:**

- **Hot Reload** with Vite for frontend, nodemon for backend
- **Environment Configuration** with .env files for different stages
- **Docker** containers for consistent development environment
- **Git Hooks** with husky for pre-commit linting and testing

**Testing Strategy:**

- **Frontend:** Jest + React Testing Library for component testing
- **Backend:** Jest + Supertest for API endpoint testing
- **Integration Tests:** End-to-end user workflows
- **Performance Tests:** Load testing for recommendation algorithms

**Deployment Pipeline:**

- **CI/CD** with GitHub Actions for automated testing and deployment
- **Environment Management** with staging and production configurations
- **Database Migrations** with rollback capability
- **Health Checks** for monitoring application status

---

## Database Schema & API Endpoints

**Tables:**

- `users`: id, username, password, created_at, updated_at
- `credit_cards`: id, name, bank, card_type, annual_fee, intro_apr, regular_apr, rewards_type, requirements, created_at, updated_at
- `user_goals`: id, user_id, goal_type, income_range, credit_score_range, spending_category, created_at, updated_at

**API Endpoints:**

- **Auth:**
  - POST `/api/auth/register` (register)
  - POST `/api/auth/login` (login)
  - GET `/api/auth/me` (current user)
  - DELETE `/api/auth/logout` (logout)
- **Credit Cards:**
  - GET `/api/credit-cards` (list/filter cards)
  - GET `/api/credit-cards/:id` (card details)
  - POST `/api/credit-cards` (admin add)
  - PUT `/api/credit-cards/:id` (admin update)
- **User Goals:**
  - GET `/api/user-goals` (get goals)
  - POST `/api/user-goals` (create goals)
  - PUT `/api/user-goals/:userId` (update goals)
- **Recommendations:**
  - GET `/api/recommendations` (personalized recommendations)

---

## Development Guidelines & Rules

- **Code Style:** Airbnb JS style guide, clear naming, no console logs in production
- **Component Structure:** Organized, use PropTypes, PascalCase for components
- **Project Structure:**
  - `components/`, `pages/`, `contexts/`, `adapters/`, `utils/`, `styles/`
- **Git Workflow:**
  - Feature/bugfix/hotfix branch naming
  - Conventional commit messages (feat, fix, docs, etc.)
  - PRs require clear description, screenshots, and testing notes
- **API/DB Conventions:**
  - RESTful endpoints, plural table names, snake_case columns
  - Consistent response format with success/error
- **Testing:**
  - 80%+ coverage, AAA pattern, mock external dependencies
- **Security:**
  - bcrypt for passwords, session encryption, input validation, parameterized queries
- **Performance:**
  - Bundle size <500KB, lazy loading, optimized queries, API <200ms
- **Documentation:**
  - Code comments, API docs, README, contributing guidelines
- **Code Review:**
  - 2+ reviewers, checklist for style, tests, security, performance

---

## Key Decisions & Lessons Learned

- Built on existing React/Express auth template for speed and reliability
- Extended schema with credit cards and user goals for scalability
- Comprehensive documentation and coding standards reduce confusion and bugs
- Phased implementation allows for feedback and risk mitigation
- Consistency and security are prioritized throughout

---

## Next Steps

1. **Immediate Setup (Day 1):**

   - Clone repo and install dependencies
   - Configure environment variables and database connection
   - Run migrations and seed initial data
   - Test authentication endpoints

2. **Core Development (Days 2-3):**

   - Implement user goal setting (frontend form + backend API)
   - Create credit card browsing interface with search/filter
   - Build card detail pages with comprehensive information
   - Develop recommendation algorithm and display

3. **Integration & Polish (Days 4-5):**

   - Connect frontend and backend with proper error handling
   - Implement responsive design and accessibility features
   - Add loading states and user feedback
   - Test complete user workflows

4. **Deployment & Documentation (Final Day):**
   - Deploy to production environment
   - Update README with setup and usage instructions
   - Create API documentation
   - Record demo video for submission

### Rapid Development Checklist

- [ ] **Environment Setup**

  - [ ] Dependencies installed and working
  - [ ] Database running with migrations applied
  - [ ] Environment variables configured
  - [ ] Frontend and backend can communicate

- [ ] **Core Features**

  - [ ] User authentication (register, login, logout)
  - [ ] User goal setting and management
  - [ ] Credit card browsing and search
  - [ ] Card detail pages
  - [ ] Recommendation system

- [ ] **Quality Assurance**

  - [ ] Responsive design on mobile and desktop
  - [ ] Error handling for all user interactions
  - [ ] Loading states and user feedback
  - [ ] Accessibility features implemented

- [ ] **Deployment**
  - [ ] Production build created
  - [ ] Application deployed and accessible
  - [ ] Documentation updated
  - [ ] Demo ready for submission
