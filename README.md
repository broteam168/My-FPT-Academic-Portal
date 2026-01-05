<div align="center">
  
  # My-FPT-Academic-Portal

  Academic management system for FPT University with course enrollment, curriculum tracking, and timetable management.

  [![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?logo=springboot)](https://spring.io/projects/spring-boot)
  [![Angular](https://img.shields.io/badge/Angular-17-DD0031?logo=angular)](https://angular.io/)
  [![SQL Server](https://img.shields.io/badge/SQL_Server-2022-CC2927?logo=microsoftsqlserver)](https://www.microsoft.com/sql-server)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
</div>

---

## Overview

My-FPT-Academic-Portal is an academic information system that helps students and administrators manage courses, enrollments, curricula, and schedules. Built with Spring Boot backend and Angular frontend, it provides a modern and responsive interface for academic management.

## Architecture

```
My-FPT-Academic-Portal/
├── Backend/                      # Spring Boot API
│   └── src/main/java/broteam/myfap/backend/
│       ├── Controllers/
│       │   ├── Academic/         # Course, Enrollment, Student, Subject...
│       │   ├── Authentication/   # Auth, JWT
│       │   ├── Major/            # Major, SubMajor
│       │   ├── Time/             # Slot, Session, GroupSlot
│       │   └── Unit/             # Class, Room, School
│       ├── Models/               # Entity classes
│       ├── Repository/           # JPA repositories
│       ├── Service/              # Business logic
│       └── DTOs/                 # Data transfer objects
├── Frontend/                     # Angular 17 App
│   └── src/app/
│       ├── components/           # UI components
│       ├── services/             # API services
│       ├── models/               # TypeScript interfaces
│       └── guards/               # Route guards
└── README.md
```

## Key Features

```json
[
  "Student Information Management",
  "Course & Subject Catalog",
  "Curriculum & Syllabus Tracking",
  "Course Enrollment System",
  "Timetable & Schedule Management",
  "Room & Class Assignment",
  "Major & Sub-Major Management",
  "Semester Planning",
  "JWT Authentication & Authorization",
  "Role-based Access Control"
]
```

## Tech Stack

```json
["Spring Boot", "Spring Security", "Spring Data JPA", "SQL Server", "JWT", "Lombok", "Angular", "TypeScript", "TailwindCSS", "DaisyUI", "Angular Material", "RxJS"]
```

### Backend
- **Framework**: Spring Boot 3.2 (Java 17)
- **Security**: Spring Security + JWT (jjwt)
- **Database**: SQL Server + Spring Data JPA
- **Validation**: Spring Validation
- **Mapping**: ModelMapper
- **Utils**: Lombok

### Frontend
- **Framework**: Angular 17
- **Language**: TypeScript
- **UI**: TailwindCSS + DaisyUI + Angular Material
- **State**: RxJS
- **HTTP**: Angular HttpClient

## Getting Started

### Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+
- SQL Server 2022
- Angular CLI 17

### Backend Setup

```bash
cd Backend

# Install dependencies
./mvnw clean install

# Configure database in application.properties
# Run SQL script: main.sql

# Start the server
./mvnw spring-boot:run

# API runs at: http://localhost:8080
```

### Frontend Setup

```bash
cd Frontend

# Install dependencies
npm install

# Start development server
ng serve

# Frontend runs at: http://localhost:4200
```

## API Endpoints

| Module | Description |
|--------|-------------|
| `/api/auth` | Login, Register, JWT tokens |
| `/api/students` | Student management |
| `/api/courses` | Course CRUD |
| `/api/subjects` | Subject management |
| `/api/enrollments` | Course enrollment |
| `/api/curriculum` | Curriculum tracking |
| `/api/syllabus` | Syllabus management |
| `/api/semesters` | Semester planning |
| `/api/majors` | Major & Sub-major |
| `/api/classes` | Class management |
| `/api/rooms` | Room assignment |
| `/api/slots` | Timetable slots |

## Environment Variables

### Backend (application.properties)
```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=MyFAP
spring.datasource.username=sa
spring.datasource.password=your_password
jwt.secret=your_jwt_secret_key
jwt.expiration=86400000
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
