async function getCurrencies(){
    fetch('https://economia.awesomeapi.com.br/json/all')
        .then(Response => Response.json().then(data => {
            createCurrencyOptions(data);
            logCurrencies(data);
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
getCurrencies();