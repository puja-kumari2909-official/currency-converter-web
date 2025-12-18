
const fromCurrency = document.querySelector("#fromcurrency");
const toCurrency = document.querySelector("#tocurrency");
const amount = document.querySelector("#amount");
const result = document.querySelector(".Result");
const button = document.querySelector(".btn");
const fromFlags = document.querySelector("#fromflags");
const toFlags = document.querySelector("#toflags");
const selects = document.querySelectorAll("select");



function updateFlag(select, flagImg) {
    const currency = select.value;
    const countryCode = countryList[currency];

    if (!countryCode) return; // safety


    flagImg.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

function dropdowns() {
    for (let select of selects) {
        for (let code in countryList) {



            let options = document.createElement("option");
            options.innerText = code;
            options.value = code;



            select.append(options);
        }
    }



    fromCurrency.value = "USD";
    toCurrency.value = "INR";
    updateFlag(fromCurrency, fromFlags);
    updateFlag(toCurrency, toFlags);
}


dropdowns();


fromCurrency.addEventListener("change", () => {
    updateFlag(fromCurrency, fromFlags);
});

toCurrency.addEventListener("change", () => {
    updateFlag(toCurrency, toFlags);
});
async function convertCurrency() {
    const from = fromCurrency.value.toLowerCase(); //  lowercase
    const to = toCurrency.value.toLowerCase();     // lowercase
    const amt = parseFloat(amount.value);//string-number

    if (isNaN(amt) || amt <= 0) {
        result.innerText = "Enter a valid amount!";
        return;
    }

    result.innerText = "Converting...";

    try {
        const res = await fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
        );

        const data = await res.json();

        const rate = data[from][to]; //  NOW WORKS
        const finalAmount = (rate * amt).toFixed(2);

        result.innerText = `Result: ${finalAmount} ${to.toUpperCase()}`;
    } catch (err) {
        result.innerText = "Error fetching data!";
        console.error(err);
    }
}



button.addEventListener("click", convertCurrency); js

