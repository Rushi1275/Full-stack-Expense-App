const { where } = require('sequelize');
const Expense = require('../models/expenses');

exports.postAddExpenses = async (req, res) => {
  const { amount, description, category } = req.body; 
  try {
    const expenses = await Expense.create({ amount, description, category }); 
    res.status(201).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error ' });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.editExpense = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { amount, description, category } = req.body;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ err: 'Expense not found' });
    }

    // Update the Expense with new values
    expense.amount = amount;
    expense.description= description;
    expense.category = category;

    await expense.save();

    res.status(200).json({ message: 'Expense updated successfully', Expense });
  } catch (error) {
    console.error('Error editing Expense:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



exports.deleteExpense= async (req, res, next) => {
  try {
    const id = req.params.id;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ err: 'Expense not found' });
    }
      console.log(expense);
    await expense.destroy();

    res.status(204).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting Expense:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
