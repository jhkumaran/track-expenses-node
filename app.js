const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv/config');

const categoriesRoutes = require('./src/routes/categories');
const expensesRoutes = require('./src/routes/expenses');

const app = express();
const PORT = process.env.PORT;

//cors
app.use(cors());
app.options('*', cors);

//middleware
app.use(express.json());
app.use(morgan('tiny'));

//routes
const api = process.env.API_URL;
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/expenses`, expensesRoutes);

//mongoose connection
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log('Database connection is ready...');
})

//server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}...`);
});