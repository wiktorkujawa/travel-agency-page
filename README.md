# travel-agency-page
Web page implemented with MERN stack with own CMS, authentifications methods(login, registration, receiving password via email, changing passwords) using nodemailer and bcryptjs, crypto and jsonwebtoken, changable content with image uploading using gridfs and multer packages. Used React functional components, redux, axios and mongoDB Atlas Cluster.
# Quick start
Add your mongoURI, email and password to the default.json file. Make sure you set an env var for that and the jwtSecret on deployment
```diff
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```
# Deployment

There is a Heroku post build script so that you do not have to compile your React frontend manually, it is done on the server. Simply push to Heroku and it will build and load the client index.html page