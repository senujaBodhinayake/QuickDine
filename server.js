const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to QuickDine Backend!');
});

const PORT = process.env.PORT || 5000;
app.use('/api/customers', require('./routes/customerRoutes'));

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
.then(() => {console.log('MongoDB connected successfully')
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} )
.catch(err => console.error('MongoDB connection error:', err));


