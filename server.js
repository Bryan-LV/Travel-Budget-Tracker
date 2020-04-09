const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// connect db
db();

// routes
app.use('/api/user', require('./routes/users'));
app.use('/api/countries', require('./routes/countries'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/expense', require('./routes/expenses'));

// Server static assets in production
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log('server running'));