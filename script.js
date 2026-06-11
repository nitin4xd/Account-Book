const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const form = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

function saveData() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function updateUI() {

    transactionList.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {

        if(transaction.type === "income"){
            totalIncome += transaction.amount;
        }else{
            totalExpense += transaction.amount;
        }

        const li = document.createElement("li");

        li.className =
            `transaction transaction-${transaction.type}`;

        li.innerHTML = `
            <div class="transaction-left">
                <strong>${transaction.description}</strong>
                <small>${transaction.type}</small>
            </div>

            <div>
                <span class="amount-${transaction.type}">
                    ${transaction.type === "income" ? "+" : "-"}
                    ₹${transaction.amount.toFixed(2)}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})"
                >
                    Delete
                </button>
            </div>
        `;

        transactionList.appendChild(li);

    });

    income.textContent =
        `₹${totalIncome.toFixed(2)}`;

    expense.textContent =
        `₹${totalExpense.toFixed(2)}`;

    balance.textContent =
        `₹${(totalIncome-totalExpense).toFixed(2)}`;

    saveData();
}

form.addEventListener("submit", function(e){

    e.preventDefault();

    const description =
        document.getElementById("description").value;

    const amount =
        Number(document.getElementById("amount").value);

    const type =
        document.getElementById("type").value;

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type
    };

    transactions.push(transaction);

    form.reset();

    updateUI();

});

function deleteTransaction(id){

    transactions = transactions.filter(
        item => item.id !== id
    );

    updateUI();
}

updateUI();