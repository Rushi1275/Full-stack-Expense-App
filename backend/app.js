const express = require('express');
const app = express();
const sequelize = require ('./util/database');

const cors = require("cors");
const Expenses= require ('./models/expenses');

const adminRoutes = require('./routes/admin');
app.use(express.json());


app.use(cors());

app.use('/expenses', adminRoutes);

Expenses.sync();
sequelize
.sync()
.then((result) => {
   app.listen(3000)
}).catch((err) => {
    console.log(err)
});


