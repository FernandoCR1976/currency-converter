let currentCurrencies;

async function getCurrencies(){
    fetch('https://economia.awesomeapi.com.br/json/all')
    .then(Response => Response.json().then(data => {
        createCurrencyOptions(data);
        logCurrencies(data);
        currentCurrencies = data;
    }))
    .catch(() => {
        console.log('error to get currencies\ntrying again...');
        getCurrencies();
    });
}
function createCurrencyOptions(currencies){
    const selectElements = document.querySelectorAll('.currencyType');
    for (const {code} of Object.values(currencies)){
        selectElements.forEach(function(selectElement){
            const tag = document.createElement('option')
            tag.setAttribute('value', code);
            tag.innerText = code;
            selectElement.appendChild(tag);
        });
    }
}
function logCurrencies(currencies){
    console.table(currencies);
}
function addListnerToInput(){
    const inputElement = document.getElementsByClassName('currencyInput');
    inputElement[0].addEventListener('input', convertCurrency);
}
function convertCurrency() {
    const inputElements = document.querySelectorAll('.currencyInput');
    const currencyInputElements = document.querySelectorAll('.currencyType');
    const inputValue = inputElements[0].value;
    const outputValue = convert(
        currencyInputElements[0].value,
        inputValue,
        currencyInputElements[1].value);
    inputElements[1].value = outputValue;

    function convert(from, val, to){
        if (from && to){
            console.log(`from: ${from}\nvalue: ${val}\nto: to: ${to}`);
            return 0;
        }
    }
}

getCurrencies();
addListnerToInput();