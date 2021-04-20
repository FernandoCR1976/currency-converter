const freeAPIKey = '6eb74eb3f0325b10d40d';

async function getCurreciesInformations(){
    if (!!localStorage.getItem('currencyInfos')){
        start();
    } else {
        fetch(`https://free.currconv.com/api/v7/currencies?apiKey=${freeAPIKey}`)
        .then(Response => Response.json().then(data => {
            localStorage.setItem('currencyInfos', JSON.stringify(data.results));
            getCurreciesInformations();
        }).catch(() => showErrorScreen()))
        .catch(() => showErrorScreen());
    }
}
function start(){
    const currenciesData = JSON.parse(localStorage.getItem('currencyInfos'));
    createCurrencyOptions(currenciesData);
    selectRealAndDollarCurrencies();
    addInicialValueToInput();
    addEventListeners();
    convertCurrency();
}
function createCurrencyOptions(currencies){
    const selectElements = document.querySelectorAll('.currencyType');
    for (const {id, currencyName} of Object.values(currencies)){
        selectElements.forEach(function(selectElement){
            const tag = document.createElement('option');
            tag.setAttribute('value', id);
            tag.innerText = currencyName;
            selectElement.appendChild(tag);
        });
    }
}
function selectRealAndDollarCurrencies(){
    const originOptions = document.querySelectorAll('#currency-origin option');
    const destinyOptions = document.querySelectorAll('#currency-destiny option');
    originOptions[8].setAttribute('selected', 'true');
    destinyOptions[120].setAttribute('selected', 'true');
}
function addInicialValueToInput(){
    document.querySelectorAll('.currencyInput')[0].value = 1;
}
function addEventListeners(){
    document.getElementsByClassName('currencyType')[0].addEventListener('change', insertFlags);
    document.getElementsByClassName('currencyType')[1].addEventListener('change', insertFlags);
    document.getElementById('convert-button').addEventListener('click', convertCurrency);
}
function insertFlags(){
    const currency = this.value;
    const flag = new Image();
    getFlagIcon();
    if (this.id == 'currency-origin'){
        document.getElementById('flag-origin').innerHTML = '';
        document.getElementById('flag-origin').appendChild(flag);
    } else {
        document.getElementById('flag-destiny').innerHTML = '';
        document.getElementById('flag-destiny').appendChild(flag);
    }
    function getFlagIcon(){
        fetch(`https://restcountries.eu/rest/v2/currency/${currency}`)
        .then(Response => Response.json().then(data => {
            flag.src = data[0].flag;
        }))
        .catch(() => getCryptoCurrentIcon());
    }
    function getCryptoCurrentIcon(){
        flag.src = `https://cryptoicons.org/api/black/${currency.toLowerCase()}/64`;
        if (!!(!flag.src)){
            document.getElementById('flag-origin').innerHTML = '';
            document.getElementById('flag-destiny').innerHTML = '';
        }
    }
}
function convertCurrency() {
    const inputElements = document.getElementsByClassName('currencyInput');
    const currencyInputElements = document.getElementsByClassName('currencyType');
    const inputValue = inputElements[0].value;
    convert(
        currencyInputElements[0].value,
        inputValue,
        currencyInputElements[1].value
        );
    function convert(from, val, to){
        if (from == to || !val) return

        const symbols = JSON.parse(localStorage.getItem('currencyInfos'));
        fetch(`https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${freeAPIKey}`)
        .then(Response => Response.json()
            .then(data => {
                const conversion = (data[`${from}_${to}`] * val).toFixed(2);
                const currencySymbol = symbols[to].currencySymbol;
                let valueFormatted;
                if (currencySymbol && currencySymbol.length < 3) {
                    valueFormatted = currencySymbol + " " + conversion;
                } else {
                    valueFormatted = conversion + " " + currencySymbol;
                }
                inputElements[1].value = valueFormatted
            })
            .catch((e) => console.error(e)))
        .catch((e) => console.error(e));
    }
}
function showErrorScreen(){
    const errorMessageDiv = document.getElementsByClassName('error-message')[0];
    errorMessageDiv.classList.add('show');
}

getCurreciesInformations();