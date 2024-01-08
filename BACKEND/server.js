const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URl;


mongoose.connect(URL, {

});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const userRouter = require('./routes/user.js');
app.use('/user', userRouter);

const bookRouter = require('./routes/book.route.js');
app.use('/api', bookRouter);

const categoryRouter = require('./routes/category.route.js');
app.use('/api', categoryRouter);

const transactionRouter = require('./routes/transaction.route.js');
app.use('/api', transactionRouter);




app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})