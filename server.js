const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// connect db
db();

// routes
app.get('/', (req,res) => {
  res.send('travel budget tracker home');
})

app.use('/api/user', require('./routes/users'));
app.use('/api/countries', require('./routes/countries'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/expense', require('./routes/expenses'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log('server running'));