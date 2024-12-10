// Clear when page loads
window.onload = function() {
    localStorage.clear();
   }
   
   
   // Load expense data from localStorage
   var expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
   var messageContainer = document.getElementById('messageContainer');
   var chartContainer = document.getElementById('chartContainer');
   var barChartContainer = document.getElementById('budgetBarChart').parentElement;
   
   
   function initializeStatistics() {
      if (expenseList.length === 0) {
          // If no expenses, show the start message
          messageContainer.style.display = 'block';
          chartContainer.style.display = 'none';
          barChartContainer.style.display = 'none';
      } else {
          // If expenses exist, hide the message and show the chart
          messageContainer.style.display = 'none';
          chartContainer.style.display = 'block';
          barChartContainer.style.display = 'block';
          createBarChart();
          createPieChart();
      }
   }
   
   
   function createPieChart() {
      // Process data for the chart
      var categoryTotals = {};
      expenseList.forEach(expense => {
          if (categoryTotals[expense.category]) {
              categoryTotals[expense.category] += expense.amount;
          } else {
              categoryTotals[expense.category] = expense.amount;
          }
      });
   
   
      // Create the pie chart
      var ctx = document.getElementById('expenseChart').getContext('2d');
      new Chart(ctx, { type: 'pie',
          data: {
              labels: Object.keys(categoryTotals),
              datasets: [{
                  data: Object.values(categoryTotals),
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF']
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              title: {display: true, text: 'Expense Distribution'}
          }
      });
   }
   
   
   // Function to create Bar Chart
   function createBarChart() {
      var barChartCtx = document.getElementById('budgetBarChart').getContext('2d');
      // Extract categories and amounts from the data
      var categoryTotals = {};
      expenseList.forEach(expense => {
          if (categoryTotals[expense.category]) {
              categoryTotals[expense.category] += expense.amount;
          } else {
              categoryTotals[expense.category] = expense.amount;
          }
      });
      // Creates the bar chart
      new Chart(barChartCtx, {
        type: 'bar',
        data: {
          labels: Object.keys(categoryTotals),
          datasets: [{
            label: 'Budgeted Amount ($)',
            data: Object.values(categoryTotals),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {display: true, position: 'top' },
            tooltip: {enabled: true }
          },
          scales: {
            y: {beginAtZero: true}
          }
        }
      });
    }
   
   
   // Initialize the statistics when the page loads
   document.addEventListener('DOMContentLoaded', initializeStatistics);