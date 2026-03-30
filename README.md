# Antique Alley - Full Stack Storefront and inventory manager

## Project Description
A full-stack web application designed for an antique shop. It features a public-facing gallery for customers to browse curated treasures and a secure, authenticated admin panel for staff to manage inventory in real-time.

## Tech Stack
- **Frontend:** React 19, Tailwind CSS v4
- **Framework:** React Router v7 (Vite)
- **Backend:** Node.js, Mongoose
- **Database:** MongoDB

## Installation Instructions
1. Clone the repository: `git clone https://github.com/Jacky-7y/netzero-project-b-wolsey`
2. Install dependencies: `npm install` in the terminal
3. Set up your `.env` file (see below).
4. Ensure the mongoDB service is running (linux) or the application (windows)
5. Run the init file: `mongosh init.js` or `mongo init.js` depending on mongoDB version in the terminal
6. Start the development server: `npm run dev`

## Environment Variables
Create a `.env` file in the root directory and add the following:
`MONGO_URI`= (Your MongoDB Connection String)

## SERVER CONFIGURATION
PORT= (Your port) default: 3000
NODE_ENV=(Your env) development for testing or production for deployment

## Note
This project includes a built-in seeder. Upon first connection to a fresh database, a default admin account will be created. The login information will be supplied in the terminal, please read it and then change the credentials in the User table before deploying to production.

Additionally there is a database init supplied in the application for setting up a fresh database with some test products.
