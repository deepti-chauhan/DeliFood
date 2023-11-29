# DeLiFooD - Food Delivery Application

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) food delivery application that allows users to browse a variety of food options, add items to their cart, and place orders. The application includes a backend API for managing menu items and user orders.


## Table of Contents

- Features
- Prerequisites
- Installation
- usage
- Folder Structure
- Technologies used
- Contributing
- License

## Feature  

- User authentication

  * DeliFood provides secure user authentication. Users can sign up, log in, and manage their profiles.
  * Authentication is handled using JSON Web Tokens (JWT) for enhanced security.

- Search for Food
  
  * Effortlessly search for your favorite food items using the search functionality.
  * DeliFood makes it easy to discover new dishes or quickly find your go-to meals.

- Add to Cart and Total Price
  
  * Users can add items to their cart, and the application dynamically computes the total price.
  * Each food item's details are displayed, providing transparency during the ordering process.

- Saved Order History
  
  * Users can view their saved order history, allowing them to track past orders, re-order favorite meals, and easily reference their food preferences

- Save and Edit Delivery Addresses
  
  * DeliFood allows users to save and edit multiple delivery addresses for added convenience.
  * This feature is especially useful for users who frequently order from different locations

- Skeleton Screen Implementation
  
  * DeliFood enhances the user experience by implementing skeleton screens, providing users with visual feedback during the loading process.
  * This creates a smoother transition between screens.

- Modify User Details (in Progress)
  
  * Easily modify user details such as name, email, and password.
  * DeliFood prioritizes user control and personalization.

- Easy-Quick Checkout with Stripe
  
  * The application streamlines the checkout process with Stripe integration, providing users with a secure and quick payment experience.
  * Say goodbye to long checkout processes!


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

### Payment Integration
- Stripe

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




