// global variables
let totalBudget = 0;
let currentBalance = 0;
let expenseList = [];

// sets document elements to variables here
const budgetForm = document.getElementById('budgetForm');
const expenseForm = document.getElementById('expenseForm');
const budgetDisplay = document.getElementById('budgetDisplay');
const expenseListDisplay = document.getElementById('expenseList');
const balanceDisplay = document.getElementById('remainingBudget');

// sets the initial budget
budgetForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const budgetInput = document.getElementById('initialBudget');
    totalBudget = parseFloat(budgetInput.value);
    currentBalance = totalBudget;
    updateDisplays();
});

// code to add new expense
expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const amountInput = document.getElementById('expenseAmount');
    const categoryInput = document.getElementById('expenseCategory');
    
    const newExpense = {
        amount: parseFloat(amountInput.value),
        category: categoryInput.value
    };
    
    expenseList.push(newExpense);
    currentBalance -= newExpense.amount;
    
    updateDisplays();
    saveExpenses();
    amountInput.value = ''; // Clear input field
});

// Update all displays
function updateDisplays() {
    updateBudgetDisplay();
    updateExpenseListDisplay();
    updateBalanceDisplay();
}

// Update budget display
function updateBudgetDisplay() {
    budgetDisplay.textContent = `Total Budget: $${totalBudget.toFixed(2)}`;
}

// Update expense list display
function updateExpenseListDisplay() {
    expenseListDisplay.innerHTML = '<h3>Expenses:</h3>';
    expenseList.forEach((expense, index) => {
        expenseListDisplay.innerHTML += `<p>${index + 1}. $${expense.amount.toFixed(2)} - ${expense.category}</p>`;
    });
}

// Update balance display
function updateBalanceDisplay() {
    balanceDisplay.textContent = `Current Balance: $${currentBalance.toFixed(2)}`;
}

// Save expense list to localStorage
function saveExpenses() {
    localStorage.setItem('expenseList', JSON.stringify(expenseList));
}