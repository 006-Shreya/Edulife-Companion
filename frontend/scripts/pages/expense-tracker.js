const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');
const summary = document.getElementById('summary');
const incomeInput = document.getElementById('income');
const limitInput = document.getElementById('limit');
const emailInput = document.getElementById('email');
const chartCanvas = document.getElementById('expenseChart');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let income = parseFloat(localStorage.getItem('income')) || 0;
let limit = parseFloat(localStorage.getItem('limit')) || null;
let userEmail = localStorage.getItem('studentEmail') || '';
let chart;

if (income) incomeInput.value = income;
if (limit) limitInput.value = limit;
if (userEmail) emailInput.value = userEmail;

function setIncome() {
  income = parseFloat(incomeInput.value);
  localStorage.setItem('income', income);
  renderExpenses();
  alert(`Total Income set to Rs.${income}`);
}

function setLimit() {
  limit = parseFloat(limitInput.value);
  localStorage.setItem('limit', limit);
  renderExpenses();
  alert(`Monthly limit set to Rs.${limit}`);
}

function setEmail() {
  userEmail = emailInput.value;
  localStorage.setItem('studentEmail', userEmail);
  alert('Email saved successfully!');
}

function checkLimit(total) {
  if (limit && total > limit) {
    alert(`Limit Exceeded! Limit: Rs.${limit}, Spent: Rs.${total}`);
    sendEmailNotification(total);
  }
}

function sendEmailNotification(total) {
  if (!userEmail) {
    alert('Please set your email first to receive notifications!');
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  fetch(apiUrl(API_CONFIG.endpoints.notifyExceedLimit), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      email: userEmail,
      message: `Your monthly expense limit of Rs.${limit} has been exceeded! You've spent Rs.${total}.`
    }),
    signal: controller.signal
  })
    .then((response) => {
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        alert('Email notification sent successfully!');
      } else {
        alert('Failed to send email notification: ' + (data.error || 'Unknown error'));
      }
    })
    .catch((error) => {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        alert('Request timed out. Please check if the server is running.');
      } else {
        alert('Error sending email: ' + error.message);
      }
    });
}

function renderExpenses() {
  list.innerHTML = '';
  let total = 0;
  expenses.forEach((exp, index) => {
    total += exp.amount;
    const li = document.createElement('li');
    li.innerHTML = `<span>${exp.desc} - Rs.${exp.amount.toFixed(2)}</span>
                    <button onclick="deleteExpense(${index})">Delete</button>`;
    list.appendChild(li);
  });
  const balance = income - total;
  summary.innerHTML = `Total Expenses: Rs.${total.toFixed(2)}<br>Balance: Rs.${balance.toFixed(2)}`;
  checkLimit(total);
  updateGraph();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const desc = document.getElementById('desc').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  if (desc && amount > 0) {
    expenses.push({ desc, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    form.reset();
    renderExpenses();
  }
});

function updateGraph() {
  const labels = expenses.map((e) => e.desc);
  const data = expenses.map((e) => e.amount);
  if (chart) chart.destroy();
  chart = new Chart(chartCanvas, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        label: 'Expenses',
        data,
        backgroundColor: ['#0077cc', '#00b894', '#fdcb6e', '#d63031', '#6c5ce7'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: 'white', padding: 15 }
        }
      }
    }
  });
}

function resetTracker() {
  if (confirm('Are you sure you want to reset all data?')) {
    localStorage.removeItem('expenses');
    localStorage.removeItem('income');
    localStorage.removeItem('limit');
    location.reload();
  }
}

renderExpenses();
