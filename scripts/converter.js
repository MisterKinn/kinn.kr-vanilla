let exchangeRates = {};
let lastUpdateTime = null;

function displayErrorMessage(message) {
    console.error(message);
    alert(message);
}

function displayLastUpdateTime() {
    const updateElement = document.querySelector("#lastUpdateTime");

    if (lastUpdateTime) {
        const formattedTime = new Date(lastUpdateTime).toLocaleString();
        updateElement.textContent = `Last Updated: ${formattedTime}`;
    } else {
        updateElement.textContent = "Data has not been updated yet.";
    }
}

async function updateExchangeRates() {
    try {
        const response = await fetch(
            "https://api.exchangerate-api.com/v4/latest/USD" // fetch Exchange Rate from Exchangerate-Api
        );
        const data = await response.json();

        if (data.rates) {
            exchangeRates = data.rates;
            lastUpdateTime = Date.now();
            console.log("Exchange Rates Updated:", exchangeRates);
            displayLastUpdateTime();
        } else {
            console.error("Failed to update Exchange Rates:", data);
        }
    } catch (error) {
        console.error("Error updating Exchange Rates:", error);
    }
}

function mapCountryCode(apiCountryCode) {
    const codeMapping = {
        US: "usd",
        KR: "krw",
        AU: "aud",
        BR: "brl",
        CA: "cad",
        CN: "cny",
        EU: "eur",
        GB: "gbp",
        JP: "jpy",
        MX: "mxn",
        PH: "php",
    };

    return codeMapping[apiCountryCode] || apiCountryCode;
}

async function getUserCountry() {
    try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        if (data.country) {
            return mapCountryCode(data.country);
        } else {
            console.error("Failed to get user country:", data);
            return null;
        }
    } catch (error) {
        console.error("Error getting user country:", error);
        return null;
    }
}

async function initialize() {
    const defaultCurrency = await getUserCountry();

    if (defaultCurrency) {
        document.querySelector("#fromCurrency").value = defaultCurrency;
        document.querySelector("#toCurrency").value = "usd";
    }

    await updateExchangeRates();
    displayLastUpdateTime();

    setInterval(updateExchangeRates, 3600000); // Update Exchange Rates every 1 hr;
}
window.addEventListener("load", initialize);

function calculateExchangeRate(fromCurrency, toCurrency) {
    if (
        exchangeRates &&
        exchangeRates[fromCurrency] &&
        exchangeRates[toCurrency]
    ) {
        return exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    }
    return null;
}

const fromCurrencyElement = document.querySelector("#fromCurrency");
const toCurrencyElement = document.querySelector("#toCurrency");
const amountElement = document.querySelector("#amount");

amountElement.addEventListener("input", convertCurrency);
fromCurrencyElement.addEventListener("change", convertCurrency);
toCurrencyElement.addEventListener("change", convertCurrency);

async function convertCurrency() {
    const fromCurrency = document
        .querySelector("#fromCurrency")
        .value.toUpperCase();
    const toCurrency = document
        .querySelector("#toCurrency")
        .value.toUpperCase();
    const amount = parseFloat(document.querySelector("#amount").value);

    if (!amount) {
        // null Amount
        return;
    }

    try {
        if (Object.keys(exchangeRates).length === 0) {
            await updateExchangeRates();
        }

        const exchangeRate = calculateExchangeRate(fromCurrency, toCurrency);
        if (exchangeRate === null) {
            console.log("Data:", exchangeRates);
            displayErrorMessage("Unsupported Currency.");
            return;
        }

        const result = (amount * exchangeRate).toFixed(2);

        const formattedFromCurrency = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: fromCurrency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            currencyDisplay: "symbol",
        }).format(amount.toFixed(2));

        const formattedToCurrency = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: toCurrency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            currencyDisplay: "symbol",
        }).format(result);

        const resultElement = document.querySelector("#result");
        resultElement.innerHTML = `${formattedFromCurrency} = ${formattedToCurrency}`;
    } catch (error) {
        console.error("Error fetching Exchange Rates:", error);
        displayErrorMessage(
            "Failed to fetch Exchange Rates. Please try again later."
        );
    }
}

const flipTop = document.querySelector(".flipTop");
const flipBottom = document.querySelector(".flipBottom");

function flipCurrency() {
    const fromCurrency = document.querySelector("#fromCurrency").value;
    const toCurrency = document.querySelector("#toCurrency").value;

    document.querySelector("#fromCurrency").value = toCurrency;
    document.querySelector("#toCurrency").value = fromCurrency;

    convertCurrency();
}

flipTop.addEventListener("click", flipCurrency);
flipBottom.addEventListener("click", flipCurrency);
