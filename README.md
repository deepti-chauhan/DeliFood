# DeLiFooD - Food Delivery Application

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) food delivery application that allows users to browse a variety of food options, add items to their cart, and place orders. The application includes a backend API for managing menu items and user orders.

## Feature  
* Easy way to create an account or login with user authentication.
* Session based on localStorage and tokens
* Add to cart, compute total price, and display each food item's details.
* Search for food.
* Skeleton Screen implementation before loading the products. 
* Saved Order History.  
* Save and Edit delivery addresses.
* Modify user details.
* Pay easy-quick checkout: stripe. 

## Components

- Prerequisites
- Installation
- usage
- Folder Structure
- Technologies used
- Contributing
- License

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- Node.js
- MongoDB

## Installation

Run the following commands in your terminal


1. Clone the repository:
```bash
git clone https://github.com/your-username/food-delivery-app.git
```
2. Navigate to the project directory:
```bash
cd food-delivery-app
```
   
4. Install server dependencies:
```bash
cd .\my-food-delivery-app\backend
npm install
```

4. Install client dependencies:
```bash
cd .\my-food-delivery-app\frontend
npm install
```

5. Set up the MongoDB database:
   - Create a .env file in the backend directory and provide your MongoDB connection URI:
```bash
MONGODB_URI=your-mongodb-uri
```

## Usage
1. Start frontend
   - The client application will open in your default web browser at http://localhost:3000.
```bash
npm start
```
1. Start backend
   - The server will run on http://localhost:5000.
```bash
npm start
```

### Folder Structure 

The project structure is organized as follows:

- /frontend: React.js frontend application
- /backend: Node.js and Express.js backend API

## Technologies Used 

### Frontend 
- React.js
- ContextApi (for state management)
- FetchApi (for API request)
- CSS, SCSS (for styling)
### Backend
- Node.js
- Express.js
- MongoDB (using Mongoose for ODM)

### Additional Tools :
-   JWT for authentication
-   bcrypt for password hashing

### Testing

1. Run the `npm test` for a simple test.
2. Run `npm run test: watch` for watch tests.
3. Run `npm run test: coverage` for test coverage. This will generate a `coverage` folder. Open the `index.html` file in this folder to check the results.

## Deploying

For deployment, run `npm run build` and upload `build/` to your server.

## Contributing 
If you'd like to contribute to this project, please follow the Contribution Guidelines.

## License

This project is licensed under the MIT License.




