const expenseForm = document.getElementById('expense-form');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseDescriptionInput = document.getElementById('expense-description');
const expenseCategoryInput = document.getElementById('expense-category');
const expenseList = document.getElementById('expense-list');
const btn = document.getElementById('btn');

let expenses = [];

function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.amount} - ${expense.description} - ${expense.category}</span>
            <button onclick="editExpense(${expense.id})">Edit</button>
            <button onclick="deleteExpense(${expense.id})">Delete</button>
        `;
        expenseList.appendChild(li);
    });
}

function fetchExpenses() {
    axios.get('http://localhost:3000/expenses/add-expense')
        .then(response => {
            expenses = response.data;
            renderExpenses();
        })
        .catch(error => {
            console.error('Error fetching expenses:', error);
        });
}

function addExpense(amount, description, category) {
    axios.post('http://localhost:3000/expenses/add-expense', { amount, description, category })
        .then(response => {
            fetchExpenses();
            expenseAmountInput.value = '';
            expenseDescriptionInput.value = '';
            expenseCategoryInput.value = '';
        })
        .catch(error => {
            console.error('Error adding expense:', error);
        });
}

function editExpense(id) {
    // Find the expense with the given ID
    const expense = expenses.find(expense => expense.id === id);
    
    // If the expense is found, pre-fill the input fields with its values
    if (expense) {
        // Prompt the user for new values
        const newAmount = prompt('Enter new Amount:', expense.amount);
        const newDescription = prompt('Enter new Description:', expense.description);
        const newCategory = prompt('Enter new Category:', expense.category);

        if (newAmount !== null && newDescription !== null && newCategory !== null && newCategory !== '') {
            axios.put(`http://localhost:3000/expenses/update/${id}`, { amount: newAmount, description: newDescription, category: newCategory })
                .then(response => {
                    fetchExpenses();
                })
                .catch(error => {
                    console.error('Error editing expense:', error);
                });
        }
    } else {
        console.error('Expense not found');
    }
}

function deleteExpense(id) {
    if (confirm('Are you sure you want to delete this expense?')) {
        axios.delete(`http://localhost:3000/expenses/delete/${id}`)
            .then(response => {
                fetchExpenses();
            })
            .catch(error => {
                console.error('Error deleting expense:', error);
            });
    }
}

expenseForm.addEventListener('submit', event => {
    event.preventDefault();
    const amount = expenseAmountInput.value;
    const description = expenseDescriptionInput.value;
    const category = expenseCategoryInput.value;
    if (amount !== null && description !== null && category !== null && category !== '') {
        addExpense(amount, description, category);
    } else {
        alert('Please enter valid Amount and Description.');
    }
});

fetchExpenses();
