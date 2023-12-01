<a name="readme-top"></a>


# DeLiFooD - Food Delivery Application
Welcome to DeliFood! DeliFood is a robust full-stack MERN (MongoDB, Express.js, React.js, Node.js) food delivery application that allows users to browse a variety of food options, add items to their cart, and place orders. The application includes a backend API for managing menu items and user orders.


## Table of Contents

-  <a href="#Features">Features</a>
-  <a href="#Prerequisites">Prerequisites</a>
-  <a href="#Installation">Installation</a>
-  <a href="#Usage">Usage</a>
-  <a href="#Folder-Structure">Folder Structure</a>
-  <a href="#Technologies-used">Technologies used</a>
-  <a href="#Contributing">Contributing</a>
-  <a href="#License">License</a>
  
## Features  

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- Node.js
- MongoDB
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

Run the following commands in your terminal


1. Clone the repository:
```bash
git clone https://github.com/deepti-chauhan/DeliFood.git
```
2. Navigate to the project directory:
```bash
 cd DeliFood
```
   
4. Install server dependencies:
```bash
cd  backend
npm install
```

4. Install client dependencies:
```bash
cd frontend
npm install
```

5. Set up the MongoDB database and Stripe:
   - Create a .env file in the backend directory and provide your env variables:
   - you will get your stripe secret key from your stripe account (follow for instructions)
```bash
MONGO_URI=your-mongodb-uri
PORT=5000
BASE_URL=http://localhost:3000
JWT_SECRET_KEY=your_secret_key
STRIPE_KEY=your_secret_stripe_key
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage
1. Start frontend
   - The client application will open in your default web browser at http://localhost:3000.
```bash
cd frontend
npm start
```
1. Start backend
   - The server will run on http://localhost:5000.
```bash
cd backend
npm start
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Folder Structure 

The project structure is organized as follows:

- /frontend: React.js frontend application
- /backend: Node.js and Express.js backend API
- 
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technologies Used 

### Frontend 
- React.js
- Redux (for state management)
- FetchApi (for API request)
- CSS, SCSS (for styling)
- React sweetalert2 ( for beautiful, responsive alerts)
- React react-loader-spinner (for loading effects at API calls)
- React react-loading-skeleton (for skeleton loading effects)
- React react-toastify (for notifications )

  
### Backend
- Node.js
- Express.js
- MongoDB (using Mongoose for ODM)

### Payment Integration
- Stripe

### Additional Tools :
-   JWT for authentication
-   bcrypt for password hashing
-   UUID for generating unique ids


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Deploying

For deployment, run `npm run build` and upload `build/` to your server.

## Contributing 
If you'd like to contribute to this project, please follow the Contribution Guidelines.
Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## License

This project is licensed under the MIT License.




