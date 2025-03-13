const $ = (selector) => document.querySelector(selector);
const budgetInput = $('#budget-input');
const budgetBtn = $('#addBudget-btn');
const totalBudget = $('#total-budget');
const calculateExpense = $('#after-calculate');
const budget = $('#budget');
const expenseName = $('#expenseName');
const expenseAmount = $('#expensePrice');
const expenseBtn = $('#addExpense-btn');
const list = $('#item-list');

budgetBtn.addEventListener('click', () => {
    let budgetValue = Number(budgetInput.value);

    if (budgetValue <= 0) {
        alert("give a valid budget amount");
        return;
    }
    totalBudget.textContent = `₹${budgetValue}`;
    budget.hidden = false;
    localStorage.setItem("budget", budgetValue);
})

expenseBtn.addEventListener('click', () => {
    let expName = expenseName.value;
    let expAmount = Number(expenseAmount.value);

    if (expName.trim() == "" || expAmount <= 0) {
        alert('Please enter a valid expense name and amount.');
        return;
    }

    let currentBudget = Number(localStorage.getItem("budget"));
    if (expAmount > currentBudget) {
        alert(`Insufficient budget! You need ₹${expAmount - currentBudget} more.`);
        return;
    }

    const items = document.createElement('li');
    items.textContent = `${expName} :  ₹${expAmount}`;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete'

    delBtn.addEventListener('click', () => {
        items.remove();  
        currentBudget += expAmount;  
        calculateExpense.textContent = `₹${currentBudget}`;  
        localStorage.setItem("budget", currentBudget);  
    });

    items.appendChild(delBtn)
    list.appendChild(items);

    currentBudget -= expAmount;
    calculateExpense.textContent = `₹${currentBudget}`;
    resetExpense()
})

function resetExpense() {
    expenseName.value = "";
    expenseAmount.value = "";
}


