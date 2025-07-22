# Capstone Project Master Document

## Table of Contents

1. [Executive Summary & Vision](#executive-summary--vision)
2. [User Personas & Target Audience](#user-personas--target-audience)
3. [Product Requirements (MVP & Future)](#product-requirements-mvp--future)
4. [Technical Architecture & Stack](#technical-architecture--stack)
5. [Database Schema & API Endpoints](#database-schema--api-endpoints)
6. [Development Guidelines & Rules](#development-guidelines--rules)
7. [Implementation Timeline & Roadmap](#implementation-timeline--roadmap)
8. [Key Decisions & Lessons Learned](#key-decisions--lessons-learned)
9. [Next Steps](#next-steps)

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

**Frontend:**

- React 18.2.0, React Router DOM, Vite, Tailwind CSS

**Backend:**

- Node.js, Express 4.18.2, PostgreSQL, Knex.js, bcrypt, express-session

**Database:**

- PostgreSQL with Knex.js ORM

**Authentication:**

- Cookie-based sessions, bcrypt password hashing

**Project Structure:**

- Monorepo: `/frontend` (React), `/server` (Express)
- Organized by components, pages, contexts, adapters, utils (frontend)
- Controllers, middleware, models, db (backend)

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

## Implementation Timeline & Roadmap

**Note:** You have 15 days to complete the project. Project work will be focused on Tuesday–Thursday each week, as Friday–Monday are your work days and less available for capstone work. The plan below is optimized for your available days and prioritizes MVP features, polish, and support for the "Travelers" persona.

### Accelerated 15-Day Timeline

#### **Days 1–3 (First Tue–Thu): Project Setup & Authentication**

- Set up project environment (repo, dependencies, environment variables)
- Ensure database is running and migrations are ready
- Review and test existing authentication (register, login, session)
- Set up basic frontend routing and navigation

#### **Days 4–6 (Second Tue–Thu): Core Features – User Goals & Credit Card Catalog**

- Implement user goal setting (frontend form, backend endpoints, DB)
- Create credit card browsing/search (frontend UI, backend endpoints, DB)
- Seed database with sample credit card data (including travel cards)
- Display card list with search/filter on frontend

#### **Day 7–8 (Third Tue–Wed): Card Details & Recommendations**

- Implement card detail page (frontend and backend)
- Build basic recommendation logic (match user goals to cards, including travel rewards)
- Display recommendations on dashboard or dedicated page

#### **Day 9 (Third Thu): Polish, Testing, and Documentation**

- Polish UI/UX (focus on clarity, accessibility, and responsiveness)
- Write and run tests for critical paths (auth, goals, recommendations)
- Update documentation (README, API docs, usage instructions)
- Buffer for bug fixes and final review

#### **Days 10–12+ (Final Tue–Thu, if time allows): Nice-to-Haves & Stretch Goals**

- Add watchlist/favorites feature
- Implement card comparison
- Add educational content/tooltips
- Further refine recommendations for travelers (e.g., travel perks, no foreign fees)

---

### Roadmap Table

| Day(s)           | Focus Areas                                      |
| ---------------- | ------------------------------------------------ |
| 1–3 (Tue–Thu)    | Setup, Auth, Routing                             |
| 4–6 (Tue–Thu)    | User Goals, Card Catalog, Search/Filter, Seeding |
| 7–8 (Tue–Wed)    | Card Details, Recommendations                    |
| 9 (Thu)          | Polish, Testing, Docs, Bug Fixes                 |
| 10–12+ (Tue–Thu) | Nice-to-Haves, Stretch Goals                     |

---

**Priorities:**

- Focus on MVP: registration/login, user goals, card browsing, card details, recommendations.
- Ensure at least one travel card is included in your seed data and recommendation logic.
- Use the final days for polish, testing, and documentation—don’t skip this!
- If you finish early, tackle nice-to-haves or further optimize for the “Travelers” persona.

---

## Key Decisions & Lessons Learned

- Built on existing React/Express auth template for speed and reliability
- Extended schema with credit cards and user goals for scalability
- Comprehensive documentation and coding standards reduce confusion and bugs
- Phased implementation allows for feedback and risk mitigation
- Consistency and security are prioritized throughout

---

## Next Steps

1. Team review and feedback on this master document
2. Set up development and testing tools (ESLint, testing framework, etc.)
3. Complete environment setup and database migrations
4. Begin implementation of core API endpoints and frontend components
5. Regularly review and update documentation as project evolves

### Days 1–3 (First Tue–Thu): Project Setup & Authentication Checklist

- [ ] **Project Environment**

  - [ ] Clone repo and set up local environment
  - [ ] Install all dependencies (frontend & backend)
  - [ ] Configure environment variables (database, session secret, etc.)
  - [ ] Ensure `.env` files are git-ignored and secure

- [ ] **Database**

  - [ ] Start PostgreSQL locally or connect to cloud DB
  - [ ] Run all migrations to create tables
  - [ ] (Optional) Seed database with initial user and card data

- [ ] **Authentication**

  - [ ] Test user registration (POST `/api/auth/register`)
  - [ ] Test user login (POST `/api/auth/login`)
  - [ ] Test session persistence (GET `/api/auth/me`)
  - [ ] Test logout (DELETE `/api/auth/logout`)
  - [ ] Confirm password hashing and session cookies are working

- [ ] **Frontend Routing & Navigation**

  - [ ] Set up React Router with routes for Home, Login, Sign Up, Users, User Profile, 404
  - [ ] Implement navigation bar with auth state (show login/signup or user info)
  - [ ] Protect user routes (redirect if not authenticated)

- [ ] **Documentation**
  - [ ] Update README with setup instructions if needed
  - [ ] Document any issues or fixes encountered
