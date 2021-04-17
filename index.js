let currentCurrencies;

async function getCurrenciesNames(){
    fetch('https://economia.awesomeapi.com.br/json/all')
    .then(Response => Response.json().then(data => {
        createCurrencyOptions(data);
    }))
    .catch(() => {
        console.log('error to get currencies\ntrying again...');
        getCurrenciesNames();
    });
}
function createCurrencyOptions(currencies){
    const selectElements = document.querySelectorAll('.currencyType');
    for (const {code, name} of Object.values(currencies)){
        selectElements.forEach(function(selectElement){
            const tag = document.createElement('option');
            tag.setAttribute('value', code);
            tag.setAttribute('title', name.split('/')[0]);
            tag.innerText = name.split('/')[0];
            selectElement.appendChild(tag);
        });
    }
}
function convertCurrency() {
    const inputElements = document.querySelectorAll('.currencyInput');
    const currencyInputElements = document.querySelectorAll('.currencyType');
    const inputValue = inputElements[0].value;
    convert(
        currencyInputElements[0].value,
        inputValue,
        currencyInputElements[1].value
        );
    function convert(from, val, to){
        if (from == to) return
        try{
            fetch(`https://economia.awesomeapi.com.br/last/${from}-${to}`)
            .then(Response => Response.json()
                .then(data => {
                    console.log(data[`${from}${to}`]);
                    inputElements[1].value = (data[`${from}${to}`].high * val).toFixed(2);
                })
                .catch())
            .catch((e) => console.error(e));
        } catch {
            console.error();
        }
    }
}

getCurrenciesNames();