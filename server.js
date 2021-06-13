const express = require('express');
const path = require('path');

const app = express();

//messages
const messages = [];

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

//runserver on port 8000
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on ${process.env.PORT || 8000}`);
});