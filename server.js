const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/totolocator')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/totolocator/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
