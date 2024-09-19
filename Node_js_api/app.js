const express = require('express');
const app = express();
const port = 5000;
const router = require('./routes'); // Ensure this is the correct path
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api', router);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://dhanrajkushwah007:IkcH3wHrbFRoElLM@dhanrajproject.ltnqb.mongodb.net/trelloapp2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
