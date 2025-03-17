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

let expenses = JSON.parse(getLocalStorage("expenses") ?? '[]');
let currentBudget = parseInt(getLocalStorage("budget") ?? '0');

// Update UI on load
totalBudget.textContent = `₹${currentBudget}`;
calculateExpense.textContent = `₹${currentBudget - expenses.reduce((acc, obj) => acc + obj.expAmount, 0)}`;
expenses.forEach(({ expName, expAmount }) => addItem(expName, expAmount));

budgetBtn.addEventListener('click', () => {
    let budgetValue = Number(budgetInput.value);

    if (budgetValue <= 0) {
        alert("give a valid budget amount");
        return;
    }

    totalBudget.textContent = `₹${budgetValue}`;
    calculateExpense.textContent = `₹${budgetValue - expenses.reduce((acc, obj) => acc + obj.expAmount, 0)}`;
    budget.hidden = false;
    setLocalStorage("budget", budgetValue);
    currentBudget = budgetValue;
})

expenseBtn.addEventListener('click', () => {
    let expName = expenseName.value;
    let expAmount = Number(expenseAmount.value);

    if (expName.trim() == "" || expAmount <= 0) {
        alert('Please enter a valid expense name and amount.');
        return;
    }

    if (expAmount > currentBudget) {
        alert(`Insufficient budget! You need ₹${expAmount - currentBudget} more.`);
        return;
    }

    expenses.push({ expName, expAmount });
    setLocalStorage("expenses", JSON.stringify(expenses));

    addItem(expName, expAmount);
    currentBudget -= expAmount;
    calculateExpense.textContent = `₹${currentBudget}`;
    resetExpense();
    setLocalStorage("budget", currentBudget);
});

function addItem(expName, expAmount) {
    const items = document.createElement('li');
    items.textContent = `${expName} : ₹${expAmount}`;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';

    delBtn.addEventListener('click', () => {
        const expenseKey = items.textContent.split(': ₹')[0].trim();
        expenses = expenses.filter((item) => item.expName !== expenseKey);

        setLocalStorage("expenses", JSON.stringify(expenses));

        items.remove();
        currentBudget += expAmount;
        calculateExpense.textContent = `₹${currentBudget}`;
        setLocalStorage("budget", currentBudget);
    });

    items.appendChild(delBtn)
    list.appendChild(items);
}

function resetExpense() {
    expenseName.value = "";
    expenseAmount.value = "";
}

function getLocalStorage(key) {
    return localStorage.getItem(key);
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}