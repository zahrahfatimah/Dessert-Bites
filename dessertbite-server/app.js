require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const router = require("./routers/router");


app.use(cors({
  origin: 'http://localhost:5173',  // Ganti dengan origin yang diizinkan
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'google_token']
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

// app.listen(port, () => {
//   console.log(`http://localhost:${port}`);
// });
module.exports = app;
