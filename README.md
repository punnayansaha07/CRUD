# Node.js CRUD Application with Logging and Joi Validation

This repository contains a robust Node.js CRUD application built with Express.js and MongoDB, designed for creating, reading, updating, and deleting employee data. The application includes essential features such as logging, input validation, and error handling.

## Features

- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on employee records.
- **MongoDB Integration**: MongoDB is used as the primary database to store employee data.
- **Validation**:
  - Uses **Joi** for schema-based input validation to ensure data integrity.
  - Validates fields such as name, email, mobile number, and employee ID.
- **Logging**:
  - Implements **Winston** for logging errors and information.
  - Logs are saved to a file (`error.log`) and printed to the console for debugging.
- **RESTful API**:
  - Fully functional endpoints for CRUD operations.
  - Supports JSON request payloads.
- **Error Handling**:
  - Graceful error handling for invalid requests or server issues.
  - Responds with appropriate HTTP status codes and messages.

## API Endpoints

- **POST** `/api/employee`: Create a new employee record.
- **GET** `/api/employee`: Retrieve all employee records.
- **PUT** `/api/employee/:id`: Update an existing employee record by ID.
- **DELETE** `/api/employee/:id`: Delete an employee record by ID.

## Tools & Technologies

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing employee data.
- **Joi**: Input validation library.
- **Winston**: Logging library for error tracking and debugging.
- **Postman**: Used for testing API calls.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/punnayansaha07/CRUD.git
2. Install dependencies:
   ```bash
   npm install
3. Configure MongoDB connection in the `dbConnection.js` file
   
4. Start the server:
   ```bash
   npm start
5. Use **Postman** or any API client to test the endpoints.   