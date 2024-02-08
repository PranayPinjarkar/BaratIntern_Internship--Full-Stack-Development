document.addEventListener('DOMContentLoaded', () => {
    const incomeInput = document.getElementById('income-input');
    const expenseInput = document.getElementById('expense-input');
    const addIncomeBtn = document.getElementById('add-income-btn');
    const addExpenseBtn = document.getElementById('add-expense-btn');
    const incomeList = document.getElementById('income-list');
    const expenseList = document.getElementById('expense-list');
    const incomeTotal = document.getElementById('income-total');
    const expenseTotal = document.getElementById('expense-total');
    const balanceTotal = document.getElementById('balance-total');
    const clearBtn = document.getElementById('clear-btn');

    // Function to fetch expenses from the server
    const fetchExpenses = async () => {
        try {
            const response = await fetch('/expenses');
            const expenses = await response.json();
            updateUI(expenses);
        } catch (err) {
            console.error(err);
        }
    };

    // Function to update the UI with fetched expenses
    const updateUI = (expenses) => {
        let totalIncome = 0;
        let totalExpense = 0;

        incomeList.innerHTML = '';
        expenseList.innerHTML = '';

        expenses.forEach(expense => {
            const listItem = document.createElement('li');
            listItem.textContent = expense.amount;
            
            if (expense.amount > 0) {
                incomeList.appendChild(listItem);
                totalIncome += expense.amount;
            } else {
                expenseList.appendChild(listItem);
                totalExpense += Math.abs(expense.amount);
            }
        });

        incomeTotal.textContent = totalIncome;
        expenseTotal.textContent = totalExpense;
        balanceTotal.textContent = totalIncome - totalExpense;
    };

    // Event listener for adding income
    addIncomeBtn.addEventListener('click', async () => {
        const amount = parseInt(incomeInput.value);
        if (!isNaN(amount)) {
            try {
                await fetch('/expenses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ amount })
                });
                fetchExpenses();
            } catch (err) {
                console.error(err);
            }
        }
    });

    // Event listener for adding expense
    addExpenseBtn.addEventListener('click', async () => {
        const amount = parseInt(expenseInput.value);
        if (!isNaN(amount)) {
            try {
                await fetch('/expenses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ amount: -amount }) // Send negative amount for expense
                });
                fetchExpenses();
            } catch (err) {
                console.error(err);
            }
        }
    });

    // Event listener for clearing all expenses
    clearBtn.addEventListener('click', async () => {
        try {
            await fetch('/expenses', { method: 'DELETE' });
            fetchExpenses();
        } catch (err) {
            console.error(err);
        }
    });

    // Fetch expenses when the page loads
    fetchExpenses();
});
