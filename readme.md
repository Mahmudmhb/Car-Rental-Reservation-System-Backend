# Car Rental Reservation System Backend live https://assignment-3-ten-eta.vercel.app/

## Introduction

Welcome to the Car Rental Reservation System Backend. This project is designed to manage a car rental business, focusing on implementing error handling, CRUD operations, authentication, authorization, and transaction management.

## Features

### Admin Actions:

1. **Car Management:**

   - Create new car entries
   - Update existing car information
   - Perform soft deletes on cars

2. **Booking Oversight:**
   - View all ongoing and past bookings
   - Calculate total cost for completed rentals

### User Actions:

1. **Book a Ride:**

   - Book a car by entering `carId` and `startTime`

2. **Rental History:**
   - Access booking history

## Technologies

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- TypeScript
- Zod for validation

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Mahmudmhb/Car-Rental-Reservation-System-Backend
   cd Car-Rental-Reservation-System-Backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables. Create a `.env` file in the root directory and add the following:

   ```env
   MONGO_URI=mongodb://localhost:27017/car_rental
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

## Configuration

Ensure you have MongoDB running locally or provide a connection string to a MongoDB instance.

## API Endpoints

### Auth

- **POST /api/auth/signup** - Register a new user/admin
- **POST /api/auth/signin** - Log in a user/admin

### Users

- **GET /api/users/me** - Get the logged-in user's profile (User)
- **GET /api/users/:id/bookings** - Get user's booking history (User)

### Cars

- **POST /api/cars** - Create a new car (Admin)
- **GET /api/cars** - Get all cars
- **GET /api/cars/:id** - Get car by ID
- **PUT /api/cars/:id** - Update car details (Admin)
- **DELETE /api/cars/:id** - Soft delete a car (Admin)

### Bookings

- **POST /api/bookings** - Create a new booking (User)
  **GET /api/bookings** - Get all bookings (Admin) - Query Parameters: - `carId`: ID of the car for which availability needs to be checked. - `date`: The specific date for which availability needs to be checked (format: YYYY-MM-DD). - Example Request:
  `     /api/bookings?carId=608a6d8d03a1b40012abcdef&date=2024-06-15`
- **GET /api/bookings/:id** - Get booking by ID (Admin/User)
- **GET /api/bookings/my-bookings** - Get the logged-in user's bookings (User)
- **PUT /api/bookings/:id/return** - Return a car and calculate the total cost (Admin)

## Authentication & Authorization

- **Authentication**: Implemented using JWT. Include the token in the `Authorization` header as `Bearer <token>`.
- **Authorization**: Middleware to check user roles and permissions.
