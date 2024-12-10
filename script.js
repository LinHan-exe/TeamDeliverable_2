var totalBudget = 0;
var currentBalance = 0;
var expenseList = [];
var budgetForm = document.getElementById('budgetForm');
var expenseForm = document.getElementById('expenseForm');
var budgetDisplay = document.getElementById('budgetDisplay');
var expenseListDisplay = document.getElementById('expenseList');
var balanceDisplay = document.getElementById('remainingBudget');


// sets the initial budget
budgetForm.addEventListener('submit', function(event) {
   event.preventDefault();
   const budgetInput = document.getElementById('initialBudget');
   totalBudget = parseFloat(budgetInput.value);
   currentBalance = totalBudget;
   updateDisplays();
});


// Adds new expense
expenseForm.addEventListener('submit', function(event) {
   event.preventDefault();
   var amountInput = document.getElementById('expenseAmount');
   var categoryInput = document.getElementById('expenseCategory');
   var newExpense = {
       amount: parseFloat(amountInput.value),
       category: categoryInput.value
   };
   expenseList.push(newExpense);
   currentBalance -= newExpense.amount;
   updateDisplays();
   saveExpenses();
   amountInput.value = '';
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
