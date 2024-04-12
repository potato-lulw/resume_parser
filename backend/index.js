require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicantRoutes = require('./routes/applicantRoutes')
const analyseRoutes = require('./routes/analyseRoutes');
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', fileRoutes); 
app.use('/api', jobRoutes);
app.use('/api', applicantRoutes)
app.use('/api', analyseRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

connectDB().then(() => {
  console.log("Database connected");
}).catch(err => {
  console.error("Error connecting to database", err);
  process.exit(1); 
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
