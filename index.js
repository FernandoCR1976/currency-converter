let currencies;

async function getCurrencies(){
    const cr = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then(Response => Response.json())
    .catch(() => (console.error(), getCurrencies()));
    createCurrencyOptions(cr);
    createTableOfValues(cr);
    currencies = cr;
}
function createCurrencyOptions(currencies){
    const selectElements = document.querySelectorAll('.currencyType');
    for (const currency of Object.values(currencies)){
        selectElements.forEach(function(selectElement){
            const tag = document.createElement('option');
            tag.setAttribute('value', currency.code);
            tag.innerText = currency.code;
            selectElement.appendChild(tag);
        });
    }
}

function createTableOfValues(currencies){
    //tabela temporaria - para fins de teste
    let table = '<table cellpadding="0px" cellspacing="0px">';
    table += '<tr><th>código</th><th>moeda</th><th>valor</th></tr>';
    for (const currency of Object.values(currencies)){
        table += '<tr>'
        table += `<td>${currency.code}</td><td>${currency.name}</td><td>${currency.ask}</td></td>`
        table += '</tr>'
    }
    table += '</table>';
    document.body.innerHTML += table;
}

getCurrencies();