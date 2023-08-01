const budgetInput = $("#budget-input");
const descExpense = $("#expense-input");
const expenseInput = $("#amount-input");

const showBudget = $("#budget-amount");
const showExpenses = $("#expense-amount");
const showBalance = $("#balance-amount");

const expenseSubmitBtn = $("#expense-submit");
const budgetSubmitBtn = $("#budget-submit");

const budgetForm = $("#budget-form");
const expenseForm = $("#expense-form");

const containerTable = $(".contTable");
let firstSubmit = true;

let budget = 0;
let balance = 0;
let sumExpense = 0;

function balanceCalc() {
  balance = +budget - sumExpense;
  showBalance.text(balance);

  $("#balance").removeClass("showGreen");
  $("#balance").removeClass("showRed");
  $("#balance").removeClass("showBlack");

  if (balance > 0) {
    $("#balance").addClass("showGreen");
  } else if (balance < 0) {
    $("#balance").addClass("showRed");
  } else {
    $("#balance").addClass("showBlack");
  }
}

function expensesCalc() {
  sumExpense = 0;
  const expenses = $("table .expVal");
  $(expenses).each((_, expense) => {
    sumExpense += +$(expense).text();
  });

  showExpenses.text(sumExpense);
  balanceCalc();
}

function renderRow(expense) {
  const row = $("<tr>");
  $(row).addClass("list-item");

  const title = $("<td>");
  $(title).text(`${expense.title}`);
  $(title).addClass("expense-title text-uppercase font-weight-bold");

  const amount = $("<td>");
  $(amount).text(`${expense.amount}`);
  $(amount).addClass("expense-amount font-weight-bold expVal");

  const actions = $("<td>");

  const delBtn = $("<button>");
  $(delBtn).addClass("del");
  $(delBtn).html(`<i class="fa-solid fa-trash delete-icon"></i>`);
  $(delBtn).css("border", "none");
  $(delBtn).css("background-color", "transparent");

  $(document).on("click", ".del", function () {
    expensesCalc();

    $(this).parent().parent().remove();
  });

  const editBtn = $("<button>");
  $(editBtn).addClass("edit");
  $(editBtn).html(`<i class="fa-solid fa-pen-to-square edit-icon"></i>`);
  $(editBtn).css("border", "none");
  $(editBtn).css("background-color", "transparent");

  $(document).on("click", ".edit", function () {
    const parentRow = $(this).parent().parent();
    const title = $(parentRow).children(".expense-title").text();
    const amount = $(parentRow).children(".expense-amount").text();

    $(descExpense).val(title);
    $(expenseInput).val(amount);

    $(parentRow).remove();
    expensesCalc();
  });

  $(actions).append(editBtn, delBtn);
  $(row).append(title, amount, actions);
  $("tbody").append(row);
}

$(budgetForm).on("submit", function (e) {
  e.preventDefault();

  if ($(budgetInput).val() === "" || budgetInput.val() <= 0) {
    $(".budget-feedback").text("Value cannot be empty or negative");
    $(".budget-feedback").show();
    return;
  }

  budget = +budgetInput.val();
  showBudget.text(budget);

  balanceCalc();

  $(this).trigger("reset");
});

$(expenseForm).on("submit", function (e) {
  e.preventDefault();

  if (!$(descExpense).val() || +$(expenseInput).val() <= 0) {
    $(".expense-feedback").text("Value cannot be empty or negative");
    $(".expense-feedback").show();
    return;
  }

  if (firstSubmit) {
    const table = $("<table>");
    table.addClass("table table-borderless text-center");
    table.html(`
                 <thead>
                  <tr>
                    <th class="list-item font-we">Expense Title</th>
                    <th class="list-item">Expense Value</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody></tbody>`);

    containerTable.append(table);
    firstSubmit = false;
  }

  renderRow({
    title: $(descExpense).val(),
    amount: $(expenseInput).val(),
  });

  expensesCalc();

  $(this).trigger("reset");
});

$(budgetInput).on("focus", function () {
  $(".budget-feedback").hide();
});

$(expenseInput).on("focus", function () {
  $(".expense-feedback").hide();
});

$(descExpense).on("focus", function () {
  $(".expense-feedback").hide();
});
