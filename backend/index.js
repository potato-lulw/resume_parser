require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

app.use(cors());
app.use('/api', fileRoutes); // Use "/api" prefix for routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
