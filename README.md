# team15-java

# Campus Resource Management System

A full-stack web application for managing campus resources, bookings, and users. Built with Spring Boot backend and React frontend, integrated with Supabase for authentication and PostgreSQL database.

## Features

- **User Management**: Manage students and staff with role-based access control
- **Resource Management**: Track and manage campus resources (labs, classrooms, event halls)
- **Booking System**: Book resources with time slot management and approval workflow
- **Real-time Updates**: Live data synchronization using Supabase real-time subscriptions
- **Dashboard**: Overview of bookings, resources, and user statistics
- **Authentication**: Secure authentication using Supabase Auth

## Tech Stack

### Backend
- Java 21
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT Authentication
- Lombok
- Maven

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios
- Supabase Client
- Lucide React Icons

### Database & Auth
- Supabase (PostgreSQL + Authentication)

## Prerequisites

- Java 21 or higher
- Node.js 18+ and npm
- Maven 3.6+
- Supabase account

## Project Structure

```
campus-resource-management/
├── backend/                    # Spring Boot backend
│   ├── src/main/java/com/campus/
│   │   ├── config/            # Security and Supabase configuration
│   │   ├── controller/        # REST API controllers
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── entity/            # JPA entities
│   │   ├── enums/             # Enums (roles, status, types)
│   │   ├── exception/         # Exception handling
│   │   ├── repository/        # JPA repositories
│   │   └── service/           # Business logic
│   └── pom.xml
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── contexts/          # React contexts
│   │   ├── hooks/             # Custom hooks
│   │   ├── lib/               # Supabase client
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   └── types/             # TypeScript types
│   └── package.json
└── database/
    └── schema.sql             # Database schema
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd campus-resource-management
```

### 2. Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `database/schema.sql` in your Supabase SQL editor
3. Note your Supabase URL and keys

### 3. Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Configure `src/main/resources/application.properties`:
```properties
# Update with your Supabase credentials
spring.datasource.url=jdbc:postgresql://<your-supabase-host>:6543/postgres
spring.datasource.username=<your-username>
spring.datasource.password=<your-password>
app.supabase.url=<your-supabase-url>
app.supabase.jwt-secret=<your-jwt-secret>
```

3. Install dependencies and run:
```bash
mvn clean install
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

### 4. Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Create `.env.local` file:
```env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

3. Install dependencies and run:
```bash
npm install
npm run dev
```

Frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources/{id}` - Get resource by ID
- `POST /api/resources` - Create resource
- `PUT /api/resources/{id}` - Update resource
- `DELETE /api/resources/{id}` - Delete resource

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/{id}` - Get booking by ID
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Delete booking
- `PUT /api/bookings/{id}/approve` - Approve booking
- `PUT /api/bookings/{id}/reject` - Reject booking

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## User Roles

- **STUDENT**: Can view and book resources
- **STAFF**: Can manage resources and approve bookings
- **ADMIN**: Full system access

## Resource Types

- LAB - Computer/Science labs
- CLASSROOM - Regular classrooms
- EVENT_HALL - Event halls and auditoriums

## Development

### Build for Production

Backend:
```bash
cd backend
mvn clean package
java -jar target/campus-resource-management-1.0.0.jar
```

Frontend:
```bash
cd frontend
npm run build
npm run preview
```

## License

This project is licensed under the MIT License.

## Contributors

Team 15
