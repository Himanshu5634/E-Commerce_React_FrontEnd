# E-commerce Application

An E-commerce web application built with React, Redux Toolkit, and RTK Query. This project allows users to browse products, add them to the cart, filter by categories, and manage orders.

## Features

- **Product Listing**: Displays a list of products fetched from a dummy API.
- **Product Details**: View detailed information about a specific product.
- **Add to Cart**: Add products to the cart and manage quantities.
- **Category Filtering**: Filter products by categories.
- **Authentication**: Log in and register users with local state management.
- **Order Management**: Place orders and store them in local storage.
- **Responsive Design**: Fully responsive for desktop and mobile devices.

## Technologies Used

- **Frontend**: React, React Router
- **State Management**: Redux Toolkit, RTK Query
- **Styling**: SCSS
- **API**: Dummy JSON API (`https://dummyjson.com/`)

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js**: Download and install from [Node.js](https://nodejs.org/).
- **npm**: Comes with Node.js installation.

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/e-commerce.git
cd e-commerce
```

### 2. Install Dependencies

Install the required `node_modules` by running:

```bash
npm i
```

### 3. Start the Development Server

Run the following command to start the application:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` or the port specified in your terminal.

### 4. Build for Production

To create a production build, run:

```bash
npm run build
```

The production-ready files will be available in the `build` folder.

## Folder Structure

```
E-commerce/
├── src/
│   ├── Components/         # Reusable 
│   ├── Features/           # Redux slices and API configurations
│   ├── pages/              # Application pages 
│   ├── utils/              # Utility functions and constants
│   ├── App.js              # Main application component
│   ├── index.js            # Entry point of the application
├── public/                 # Static assets
├── README.md               # Project documentation
├── package.json            # Project dependencies and scripts
```

## API Endpoints

This project uses the [Dummy JSON API](https://dummyjson.com/) for fetching product data. Key endpoints include:

- **Get Products**: `https://dummyjson.com/products?limit=200`
- **Get Product by ID**: `https://dummyjson.com/products/{id}`

## Scripts

- `npm i`: Installs the required dependencies.
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm test`: Runs the test suite.

