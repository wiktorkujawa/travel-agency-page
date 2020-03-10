const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const config = require('config');
const app = express();


// Bodyparser Middleware
app.use(express.json());
app.use(methodOverride('_method'));

/** Seting up server to accept cross-origin browser requests */
app.use(function (req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});



// DB Config
const db = config.get('mongoURI');


// // Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/announcements', require('./routes/api/announcements'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/slides', require('./routes/api/slides'));
app.use('/api/contents', require('./routes/api/contents'));
app.use('/api/insurances', require('./routes/api/insurances'));
app.use('/api/contacts', require('./routes/api/contacts'));
app.use('/api/offers', require('./routes/api/offers'));
app.use('/api/gallery', require('./routes/api/gallery'));
app.use('/api/questions', require('./routes/api/questions'));


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
