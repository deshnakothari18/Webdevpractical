let expenses = [];

const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const category = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const expensesDiv = document.getElementById("expenses");
const total = document.getElementById("total");
const filter = document.getElementById("filter");

// Add expense
addBtn.addEventListener("click", function () {

    let name = expenseName.value.trim();
    let amount = Number(expenseAmount.value);
    let selectedCategory = category.value;

    // Input validation
    if (name === "" || expenseAmount.value.trim() === "" ||
        selectedCategory === "") {
        alert("Please fill all the fields!");
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid positive amount!");
        return;
    }

    // Create expense object
    let expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: selectedCategory
    };

    expenses.push(expense);

    // Clear input fields
    expenseName.value = "";
    expenseAmount.value = "";
    category.value = "";

    displayExpenses();
});

// Display expenses
function displayExpenses() {

    expensesDiv.innerHTML = "";

    let selectedFilter = filter.value;

    let filteredExpenses = expenses.filter(function(expense) {
        return selectedFilter === "All" ||
               expense.category === selectedFilter;
    });

    if (filteredExpenses.length === 0) {
        expensesDiv.innerHTML =
            '<p class="empty">No expenses found.</p>';
    }

    filteredExpenses.forEach(function(expense) {

        let div = document.createElement("div");
        div.className = "expense-item";

        let info = document.createElement("div");
        info.className = "expense-info";

        let name = document.createElement("h3");
        name.textContent = expense.name;

        let cat = document.createElement("p");
        cat.textContent = expense.category;

        info.appendChild(name);
        info.appendChild(cat);

        let right = document.createElement("div");
        right.className = "expense-right";

        let amount = document.createElement("p");
        amount.className = "amount";
        amount.textContent = "₹" + expense.amount.toFixed(2);

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {
            deleteExpense(expense.id);
        });

        right.appendChild(amount);
        right.appendChild(deleteBtn);

        div.appendChild(info);
        div.appendChild(right);

        expensesDiv.appendChild(div);
    });

    updateTotal();
}

// Calculate total expenses
function updateTotal() {

    let sum = expenses.reduce(function(total, expense) {
        return total + expense.amount;
    }, 0);

    total.textContent = "₹" + sum.toFixed(2);
}

// Delete expense
function deleteExpense(id) {

    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    displayExpenses();
}

// Filter expenses
filter.addEventListener("change", displayExpenses);