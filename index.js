const freeAPIKey = '6eb74eb3f0325b10d40d';

async function getCurreciesInformations(){
    if (!!localStorage.getItem('currencyInfos')){
        const currenciesData = localStorage.getItem('currencyInfos');
        createCurrencyOptions(JSON.parse(currenciesData));
    } else {
        fetch(`https://free.currconv.com/api/v7/currencies?apiKey=${freeAPIKey}`)
        .then(Response => Response.json().then(data => {
            localStorage.setItem('currencyInfos', JSON.stringify(data.results));
            getCurreciesInformations();
        }))
        .catch(() => {
            showErrorScreen();
        });
    }
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
        if (from == to || !val) return
        
        const symbols = JSON.parse(localStorage.getItem('currencyInfos'));
        try {
            fetch(`https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=${freeAPIKey}`)
            .then(Response => Response.json()
                .then(data => {
                    let valueFormatted;
                    if (symbols[to].currencySymbol && symbols[to].currencySymbol.length < 3){
                        valueFormatted = symbols[to].currencySymbol + " " + (data[`${from}_${to}`] * val).toFixed(2);
                    } else {
                        valueFormatted = (data[`${from}_${to}`] * val).toFixed(2) + " " + symbols[to].id;
                    }   
                    inputElements[1].value = valueFormatted
                })
                .catch((e) => console.error(e)))
            .catch((e) => console.error(e));
        } catch {
            console.error();
        }
    }
}
function showErrorScreen(){
    const errorMessageDiv = document.getElementsByClassName('error-message')[0];
    errorMessageDiv.classList.add('show');
}

getCurreciesInformations();