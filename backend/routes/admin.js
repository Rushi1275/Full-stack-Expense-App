const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


router.get('/add-expense', adminController.getAllExpenses);

router.post('/add-expense', adminController.postAddExpenses);

 router.put('/update/:id', adminController.editExpense);

 router.delete('/delete/:id', adminController.deleteExpense);


module.exports = router;