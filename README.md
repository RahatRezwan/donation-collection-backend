## Donation Collection Application Server

This is the server for the Donation Collection Application. It is built using Node.js, TypeScript, Express, and My SQL.

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/RahatRezwan/donation-collection-backend.git
   ```

2. Use the package manager [yarn](https://yarnpkg.com/) to install the dependencies.

   ```bash
   yarn
   ```

3. Create a .env file in the root directory and add the following environment variables

   ```bash
   NODE_ENV=development
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=123456
   DB_NAME=donor_db

   JWT_SECRET=donation-collection-system
   JWT_ACCESS_EXPIRATION=2d
   JWT_REFRESH_SECRET=donation-collection-refresh
   JWT_REFRESH_EXPIRATION=120d
   ```

4. Run the server

   ```bash
   yarn start
   ```

5. Now the server is running on port http://localhost:5000

## Setup Database

1. Install [My SQL](https://dev.mysql.com/downloads/mysql/) and [My SQL Workbench](https://dev.mysql.com/downloads/workbench/)
2. Create a new connection in My SQL Workbench
3. Create a new schema named `donor_db`
4. Create a new user with username `root` and password `123456`
5. Grant all privileges to the user

## Create Database Tables

1. Create donor Table

   ```SQL
   CREATE TABLE donors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(255),
      presentAddress VARCHAR(255),
      permanentAddress VARCHAR(255),
      profilePic VARCHAR(255)
   );

   ```

2. Create admin Table

   ```SQL
   CREATE TABLE admin (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      profilePic VARCHAR(255)
   );
   ```

3. Create users Table

   ```SQL
   CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      role ENUM('donor', 'admin') NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      donor INT,
      admin INT,
      CONSTRAINT fk_donor FOREIGN KEY (donor) REFERENCES donors(id),
      CONSTRAINT fk_admin FOREIGN KEY (admin) REFERENCES admin(id)
   );
   ```

4. Create donation Table

   ```SQL
   CREATE TABLE donations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      donation_plan VARCHAR(355),
      amount DECIMAL(10, 2) NOT NULL,
      currency VARCHAR(50) NOT NULL,
      paymentMethod VARCHAR(50) NOT NULL,
      donor INT NOT NULL,
      createdAt VARCHAR(255) NOT NULL,
      updatedAt VARCHAR(255),
      FOREIGN KEY (donor) REFERENCES donors(id)
   );
   ```

## Donor API

| Method | Endpoint                   | Description        |
| ------ | -------------------------- | ------------------ |
| POST   | /api/v1/users/create-donor | register as donor  |
| GET    | /api/v1/donors             | get all donors     |
| GET    | /api/v1/donors/:id         | get donor by id    |
| PATCH  | /api/v1/donors/:id         | update donor by id |
| DELETE | /api/v1/donors/:id         | delete donor by id |

## Admin API

| Method | Endpoint                   | Description        |
| ------ | -------------------------- | ------------------ |
| POST   | /api/v1/users/create-admin | register as admin  |
| GET    | /api/v1/admins             | get all admins     |
| GET    | /api/v1/admins/:id         | get admin by id    |
| PATCH  | /api/v1/admins/:id         | update admin by id |
| DELETE | /api/v1/admins/:id         | delete admin by id |

## User API

| Method | Endpoint      | Description   |
| ------ | ------------- | ------------- |
| GET    | /api/v1/users | GET All Users |

## Auth API

| Method | Endpoint                   | Description                                     |
| ------ | -------------------------- | ----------------------------------------------- |
| POST   | /api/v1/auth/login         | Login                                           |
| Get    | /api/v1/auth/refresh-token | Get access token using refresh token            |
| Get    | /api/v1/auth/user-data     | Get user data by sending access token in header |

## Donation API

| Method | Endpoint                          | Description           |
| ------ | --------------------------------- | --------------------- |
| POST   | /api/v1/donations/create-donation | create donation       |
| GET    | /api/v1/donations                 | get all donations     |
| GET    | /api/v1/donations/:id             | get donation by id    |
| PATCH  | /api/v1/donations/:id             | update donation by id |
| DELETE | /api/v1/donations/:id             | delete donation by id |
