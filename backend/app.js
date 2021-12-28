const express = require('express');
const app = express();
const cors = require('cors');
const { json } = require('body-parser');
const fileUpload = require('express-fileupload');
const env = require("dotenv")

// ROUTER FOLDER
const mongodb = require('./config/database');
const indexRouter = require('./router');
const errorHandling = require('./helpers/errorHandling');

env.config();
app.use(cors());
app.use(json());
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 }, }));
console.log(process.env.JWT_SECRET)
// ROUTER
app.use('/api', indexRouter);
app.use(errorHandling);

// PORT LOCAL HOST
const PORT = 7000
mongodb.then(() => {
  console.log('Successfully connected mongoose DB');
  app.listen(process.env.PORT || PORT, 'localhost', () => {
    console.log(`http://localhost:${PORT}`)
  });
}).catch((err) => console.log(err, 'Error connect monggose DB'))
