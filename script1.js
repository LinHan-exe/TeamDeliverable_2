// Load expense data from localStorage
const expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];

const messageContainer = document.getElementById('messageContainer');
const chartContainer = document.getElementById('chartContainer');

function initializeStatistics() {
    if (expenseList.length === 0) {
        // If no expenses, show the start message
        messageContainer.style.display = 'block';
        chartContainer.style.display = 'none';
    } else {
        // If expenses exist, hide the message and show the chart
        messageContainer.style.display = 'none';
        chartContainer.style.display = 'block';
        createPieChart();
    }
}

function createPieChart() {
    // Process data for the chart
    const categoryTotals = {};
    expenseList.forEach(expense => {
        if (categoryTotals[expense.category]) {
            categoryTotals[expense.category] += expense.amount;
        } else {
            categoryTotals[expense.category] = expense.amount;
        }
    });

    // Create the pie chart
    const ctx = document.getElementById('expenseChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
                ]
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Expense Distribution'
            }
        }
    });
}

// Initialize the statistics when the page loads
document.addEventListener('DOMContentLoaded', initializeStatistics);