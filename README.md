## Setting Up the PostgreSQL Database
### Create Database Tables:
```
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE trains (
    train_id SERIAL PRIMARY KEY,
    source VARCHAR(50) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    total_seats INTEGER NOT NULL
);

CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    train_id INTEGER REFERENCES trains(train_id),
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```
### Insert admin user
```
INSERT INTO users (username, password, role)
VALUES ('admin', 'adminpassword', 'admin');

```
### To start the server
```
run node server.js
```
### Folder structure
```
- src
  - config.js
  - db.js
  - models
    - user.js
    - train.js
    - booking.js
  - controllers
    - authController.js
    - userController.js
    - trainController.js
    - bookingController.js
  - routes
    - authRoutes.js
    - userRoutes.js
    - trainRoutes.js
    - bookingRoutes.js
  - middleware
    - authMiddleware.js
  - server.js
```

### To test the API endpoints, you can use tools like Postman or curl.
#### Register a User: Send a POST request to /api/auth/register with the user's details (username, password, role).
```
POST /api/auth/register
Content-Type: application/json

{
    "username": "john_doe",
    "password": "password123",
    "role": "user"
}

```

#### Login User: Send a POST request to /api/auth/login with the user's credentials.
```
POST /api/auth/login
Content-Type: application/json

{
    "username": "john_doe",
    "password": "password123"
}

```

#### Add a New Train: Send a POST request to /api/trains with the train's details (source, destination, totalSeats).
```
POST /api/trains
Content-Type: application/json
Authorization: Bearer your_jwt_token_here

{
    "source": "Station A",
    "destination": "Station B",
    "totalSeats": 100
}

```

#### Get Train Details: Send a GET request to /api/trains/:trainId to get details of a specific train.
```
GET /api/trains/1
Authorization: Bearer your_jwt_token_here

```

#### Book a Seat: Send a POST request to /api/bookings to book a seat on a train.
```
POST /api/bookings
Content-Type: application/json
Authorization: Bearer your_jwt_token_here

{
    "trainId": 1
}

```

#### Get Booking Details: Send a GET request to /api/bookings to get booking details for the logged-in user.
```
GET /api/bookings
Authorization: Bearer your_jwt_token_here

```
