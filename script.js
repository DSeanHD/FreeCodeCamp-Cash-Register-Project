let cash = document.getElementById("cash");
let displayChangeDue = document.getElementById("change-due");
let purchaseBtn = document.getElementById("purchase-btn");

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

function formatResults(status, change) {
    displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
    change.map(
        money => (displayChangeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
    );
    return;
}

function checkCashRegister () {
    if (!cash.value) {
        return null;
    }

    if (cash.value < price) {
        alert("Customer does not have enough money to purchase the item");
        cash.value = "";
        return;
    } else if (cash.value == price) {
        displayChangeDue.innerHTML = "No change due - customer paid with exact cash";
        cash.value = "";
        return;
    }

    let changeDue = Number(cash.value) - price;
    let reversedCid = [...cid].reverse();
    let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
    let result = { status: 'OPEN', change: [] };
    let totalCID = parseFloat(
        cid
        .map(total => total[1])
        .reduce((prev, curr) => prev + curr)
        .toFixed(2)
    );

    if (totalCID < changeDue) {
        return (displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
    }

    if (totalCID === changeDue) {
        result.status = 'CLOSED';
    }

    for (let i = 0; i <= reversedCid.length; i++) {
        if (changeDue > denominations[i] && changeDue > 0) {
            let count = 0;
            let total = reversedCid[i][1];
            while (total > 0 && changeDue >= denominations[i]) {
                total -= denominations[i];
                changeDue = parseFloat((changeDue -= denominations[i]).toFixed(2));
                count++;
            }
            if (count > 0) {
                result.change.push([reversedCid[i][0], count * denominations[i]]);
            }
        }
    }

    if (changeDue > 0) {
        return (displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
    }

    formatResults(result.status, result.change);
}

purchaseBtn.addEventListener("click", checkCashRegister);